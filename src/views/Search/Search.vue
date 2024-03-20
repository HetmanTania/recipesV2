<template>
    <TheHeader></TheHeader>
    <main>
        <h1 class="title title-big">Search</h1>
        <h2 class="title title-small">Write a search query</h2>
        <div class="search-system">
            <div class="search-system__wrapper">
                <InputText v-model="valueSearchText" placeholder="Search" classes="search__input curly-input input input-gray"></InputText>
                <button @click="search" class="btn btn-curly btn-curly-green-hoverBlack btn-curly-green">Search</button>
            </div>
        </div>
        <RecipesSection v-if="recipeList.length" :recipesList="recipeList" isBtnMore="false" isShowTitle="false"></RecipesSection>
        <Pagination @changePagination="changePagination" :infoPagination="infoPagination" v-if="recipeList.length"></Pagination>
    </main>
    <theFooter></theFooter>
</template>

<script>

import Pagination from '../../components/Pagination/Pagination.vue';
import RecipesSection from '../../components/RecipesSection/RecipesSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue'
import InputText from '../../components/InputText/InputText.vue'

import { ref, computed, onMounted  } from 'vue';
import { useStore,  } from 'vuex';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const valueSearchText = ref('');
        let searchText = '';

        const store = useStore();
        const route = useRoute();

        const pageNum = ref(1);
        const countRecipes = 8;
        let offset = 0;

        onMounted(async () => {
            if(route.query.searchText && route.query.searchText.length) {
                searchText = route.query.searchText;
                valueSearchText.value = searchText;
                await requestRecipesLists();
            }
        });

        const search = async () => {
            searchText = valueSearchText.value;   
            await requestRecipesLists();
        };

        const recipeList = computed(() => {
            return store.getters['recipes/getRecipesList']('search');
        });

        const infoPagination = computed(() => {
            return store.getters['recipes/getInfoPagination'];
        });

        const requestRecipesLists = async () => {
            await store.dispatch('recipes/requestSearch', {search: searchText, count: countRecipes,offset: offset});
        }

        const changePagination = async (num) => {
            pageNum.value = num;
            if (offset !== 1) {
                offset = (pageNum.value * countRecipes) - countRecipes;
            }
            else {
                offset = 0;
            }
            await requestRecipesLists();
        }

        return {
            recipeList,
            infoPagination,
            valueSearchText,
            searchText,
            search,
            changePagination
        }
    },
    components: { TheHeader, TheFooter, InputText, RecipesSection, Pagination }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './search.scss';
</style>
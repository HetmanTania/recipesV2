<template>
    <TheHeader></TheHeader>
    <main>
        <h1 class="title title-big">Search</h1>
        <h2 class="title title-small">Write a search query</h2>
        <div class="search-sistem">
            <div class="search-sistem__wrapper">
                <InputText v-model="valueSearchText" placeholder="Search" clases="shearch__input curly-input input input-gray"></InputText>
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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
export default {
    setup() {
        const valueSearchText = ref('');
        let searchText = '';

        const store = useStore();

        const pageNum = ref(1);
        const countRecipes = 8;
        let offset = 0;

        const search = async () => {
            searchText = valueSearchText.value;
            await requrstRecipesLists();
        };

        const recipeList = computed(() => {
            return store.getters['recipes/getRecipesList']('search');
        });

        const infoPagination = computed(() => {
            console.log('g');
            return store.getters['recipes/getInfoPagination'];
        });

        const requrstRecipesLists = async () => {
            await store.dispatch('recipes/requestSerch', {search: searchText, count: countRecipes,offset: offset});
        }

        const changePagination = async (num) => {
            pageNum.value = num;
            if (offset !== 1) {
                offset = (pageNum.value * countRecipes) - countRecipes;
            }
            else {
                offset = 0;
            }
            await requrstRecipesLists();
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
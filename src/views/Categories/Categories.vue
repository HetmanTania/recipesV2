<template>
    <TheHeader></TheHeader>
    <main>
        <h1 class="title title-big">Categories</h1>
        <div class="tab-sistem">
            <div @click="chooseType" class="tabs">
                <div v-for="mealTypes in MEALTYPES" :key="mealTypes.title" :class="[{'tab-chaek': mealTypes.value === typeMeal}, 'tab']">{{ mealTypes.title }}</div>
            </div>
        </div>
        <RecipesSection :recipesList="recipeList" isBtnMore="false" isShowTitle="false"></RecipesSection>
        <Pagination @changePagination="changePagination" :infoPagination="infoPagination"></Pagination>
    </main>
    <theFooter></theFooter>
</template>

<script>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import RecipesSection from '../../components/RecipesSection/RecipesSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue'
import { MEALTYPES } from '../../utils/constants';
import Pagination from '../../components/Pagination/Pagination.vue';
export default {
    setup() {
        const store = useStore();

        const typeMeal = ref(MEALTYPES['main course'].value);
        const pageNum = ref(1);
        const countRecipes = 8;
        let offset = 0;
        
        const requrstRecipesLists = async () => {
            await store.dispatch('recipes/requrstRecipesLists', { search: typeMeal.value, count: countRecipes, offset: offset});
        }

        requrstRecipesLists();

        const recipeList = computed(() => {
            return store.getters['recipes/getRecipesList'](typeMeal.value);
        });

        
        const infoPagination = computed(() => {
            return store.getters['recipes/getInfoPagination'];
        });

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

        const chooseType = async (e) => {
            const text = e.target.innerText.toLowerCase();
            console.log(typeMeal);
            if(text) {
                typeMeal.value = MEALTYPES[text].value;
                await requrstRecipesLists()
                changePagination(1);
            }
        }

        

        return {
            MEALTYPES,
            typeMeal,
            infoPagination,
            pageNum,
            recipeList,

            changePagination,
            chooseType
        }
    },
    components: { TheHeader, RecipesSection, TheFooter, Pagination }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './categories.scss';
</style>
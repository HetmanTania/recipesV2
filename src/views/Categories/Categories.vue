<template>
    <TheHeader></TheHeader>
    <main>
        <h1 class="title title-big">Categories</h1>
        <div class="tab-system">
            <div @click="chooseType" class="tabs">
                <div v-for="mealTypes in MEAL_TYPES" :key="mealTypes.title" :class="getClassesTab(mealTypes)">{{ mealTypes.title }}</div>
            </div>
        </div>
        <RecipesSection :recipesList="recipeList" :isBtnMore="false" :isShowTitle="false"></RecipesSection>
        <Pagination @changePagination="changePagination" :infoPagination="infoPagination"></Pagination>
    </main>
    <theFooter></theFooter>
</template>

<script>

import RecipesSection from '../../components/RecipesSection/RecipesSection.vue';
import Pagination from '../../components/Pagination/Pagination.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue'

import { MEAL_TYPES } from '@/utils/constants';

import { onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';


export default {

    setup() {
        const store = useStore();

        const currentTypeMeal = ref(MEAL_TYPES['main course'].value);
        const pageNum = ref(1);
        const countRecipes = 8;
        let offset = 0;
        
        onMounted(() => {
            requestRecipesLists();
            window.scrollTo(0, 0);
        });

        const requestRecipesLists = async () => {
            await store.dispatch('recipes/requestRecipesLists', { search: currentTypeMeal.value, count: countRecipes, offset: offset});
        };
 
        const changePagination = async (num) => {
            pageNum.value = num;
            if (offset !== 1) {
                offset = (pageNum.value * countRecipes) - countRecipes;
            }
            else {
                offset = 0;
            }
            await requestRecipesLists();
        };

        const chooseType = async (e) => {
            const text = e.target.innerText.toLowerCase();
            if(text) {
                currentTypeMeal.value = MEAL_TYPES[text].value;
                await requestRecipesLists();
                await changePagination(1);
            }
        };

        const recipeList = computed(() => {
            return store.getters['recipes/getRecipesList'](currentTypeMeal.value);
        });

        
        const infoPagination = computed(() => {
            return store.getters['recipes/getInfoPagination'];
        });

        const getClassesTab = (mealType) => {
          const isTabCheck = mealType.value === currentTypeMeal.value ? 'tab-check': '';
          return ['tab', isTabCheck];
        }

        return {
            MEAL_TYPES,
            currentTypeMeal,
            pageNum,

            infoPagination,
            recipeList,

            getClassesTab,
            changePagination,
            chooseType
        }
    },
    components: { TheHeader, RecipesSection, Pagination, TheFooter }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './categories.scss';
</style>
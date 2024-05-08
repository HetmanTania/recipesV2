<template>
    <div class="first-screen"> 
        <TheHeader></TheHeader>
        <section class="info">
            <h1 class="title title-big"><span class="text-green">So</span>Yummy</h1>
            <p class="text">"What to cook?" is not only a recipe app, it is, in fact, your cookbook. You can add your own recipes to save them for the future.</p>
            <div class="search-dox">
                <InputText v-model="searchText" placeholder="Search" classes="input search-input search"/>
                <button @click="goSearchPage" class="btn btn-curly btn-grey search-btn black">Search</button>
            </div>
        </section>
        <div class="bg-rect"></div>
        <div class="bg-img boul"></div>
        <div class="bg-img leaves-1"></div>
        <div class="bg-img leaves-2"></div>
        <div class="first-screen-tips tips">
            <p class="tips-text"><span class="text-green">Delicious and healthy</span> way to enjoy a variety of fresh ingredients in one satisfying meal</p>
            <router-link class="tips-ref" to="/categories">See recipes<div class="svg icon-arrow-narrow-right"></div></router-link>
        </div>
    </div>
    <div class="second-screen">
        <recipes-section :recipesList="recipeList" v-for="recipeList in allRecipeList" :key="recipeList[0]?.id" ></recipes-section>
        <router-link class="btn btn-curly btn-curly-greenTransparent btn-categories" to="/categories">Other categories</router-link>
    </div>
    
    <TheFooter/>
</template>

<script>
import { MEAL_TYPES } from '@/utils/constants';

import RecipesSection from '../../components/RecipesSection/RecipesSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import InputText from '../../components/InputText/InputText.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue';

import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { onBeforeMount, reactive, ref } from 'vue';

export default {

    setup() {
        const store = useStore();
        const router = useRouter();

        const categories = [MEAL_TYPES['breakfast'], MEAL_TYPES['main course'], MEAL_TYPES['salad'], MEAL_TYPES['dessert']];
        const countRecipes = 4;
        const allRecipeList = reactive([]);
        const searchText = ref('');

        onBeforeMount(async () => {
            if(!allRecipeList.length) {
                await requestAllRecipesLists();
            }
        });
        
        const requestAllRecipesLists = async () => {
            categories.forEach(async (category) => {
                await requestRecipesLists(category.title);
            });
        }

        const requestRecipesLists = async (category) => {
            await store.dispatch('recipes/requestRecipesLists', { search: category, count: countRecipes, offset: 0});
            allRecipeList.push(store.getters['recipes/getRecipesList'](category));
        }

        const goSearchPage = () => {
            router.push({path: '/search', query: { searchText: searchText.value} });
        }

        return {
            searchText,
            categories,
            allRecipeList,
            goSearchPage,
        }

    },
    components: { TheHeader, RecipesSection, InputText, TheFooter },
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './home.scss';
</style>
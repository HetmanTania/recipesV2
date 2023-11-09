<template>
    <div class="first-screen">
        <TheHeader></TheHeader>
        <div class="first-screen_content">
            <h1 class="title title-big">{{ state.recipe.title }}</h1>
            <p class="desc-recep" v-html="getSummary"></p>
            <div class="time"><div class="icon-clock svg"></div> {{ state.recipe.readyInMinutes }} min</div>
        </div>
    </div>
    <div class="ingredients">
        <IngredientsSection :ingrediensList="state.recipe.extendedIngredients"></IngredientsSection>
    </div>
    <div class="instructions">
        <h2 class="title title-blue">Recipe Preparation</h2>
        <div class="list-img">
            <ul class="list-ul">
            <li v-for="(instruction, inx) in getInstructions" :key="instruction.numder">
                    <div class="num">{{ inx + 1 }}</div>
                    <p> {{ instruction.step }}</p>
                </li>
            </ul>
            <img :src="getImgRecepe" alt="">
        </div>

    </div>

    <TheFooter></TheFooter>
</template>

<script>
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue';

import { reactive, computed } from 'vue';
import {  useRoute } from 'vue-router';
import { useStore } from 'vuex';


export default {
    
    setup() {
        const route = useRoute();
        const store = useStore()

        const state = reactive({
            recipe: {}
        })

        const getInfoRecepe = async () => {
            const idRecipe = route.params.id; 
            await store.dispatch('recipes/requrstRecipe', idRecipe);
            state.recipe = {...store.getters['recipes/getRecipe']};
        };

        const getImgRecepe = computed(() => {
            return state.recipe.image;
        });

        const getInstructions = computed(() => {
            console.log(state.recipe?.analyzedInstructions);
            if(state.recipe?.analyzedInstructions) {
                return state.recipe?.analyzedInstructions[0].steps;
            }
            return [];
        });

        const getSummary = computed(() => {
            let summary = state.recipe.summary;
            if(summary && summary.length) {
                summary = summary.split('.').slice(0, 1).join('') + '.';
            }
            return summary;
        })

        getInfoRecepe();


        return {
            state,
            getSummary,
            getInstructions,
            getImgRecepe
        }

    },
    components: { TheHeader, IngredientsSection, TheFooter }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './recipe.scss';
</style>
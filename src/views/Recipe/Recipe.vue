<template>
    <div class="title-desc">
        <TheHeader></TheHeader>
        <div class="title-desc_content">
            <h1 class="title title-big">{{ state.recipe.title }}</h1>
            <p  v-html="getSummary" class="desc-recep"></p>
            <div class="time"><div class="icon-clock svg"></div> {{ state.recipe.readyInMinutes }} min</div>
        </div>
    </div>
    <div class="ingredients">
        <IngredientsSection :ingredientsList="state.recipe.extendedIngredients"></IngredientsSection>
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
            <img :src="getImgRecipe" alt="recipe">
        </div>
    </div>
    <TheFooter></TheFooter>
</template>

<script>
import IngredientsSection from '../../components/IngredientsSection/IngredientsSection.vue';
import TheHeader from '../../components/TheHeader/TheHeader.vue';
import TheFooter from '../../components/TheFooter/TheFooter.vue';

import { onMounted, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';


export default {
    
    setup() {
        const route = useRoute();
        const store = useStore();

        const state = reactive({
            recipe: {
                extendedIngredients: []
            }
        });

        onMounted(() => {
            getInfoRecipe();
        });

        const getInfoRecipe = async () => {
            const idRecipe = route.params.id; 
            await store.dispatch('recipes/requestRecipe', idRecipe);
            state.recipe = {...store.getters['recipes/getRecipe']};
        };

        const getImgRecipe = computed(() => {
            return state.recipe.image;
        });

        const getInstructions = computed(() => {
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
        });

        return {
            state,
            getSummary,
            getInstructions,
            getImgRecipe
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
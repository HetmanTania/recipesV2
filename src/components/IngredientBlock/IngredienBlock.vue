<template>
    <div class="ingredient-block">
        <div class="ingredient-block__inner">
            <div class="img-name">
                <div class="img" :style="getBG"/>
                <h3  class="title">{{ name }}</h3>
            </div>
            <div class="amount-check">
                <p class="amount">{{ amount }}</p>
                <label :class="[getClassLabel, 'checkbox']" :for="getIdIngredients">
                    <input v-model="state.isAddToList" :id="getIdIngredients"  type="checkbox">
                </label>
            </div>
        </div>
        
    </div>
</template>

<script>
import { reactive, computed } from 'vue';

import { INGREDIENTS_URL } from '@/utils/constants.js';

export default {
    props: {
      ingredient: {
            type: Object,
            required: true
      }
    },
    setup(props) {

        const state = reactive({
          ingredient: {...props.ingredient},
            isAddToList: false
        });
        
        const changeInputAddToLis = () => {
            state.isAddToList = !state.isAddToList
        }

        const getBG = computed(() => {
           return { backgroundImage: `url(${imgIngredient.value})` };
        });

        const getClassLabel = computed(() => {
           return { isCheck: state.isAddToList }
        });

        const imgIngredient = computed(() => {
            return `${INGREDIENTS_URL}_250x250/${state.ingredient.image}`;
        });

        const getIdIngredients = computed(() => {
            return state.ingredient.id + state.ingredient.amount;
        })

        const name = computed(() => {
            return state.ingredient.originalName.charAt(0).toUpperCase() + state.ingredient.originalName.slice(1);
        });

       const amount = computed(() => {
            return `${state.ingredient.amount} ${state.ingredient.measures.metric.unitShort}`;
       });


        return {
            state,

            changeInputAddToLis,

            getIdIngredients,
            getClassLabel,
            imgIngredient,
            name,
            amount,
            getBG,
        }

    }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './ingredienBlock.scss';
</style>
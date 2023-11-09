<template>
    <div class="ingredien-block">
        <div class="ingredien-block__inner">
            <div class="img-name">
                <div class="img" :style="{ backgroundImage: `url(${imgIngredient})` }"/>
                <h3  class="title">{{ name }}</h3>
            </div>
            <div class="amount-cheack">
                <p class="amount">{{ amount }}</p>
                <label :class="[{isCheak: state.isAddToList}, 'cheackbox']" :for="getIdIngredients">
                    <input v-model="state.isAddToList" :id="getIdIngredients"  type="checkbox">
                </label>
            </div>
        </div>
        
    </div>
</template>

<script>
import { reactive, computed } from 'vue';

import { INGREDIENTS_URL } from '../../utils/constants';

export default {
    props: {
        ingredien: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const state = reactive({
            ingredien: {...props.ingredien},
            isAddToList: false
        });

        const imgIngredient = computed(() => {
            return `${INGREDIENTS_URL}_250x250/${state.ingredien.image}`;
        });

        const getIdIngredients = computed(() => {
            return state.ingredien.id + state.ingredien.amount;
        })

        const name = computed(() => {
            return state.ingredien.originalName.charAt(0).toUpperCase() + state.ingredien.originalName.slice(1);
        });

       const amount = computed(() => {
            return `${state.ingredien.amount} ${state.ingredien.measures.metric.unitShort}`;
       }) 

       const changeInputAddToLis = () => {
            state.isAddToList = !state.isAddToList
       }

        return {
            state,
            getIdIngredients,
            imgIngredient,
            name,
            amount,

            changeInputAddToLis,
        }

    }
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './ingredienBlock.scss';
</style>
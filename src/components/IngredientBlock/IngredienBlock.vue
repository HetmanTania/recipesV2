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
                    <input @change="changeInputAddToLis" :id="getIdIngredients"  type="checkbox">
                </label>
            </div>
        </div>
        
    </div>
</template>

<script>
import { reactive, computed } from 'vue';
import {getImgProduct, toFirstLetterUppercase} from "@/utils/utils";
import { useStore } from "vuex";
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
      });

      const store = useStore();
      const changeInputAddToLis = () => {
        if(!isIngredientInShoppingList.value) {
          store.dispatch('products/addOrUpdateProductList', state.ingredient);
        }
        else {
          store.dispatch('products/deleteProduct', state.ingredient.id);
        }
      }

      const isIngredientInShoppingList = computed(() => {
        return !!store.getters['products/getProductFromFirebaseById'](state.ingredient.id);
      })

      const getBG = computed(() => {
         return { backgroundImage: `url(${imgIngredient.value})` };
      });

      const getClassLabel = computed(() => {
         return { isCheck: isIngredientInShoppingList.value }
      });

      const imgIngredient = computed(() => {
        return getImgProduct(state.ingredient.image);
      });

      const getIdIngredients = computed(() => {
        return state.ingredient.id + state.ingredient.amount;
      })

      const name = computed(() => {
        return toFirstLetterUppercase(state.ingredient.originalName);
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
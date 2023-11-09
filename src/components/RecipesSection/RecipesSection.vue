<template>
  <section class="recipecSection">
    <h3 v-if="isShowTitle.value" class="recipecSection-title title title-big title-black">{{ searchText }}</h3>
    <div v-if="recipesList.length" class="recipecSection-list list">
        <recipes-block v-for="recipe in recipesList" :recipe="recipe" :key="recipe.id"></recipes-block>
    </div>
    <div v-else>... load</div>
    <router-link v-if="isBtnMore.value" class="recipecSection-btn btn btn-green" to="#">See all</router-link>
  </section>
</template>

<script>
import RecipesBlock from '../RecipesBlock/RecipesBlock.vue';
// import { computed, onBeforeMount, watch } from 'vue';
// import { useStore } from "vuex";
export default {
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    isBtnMore: {
      type: Boolean,
      default: true
    },
    recipesList: {
      type: Array,
      required: true,
    }


    // search: {
    //   require: true,
    //   type: Object
    // },
    // countRecipes: {
    //   type: Number,
    //   default: 4,
    // },
    
    // pageNum: {
    //   type: Number,
    //   default: 1.
    // }
  },
   setup() {
    // const store = useStore();
    // let offset = 0;
    
    // const recipesList = computed(() => {
    //   return store.getters['recipes/getRecipesList'](props.search.searchText);
    // })

    // onBeforeMount( async () => {
    //   console.log(offset);
    //   await getRecipes();
    // });

    // watch(() => props.searchText, async () => {
    //   await getRecipes();
    // });

    // watch(() => props.pageNum, async () => {
    //   await getRecipes();
    // });

    // const getRecipes = async () => {
    //   offset = offset !== 1 ? (props.pageNum * props.countRecipes) - props.countRecipes : 0

    //   console.log(offset);
    //   await store.dispatch('recipes/requrstRecipesLists',{ search: props.search, count: props.countRecipes, offset: offset});
    // }

    // return { 
    //   recipesList
    // }

    // return {
    //   recipesList
    // }
  },
  components: {RecipesBlock}
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './recipesSection.scss';
</style>
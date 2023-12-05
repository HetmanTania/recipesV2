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
  },
  components: {RecipesBlock}
}
</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './recipesSection.scss';
</style>
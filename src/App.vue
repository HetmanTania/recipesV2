<template>
  <router-view v-if="!isLoadShow"></router-view>
  <load v-else @close="closeLoad" :isLoad="isLoad"></load>
</template>


<script setup>
import { useStore} from "vuex";
import { ref } from "vue";
import Load from "@/components/Load/Load.vue";

const store = useStore();
const isLoad = ref(false);
const isLoadShow = ref(false);
const testRecipes = async () => {
  isLoadShow.value = true;
  await store.dispatch('recipes/testIsDayLimitsOverRecipes');
  isLoad.value = true;
}

testRecipes();
store.dispatch('products/getAllProductListFromFirebase');

const closeLoad = () => {
  isLoadShow.value = false;
}

</script>

<style lang="scss">
@import './style/var.scss';
@import './style/normalize.scss';
@import './style/mixin.scss';
@import './style/main.scss';
</style>

<template>
  <div class="products-block">
    <div class="products-header">
      <p>Products</p>
      <div class="number-remove">
        <p>Number</p>
        <p>Remove</p>
      </div>
    </div>
    <div v-if="state.products.length" class="wrapper-product">
      <product-block :product="product" v-for="product in state.products" :key="product.id"></product-block>
    </div>

  </div>
</template>

<script setup>

import ProductBlock from "@/components/ProductBlock/ProductBlock.vue";
import {useStore} from "vuex";
import {computed, reactive} from "vue";

const store = useStore();
const state = reactive({
  products: []
})

state.products = computed(() => {
  return store.getters['products/getProductList'];
});

</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './shoppingListSection.scss';
</style>
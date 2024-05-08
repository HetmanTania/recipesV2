<template>
  <div class="product-block">
    <div class="product-block__inner">
      <div class="img-name">
        <div class="img" :style="getBG"/>
        <h3  class="title">{{ toFirstLetterUppercase(product.originalName) }}</h3>
      </div>
      <div class="amount-remove">
        <p :class="getClassesAmount">{{getAmount}}</p>
        <button @click="deleteProductFromList" class="btn-icon icon-close"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getImgProduct, toFirstLetterUppercase} from "@/utils/utils";
import {computed, defineProps} from 'vue';
import {useStore} from "vuex";

const store = useStore();
const props = defineProps({
  product: {
    type: Object,
    required: true,
  }
});

const deleteProductFromList = () => {
  store.dispatch('products/deleteProduct',props.product.id);
}

const getBG = computed(() => {
  return { backgroundImage: `url(${imgProduct.value})` };
});

const getClassesAmount = computed(() => {
  return `${getAmount.value ? 'show' : 'hidden'} amount`
})

const getAmount = computed(() => {
  return props.product.amount ? props.product.amount : '';
})

const imgProduct = computed(() => {
  return getImgProduct(props.product.image);
});

</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './productBlock.scss';
</style>
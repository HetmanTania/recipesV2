<template>
  <theHeader></theHeader>
  <main>
    <h1 class="title title-big">Shopping list</h1>
    <shopping-list-section></shopping-list-section>
  </main>
  <theFooter></theFooter>
</template>

<script setup>

import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";
import ShoppingListSection from "@/components/ShoppingListSection/ShoppingListSection.vue";


</script>

<style lang="scss">
@import '../../style/mixin.scss';
@import '../../style/var.scss';
@import './shoppingList.scss';
</style>
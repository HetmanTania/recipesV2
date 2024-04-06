<template>
  <TheHeader></TheHeader>
  <main>
    <div class="wrapper">
      <img class="img-505" alt="505" src="@/assets/svg/505.svg">
      <h2 class="title title-big">We are sorry,</h2>
      <h3 class="title sub-title">but the number of API requests is limited, try logging in another day...</h3>
    </div>
  </main>
  <TheFooter></TheFooter>
</template>

<script setup>

import TheHeader from "@/components/TheHeader/TheHeader.vue";
import TheFooter from "@/components/TheFooter/TheFooter.vue";

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './page505.scss';
</style>
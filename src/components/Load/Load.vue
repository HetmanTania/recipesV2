<template>
    <div class="loader-wrapper">
      <div class="loader"></div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, defineProps, defineEmits } from 'vue';
const props = defineProps({
  isLoad: {
    type: Boolean,
    required: true,
  }
});
const emit = defineEmits([
  'close',
]);
let isShowMore1sec = ref(false);
let show1secTimeout;

onMounted(() => {
  show1secTimeout = setTimeout(() => {
    isShowMore1sec.value = true;
  }, 1000)
})


watch(() => props.isLoad, (newValue) => {
  if(newValue && isShowMore1sec.value) {
    emit('close');
  }
});

watch(isShowMore1sec, (newValue) => {
  if(newValue && props.isLoad) {
    emit('close');
  }
});

onBeforeUnmount(() => {
  clearTimeout(show1secTimeout);
})

</script>

<style lang="scss">
@import '../../style/var';
@import '../../style/mixin';
@import 'load';
</style>
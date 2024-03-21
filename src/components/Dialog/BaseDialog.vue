<template>
    <div ref="currentWrapper" @click.self="close" class="wrapper-dialog">
        <div ref="currentDialog" class="dialog">
            <div @click.self="close" class="icon-close svg"></div>
            <slot name="header"></slot>
            <slot name="content"></slot>
            <slot name="footer"></slot>
        </div>
    </div>
    
</template>

<script>
import {  ref, watch } from 'vue';
import { gsap } from "gsap";

import { isBool } from '@/utils/validators';
import { ANIMATION_EASY, DURATION_03 } from '@/utils/animationConstants';

export default {
    props: {
        isOpenDialog: {
            default: false,
            type: Boolean,
            validator: isBool
       }
    },
    emits: ["close"],
  setup(props, context) {
    const currentWrapper = ref(null);
    const currentDialog = ref(null);

    const tl = gsap.timeline();
    const close = () => {
      context.emit('close');
      animateClose();
    }

    watch(() => props.isOpenDialog, (newValue) => {
      if(newValue) {
        animateOpen();
      }
      else {
        animateClose();
      }
    });

    const animateOpen = () => {
      animateWrapper(1);
      animateDialog(1, 0);
    }

    const animateClose = () => {
      animateDialog(1, '-100vh');
      animateWrapper(0);
    }

    const animateWrapper = (alpha) => {
      tl.to(currentWrapper.value, {
        autoAlpha: alpha,
        ease: ANIMATION_EASY,
        duration: DURATION_03
      });
    }

    const animateDialog = (alpha, y) => {
      tl.to(currentDialog.value, {
        autoAlpha: alpha,
        y: y,
        ease: ANIMATION_EASY,
      })
    }

    return {
      close,

      currentWrapper,
      currentDialog
    }
  }
}

</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import '../Dialog/dialog.scss';
</style>

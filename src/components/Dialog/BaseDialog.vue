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
import { ANIMATION_EASY } from '@/utils/constants';

export default {
    props: {
        isOpenDialog: {
            default: false,
            type: Boolean,
            validator: isBool
       }
    },
    emits: ["close"],
    setup(props, context) { //props, context
        const currentWrapper = ref(null);
        const currentDialog = ref(null);

        const close = () => {
            context.emit('close');
            animateClose();
        }

        watch(() => props.isOpenDialog, (newValue) => {
            if(newValue) {
                animateOpen();
            }
            else {
                document.body.style.overflow = 'auto';
            }
        });

        const animateOpen = () => {
            animate('109vh', '0vh');
        }

        const animateClose = () => {
            animate('-110vh', '-100vh');
        }

        const animate = (yCurrentWrapper, yCurrentDialog) => {
            const tl = gsap.timeline();
            tl.to(currentWrapper.value, {
                y: yCurrentWrapper,
            });
            tl.to(currentDialog.value, {
                y: yCurrentDialog,
                ease: ANIMATION_EASY,
                duration: 0.3
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

<template>
    <div @mouseover.self="showErrorText" @mouseleave="closeErrorText" v-if="isShow" :class="getClassIcon">
        <div ref="errorItemText" @mouseleave="closeErrorText" :class="getClassErrorText"> {{ text }}
            <span class="triangle"></span>
        </div>
    </div>
</template>

<script>
import {DURATION_04} from "@/utils/animationConstants";

import { computed, ref } from 'vue';
import { gsap } from "gsap";

export default {
    props: {
        isShow: { 
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            required: true
        }
    },
    setup(props) {
        let onIcon = ref(false);
        const errorItemText = ref(null);
        const getClassIcon = computed(() => {
            return `${props.isShow ? 'show' : ''} error-item icon icon-error`;
        });

        const getClassErrorText = computed(() => {
            return `${onIcon.value ? 'show' : ''} error-item__text`;
        });

        const showErrorText = () => {
            onIcon.value = true;
            animationOpen();
        };

        const closeErrorText = () => {
            onIcon.value = false;
            animationClose();
        };

        const animationOpen = () => {
            let tl = gsap.timeline();
            tl.to(errorItemText.value, {
                y: 3,
                autoAlpha: 1,
            });
            tl.to(errorItemText.value, {
                y: 7,
                repeat: -1,
                yoyo: true
            });
        }

        const animationClose = () => {
            gsap.to(errorItemText.value, {
                y: 0,
                autoAlpha : 0,
                duration: DURATION_04,
            });
        }


        return {
            getClassIcon,
            getClassErrorText,
            errorItemText,

            showErrorText,
            closeErrorText
        }
    }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './errorItem.scss';
</style>
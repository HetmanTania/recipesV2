<template>
    <div @mouseover.self="showErrorText" @mouseleave="closeErrorText" v-if="isShow" :class="getClassIcon">
        <div ref="errorIitemText" @mouseleave="closeErrorText" :class="getClassErrorText"> {{ text }}
            <span class="triangle"></span>
        </div>
    </div>
</template>

<script>
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
        const errorIitemText = ref(null);
        const getClassIcon = computed(() => {
            return `${props.isShow ? 'show' : ''} error-item icon icon-error`;
        });

        const getClassErrorText = computed(() => {
            return `${onIcon.value ? 'show' : ''} error-item__text`;
        });

        const showErrorText = () => {
            onIcon.value = true;
            console.log('showErrorText');
            animationOpen();
        };

        const closeErrorText = () => {
            onIcon.value = false;
            console.log('closeErrorText');
            animationClose();
        };

        const animationOpen = () => {
            let tl = gsap.timeline();
            tl.to(errorIitemText.value, {
                y: 3,
                autoAlpha: 1,
            });
            tl.to(errorIitemText.value, {
                y: 7,
                repeat: -1,
                yoyo: true
            });
        }

        const animationClose = () => {
            gsap.to(errorIitemText.value, {
                y: 0,
                autoAlpha : 0,
                duration: 0.4,
            });
        }


        return {
            getClassIcon,
            getClassErrorText,
            errorIitemText,

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
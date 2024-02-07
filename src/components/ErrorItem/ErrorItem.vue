<template>
    <div @mouseover.self="showErrorText" @mouseleave="closeErrorText" v-if="isShow" :class="getClassIcon">
        <div @mouseleave="closeErrorText" :class="getClassErrorText"> {{ text }}
            <span class="triangle"></span>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue';

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

        const getClassIcon = computed(() => {
            return `${props.isShow ? 'show' : ''} error-item icon icon-error`;
        });

        const getClassErrorText = computed(() => {
            return `${onIcon.value ? 'show' : ''} error-item__text`;
        });

        const showErrorText = () => {
            onIcon.value = true;
        }
        const closeErrorText = () => {
            onIcon.value = false;
        }

        return {
            getClassIcon,
            getClassErrorText,

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
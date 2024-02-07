<template>
    <div class="input-wrapper">
        <div v-if="iconPath?.length" :style="{ backgroundImage: `url(${iconPath})` }" class="icon icon-email" ></div>
        <input :value="modelValue" @change="updateValue" :class="getClassInput" :placeholder="placeholder" type="text"/>
        <ErrorItem :text="getErrorText" :isShow="error?.isError"></ErrorItem>
    </div>
</template>

<script>
import ErrorItem from '../ErrorItem/ErrorItem.vue';
import useInput from '../../composable/useInput.js'
import { cheackErrorText } from '../../utils/validators.js';
import { computed } from 'vue';
export default {
    props: {
        icon: {
            type: String,
            required: false,
        },
        clases: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        }, 
        error: {
            type: Object,
            required: true
        },
        modelValue: {
            type: String,
        }
    },
    setup(props, context) {

        const {iconPath, getClassInput, getClassIcon} = useInput(props);

        const updateValue = (event) => {
            context.emit('update:modelValue', event.target.value.trim());
        }

        const getErrorText = computed(() => {
            return cheackErrorText(props.error?.text);
        });

        return {
            iconPath,
            getClassInput,
            getClassIcon,
            getErrorText,
            
            updateValue,
        }

    },
    components: {ErrorItem}
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './inputText.scss';

</style>
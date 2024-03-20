<template>
   <div class="input-wrapper">
        <div :style="{ backgroundImage: `url(${iconPath})` }" class="icon icon-lock"></div>
        <input :value="modelValue" @change="updateValue" :class="getClassInput" :placeholder="placeholder" type="password"/>
        <ErrorItem :text="getErrorText" :isShow="error.isError"></ErrorItem>
    </div>
</template>

<script>
import ErrorItem from '../ErrorItem/ErrorItem.vue';
import useInput from '../../composable/useInput.js';
import { checkErrorText } from '@/utils/validators.js';
import { computed } from 'vue';
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        classes: {
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
        const {iconPath, getClassInput} = useInput(props);

        const updateValue = (event) => {
            context.emit('update:modelValue', event.target.value.trim());
        }

        const getErrorText = computed(() => {
            return checkErrorText(props.error.text);
        });

        return {
            iconPath,
            getClassInput,
            getErrorText,
            
            updateValue,
        }

    },
    components: {ErrorItem}
}
</script>

<style>

</style>
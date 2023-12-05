<template>
   <div class="input-wrapper">
        <div :style="{ backgroundImage: `url(${iconPath})` }" class="icon"></div>
        <input :value="modelValue" @change="updateValue" :class="getClassInput" :placeholder="placeholder" type="password"/>
        <div :class="getClassIcon" class="icon icon-error input-error"></div>
    </div>
</template>

<script>
import useInput from '../../composable/useInput.js';
export default {
    props: {
        icon: {
            type: String,
            required: true
        },
        clases: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            required: true
        }, 
        isError: {
            type: Boolean,
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

        return {
            iconPath,
            getClassInput,
            getClassIcon,

            
            updateValue,
        }

    }
}
</script>

<style>

</style>
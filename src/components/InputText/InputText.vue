<template>
    <div class="input-wrapper">
        <div v-if="iconPath?.length" :style="{ backgroundImage: `url(${iconPath})` }" class="icon" ></div>
        <input :value="modelValue" @change="updateValue" :class="getClassInput" :placeholder="placeholder" type="text"/>
        <div :class="getClassIcon" class="icon icon-error input-error"></div>
    </div>
</template>

<script>
import useInput from '../../composable/useInput.js'
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

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './inputText.scss';

</style>
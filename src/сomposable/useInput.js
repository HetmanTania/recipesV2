import { computed } from "vue";

export default function useInput(props) {
    const iconPath = computed(() => {
        if(props.icon) {
            return require(`../assets/svg/${props.icon}.svg`);
        }
        return ''
    });
    
    const getClassInput = computed(() => {
        return `${props.clases} ${props.isError ? 'error' : ''}`;
    })

    const getClassIcon = computed(() => {
        return `${props.isError ? 'show' : ''}`;
    })

    // const getClassInput = () => {
    //     console.log('getClass', isError);
    //     console.log('modelValue',modelValue);
    //     return `${clases} ${ modelValue.length !== 0 && isError ? 'error' : ''}`;
    // }

    // const getClassIcon = computed(() => {
    //     console.log('getClass', isError);
    //     return `${modelValue.length !== 0 && isError ? 'show' : ''}`;
    // }) 

    return {
        iconPath,
        getClassInput,
        getClassIcon
    }
}
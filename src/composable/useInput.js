import { computed } from "vue";

export default function useInput(props) {
    const iconPath = computed(() => {
        if(props.icon) {
            return require(`../assets/svg/${props.icon}.svg`);
        }
        return ''
    });
    
    const getClassInput = computed(() => {
        return `${props.classes} ${props.error?.isError ? 'error' : ''}`;
    })


    return {
        iconPath,
        getClassInput,
    }
}
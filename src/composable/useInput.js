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
    });

    return {
        iconPath,
        getClassInput,
        getClassIcon
    }
}
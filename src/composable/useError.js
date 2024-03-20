import { reactive } from "vue";
import { checkErrorText } from "@/utils/validators";

export default function useError() {
    const error = reactive({
        text: '', 
        isError: false,
    });

    const setError = (text) => {
        error.isError = true;
        error.text = checkErrorText(text);
    }

    const resetError = () => {
        error.isError = false;
        error.text = '';
    }

    

    return {
        error,

        setError,
        resetError
    }
}
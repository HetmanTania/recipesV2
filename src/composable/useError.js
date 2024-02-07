import { reactive } from "vue";
import { cheackErrorText } from "../utils/validators";

export default function useError() {
    const error = reactive({
        text: '', 
        isError: false,
    });

    const setError = (text) => {
        error.isError = true;
        error.text = cheackErrorText(text);
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
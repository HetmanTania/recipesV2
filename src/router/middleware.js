import {getAuth} from "firebase/auth";
import store from "@/store";

export default function (to, from, next) {
    const currentUser = getAuth().currentUser;
    const isPageAuth = to.matched.some((record) => record.meta.auth);

    const isPageLimitsOver = to.matched.some((record) => record.meta.limitsOver);
    const isDayLimitsOver = store.getters['recipes/getDayLimitsOver']

    if(isPageAuth && !currentUser) {
        next('signIn');
    }
    else if (!isPageAuth && currentUser) {
        next('/');
    }
    else if (isPageLimitsOver && isDayLimitsOver) {
        next('505');
    }
    else if(!isDayLimitsOver && to.name === '505'){
        next(from.name);
    }
    else {
        next();
    }
}
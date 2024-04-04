import api from '@/utils/api.js';
import axios from "axios";
import {generateUrl, toLowerCase} from '@/utils/utils.js'
import { DAY_LIMITS_OVER } from '@/utils/constants.js';

export default {
    namespaced: true,
    state: {
        recipesLists: {},
        recipe : {},
        infoPagination: {},

        dayLimitsOver: false,
    },
    mutations: {
        addItemsToRecipesLists(state, date) {
            if(date.items.length) {
                state.recipesLists[date.title] = {items: date.items};
            } 
            else {
                state.recipesLists[date.title] = [];
            }
        },
        setInfoPagination(state, info) {
            state.infoPagination = info;
        },
        setRecipe(state, recipe) {
            if(recipe && recipe.id) {
                state.recipe = {...recipe};
            }
        },

        setDayLimitsOver(state, value) {
            state.dayLimitsOver = value;
        }
    },
    actions: {
        async testIsDayLimitsOverRecipes({dispatch}) {
            let url = generateUrl('complexSearch',`test/number=1`);
            await dispatch('doRequestRecipes', url);
        },
        async doRequestRecipes({commit, getters}, url) {

            try {
                if(url && url.length && !getters.getDayLimitsOver) {
                    const result = await api.get(url);
                    return result.data;
                }
            } catch(e) {
                console.log(e)
                if(e.response.status && e.response.status === DAY_LIMITS_OVER) {
                    commit('setDayLimitsOver', true);
                }
            }
        },
        async requestRecipesLists({ dispatch, commit }, {search, count, offset}) {
            search = toLowerCase(search);
            let url = generateUrl('complexSearch',`type=${search}&number=${count}&offset=${offset}`);
           
            const result = await dispatch('doRequestRecipes', url);
            
            if(result) {
                const items = {
                    title: search,
                    items: result.results,
                };
                const infoPagination = {
                    total: result.totalResults > 1000 ? 900 : result.totalResults,
                    count: result.number, 
                    offset: result.offset 
                };
                commit('addItemsToRecipesLists', items);
                commit('setInfoPagination', infoPagination);
            }
            
        },
        async requestSearch({dispatch, commit}, {search, count, offset}) {
            search = toLowerCase(search);
            const url = generateUrl('complexSearch',`query=${search}&number=${count}&offset=${offset}`);            
            const result = await dispatch('doRequestRecipes', url);
            if(result) {
                const items = {
                    title: 'search',
                    items: result.results,
                };
                const infoPagination = {
                    total: result.totalResults > 1000 ? 900 : result.totalResults,
                    count: result.number, 
                    offset: result.offset 
                };
                commit('addItemsToRecipesLists', items);
                commit('setInfoPagination', infoPagination);
            }

        },
        async requestRecipe({commit}, id) {
            if(id) {
                try {
                    const url = generateUrl(`/${id}/information`);
                    const item = await axios(url);
                    if(item?.data) {
                        commit('setRecipe', item.data)
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
    },
    getters: {
        getRecipesList: (state) => (title) => {
            title = toLowerCase(title);
            return state.recipesLists[title] ? state.recipesLists[title].items : [];
        },
        getRecipe(state) {
            return state.recipe;
        },
        getInfoPagination(state) {
            return state.infoPagination;
        },
        getDayLimitsOver(state) {
            return state.dayLimitsOver
        }
    }
}
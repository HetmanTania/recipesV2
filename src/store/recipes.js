import axios from 'axios';
import {generateUrl, toLowerCase} from '../utils/utils.js'

export default {
    namespaced: true,
    state: {
        recipesLists: {},
        recipe : {},
        infoPagination: {}
    },
    mutations: {
        addItemsToRcipesLists(state, date) {
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
        }
    },
    actions: {
        async doRequestRecipes(_, url) {
            try {
                if(url && url.length) {
                    const result = await axios.get(url);
                    return result.data;
                }
            } catch(e) {
                console.log(e);
            }
        },
        async requrstRecipesLists({ dispatch, commit }, {search, count, offset}) {
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
                commit('addItemsToRcipesLists', items);
                commit('setInfoPagination', infoPagination);
            }
            
        },
        async requestSerch({dispatch, commit}, {search, count, offset}) {
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
                commit('addItemsToRcipesLists', items);
                commit('setInfoPagination', infoPagination);
            }

        },
        async requrstRecipe({commit}, id) {
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
        }
    }
}
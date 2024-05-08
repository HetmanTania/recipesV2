import { getDatabase, ref, get, set, push, update, remove, child } from "firebase/database";
import { generateUrl, isCountableOrUncountable} from "@/utils/utils";
import {COUNTABLE} from "@/utils/constants";
import api from "@/utils/api";

const db = getDatabase();
const dbRef = ref(db);

function returnFormattedProductListFromFirebase(productsFromSnapshot) {
    if(!Object.keys(productsFromSnapshot).length) {
        return [];
    }
    const products = [];
    for (const key in productsFromSnapshot) {
        products.push({
            ...productsFromSnapshot[key].product,
            firebaseKey: key,
        });
    }
    return products;
}


export default {
    namespaced: true,
    state: {
        productListFromFirebase: [],
        productList: [],
    },
    mutations: {
        setProductListFromFirebase(state, products) {
            if (products && products.length) {
                state.productListFromFirebase = [...products];
            }
        },
        addProductToListFromFirebase(state, product) {
            if (product && product.id) {
                state.productListFromFirebase = [...state.productListFromFirebase, product];
            }
        },
        updateProductInListFromFirebase(state, product) {
            if (product && product.id) {
                state.productListFromFirebase = state.productListFromFirebase.map(el => {
                    if(el.id === product.id) {
                        return {...product}
                    }
                    return el;
                })
            }
        },
        deleteProductInListFromFirebase(state, id) {
            if(id) {
                state.productListFromFirebase = state.productListFromFirebase.filter(el => {
                    return el.id !== id;
                })
            }
        },
        setProductList(state, products) {
            if (products && products.length) {
                state.productList = [...products];
            }
        },
        addProductList(state, product) {
            if(product && product.id) {
                state.productList = [...state.productList, product];
            }
        },
        updateProduct(state, product) {
            if (product && product.id) {
                state.productList = state.productList.map(el => {
                    if(el.id === product.id) {
                        return Object.assign(el, product);
                    }
                    else {
                        return el;
                    }
                })
            }
        },
        deleteProduct(state, id) {
            if(id) {
                state.productList = state.productList.filter(el => {
                    return el.id !== id;
                })
            }
        }
    },
    actions: {
        addOrUpdateProductList({getters, dispatch}, product) {
            if(!product.id) {
                return;
            }
            try {
                const productAction = {
                    id: product.id,
                    metric: isCountableOrUncountable(product.measures.metric.unitShort),
                }
                const productFromFirebase = getters.getProductFromFirebaseById(product.id);
                if(!productFromFirebase) {
                    dispatch('addProduct', { amountProduct: product.amount, product: productAction});
                }
                else {
                    dispatch('updateProductAmount', {
                        amountProduct: product.amount, productFromFirebase,product: productAction });
                }
            } catch (e) {
                console.log(e);
            }
        },
        addProduct({ commit, dispatch}, { amountProduct, product}) {
            const addProduct = {...product};

            if (addProduct.metric === COUNTABLE) {
                addProduct.amount = amountProduct || 1;
            }
            dispatch('addProductToFirebase', addProduct);
            dispatch('requestProduct', addProduct.id);
            commit('addProductToListFromFirebase', addProduct);
        },
        addProductToFirebase({getters}, product) {
            const productListRef = ref(db, getters.getURLRefProductsList);
            const productRef = push(productListRef);
            set(productRef, {
                product: product,
            });
        },
        updateProductAmount({ dispatch, commit }, { amountProduct, product, productFromFirebase}) {
            const updateProduct = {...product};
            if(updateProduct.metric === COUNTABLE) {
                updateProduct.amount = amountProduct + productFromFirebase.amount;
                dispatch('updateProductFirebase', {product: updateProduct, firebaseKey: productFromFirebase.firebaseKey});
                commit('updateProductInListFromFirebase', updateProduct);
                commit('updateProduct', updateProduct);
            }
        },
        updateProductFirebase({getters}, { product, firebaseKey }) {
            const refPath = `${getters.getURLRefProduct(firebaseKey)}/`;
            const productListRef = ref(db, refPath);
            update(productListRef, {
                product: product,
            });
        },
        deleteProduct({dispatch, getters, commit}, id) {
            const productFromFirebase = getters.getProductFromFirebaseById(id);
            dispatch('deleteProductFromListInFirebase', {firebaseKey :productFromFirebase.firebaseKey });
            commit('deleteProductInListFromFirebase', id);
            commit('deleteProduct', id);
        },
        deleteProductFromListInFirebase({ getters }, { firebaseKey}) {
            const refPath = `${getters.getURLRefProduct(firebaseKey)}/`;
            const productListRef = ref(db, refPath);
            remove(productListRef);
        },
        async getAllProductListFromFirebase({commit, dispatch, getters}) {
            try {
                const snapshot = await get(child(dbRef, getters.getURLRefProductsList))
                if(snapshot.exists()) {
                    const productsFromSnapshot = snapshot.val();
                    const product = returnFormattedProductListFromFirebase(productsFromSnapshot);
                    commit('setProductListFromFirebase', product);
                    dispatch('requestAllProducts');
                }
            }
            catch (e) {
                console.log(e)
            }
        },

        async requestProduct({getters, commit}, id) {
            try {
                const url = generateUrl(`food/ingredients/${id}/information`);
                const result = await api.get(url);
                const product = result.data;
                const productFromFirebase = getters.getProductFromFirebaseById(product.id);

                product.amount = productFromFirebase.amount;

                commit('addProductList', product);

            } catch (e) {
                console.log(e)
            }
        },
        async requestAllProducts({state, dispatch}) {
            try {
                state.productListFromFirebase.forEach((el) => {
                    dispatch('requestProduct', el.id);
                });

            } catch (e) {
                console.log(e);
            }
        },
    },
    getters: {
        getProductFromFirebaseById: (state) => (id) => {
            return state.productListFromFirebase.find(el => el.id === id);
        },
        getProductList(state) {
            return state.productList || [];
        },
        getURLRefProductsList(state, getters, rootState, rootGetters) {
            const uId = rootGetters['getUId'];
            return `user/${uId}/productsList`;
        },
        getURLRefProduct: (state, getters, rootState, rootGetters) => (key) => {
            const uId = rootGetters['getUId'];
            return `user/${uId}/productsList/${key}`;
        }
    }
}

import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref, set } from 'firebase/database';

import { database, auth } from "../firebase/firebase";
export default {
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = {...user};
        },
        setAuthInfo(state, authInfo) {
            state.authInfo = {...authInfo};
        },
        setPathUserAvatar(state, path) {
            state.pathUserAvatar = path;
        }
    },
    actions: {
        async login(_, {email, password}) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                console.log(e);
                throw e
            }
        },
        async register({getters}, {email, password, name}) {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                await set(ref(database, `/user/${getters.getUId}/info` ), { name });

            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        async logout({commit}) {
            console.log('logout');
            try {
                await signOut(auth);
                commit('setUser', {});
                commit('setAuthInfo', {});
            } catch (e) {
                console.log(e);
                throw e;
            }
        },
        async uploadImgToServer({getters, commit}, {file, pathServer}) {
            if(file && pathServer) {
                try {
                    const storage = getStorage();
                    const path = `images/${pathServer}/${getters.getUId}/${file.name}`;
                    const imgRef = refStorage(storage, path);
                    await uploadBytes(imgRef, file);
                    commit('setPathUserAvatar', path);
                } catch (e) {
                    console.log(e);
                    throw e;
                }
            }
        },
        async updateUserAvatar({ state , dispatch, commit}, { file, pathServer = "profil"}) {
            try {
                if(file && pathServer.length) {
                    await dispatch('uploadImgToServer', {file, pathServer});
                    if(state.pathUserAvatar && state.pathUserAvatar?.length) {
                        const storage = getStorage();
                        const imgRef = refStorage(storage, state.pathUserAvatar);
                        const imgPath = await getDownloadURL(imgRef);
                        commit('setPathUserAvatar', imgPath);
        
                        await updateProfile(auth.currentUser, {
                            photoURL: state.pathUserAvatar
                        });
                        commit('setUser', auth.currentUser);
                    }
                }
            }
            catch(e) {
                console.log(e);
            }
        },
        async updateUserName({ commit }, {userName}) {
            try {
                if(userName) { 
                    await updateProfile(auth.currentUser, {
                        displayName: userName,
                    });
                    commit('setUser', auth.currentUser);
                }
            }
            catch(e) {
               console.log(e);
            }
        },
        setAuthInfo({commit, dispatch}, authInfo) {
            if(authInfo) {
                commit('setAuthInfo', authInfo);
                dispatch('setUser', authInfo.auth.currentUser);
            }
        },
        setUser({commit}, user) {
            if(user && user.uid) {
                commit('setUser', user);
            }
        },

    },
    getters: {
        getUId() {
            const user = auth.currentUser;
            return user ? user.uid : null;
        },
        getUser(state) {
            return state.user ? state.user : null ;
        },
        getUserName(state) {
            return  state.user?.displayName ? state.user.displayName : 'Anonim';
        },
        getUserAvatarPhotoURL(state) {
            return state.user.photoURL;
        },
        getIsUserAuth(state) {
            return !!state.user;
        }
    }
}
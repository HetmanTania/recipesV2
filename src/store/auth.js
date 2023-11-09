import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, set } from 'firebase/database';
import { getStorage, ref as refStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import { database, auth } from "../firebase/firebase";
// import { getImageFormats } from "../utils/utils";
export default {
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            console.log(' state.user = user',user );
            state.user = {...user};
        },
        setAuthInfo(state, authInfo) {
            console.log('authInfo', authInfo);
            state.authInfo = {...authInfo}
        },
        setPathUserAvatar(state, path) {
            state.pathUserAvatar = path;
            console.log('setPathUserAvatar', state.pathUserAvatar);
        }
    },
    actions: {
        async login(_, {email, password}) {
            console.log('login');
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (e) {
                console.log(e);
                throw e
            }
        },
        async register({dispatch}, {email, password, name}) {
            console.log('register');
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(user);
                const uid = await dispatch('getUId');
                const result = await set(ref(database, `/user/${uid}/info` ), {
                    name
                });
                console.log(result);

            } catch (e) {
                console.log(e);
                throw e
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
                throw e
            }
        },
        async uploadImgToServer({getters, commit}, {file, pathServer}) {
            if(file && pathServer) {
                try {
                    const storage = getStorage();
                    const path = `images/${pathServer}/${getters.getUId}/${file.name}`;
                    console.log(file.name);
                    const imgRef = refStorage(storage, path);
                    const result = await uploadBytes(imgRef, file);
                    console.log('uploadImgToServer', result);
                    commit('setPathUserAvatar', path);
                } catch (e) {
                    console.log(e);
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
                    console.log('auth', auth);
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
                    console.log('updateUserAvatar', auth);
                    await updateProfile(auth.currentUser, {
                        displayName: userName,
                    });
                    console.log('updateUserAvatar', auth);
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
                commit('setUser', user)
            }
        },

    },
    getters: {
        getUId() {
            console.log('getUId');
            const user = auth.currentUser;
            console.log(user);
            return user ? user.uid : null;
        },
        getUser(state) {
            return state.user ? state.user : null ;
        },
        getUserName(state) {
            console.log('getUserName(state)', state?.user.displayName);
            return  state.user?.displayName ? state.user.displayName : 'Anonim';
        },
        getUserAvatarPhotoURL(state) {
            console.log('getUserAvatarPhotoURL', state);
            return state.user.photoURL;
        },
        getIsUserAuth(state) {
            return !!state.user
        }
    }
}
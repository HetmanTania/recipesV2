<template>
    <header class="header">
        <div class="header_wrapper">
            <router-link to="/" class="logo svg">
                <img src="../../assets/svg/logo.svg" width="44" alt="logo"/>
            </router-link>
            <nav class="nav">
                <ul class="nav_list">
                    <li class="nav_list-item"><router-link to="/categories">Categories</router-link></li>
                    <li class="nav_list-item"><router-link to="/search">Search</router-link></li>
                    <li class="nav_list-item"><router-link to="/shoppingList">Shopping list</router-link></li>
                </ul>
            </nav>
            <UserProfile></UserProfile>
            <HeaderMenu></HeaderMenu>
        </div>
    </header>
</template>

<script>


import UserProfile from '../UserProfile/UserProfile.vue';
import HeaderMenu from '../HeaderMemu/HeaderMemu.vue';

export default {
    components: { UserProfile, HeaderMenu }
}
</script>

<style lang="scss">
@import '../../style/var.scss';
@import '../../style/mixin.scss';
@import './theHeader.scss';</style>
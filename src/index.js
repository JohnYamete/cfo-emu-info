import '@babel/polyfill';
import Vue from 'vue';
import {mapState} from 'vuex';

import './css/main.css';
import store from './js/store';
import Router from './js/router'

// components
import GachaLinks from './components/gacha_links';
Vue.component('gacha-links', GachaLinks);
import Navbar from './components/navbar';

store.dispatch('loadDB')
    .then(() => store.state.db)
    .then(() => {
        new Vue({
            el: '#app',
            store,
            router: new Router(),
            components: {
                Navbar,
            },
            computed: {
                ...mapState([
                    'isInitialized',
                ])
            },
        });

    })
    .catch(err => console.error(err));

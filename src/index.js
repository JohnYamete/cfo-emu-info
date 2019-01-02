import '@babel/polyfill';
import Vue from 'vue';
import {mapState} from 'vuex';

import './css/main.css';
import store from './js/store';
import Router from './js/router'

import {fixAllLinkUrls} from './js/util';
fixAllLinkUrls();

// components
import GachaLinks from './components/gacha_links';
Vue.component('gacha-links', GachaLinks);
import Navbar from './components/navbar';

let router;

store.dispatch('loadDB')
    .then(() => store.state.db)
    .then(() => {
        router = new Router();
        return router.gasRouterSync();
    })
    .then(() => {
        new Vue({
            el: '#app',
            store,
            router: router,
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

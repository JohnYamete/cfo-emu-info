import Vue from 'vue';
import VueRouter from 'vue-router'
import MechaPage from '../components/mecha_page';
import MechasPage from '../components/mechas_page';
import GachasPage from '../components/gachas_page';

Vue.use(VueRouter);

export default class Router extends VueRouter {
    constructor() {
        super({
            routes: Router.routeParams,
            scrollBehavior: Router.scrollBehavior,
        });
    }

    static get routeParams() {
        return [
            {
                path: '/mecha',
                name: 'mecha' ,
                component: MechaPage,
            },
            {
                path: '/mechas',
                name: 'mechas',
                component: MechasPage
            },
            {
                path: '/gachas',
                name: 'gachas',
                component: GachasPage
            },
            {
                path: '/',
                redirect: {
                    name: 'mechas'
                }
            },
        ]
    }

    static scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            if (to.query && to.query.anchor) {
                return {
                    selector: '#' + to.query.anchor,
                    offset: {y: 60},
                };
            } else {
                return { x: 0, y: 0 };
            }
        }
    }

    async gasRouterSync() {
        return new Promise(resolve => {
            this.afterEach((to, from) => {
                window.google.script.history.replace(null, to.query, to.path);
            });

            window.google.script.url.getLocation(location => {
                const path = location.hash;
                const query = location.parameter;
                this.replace({ path, query });
                resolve();
            });
        });
    }
}

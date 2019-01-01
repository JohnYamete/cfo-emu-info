import Vue from 'vue';
import Vuex from 'vuex';
import {runGAS} from './util';

const dbTableNames = ['mechas', 'gachas', 'missions', 'designs'];

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        db: dbTableNames.reduce((y, x) => {
            y[x] = {};
            return y;
        }, {}),
        isInitialized: false,
        nameToMecha: {}
    },
    mutations: {
        setDBData (state, {tableName, contents}) {
            state.db[tableName] = contents;
        },
        setupNameToMecha (state) {
            const {
                db: {mechas: allMechas, designs: allDesigns, gachas: allGachas, missions: allMissions},
                nameToMecha
            } = state;

            allMechas.forEach(mecha => {
                const gachas = allGachas.filter(x => x.mecha_name === mecha.name);
                const missions = allMissions.filter(x => x.reward === mecha.name);
                const designs = allDesigns.filter(x => x.design_mecha_name === mecha.name);

                nameToMecha[mecha.name] = {
                    ...mecha,
                    children: [],
                    parents: [],
                    gachas,
                    missions,
                    designs,
                    rankText: mecha.rank,
                    gachaNums: gachas.map(x => x.gacha_number),
                    gachasText: gachas.map(x => x.gacha_number).join(', ') || '-',
                    designPriceText: designs.length ? designs[0].design_price + 'G' : '-',
                    priceText: mecha.price ? mecha.price + 'G' : '-',
                    missionsText: missions.length ?
                        missions.map(({reward, reward_type, name}) => `${name} (${reward_type})`).join(', ') : '-',
                    canGetFree: gachas.length || designs.length || mecha.price || missions.length,
                };
            });

            allDesigns.forEach(({design_mecha_name: _parent, material_mecha_name: _child}) => {
                const parent = nameToMecha[_parent];
                const child = nameToMecha[_child];
                parent.children.push(child);
                child.parents.push(parent);
            });
        },
        setEndInitialized (state) {
            state.isInitialized = true;
        },
    },
    actions: {
        async loadDB ({commit}) {
            const res = await runGAS('getAll', dbTableNames);
            Object.entries(res).forEach(([tableName, contents]) => {
                commit('setDBData', {tableName, contents});
            });
            commit('setupNameToMecha');
            commit('setEndInitialized');
        }
    }
});

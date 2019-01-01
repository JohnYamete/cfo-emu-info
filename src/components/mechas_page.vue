<template>
    <div class="mechas-page">
        <section>
            <div class="field">
                <label class="checkbox">
                    <input type="checkbox" v-model="onlyCanGetFree">
                    無料で入手可能なもののみを表示する
                </label>
            </div>
            <a class="is-success" @click="expandAll">すべて開く</a>
            <a class="is-primary" @click="collapseAll">すべて閉じる</a>
        </section>
        <section class="section" v-for="rank in ranks">
            <div>
                <h2 class="title">
                    ランク {{ rank.rank }}
                    <a class="button is-small is-primary expand-button" v-if="!isExpandedRanks[rank.rank]" @click="expand(rank.rank)">
                        <span class="icon is-small">
                            <i class="fas fa-plus"></i>
                        </span>
                    </a>
                    <a class="button is-small is-success collapse-button" v-if="isExpandedRanks[rank.rank]" @click="collapse(rank.rank)">
                        <span class="icon is-small">
                            <i class="fas fa-minus"></i>
                        </span>
                    </a>
                </h2>
            </div>

            <div class="table-block" v-if="isExpandedRanks[rank.rank]">
                <table class="table mechas-table">
                    <thead>
                    <tr>
                        <th>機体名</th>
                        <th>ランク</th>
                        <th>ガチャ</th>
                        <th>設計図</th>
                        <th>購入</th>
                        <th>任務</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="mecha in rank.mechas">
                        <td>
                            <router-link :to="{name: 'mecha', query: {name: mecha.name}}">{{ mecha.name }}</router-link>
                        </td>
                        <td>{{ mecha.rankText }}</td>
                        <td><gacha-links :nums="mecha.gachaNums"></gacha-links></td>
                        <td>{{ mecha.designPriceText }}</td>
                        <td>{{ mecha.priceText }}</td>
                        <td>{{ mecha.missionsText }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>

<script>
    import {RANKS} from '../js/defines';

    export default {
        components: {
        },
        data() {
            return {
                onlyCanGetFree: true,
                isExpandedRanks: (() => {
                    const isExpandRanks = {};
                    RANKS.forEach(rank => { isExpandRanks[rank] = false; });
                    return isExpandRanks;
                })(),
            }
        },
        computed: {
            ranks() {
                let allMechas = Object.values(this.$store.state.nameToMecha);
                if (this.onlyCanGetFree) {
                    allMechas = allMechas.filter(x => x.canGetFree);
                }
                return RANKS.map(rank => {
                    return {
                        rank,
                        mechas: allMechas.filter(mecha => mecha.rank === rank)
                    }
                }).filter(x => x.mechas.length)
            },
        },
        methods: {
            expand(rank) {
                this.isExpandedRanks[rank] = true;
            },
            collapse(rank) {
                this.isExpandedRanks[rank] = false;
            },
            expandAll() {
                RANKS.forEach(rank => { this.isExpandedRanks[rank] = true; });
            },
            collapseAll() {
                RANKS.forEach(rank => { this.isExpandedRanks[rank] = false; });
            }
        }
    }
</script>

<style>  /* not scoped */
    .mechas-page {
        margin-top: 10px;
    }

    .expand-button, .collapse-button {
        margin-top: 7px;
    }

    .mechas-table {
        width: 100%;
    }
</style>
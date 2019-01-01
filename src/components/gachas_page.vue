<template>
    <div class="mechas-page">
        <section class="section" v-for="gacha in gachas">
            <div>
                <h2 class="title" :id="`gacha${gacha.number}`">
                    {{ gacha.number }}号機
                </h2>
            </div>

            <div class="table-block">
                <table class="table gacha-table">
                    <thead>
                    <tr>
                        <th>機体名</th>
                        <th>ランク</th>
                        <th>設計図</th>
                        <th>購入</th>
                        <th>任務</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="mecha in gacha.mechas">
                        <td>
                            <router-link :to="{name: 'mecha', query: {name: mecha.name}}">{{ mecha.name }}</router-link>
                        </td>
                        <td>{{ mecha.rankText }}</td>
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
    export default {
        computed: {
            gachas() {
                let {db: {gachas: allGachas}, nameToMecha} = this.$store.state;
                const res = {};
                allGachas.forEach(({gacha_number: number, mecha_name}) => {
                    const mecha = nameToMecha[mecha_name];
                    if (!res[number]) {
                        res[number] = {
                            number: number,
                            mechas: []
                        }
                    }
                    res[number].mechas.push(mecha);
                });
                return Object.values(res);
            },
        },
    }
</script>

<style>  /* not scoped */
    .mechas-page {
        margin-top: 10px;
    }

    .gacha-table {
        width: 100%;
    }
</style>
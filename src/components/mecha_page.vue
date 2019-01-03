<template>
    <div class="mecha-page">
        <section class="section" v-if="mecha">
            <div class="current-mecha-name">
                <h1 class="title">
                    <a :href="`https://wikiwiki.jp/sdgundamcfo/${mecha.name}`" target="_blank">{{ mecha.name }}</a>
                </h1>
            </div>

            <mecha-summary :mecha="mecha"></mecha-summary>
        </section>

        <section class="section" v-if="mecha">
            <div>
                <h2 class="title">設計図</h2>
                <p>価格: {{ mecha.designs.length ? `${mecha.designs[0].design_price}G` : '-' }}</p>
            </div>

            <children-table :mecha="mecha" @select="selectMecha"></children-table>
        </section>

        <section class="section" v-if="mecha">
            <div>
                <h2 class="title">素材になる機体</h2>
            </div>

            <parents-table :mecha="mecha" @select="selectMecha"></parents-table>
        </section>

        <section class="section" v-if="mecha">
            <design-network :root-mecha="mecha"></design-network>
        </section>

        <section class="section" v-if="!mecha">
            <div class="notification is-danger">
                機体が見つかりませんでした。
            </div>
        </section>
    </div>
</template>

<script>
    import DesignNetwork from './design_network';
    import ParentsTable from './parents_table';
    import ChildrenTable from './children_table';
    import MechaSummary from './mecha_summary';

    export default {
        components: {
            DesignNetwork,
            ParentsTable,
            ChildrenTable,
            MechaSummary
        },
        data() {
            return {
                mecha: null
            }
        },
        methods: {
            selectMecha(mechaName) {
                this.setMecha(mechaName);
                this.$router.push({path: '/mecha', query: {name: mechaName}});
            },
            setMecha(mechaName) {
                this.mecha = mechaName ? this.$store.state.nameToMecha[mechaName] : null;
            }
        },
        mounted() {
            this.setMecha(this.$route.query.name);
        },
        beforeRouteUpdate(to, from, next) {
            this.setMecha(to.query.name);
            next();
        }
    }
</script>

<style scoped>
    .mecha-page {
        max-width: 1024px;
        margin: 0 auto;
    }
</style>
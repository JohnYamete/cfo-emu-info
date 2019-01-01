<template>
    <div>
        <div>
            <h2 class="title">設計図ネットワーク</h2>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">深さ</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <input class="input search network-depth" type="number" placeholder="Depth"
                               v-model="maxDepth" min="1" step="1">
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">表示機体</label>
            </div>

            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" v-model="showB">
                            B
                        </label>
                        <label class="checkbox">
                            <input type="checkbox" v-model="showC">
                            C
                        </label>
                    </div>
                </div>
            </div>
        </div>

        <div id="design-network" ref="designNetwork"></div>
    </div>
</template>

<script>
    import DesignNetwork from '../js/design_network';

    export default {
        props: ['rootMecha'],
        data() {
            return {
                maxDepth: 3,
                showC: false,
                showB: true,
                network: new DesignNetwork(this.$store.state.nameToMecha)
            }
        },
        watch: {
            maxDepth() {
                this.redrawNetwork();
            },
            showC() {
                this.redrawNetwork();
            },
            showB() {
                this.redrawNetwork();
            },
            rootMecha() {
                this.redrawNetwork();
            }
        },
        methods: {
            redrawNetwork() {
                if (!this.rootMecha) return;
                this.network.reset();
                this.reconfigureNetwork();
                this.network.draw(this.rootMecha.name);
            },
            reconfigureNetwork() {
                const {maxDepth, showC, showB} = this;
                this.network.configure({maxDepth, showC, showB});
            },
        },
        mounted() {
            this.network.setContainer(this.$refs.designNetwork);
            this.redrawNetwork();
        },
    }
</script>

<style scoped>
    #design-network {
        width: 600px;
        height: 600px;
        border: 1px solid lightgray;
        margin: 0 auto;
    }

    .network-depth {
        max-width: 100px;
    }
</style>
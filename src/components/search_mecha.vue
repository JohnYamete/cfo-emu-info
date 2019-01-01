<template>
    <div class="field">
        <div class="control has-icons-right">
            <input class="input search" type="text" placeholder="機体検索" autocomplete="off"
                   :class="{ 'is-danger': isSearchError }"
                   ref="search" v-model="searchMechaText">
            <div class="suggest" style="display:none;" ref="suggest"></div>
            <span class="icon is-small is-right">
                <i class="fas fa-search"></i>
            </span>
        </div>
    </div>
</template>

<script>
    import Suggest from '../vendor/suggest';

    export default {
        data() {
            return {
                searchMechaText: '',
                mecha: null
            }
        },
        computed: {
            isSearchError () {
                return this.searchMechaText.length && !this.mecha;
            }
        },
        watch: {
            searchMechaText(val) {
                if (val !== val.trim()) {
                    this.searchMechaText = val.trim();
                    return;
                }
                this.mecha = this.$store.state.nameToMecha[val] || null;
                if (this.mecha) {
                    this.$router.push({path: '/mecha', query: {name: this.mecha.name}});
                }
            },
        },
        mounted() {
            const names = this.$store.state.db.mechas.map(x => x.name);

            new Suggest.Local(this.$refs.search, this.$refs.suggest, names, {
                dispMax: 0,
                highlight: true,
                onSelect: text => {
                    this.searchMechaText = text;
                }
            });
        }
    }
</script>

<style> /* not scoped */
    .suggest {
        position: absolute;
        background-color: #FFFFFF;
        border: 1px solid #CCCCFF;
        font-size: 90%;
        width: 400px;
        max-height: 300px;
        overflow: auto;
    }

    .suggest div {
        display: block;
        color: #363636;
    }

    .suggest div.select{
        color: #FFFFFF;
        background-color: #3366FF;
    }

    .suggest div.over{
        background-color: #99CCFF;
    }
</style>
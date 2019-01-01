<template>
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar-menu" class="navbar-menu">
            <div class="navbar-center" @click="clickLinkWrap">
                <router-link to="/mechas" class="navbar-item">機体</router-link>
            </div>
            <div class="navbar-center" @click="clickLinkWrap">
                <router-link to="/gachas" class="navbar-item">ガチャ</router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <search-mecha></search-mecha>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import SearchMecha from './search_mecha';

    export default {
        components: {
            SearchMecha,
        },
        methods: {
            clickLinkWrap(e) {
                if (e.target.nodeName === 'DIV') {
                    e.target.getElementsByTagName('a')[0].click();
                }
            }
        }
    }
</script>

<style scoped>
    .navbar-center {
        flex-grow: 1;
        justify-content: center;
        align-items: stretch;
        display: flex;
    }
    .navbar-item {
        color: #fff
    }
    .navbar-center:hover, .navbar-center.is-active {
        background-color: #00b89c;
        cursor: pointer;
    }
    .navbar-center:hover > .navbar-item, .navbar-center.is-active > .navbar-item {
        color: #fff;
        background-color: #00b89c;
        cursor: pointer;
    }
</style>
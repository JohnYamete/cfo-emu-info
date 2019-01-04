<template>
    <nav class="navbar is-fixed-top is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false"
               @click="toggleActive"
               :class="{'is-active': isActive}">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div class="navbar-menu" :class="{'is-active': isActive}">
            <router-link to="/mechas" class="navbar-center">
                <span class="navbar-item">機体</span>
            </router-link>

            <router-link to="/gachas" class="navbar-center">
                <span class="navbar-item">ガチャ</span>
            </router-link>

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
        data() {
            return {
                isActive: false
            }
        },
        methods: {
            toggleActive() {
                this.isActive = !this.isActive;
                console.log(this.isActive);
            },
        },
    }
</script>

<style scoped>
    .navbar-center {
        flex-grow: 1;
        justify-content: center;
        align-items: stretch;
        display: flex;
    }

    .navbar-center:hover,
    .navbar-center:hover > .navbar-item {
        background-color: #fafafa;
        color: #3273dc;
    }

    @media screen and (min-width: 1088px) {
        .navbar.is-primary .navbar-center > .navbar-item {
            color: #fff;
        }
        .navbar.is-primary .navbar-center:hover,
        .navbar.is-primary .navbar-center:hover > .navbar-item
        {
            background-color: #00b89c;
            color: #fff;
        }
    }

</style>
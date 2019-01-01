<template>
    <div class="table-block">
        <table class="table">
            <thead>
            <tr>
                <th>機体名</th>
                <th>ガチャ</th>
                <th>設計図</th>
                <th>購入</th>
                <th>任務</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="parent in parents">
                <td><a @click="select(parent.name)">{{ parent.name }}</a></td>
                <td><gacha-links :nums="parent.gachaNums"></gacha-links></td>
                <td>{{ parent.designPriceText }}</td>
                <td>{{ parent.priceText }}</td>
                <td>{{ parent.missionsText }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['mecha'],
        computed: {
            parents() {
                const root = this.$store.state.nameToMecha[this.mecha.name];
                return root.parents.map(parent => this.$store.state.nameToMecha[parent.name]);
            }
        },
        methods: {
            select(mechaName) {
                this.$emit('select', mechaName);
            }
        }
    }
</script>

<template>
    <div class="table-block">
        <table class="table">
            <thead>
            <tr>
                <th>機体名</th>
                <th>等級</th>
                <th>ランク</th>
                <th>ガチャ</th>
                <th>設計図</th>
                <th>購入</th>
                <th>任務</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="child in children">
                <td><a @click="select(child.name)">{{ child.name }}</a></td>
                <td>{{ child.levelText }}</td>
                <td>{{ child.rankText }}</td>
                <td><gacha-links :nums="child.gachaNums"></gacha-links></td>
                <td>{{ child.designPriceText }}</td>
                <td>{{ child.priceText }}</td>
                <td>{{ child.missionsText }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props: ['mecha'],
        computed: {
            children() {
                const root = this.$store.state.nameToMecha[this.mecha.name];
                const {designs: allDesigns} = this.$store.state.db;
                const materials = allDesigns.filter(x => x.design_mecha_name === root.name);

                return root.children.map(child => {
                    const material = materials.find(x => x.material_mecha_name === child.name);
                    return {
                        ...child,
                        levelText: material.material_level,
                    };
                });
            }
        },
        methods: {
            select(mechaName) {
                this.$emit('select', mechaName);
            }
        }
    }
</script>

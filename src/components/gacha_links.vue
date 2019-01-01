<template>
    <span>
        <span v-for="(num, idx) in nums" v-if="nums.length">
            <router-link :to="{ name: 'gachas', query: {anchor: `gacha${num}` }}">{{ num }}</router-link>
            <span v-if="idx < nums.length - 1">, </span>
        </span>
        <span v-if="!nums.length">
            -
        </span>
    </span>
</template>

<script>
    export default {
        props: ['nums']
    }
</script>
<template>
    <nav class="level searched-outline">
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">ランク</p>
                <p class="title">{{ mecha.rankText }}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">搭載ガチャ</p>
                <p class="title"><gacha-links :nums="mecha.gachaNums"></gacha-links></p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">設計図</p>
                <p class="title">{{ mecha.designPriceText }}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">機体販売</p>
                <p class="title">{{ mecha.priceText }}</p>
            </div>
        </div>
        <div class="level-item has-text-centered">
            <div>
                <p class="heading">任務</p>
                <p class="title">{{ mecha.missionsText }}</p>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        props: ['mecha'],
    }
</script>


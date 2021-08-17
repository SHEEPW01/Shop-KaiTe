<template>
    <Swiper class="banner">
        <swiper-item v-for="item in swiperBanner">
            <a :href="item">
                <img :src="item">
            </a>
        </swiper-item>
    </Swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper/index';
    export default {
        name: "DetailSwiper",
        components: {
            Swiper,
            SwiperItem,
        },
        props: {
            swiperBanner: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
    .banner {
        height: 300px;
        overflow: hidden;
    }
</style>
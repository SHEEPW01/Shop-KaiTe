<template>
    <swiper>
        <swiper-item v-for="item in banners">
            <a :href="item.link">
                <img :src="item.image" alt="" @load="ImgLoad">
            </a>
        </swiper-item>
    </swiper>
</template>

<script>
    import {Swiper, SwiperItem} from 'components/common/swiper/index';
    export default {
        name: "HomeSwiper",
        props: {
          banners: {
              type: Array,
              default() {
                  return []
              }
          },
        },
        data() {
            return {
                IsLoad: false
            }
        },
        components: {
            Swiper,
            SwiperItem,
        },
        methods: {
            ImgLoad() {
                if(!this.IsLoad){
                    this.$emit('swiperImgLoad')
                    this.IsLoad = true
                }
            }
        }
    }
</script>

<style scoped>

</style>
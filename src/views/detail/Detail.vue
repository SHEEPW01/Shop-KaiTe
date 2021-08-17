<template>
    <div id="detail">
        <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNavBar"></detail-nav-bar>
        <Scroll class="content" ref="scroll" :pullUpLoad1="true" :property1="2" @GetPosition="GetPosition">
            <DetailSwiper :swiperBanner="DetailBanner"></DetailSwiper>
            <DetailBaseInfo :goods="goods"></DetailBaseInfo>
            <DetailShopInfo :shop="shop"></DetailShopInfo>
            <DetailGoodsInfo :detailInfo="detailInfo" @imgLoad="goodsImgLoad"></DetailGoodsInfo>
            <DetailParamInfo :paramInfo="paramInfo" ref="param"></DetailParamInfo>
            <DetailCommentInfo :commentInfo="commentInfo" ref="comment"></DetailCommentInfo>
            <GoodsList :goods="recommendInfo" ref="recommend"></GoodsList>
        </Scroll>
        <BackTop @click.native="BackTopClick"></BackTop>
        <DetailBottomBar @addCart="addCart"></DetailBottomBar>
        <Toast :message="message" :IsShowToast="IsShowToast"></Toast>
    </div>
</template>

<script>
    import DetailNavBar from "./childComps/DetailNavBar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import GoodsList from "../../components/content/goods/GoodsList";
    import BackTop from "../../components/content/backTop/BackTop";

    import Scroll from "../../components/common/scroll/Scroll";
    import Toast from "../../components/common/Toast";

    import {getDetail, Goods, Shop, Param, getRecommend} from "network/detail";

    import {imgRefrashMixin} from "../../common/mixins";


    export default {
        name: "Detail",
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            GoodsList,
            BackTop,
            Scroll,
            Toast,
            DetailShopInfo,
        },
        data() {
          return{
            iid: null,
            mixins: [imgRefrashMixin],
            DetailBanner: [],
              goods: {},
              shop: {},
              detailInfo: {},
              paramInfo: {},
              commentInfo: [],
              recommendInfo: [],
              themeTopY: [],
              getThemeTopy: null,
              currentIndex: 0,
              IsShowToast: false,
              message: '',
          }
        },
        created() {
            //保存传入的id
            this.iid = this.$route.params.iid

            //根据iid请求详情数据
            getDetail(this.iid).then(res => {
                const data = res.data.result;
                console.log(data);
                //1.获取顶部banner
                this.DetailBanner = data.itemInfo.topImages;
                //2.获取商品详情
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)
                //3.获取商家详情
                this.shop = new Shop(data.shopInfo)
                //4.获取商家详情图片
                this.detailInfo = data.detailInfo
                //5.获取参数信息
                this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule)
                //6.获取评论信息
                if(data.rate.cRate !== 0){
                    this.commentInfo = data.rate.list
                }
            })

            //请求推荐数据
            getRecommend().then(res => {
                this.recommendInfo = res.data.data.list
            })

            this.getThemeTopy = this.debounce(() => {
                this.themeTopY = []
                this.themeTopY.push(0)
                this.themeTopY.push(this.$refs.param.$el.offsetTop)
                this.themeTopY.push(this.$refs.comment.$el.offsetTop)
                this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
            }, 400)

        },
        methods: {
            goodsImgLoad() {
                this.$refs.scroll.refresh1();
                this.getThemeTopy();
            },

            debounce(func, delay) {
                let timer = null;
                return function (...args) {
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, args)
                    }, delay)
                }
            },

            titleClick(index) {
                this.$refs.scroll.scroll.scrollTo(0, -this.themeTopY[index], 500);
            },

            GetPosition(position) {
                const positionY = -position.y
                if(positionY >= 0 && positionY < this.themeTopY[1]) {
                    this.currentIndex = 0
                }
                else if(positionY >= this.themeTopY[1] && positionY < this.themeTopY[2]) {
                    this.currentIndex = 1
                }
                else if(positionY >= this.themeTopY[2] && positionY < this.themeTopY[3]) {
                    this.currentIndex = 2
2                }
                else {
                    this.currentIndex = 3
                }
                this.$refs.detailNavBar.currentIndex = this.currentIndex
            },

            BackTopClick() {
                this.$refs.scroll.ScrolltopClick(0, 0)
            },

            addCart() {
                const product = {}
                product.image = this.DetailBanner [0];
                product.title = this.goods.title;
                product.desc = this.goods.discountDesc;
                product.price = this.goods.lowNowPrice;
                product.iid = this.iid;

                this.$store.dispatch('addCart', product).then(res => {
                    this.message = res
                    this.IsShowToast = true
                    console.log(this.message)

                    setTimeout(() => {
                        this.message = ''
                        this.IsShowToast = false
                    }, 2000)
                })
            }
        }
    }
</script>

<style scoped>
    #detail {
        position: relative;
        z-index: 9;
        background-color: #fff;
        height: 100vh;
    }

    .detail-nav{
        position: fixed;
        z-index: 9;
        background-color: #fff;
        top: 0;
        left: 0;
        right: 0;
    }

    .content {
        /*height: calc(100% - 44px);*/
        position: absolute;
        top: 44px;
        bottom: 49px;
        left: 0;
        right: 0;
    }
</style>
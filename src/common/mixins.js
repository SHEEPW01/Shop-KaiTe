
export const imgRefrashMixin = {
	mounted() {
		const refresh = this.debounce(this.$refs.scroll.refresh1, 50)
		this.$bus.$on('ItemImgLoad', () => {
			// this.$refs.scroll.refresh1();
			refresh()
		})
	},

	methods: {
		debounce(func, delay) {
		  let timer = null;
		  return function (...args) {
		      if (timer) clearTimeout(timer);
		      timer = setTimeout(() => {
		          func.apply(this, args)
		      },delay)
		  }
		},
	}
}
export default {
    methods: {
        makeToast(variant = null, text) {
            this.$root.$bvToast.toast(text, {
                // title: 'Message',
                variant: variant,
                solid: true,
                autoHideDelay: 100000,
                appendToast: true
            })
        }
    }
};
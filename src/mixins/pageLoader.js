
export default {
  data () {
    return {
      pageLoader_isDataLoaded: false
    }
  },
  methods: {
    pageLoader_resolveData () {
      this.pageLoader_isDataLoaded = true
    }
  }
}

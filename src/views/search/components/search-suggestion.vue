<template>
<div class="search-suggestion">
  <van-cell icon="search"
  v-for="(item, index) in suggestions " :key="index"
  @click="$emit('search',item)"

    >
      <div slot="title"   v-html="highlight(item)"></div>
    </van-cell>
</div>

</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  props:
  {
    searchText: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      suggestions: [] // 推荐数据
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`

      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, highlightStr)
    }
    /*   search(item){
     // console.log(item);
      this.$emit('search',item)
    } */

  },
  watch: {
    searchText: {
      /*  handler(value){
         //获取推荐搜索

      }, */
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }

  }

}
</script>

<style scoped lang="less">
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>

<template>
<div class="search-connent">
  <form action="/" class="search-heard">
  <van-search
    v-model="searchText"
    show-action
    placeholder="请输入搜索关键词"
    @search="onSearch"
    @cancel="onCancel"
    @focus="isResultShow=false"
    background="#3195f9"

  ></van-search>
</form>
<div class="search-inner">
<!-- 结果 -->
<search-result v-if="isResultShow"
:searchText='searchText'
></search-result>

<!-- 推荐 -->
<search-suggestion
v-else-if="searchText"
 :searchText='searchText'
 @search="onSearch"

></search-suggestion>
<!-- 历史记录 -->
<search-history v-else
:searchHistories='searchHistories'
@search="onSearch"

></search-history>

</div>
</div>

</template>

<script>
import searchHistory from './components/search-history.vue'
import searchResult from './components/search-result.vue'
import searchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },

  data () {
    return {
      isResultShow: false, // 控制搜索结果的展示
      searchText: '', // 搜索内容
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []// 历史搜索数据

    }
  },
  watch: {
    searchHistories (value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }

  },

  methods: {
    onSearch (val) {
      this.isResultShow = true
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      this.searchText = val // 赋值给文本框
    },
    onCancel () {
      this.$router.back()
    }
  }

}
</script>

<style lang="less" scoped>
.search-connent{
  padding-top: 120px;
  .search-heard{
    position: fixed;
    left: 0;right: 0;top: 0;
    width: 100%;
    z-index: 1;

  }

  .van-search__action{
  font-size: 28px;
  color: #fff;
}
}

</style>

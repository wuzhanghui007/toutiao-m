<template>
  <div class="search-result">
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
>
  <van-cell v-for="(item,index) in resultData" :key="index" :title="item.title" />
</van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchText: {
      type: String,
      require: true
    }

  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      resultData: [],
      page: 1, // 数据页码
      per_page: 20, // 数据数量，
      error: false

    }
  },

  methods: {

    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: 1,
          per_page: 20,
          q: this.searchText
        })

        // 模拟加载失败代码
        /*       if (Math.random() > 0.5) {
          JSON.parse('dsnajndjsa')
        } */

        const { results } = data.data
        // console.log(results);
        this.resultData.push(...results)
        this.loading = false

        // 判断是否有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch {
        this.error = true
        this.loading = false
      }
    }
  }

}
</script>

<style >

</style>

<template>
  <div class="article-list">

    <van-pull-refresh
    v-model="isreFreshLoading"
    @refresh="onRefresh"
     :success-text="refreshSuccessText"
     success-duration='1000'>
     <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
   :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
<!--   <van-cell v-for="(article,index) in list" :key="index" :title="article.title" />
-->
    <article-item v-for="(article,index) in list"
    :key="index"
   :article="article"></article-item>

   </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },

  props: {
    channels: {
      type: Object,
      require: true // 是否为必须项
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: '',
      error: false,
      isreFreshLoading: false,
      refreshSuccessText: '刷新成功'
    }
  },
  methods: {
    async  onLoad () {
      // 异步更新数据
      // ajax 请求
      // console.log(this.channels);
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 0
        })
        // console.log(data);
        const result = data.data.results

        // 模拟加载失败
        /* if (Math.random() > 0.5) {
         JSON.parse('dsnajndjsa')
       }
       */
        this.list.push(...result)
        this.loading = false
        if (result.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      // console.log(data.data.results);
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getArticles({
          channel_id: this.channels.id,
          timestamp: Date.now(),
          with_top: 0
        })
        // console.log(data);
        const result = data.data.results

        // 模拟加载失败
        /* if (Math.random() > 0.5) {
         JSON.parse('dsnajndjsa')
       }
       */
        this.list.unshift(...result)
        this.isreFreshLoading = false
        this.refreshSuccessText = `更新了${result.length} 条数据`
        if (result.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.isreFreshLoading = false
        }
      // console.log(data.data.results);
      } catch (error) {
        this.error = true

        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }

}
</script>

<style lang="less" scoped>
.article-list{
  height: 80vh;
  overflow-y:auto
}

</style>

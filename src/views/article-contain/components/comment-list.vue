<template>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error="error"
      error-text="加载失败，请点击重试"
      :immediate-check="false"
    >
      <comment-item v-for="(item,index) in list"
      :key="index"
      :comment="item"

      @reply-click="$emit('reply-click' , $event)"
       />
    </van-list>

</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item'
export default {
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      // 自定义 Prop 数据验证
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },

  data () {
    return {
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的标记
      limit: 10,
      error: false
    }
  },
  created () {
    // console.log(this.list);
    this.loading = true
    this.onLoad()
  },

  methods: {
    async onLoad () {
      this.loading = true
      try {
        const { data } = await getComments({
          type: this.type, //  评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.source.toString(), // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
          limit: this.limit // 获取的评论数据个数
        })

        const { results } = data.data
        // console.log(results);
        this.list.push(...results)
        this.$emit('onload-success', data.data)

        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    }
  }

}
</script>

<style>

</style>

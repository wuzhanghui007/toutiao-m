<template>
   <van-icon
        :color="value? '#ffa500':'#777'"
        :name="value? 'star': 'star-o'"
        :loading="loading"
        @click="onCollect"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  props: {
    value: {
      require: true
    },
    isEntry: {
      required: true

    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false

    }
  },
  methods: {
    async onCollect () {
      if (this.isEntry) {
        this.loading = true
        try {
          if (this.value) {
            // 取消收藏
            await deleteCollect(this.articleId)
          } else {
            // 收藏
            await addCollect(this.articleId)
          }
          this.$emit('input', !this.value)
          this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        } catch (error) {
          this.$toast('操作失败，请重试！')
        }
        this.loading = false
      } else {
        this.$toast('请登录')
      }
    }
  }
}
</script>

<style>

</style>

<template>
  <van-button v-if="value"
            class="follow-btn"
            round
            size="small"
            @click="onFllow"
            :loading="loading"
          >已关注</van-button>

          <van-button v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFllow"
            :loading="loading"
          >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  props: {
    value: {
      // type: [Boolean,String,Number,Object],
      require: true
    },
    isEntry: {
      required: true

    },
    userid: {
      require: true
    }
  },
  data () {
    return {
      loading: false,
      myvalue: ''
    }
  },
  created () {
    // console.log(this.value)
  },
  methods: {
    async onFllow () {
      // console.log(this.isEntry);
      if (this.isEntry) {
        this.loading = true
        try {
          if (this.value) {
            // 已关注
            await deleteFollow(this.userid)
            // console.log(res);
            // this.article.is_followed = false
          } else {
            // 未关注
            await addFollow(this.userid)
          }
          // this.article.is_followed =!this.userId

          this.$emit('input', !this.value)
          this.loading = false
        } catch (error) {
          this.loading = false
          let message = '操作失败请重试'
          if (error.response && error.response.status === 400) {
            message = '不能关注你自己'
          }
          this.$toast(message)
        }
      } else {
        this.$toast('操作失败，请登录')
      }
    }
  }

}
</script>

<style>

</style>

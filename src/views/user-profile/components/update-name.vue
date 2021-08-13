<template>
  <div class="update-naeme">
      <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"

/>

<div class="field-wrap">
<van-field
  v-model="localName"
  rows="2"
  autosize
  type="textarea"
  maxlength="7"
  placeholder="请输入昵称"
  show-word-limit
/>
</div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  props: {
    value: {
      type: String,
      require: true
    }

  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfile({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)

        // 关闭弹层
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }

  }

}
</script>

<style>
.field-wrap{
  padding: 20px;

}

</style>

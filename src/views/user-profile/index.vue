<template>
<div class="user-profile">
  <van-nav-bar
  class="page-nav-bar"
  title="个人信息"
  left-arrow
  @click-left="$router.back()"
/>
 <input type="file"
   hidden
    ref= "file"
    @change="onFileChange"

    />

<van-cell-group>
  <van-cell
  title="头像"
  is-link
  center
  @click="$refs.file.click()"
  >
      <van-image
     class="avatar"
      fit="cover"
      round
      :src="user.photo"

    />

  </van-cell>
  <van-cell title="昵称" :value="user.name" is-link  @click="isUpdateNameShow=true"/>
  <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link @click="isUpdateGenderShow=true"  />
  <van-cell title="生日" :value="user.birthday" is-link @click="isUpdateBirthdayShow=true" />
</van-cell-group>

<!-- 编辑图片 -->
  <van-popup

      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height: 100%;"

    >
    <update-photo
    v-if="isUpdatePhotoShow"
    :img="img"
     @close="isUpdatePhotoShow=false"
     @update-photo="user.photo = $event"

     ></update-photo>

    </van-popup>

<!-- 昵称编辑弹出层 -->
<van-popup
v-if="isUpdateNameShow"
v-model="isUpdateNameShow"  position="bottom" :style="{ height: '100%' }">
  <update-name
   @close="isUpdateNameShow=false"
   v-model="user.name"

   ></update-name>
  </van-popup>
    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->

    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      />
    </van-popup>

</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name'
import UpdateGender from './components/update-gender'
import UpdateBirthday from './components/update-birthday'
import UpdatePhoto from './components/update-photo'

export default {
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 个人信息
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null

    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 根据文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      this.isUpdatePhotoShow = true
      this.$refs.file.value = ''
    }

  }

}
</script>

<style lang="less" scoped>
.page-nav-bar{
  background-color: #2992ff;
  /deep/.van-nav-bar{
  color: #fff

}
}
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup{
    background-color: #f5f7f9;
  }

</style>>

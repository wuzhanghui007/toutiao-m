<template>
  <div class="channel-edait">
    <van-cell-group>
      <!-- 我的列表 -->
      <van-cell  :border="false">
        <div slot="title" class="title-text">我的频道</div>
         <van-button
        class="edit-btn"
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit=! isEdit"

      >{{isEdit? '完成':'编辑'}} </van-button>
      </van-cell>

      <van-grid :gutter="10"  class="my-grid">
        <van-grid-item class="grid-item"

            v-for="(value, index) in mychannels" :key="value.id"
            @click="onMyChannelClick(value, index)"
            >
            <van-icon
          v-show="isEdit && !fiexdChannels.includes(value.id)"
          slot="icon"
          name="clear"

        ></van-icon>

            <div class="text"
           :class="{active:index==active}"
           slot="text">{{value.name}}</div>

           </van-grid-item>
       </van-grid>
     <!-- 推荐列表 -->
      <van-cell  :border="false">
        <div slot="title" class="title-text">推荐频道</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item class="grid-item"
        icon="plus"
        v-for="value in recommendChannels" :key="value.id"
         :text="value.name"  @click="onAddChannel(value)"/>
      </van-grid>

    </van-cell-group>
  </div>
</template>

<script>
import { getAllchannels, addUserChannel, deleteUserChannel } from '@/api/channel'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  props: {
    mychannels: {
      type: Array,
      require: true

    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [], // 全部频道
      isEdit: false, // 控制编辑状态的显示,
      fiexdChannels: [0] // 推荐频道，不允许删除  v-show="isEdit && !fiexdChannels.includes(value.id)"
    }
  },
  created () {
    this.loadAllchannels()
  },
  methods: {
    async loadAllchannels () {
      try {
        const { data } = await getAllchannels()
        // console.log(data.data.channels);
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async onAddChannel (value) {
      this.mychannels.push(value)
      // console.log( this.mychannels.length);
      // 数据持久化处理
      // console.log(this.user.user);
      // console.log(value.id);
      // console.log(this.mychannels.length);
      if (this.user) {
        // 已登录
        console.log('已登录')
        try {
          await addUserChannel({
            id: value.id, // 频道ID
            seq: this.mychannels.length // 序号

          })
        } catch (error) {
          console.log(error)
          this.$toast('保存失败，请稍后重试')
        }
      } else {
        // 未登录
      //  console.log('未登录');
        setItem('TOUTIAO_CHANNELS', this.mychannels)
      }
    },
    async deleteChannel (channel) {
      if (this.user) {
        // 已登录
        try {
          await deleteUserChannel(channel.id)
        } catch (error) {
          this.$toast('操作失败，请稍后重试')
        }
      } else {
        // 未登录
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    onMyChannelClick (value, index) {
      if (this.isEdit === true) {
        if (this.fiexdChannels.includes(value.id)) {
          return
        }
        //  删除频道项
        this.mychannels.splice(index, 1)
        setItem('TOUTIAO_CHANNELS', this.mychannels)
        // 让激活频道的索引 - 1
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.deleteChannel(value)
      } else {
        this.$emit('update-active', index, false)
      // console.log(index);
      }
    }

  },
  computed: {
    ...mapState(['user']),
    /*  */
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(Channel => {
        const ret = this.mychannels.find((mychannel) => {
          return mychannel.id === Channel.id
        })
        if (!ret) {
          channels.push(Channel)
        }
      })
      return channels
    }

  }

}
</script>

<style lang="less" scoped>
   .channel-edait{
  padding: 85px 0;
  .title-text{
    font-size: 32px;
    color: #333;
  }
  .edit-btn{
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959 ;
  }

    /deep/.grid-item{
    width: 160px;
    height: 86px;
    .van-grid-item__content{
       background-color: #f4f5f6;
       flex-direction: row;
       .van-grid-item__text,.text{
         font-size: 28px;
         color: #222;
         margin: 0;

       }
       .van-grid-item__icon-wrapper{
         position: unset;
       }
       .active{
         color:#f85959
       }

     }
    }

    /deep/.my-grid{
      .van-grid-item__content{
        position: relative;
        .van-icon-clear{
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(40%,-40%);
           font-size: 30px;
           color: #cacaca;
           z-index: 2;

        }
      }
    }
    /deep/.recommend-grid{
      .grid-item {
    .van-grid-item__content{
      flex-direction: row;
      white-space: nowrap;
      .van-icon-plus{
         font-size: 28px;
         color: #222;
         margin-right: 6px;

      }

          }
      }
    }
}

</style>

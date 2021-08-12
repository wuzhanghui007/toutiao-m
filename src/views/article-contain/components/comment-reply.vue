<template>
<div class="comment-reply">
 <van-nav-bar
  :title="comment.reply_count > 0 ? `${comment.reply_count }条回复` : '暂无回复'"
 >
   <van-icon slot="left" name="cross"  @click="$emit('close')"/>
  </van-nav-bar>

  <div class="scroll-wrap">

   <!-- 当前评论项 -->
  <comment-item
  :comment="comment"

  ></comment-item>

  <!-- 评论的回复列表 -->

   <van-cell title="全部回复" />
   <comment-list
   :list="commentList"
   :source="comment.com_id"
    type="c"

   ></comment-list>
  </div>

   <!-- 底部区域 -->
    <div class="reply-bottom">
      <van-button
        class="write-btn"
        size="small"
        round
        @click="isPostShow = true"
      >写评论</van-button>
    </div>

   <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
      :target="comment.com_id"
      @post-success="onPostSuccess"
      />
    </van-popup>

</div>

</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPost from './post-comment'

export default {
  components: {
    CommentItem,
    CommentList,
    CommentPost

  },

  props: {
    comment: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []// 评论的回复列表

    }
  },
  methods: {
    onPostSuccess (data) {
      // 更新回复的数量
      this.comment.reply_count++
      // 内容展示到顶部
      //  console.log(data.new_obj)
      this.commentList.unshift(data.new_obj)
      // 关闭弹层
      this.isPostShow = false
    }

  },
  created () {

  },
  mounted () {
    // console.log(this.comment);
    // console.log(this.commentList);
  /*  this.dataLength= this.commentList.length
   console.log(this.commentList);
   console.log(this.commentList.length);
     */
  }

}
</script>

<style scoped lang="less">

/deep/.van-icon-cross{
   color: #1989fa !important;
}
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}

.reply-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #d8d8d8;
  .write-btn {
    width: 60%;
  }
}
</style>

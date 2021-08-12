<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      @click-left="$router.back()"
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail "

       v-else-if="article.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime }}</div>

           <follow-user
           class="follow-btn"
           :userid="article.aut_id"
           v-model="article.is_followed"
           :isEntry="isEntry">
           </follow-user>

      <!--  :isfollowed="article.is_followed"
           @update-is_followed="onFllows" -->
         <!--

            <van-button v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            @click="onFllow"
            :loading="fllowLoading"
          >已关注</van-button>
          <van-button v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            @click="onFllow"
            :loading="fllowLoading"
          >关注</van-button>
         -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
        ref="article-content"
        class="article-content markdown-body"
        v-html="article.content"></div>
        <van-divider>正文结束</van-divider>

        <comment-list
        :list="commentList"

         :source="article.art_id"
        @onload-success="totalCommentCount = $event.total_count"
        @reply-click="onReplyClick"
        type="a"
        ></comment-list>

         <!-- 底部区域 -->
          <div class="article-bottom">
            <van-button
              class="comment-btn"
              type="default"
              round
              size="small"
               @click="isPostShow=true"
            >写评论</van-button>

            <van-icon
              name="comment-o"
              color="#777"
              :badge="totalCommentCount"
            />

            <!-- <van-icon
              color="#777"
              name="star-o"
            /> -->
            <collect-article
            class="btn-item"
            v-model="article.is_collected"
            :articleId="article.art_id"
            :isEntry="isEntry"

            ></collect-article>
           <like-article
            class="btn-item"
            v-model="article.attitude"
            :article-id="article.art_id"
            :isEntry="isEntry"
           />

            <van-icon name="share" color="#777777"></van-icon>

          </div>
          <!-- /底部区域 -->
        <van-popup v-model="isPostShow"
        position="bottom"

        >
        <comment-post
        :target = "article.art_id"
        @post-success="onPostSuccess"

        ></comment-post>

        </van-popup>

      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="loadArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!--评论回复  -->
    <van-popup v-model="isRspostShow"
        position="bottom"
        style="height:100%"
        >
        <comment-reply
        v-if="isRspostShow"
        :comment ="currentomment"
        @close="isRspostShow=false"

        ></comment-reply>

        </van-popup>

  </div>
</template>

<script>
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
import { getItem } from '@/utils/storage'

import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './components/comment-list'
import CommentPost from './components/post-comment'
import CommentReply from './components/comment-reply'

export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply

  },
  // 依赖注入给所有的后代组件提供数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中的 loading 状态
      errStatus: 0, // 失败的状态码
      fllowLoading: false, // 关注按钮loading效果,
      isEntry: false, // 判断用户是否登录
      totalCommentCount: 0, // 评论总数
      isPostShow: false, // 评论弹出层
      commentList: [], // 评论列表
      isRspostShow: false, // 回复评论弹出层
      currentomment: {} // 当前评论项

    }
  },

  created () {
    // 获取文章内容
    this.loadArticle()
  },
  mounted () {
    if (getItem('TOUTIAO_USER')) {
      this.isEntry = true
    } else {
      this.isEntry = false
    }
  },

  methods: {
    // 获取文章内容
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        // JSON.parse('dsankljdnskaljndlkjsa')
        // console.log(data.data);
        /* if (Math.random()> 0.3) {
          JSON.parse('dsankljdnskaljndlkjsa')
        }  */
        this.article = data.data

        // 初始化图片点击预览
        // console.log(this.$refs['article-content'])
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errStatus = 404
        }
      }
      this.loading = false
    },
    // 图片处理
    previewImage () {
      // 得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')

      // 获取所有 img 地址
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
    },
    onFllows (val) {
      console.log(val)
      this.article.is_followed = val
    },
    onPostSuccess (data) {
      this.isPostShow = false
      // 将发布内容显示到列表顶部
      this.commentList.unshift(data.new_obj)
      this.totalCommentCount = this.commentList.length
    },
    //
    onReplyClick (commimt) {
      this.isRspostShow = true
      this.currentomment = commimt
      // console.log(commimt);
    }

  }

}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #fff;
  }
  .article-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
    }
    .comment-icon {
      top: 2px;
      color: #777;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
    .btn-item {
      border: none;
      padding: 0;
      height: 40px;
      line-height: 40px;
      color: #777777
    }
    .collect-btn--collected {
      color: #ffa500;
    }
    .like-btn--liked {
      color: #e5645f;
    }
  }
}

</style>

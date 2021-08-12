<template>
<!-- :to="'/article/'+article.art_id" -->
<van-cell
:badge="99999"
   :to="{
      // 根据路由名称进行跳转
     name:'article-contain',
     // 传递路由动态参数
     params:{
      articleId: article.art_id
     }}"
  class="article-item" >
  <div slot="title" class="title"> {{ article.title }}</div>

  <div slot="label">
     <div v-if="article.cover.type === 3" class="cover-wrap">
       <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
        <van-image
           fit="cover"
            :src="img"
          />

        </div>

     </div>

    <span class="bottom">{{ article.aut_name }}</span>
    <span class="bottom">{{ article.comm_count }}评论</span>
    <span class="bottom">{{ article.pubdate | relativeTime}}</span>
  </div>
  <van-image
  class="cover-item-img"
  slot="default"
  fit="cover"
  v-if="article.cover.type === 1"

  :src="article.cover.images[0]"
/>

</van-cell>

</template>

<script>
export default {

  props: {
    article: {
      type: Object,
      require: true
    }
  },
  data () {
    return {

    }
  }

}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

    .bottom{
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      overflow: hidden;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .van-image{
        height: 100%;
        width: 100%;
      }
      .cover-item-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>

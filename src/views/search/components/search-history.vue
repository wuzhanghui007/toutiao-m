<template>
  <div class="search-history">
     <van-cell title="搜索历史">
       <div v-if="isDeleteShow">
      <span @click="searchHistories.splice(0)">全部删除</span>&nbsp;&nbsp;
      <span @click="isDeleteShow=false">完成</span>
       </div>
      <van-icon name="delete"  v-else @click="isDeleteShow=true"/>
    </van-cell>
    <van-cell v-for="(item,index) in searchHistories"
    :key="index"
    :title="item"
    @click="onSearchItemClick(item, index)" >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistories: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除显示状态
    }
  },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态下
        this.searchHistories.splice(index, 1)
      } else {
        // 非删除状态下
        this.$emit('search', item)
      }
    }
  }

}
</script>

<style>

</style>

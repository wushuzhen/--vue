<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要BB的内容(最多吐槽120字)" maxlength="120" v-model="msg"></textarea>
    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
    <div class="cmt-list">
      <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
        <div class="cmt-title">
          第{{ i+1 }}楼&nbsp;&nbsp;用户: 
          {{item.user_name }}&nbsp;&nbsp;发表时间: 
          {{item.add_time | dataFormat }}
        </div>
        <div class="cmt-body">
          {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
        </div>
      </div>
    </div>
    <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1,
      comments: [],
      msg: ""
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      this.$http.get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex).then(result => {
        if(ressult.body.status === 0) {
          this.comments = this.comments.concat(result.body.message);
        } else {
          Toast("获取评论失败! ");
        }
      });
    },
    getMore() {
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空! ");
      }
      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      this.$http.post("api/postcomment/" + this.$route.params.id, {
        content: this.msg.trim()
      }).then(function(result) {
        if (result.body.status === 0) {
          // 思路1: 手动拼接一个评论对象放入数组
          // // 1. 拼接出一个评论对象
          // var cmt = {
          //   user_name: "匿名用户",
          //   add_time: Date.now(),
          //   content: this.msg.trim()
          // };
          // this.comments.unshift(cmt);
          // 思路2: 将本地数据全部清空, 重新获取第页的数据
          // 将现在的数据清空
          this.comments = []
          // 重置索引
          this.pageIndex = 1
          // 重新获取评论
          this.getComments()
          // 清空文本框
          this.msg = "";
        }
      });
    },
  },
  props: ["id"]
};
</script>

<style lang="less" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    matgin:5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-heigt: 30x;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>

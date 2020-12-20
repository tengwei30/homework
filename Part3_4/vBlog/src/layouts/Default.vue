<template>
  <div>
    <section class="page-header">
      欢迎来到 请叫我Ghost 的博客
    </section>
    <section class="main-content">
      <el-row>
        <el-col :span="6" style="padding-right:10px">
            <sidebar></sidebar>
        </el-col>
        <el-col :span="18" style="padding-left:10px">
            <slot></slot>
        </el-col>
      </el-row>
    </section>
    <section class="foot">
        <foot></foot>
    </section>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
export default {
  components: {
    sidebar: () => import("./components/Sidebar"),
    foot: () => import("./components/Foot")
  },
  data() {
    return {
      music: {
          isPlay: false,
          currentTime: 0,
          maxTime: 0,
          volume: 100
      },
      fullButton: {
          full: false
      },
      topbar: {
          active: "",
      },
      randomIcon: []
    }
  },
}
</script>

<style>
.page-header {
  padding: 5rem 6rem;
  color: #fff;
  text-align: center;
  background-color: #159957;
  background-image: linear-gradient(120deg, #155799, #159957);
}
.main-content {
  max-width: 64rem;
  padding: 30px 0px 30px 0px;
  margin: 0 auto;
  font-size: 1.1rem;
  word-wrap: break-word;
  min-height: 500px;
}
.foot {
  max-width: 67rem;
  margin: 0 auto;
  font-size: 12px !important;
  color: #586069 !important;
  word-wrap: break-word;
}
</style>

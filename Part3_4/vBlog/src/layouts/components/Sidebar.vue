<template>
<div>
  <el-card shadow="never">
    <el-menu default-active="1" @select="onSelect">
      <el-menu-item 
        v-for="item in constantRouterMap" 
        :key="item.path" 
        :index="item.path">
        <i :class="item.meta.icon"></i>
        <g-link style="color:#303133;text-decoration: none" slot="title" :to="item.path">{{item.meta.title}}</g-link>
      </el-menu-item>
    </el-menu>
  </el-card>
</div>
</template>
<script>
export default {
  data() {
    return {
      constantRouterMap: [{
        path: '/',
        redirect: '/',
        // component: Layout,
        meta: {
            type: "home",
            icon: 'el-icon-star-off',
            title: '最新动态'
        },
        children: [
            {
                path: 'main',
                // component: NewMain,
                meta: { title: '最新动态' }
            }
        ]
      },{
        path: '/social',
        redirect: '/social',
        // component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-mobile-phone',
            title: '社交圈'
        },
        children: [
            {
                path: 'main',
                // component: SocialMain,
                meta: { title: '社交圈' }
            },
            {
                path: 'details/:name',
                // component: SocialDetails,
                meta: { title: '用户资料' }
            }
        ]
      },{
        path: '/bloglists',
        redirect: '/bloglists',
        // component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-edit-outline',
            title: '博客列表'
        },
        children: [
            {
                path: 'main',
                // component: BlogMain,
                meta: { title: '博客列表' }
            },
            {
                path: 'add',
                // component: BlogAdd,
                meta: { title: '发表博客' }
            },
            {
                path: 'edit/:id',
                // component: BlogEdit,
                meta: { title: '编辑博客' }
            },
            {
                path: 'details/:id',
                // component: BlogDetails,
                meta: { title: '博客详情' }
            }
        ]
      },{
        path: '/mit',
        redirect: '/mit',
        // component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-service',
            title: '开源项目'
        },
        children: [
            {
                path: 'main',
                // component: ProjectMain,
                meta: { title: '项目列表' }
            },
            {
                path: 'details/:name',
                // component: ProjectDetails,
                meta: { title: '项目详情' }
            }
        ]
      },{
        path: '/help',
        redirect: '/help',
        // component: Layout,
        meta: {
            type: "user",
            icon: 'el-icon-printer',
            title: '使用帮助',
            mini: true
        },
        children: [
            {
                path: 'main',
                // component: HelperMain,
                meta: { title: '使用帮助' }
            }
        ]
      }]
    }
  },
  methods: {
    onSelect(index) {
      console.log('-- 点击跳转 --')
    },
  }
}
</script>
<style scoped>

</style>
<template>
    <el-container>
        <el-aside width="160px">
            <el-menu
                    default-active="/Type"
                    class="el-menu-vertical-demo my-nav"
                    :router="true"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
            >
                <el-menu-item index="/Type">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">业务总览</span>
                </el-menu-item>
                <el-menu-item index="/Policy">
                    <i class="el-icon-s-data"></i>
                    <span slot="title">保单上传</span>
                </el-menu-item>
                <!--<el-menu-item index="/PolicyDetail">-->
                <!--    <i class="el-icon-menu"></i>-->
                <!--    <span slot="title">查看保单详情</span>-->
                <!--</el-menu-item>-->
                <el-menu-item index="/Search">
                    <i class="el-icon-menu"></i>
                    <span slot="title">保单查询</span>
                </el-menu-item>
                <el-menu-item index="/Pay">
                    <i class="el-icon-s-finance"></i>
                    <span slot="title">云端计算</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
export default {
    name: 'Main',
    data() {
        return {}
    }
}
</script>


<style scoped lang="scss">
.my-nav {
  height: 100vh;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;

}

.el-menu {
  width: 160px;
}
</style>

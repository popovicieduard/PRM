<template>
    <el-menu class="header-menu border-0 text-capitalize float-right" mode="horizontal" :router="true" :default-active="activeIndex">
        <el-menu-item index="auth-network-register" :route="{name: 'auth-network-register'}" class="menu-item border-0 p-0 mr-4">
            Register
        </el-menu-item>
        <el-menu-item index="auth-network-login" :route="{name: 'auth-network-login'}" class="menu-item border-0 p-0 mr-4">
            Login
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
    data() {
        return {
            activeIndex: null
        }
    },
    methods: {
        reloadPage(){
            this.$router.go(0)
        }
    },
    mounted: function(){
        this.activeIndex = this.$route.name;
    },
    watch: {
        $route (to, from) {
            this.activeIndex = to.name;
        }
    },
}
</script>

<style lang="scss">
@import '@/assets/theme/scss/_variables.scss';

.header-menu{
    background-color: $secondary !important;
    
    .menu-item{
        &:focus, &:hover{
            background-color: $secondary !important;
        }

        .upb-balance{
            line-height: 4.3;
        }

        .el-icon-user-solid{
            margin-right: 0;
            color: #fff;
        }
        .el-submenu__title{
            &:hover{
                background-color: $secondary !important;
            }
            border: 0 !important;
            padding: 0 !important;
            margin-right: 5px;
        }
    }
}

.sub-menu-item{
    &:hover{
        background-color: $secondary !important;
    }
}

</style>
<template>
    <el-menu class="header-menu border-0 text-capitalize float-right" mode="horizontal" :router="true" :default-active="activeIndex">
        <el-menu-item class="menu-item border-0 p-0 mr-4" @click="reloadPage()">
            <el-tooltip class="item" effect="dark" content="Refresh Data" placement="bottom">
                <span><i class="el-icon-refresh-left"></i></span>
            </el-tooltip>
        </el-menu-item>
        <el-submenu index="header-sub-menu" class="menu-item">
            <template slot="title">
                <el-avatar icon="el-icon-user-solid" size="medium"></el-avatar>
            </template>
            <el-menu-item index="network-settings" :route="{name: 'network-settings'}" class="sub-menu-item text-primary">
                <i class="el-icon-s-tools text-primary"></i>
                Settings
            </el-menu-item>
            <el-menu-item class="sub-menu-item text-danger" @click="logout">
                <i class="el-icon-unlock text-danger"></i>
                Logout
            </el-menu-item>
        </el-submenu>
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
        },
        async logout(){
            await this.$store.dispatch('auth/logout')
            this.$router.push({'name': 'auth-login'})
        }
    },
    mounted() {
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
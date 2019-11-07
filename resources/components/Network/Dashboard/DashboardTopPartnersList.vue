<template>
    <el-card class="partner-list">
        <div slot="header">
            <span class="h2 text-capitalize">Top Performing Partners</span>
            <router-link :to="{name: 'network-partners' }" tag="button" class="el-button el-button--mini btn-primary text-white float-right border-0">See All</router-link>
        </div>
        <el-row :gutter="12">
            <el-col :span="24">
                <ul>
                    <li class=h4 v-for="o in 4" :key="o">
                        {{ o }} {{'List item ' + o }}
                    </li>
                </ul>
            </el-col>
        </el-row>
        
    </el-card>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
    .partner-list{
        min-height: 230px;
    }
</style>
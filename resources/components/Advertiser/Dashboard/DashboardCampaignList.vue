<template>
    <el-card class="campaign-list">
        <div slot="header">
            <span class="h2 text-capitalize">Campaign List</span>
            <router-link :to="{name: 'advertiser-campaigns' }" tag="button" class="el-button btn-primary el-button--mini text-white float-right border-0">See All</router-link>
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
    .campaign-list{
        min-height: 230px;
    }
</style>
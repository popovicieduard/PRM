<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="12" class="my-1">
                    <span class="h2">Advertiser - <span class="text-primary">{{ advertiser.id }} - {{ advertiser.username }}</span></span>
                </el-col>
                <el-col :span="12" class="float-right">
                    <el-tooltip class="item" effect="dark" content="Deactivate Advertiser" placement="left">
                        <el-button type="danger" icon="el-icon-delete" class="float-right lh-0" circle></el-button>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="24" class="my-3">
            <el-col :xs="24" :md="12" class="my-2">
                <el-card shadow="hover">
                    <el-row>
                        <el-col :span="12">
                            <h3 class="mb-0">This Month</h3>
                        </el-col>
                        <el-col :span="12" class="text-center">
                            <h3 class="text-success mb-0 float-right">{{5000 | numFormat('0,0.00')}} $</h3>
                        </el-col>
                    </el-row>
                </el-card>     
            </el-col>
            <el-col :xs="24" :md="12" class="my-2">
                <el-card shadow="hover">
                    <el-row>
                        <el-col :span="12">
                            <h3 class="mb-0">Last Month</h3>
                        </el-col>
                        <el-col :span="12" class="text-center">
                            <h3 class="text-success mb-0 float-right">{{5000 | numFormat('0,0.00')}} $</h3>
                        </el-col>
                    </el-row>
                </el-card>     
            </el-col>
        </el-row>
        <el-row class="d-none">
            <el-col :xs="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="Latest Leads" name="first">Latest Leads</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: {
            advertiser:{
                type: Object,
                required: true
            }
        },
         data() {
            return {
                activeName: 'first'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
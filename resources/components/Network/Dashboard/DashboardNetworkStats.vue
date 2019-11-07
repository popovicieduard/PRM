<template>
    <el-card class="my-2"> 
        <el-row :gutter="12" class="card-row">
            <el-col :span="24" v-if="loading">
                <el-row :gutter="12">
                    <el-col :span="24" class="mt-4">
                        <content-loader
                            :height="32"
                            :speed="2"
                            primaryColor="#9814fd"
                            secondaryColor="#f32cfb"
                        >
                        <circle cx="110" cy="9" r="8" /> 
                        <rect x="8" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="8" y="12" rx="1" ry="1" width="35" height="5" />

                        <circle cx="245" cy="9" r="8" /> 
                        <rect x="143" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="143" y="12" rx="1" ry="1" width="35" height="5" />

                        <circle cx="380" cy="9" r="8" /> 
                        <rect x="278" y="2" rx="1" ry="1" width="25" height="5" /> 
                        <rect x="278" y="12" rx="1" ry="1" width="35" height="5" />
                        </content-loader>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24" v-else>
                <el-row :gutter="12">
                    <el-col :xs="24" :md="8" :lg="8" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Advertisers</h5>
                                    <h3 class="card-row__numbers"></h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-advertisers"></i>
                                </el-col>
                            </el-row>
                        </el-card>                        
                    </el-col>
                    <el-col :xs="24" :md="8" :lg="8" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Partners</h5>
                                    <h3 class="card-row__numbers"></h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-partners"></i>
                                </el-col>
                            </el-row>
                        </el-card>     
                    </el-col>
                    <el-col :xs="24" :md="8" :lg="8" class="my-2">
                        <el-card shadow="hover">
                            <el-row>
                                <el-col :span="18">
                                    <h5 class="card-row__title">Active Campaigns</h5>
                                    <h3 class="card-row__numbers"></h3>
                                </el-col>
                                <el-col :span="6" class="text-center">
                                    <i class="icon-campaigns"></i>
                                </el-col>
                            </el-row>
                        </el-card>     
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        networkStats: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        },
    },
    created(){
        this.$emit('loading')
        
        setTimeout(() => {
            this.$emit('loading')
        }, 2000);
    },
}
</script>

<style lang="scss" scoped>

.card-row{
    min-height: 115px;
    &__title{
        color: #8898aa !important;
        font-weight: 700 !important;
        text-transform: uppercase;
    }

    &__numbers{
        font-weight: 700 !important;
        margin: 0 !important;
    }

    .icon-campaigns {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url("data:image/png;base64,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")
        50% 50% no-repeat;
    background-size: 100%;
    }

    .icon-partners {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url("data:image/png;base64,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")
        50% 50% no-repeat;
    background-size: 100%;
    }

    .icon-advertisers {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url("data:image/png;base64,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")
        50% 50% no-repeat;
    background-size: 100%;
    }

}
</style>
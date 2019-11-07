<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="my-1">
                    <span class="h2">Campaign - <span class="text-primary">{{ campaign.id }}</span></span>
                </el-col>
                <el-col :xs="24" :sm="12" class="float-right">
                    <el-tooltip class="item" effect="dark" content="Remove Campaign" placement="left">
                        <el-button type="danger" icon="el-icon-delete" class="float-right" circle></el-button>
                    </el-tooltip>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="36">
            <el-col :span="12">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                    <el-image class="image" :src="campaign.image" fit="cover">
                        <div slot="error" class="image-slot mt-5">
                            <h5 class="text-center">Not Found</h5>
                        </div>
                    </el-image>
                    <div style="padding: 14px;">
                        <h1 class="text-capitalize">{{ campaign.title }}</h1>
                        <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Categories:</span>
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="category in campaign.categories" :key="category" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ category }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Devices:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="device in campaign.devices" :key="device" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ device }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Conversion Goal:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag type="primary" effect="dark" class="text-capitalize ml-1" size="medium">{{ campaign.conversion_goal }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Countries:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="country in campaign.countries" :key="country" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ country | country }}</el-tag>                                                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Landing Page</span>                               
                                </el-col>
                                <el-col :span="14" class="mt-1">
                                    <span class="font-weight-bold h4"><i class="el-icon-view view-landing-page" @click="goToLanding"></i> {{ landingPageUrl }}</span>                                                                                                     
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Commision:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag type="success"><span class="font-weight-bold">{{ campaign.commision | numFormat('0,0.00') }}</span> $ / Lead</el-tag>                                                                   
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Daily Cap:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag ><span class="font-weight-bold">{{ campaign.cap }}</span> leads / Day</el-tag>                                 
                                </el-col>
                            </el-row>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-row>
                    <el-col :span="24">
                        <el-card shadow="never">
                                <div slot="header">
                                    <h4 class="mb-0">Campaign description</h4>
                                </div>
                            <h3 class="text-capitalize">{{ campaign.description }}</h3>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="my-4">
                    <el-col :span="24">
                        <el-card shadow="never">
                                <div slot="header">
                                    <h4 class="mb-0">Campaign Instructions</h4>
                                </div>
                            <h3 class="text-capitalize">{{ campaign.instructions }}</h3>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>
    export default {
        props: {
            campaign:{
                type: Object,
                required: true
            }
        },
        computed: {
            landingPageUrl(){
                return this.campaign.url;
            }
        },
        methods: {
            goToLanding(){
                window.open(this.landingPageUrl, '_blank');
            }
        },
    }
</script>

<style lang="scss" scoped>
    .image{
        background-size: fill !important;
        background-repeat: no-repeat !important;
        width: 100%;
        height: 250px;
    }

    .el-progress__text{
        font-size: 12px !important;
    }

    .view-landing-page{
        cursor: pointer;
    }

</style>
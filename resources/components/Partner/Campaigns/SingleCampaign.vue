<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="my-1">
                    <span class="h2">Campaign - <span class="text-primary">{{ campaign.id }}</span></span>
                </el-col>
            </el-row>
        </div>
        <el-row :gutter="36">
            <el-col :span="12">
                <el-card shadow="never" :body-style="{ padding: '0px' }">
                    <div style="padding: 14px;">
                        <h1 class="text-capitalize">{{ campaign.title }}</h1>
                        <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Categories:</span>
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="category in campaign.categories" :key="category.name" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ category.name }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Devices:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="device in campaign.devices" :key="device.name" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ device.name }}</el-tag>                                    
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
                                    <el-tag v-for="country in campaign.countries" :key="country.name" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ country.name | country }}</el-tag>                                                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="my-1">
                                    <span class="h4">Landing Page</span>                               
                                </el-col>
                                <el-col :span="14" class="mt-1">
                                    <span class="font-weight-bold h4"><i class="el-icon-link text-primary go-to-landing" @click="goToLanding"></i> {{ landingPageUrl }}</span>                                                                                                     
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
                                <h4 class="text-center mb-0">Daily Cap</h4>
                            </div>
                            <el-progress :text-inside="true" :stroke-width="15" :percentage="(campaign.__meta__.clicks_count / campaign.cap) * 100" :format="format"></el-progress>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="my-4">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <div slot="header">
                                <h4 class="text-center mb-0">Tracking link</h4>
                            </div>
                            <el-button type="secondary"
                            size="mini"
                            class="my-1 float-right"
                            v-clipboard:copy="trackUrl"
                            v-clipboard:success="onCopy">
                                Copy to Clipboard
                            </el-button>
                            <el-input v-model="trackUrl"></el-input>
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
            campaign:{
                type: Object | null,
                required: true
            },
        },
        computed: {
            trackUrl(){
                return this.$store.getters['auth/getDomain'] + "/api/track/" + this.$store.getters['auth/getAuthInstance'].id + '/' +  this.campaign.id
            },
            landingPageUrl(){
                return this.campaign.url;
            }
        },
        methods: {
            format(percentage) {
                if(this.campaign.cap <= this.todayLeads){
                    this.campaign.__meta__.clicks_count = this.campaign.cap;
                    return 'Capped';
                }
                return percentage === 100 ? 'Capped' : this.campaign.__meta__.clicks_count + ' / ' + this.campaign.cap;
            },
            onCopy: function (e) {
                this.$message({
                    message: 'Link copied to clipboard',
                    center: true,
                    showClose: true,
                    duration: 2000,
                });
            },
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

    .go-to-landing{
        cursor: pointer;
    }

    .el-progress__text{
        font-size: 12px !important;
    }

</style>
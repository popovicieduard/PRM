<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="mt-2">
                    <span class="h2">Campaign - <span class="text-primary">{{ campaign.id }}</span></span>
                </el-col>
                <el-col :xs="24" :sm="12">
                    <nuxt-link :to="{name: 'advertiser-campaigns-campaignId-edit', params:{campaignId: campaign.id}}"><el-button class="float-right bg-info text-white border-0" size="small">Edit Campaign</el-button></nuxt-link>
                </el-col>
                <el-col :span="24" class="mt-3">
                    <el-alert v-if="campaign.tested == true" type="warning" :closable="false" :title="'The Campaign is in testing phase, in order to start the campaign a test HTTP POST callback / postback has to be made at the following URL: https://upboost.io/api/postback/' + campaign.id + '/test'"></el-alert>
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
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Categories:</span>
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="category in campaign.categories" :key="category" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ category }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Devices:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="device in campaign.devices" :key="device" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ device }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Conversion Goal:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag type="primary" effect="dark" class="text-capitalize ml-1" size="medium">{{ campaign.conversion_goal }}</el-tag>                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Countries:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag v-for="country in campaign.countries" :key="country" class="mx-1 my-1 text-capitalize" size="small" effect="plain">{{ country | country }}</el-tag>                                                                    
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Landing Page</span>                               
                                </el-col>
                                <el-col :span="14">
                                    <span class="font-weight-bold h4">{{ campaign.url }}</span>                                                                                                     
                                </el-col>
                                <el-col :span="24" class="mt-2" v-if="!checkClickId">
                                    <el-alert show-icon :closable="false" type="warning" title="Warning: Your Landing Page URL does NOT contain the click_id parameter, make sure to add '?click_id={CLICK_ID}' to your url in order to track your conversions."></el-alert>
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
                                    <span class="h4">Commision:</span>                                    
                                </el-col>
                                <el-col :span="14">
                                    <el-tag type="success"><span class="font-weight-bold">{{ campaign.commision | numFormat('0,0.00') }}</span> $ / Lead</el-tag>                                                                   
                                </el-col>
                            </el-row>
                            <hr>
                            <el-row>
                                <el-col :span="10" class="mt-2">
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
                <el-row class="my-4">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <div slot="header">
                                <h4 class="text-center mb-0">Daily Cap</h4>
                            </div>
                            <el-progress :text-inside="true" :stroke-width="15" :percentage="(todayLeads / campaign.cap) * 100" :format="format"></el-progress>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row class="my-4">
                    <el-col :span="24">
                        <el-card shadow="never">
                            <div slot="header">
                                <h4 class="text-center mb-0">Postback / Callback Integration</h4>
                            </div>
                              <el-tabs value="first">
                                <el-tab-pane label="Server to Server" name="first">
                                    <el-alert :closable="false" class="my-2" :description="'Example: https://upboost.io/api/postback/' + campaign.id + '/example123'" title="Instructions: After the conversion, a postback / callback with the {CLICK_ID} value should be made to the url below, the request should be of type POST.">
                                    </el-alert>
                                    <span class="h4 text-muted">Postback / Callback URL:</span><el-input v-model="postbackUrl"></el-input>
                                </el-tab-pane>
                            </el-tabs>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="24">
                <el-tooltip class="item" effect="dark" content="Delete Campaign" placement="left">
                    <el-button type="danger" icon="el-icon-delete" class="float-right" circle></el-button>
                </el-tooltip>
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
            },
            todayLeads:{
                type: Number,
                required: true
            }
        },
        computed: {
            checkClickId(){
                if(this.campaign.url.includes("click_id={CLICK_ID}")){
                    return true
                }
            },
            postbackUrl(){
                return "https://upboost.io/api/postback/" +  this.campaign.id + "/{CLICK_ID}"
            }
        },
        methods: {
            format(percentage) {
                if(this.campaign.cap <= this.todayLeads){
                    this.todayLeads = this.campaign.cap;
                    return 'Capped';
                }
                return percentage === 100 ? 'Capped' : this.todayLeads + ' / ' + this.campaign.cap;
            },
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

</style>
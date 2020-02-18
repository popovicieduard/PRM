<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :xs="24" :sm="12" class="my-1">
                    <span class="h2">Campaign - <span class="text-primary">{{ campaign.id }}</span></span>
                </el-col>
                <el-col :span="24" :sm="12">
                    <el-tooltip class="item" effect="dark" content="Remove Campaign" placement="left">
                        <el-button type="danger" icon="el-icon-delete" class="float-right lh-0" circle @click="removeCampaign"></el-button>
                    </el-tooltip>
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
                                    <span class="font-weight-bold h4">{{ campaign.url }}</span>                                                                                                     
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
                                <h4 class="text-center mb-0">Postback / Callback Integration</h4>
                            </div>
                              <el-tabs value="first">
                                <el-tab-pane label="Server to Server" name="first">
                                    <el-alert :closable="false" class="my-2" :description="'Example: ' + this.$store.getters['auth/getDomain'] + '/api/postback/' + campaign.id + '/example123'" title="Instructions: After the conversion, a postback / callback with the {CLICK_ID} value should be made to the url below, the request should be of type POST.">
                                    </el-alert>
                                    <el-row>
                                        <el-col :span="12" class="mt-3">
                                            <span class="h4 text-muted ">Postback / Callback URL:</span>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-button type="secondary"
                                            size="mini"
                                            class="my-1 float-right"
                                            v-clipboard:copy="postBackUrl"
                                            v-clipboard:success="onCopy">
                                                Copy to Clipboard
                                            </el-button>
                                        </el-col>
                                    </el-row>
                                    <el-input v-model="postBackUrl"></el-input>
                                    <el-alert
                                    :closable="false"
                                    class="my-2" 
                                    :description="'Example: https://landing.com?click_id=example123'" 
                                    title="How to track the conversions: For every click, we will generate a unique
                                    click_id GET Parameter that we will send to your landing page url,
                                    on your landing page you will have to store this click_id
                                    in a session or cookie and make a postback / callback to the url above after the conversion.">
                                    </el-alert>
                                </el-tab-pane>
                            </el-tabs>
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
            postBackUrl(){
                return this.$store.getters['auth/getDomain'] + "/api/postback/" +  this.campaign.id + "/{CLICK_ID}"
            },
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
            removeCampaign(id){
                this.$confirm('This will permanently remove the campaign. Continue?', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'danger'
                }).then(async () => {
                    this.loading = true;
                    try {
                        await this.$axios.delete(`network/campaign/${this.$route.params.campaignId}`)
                        .then((data) => {
                            this.$notify({
                                message: 'Campaign has been removed',
                                type: 'success'
                            });
                            this.loading = false;
                            this.$router.push({'name': 'network-campaigns'})
                            
                        })
                    } catch (error) {
                        let _error = error.response.data
                        if(_error.constructor === Array){
                            _error.forEach((error) =>{
                            setTimeout(() => {
                                this.$notify.error({
                                title: 'Error',
                                message: error.message,
                                });
                            }, 100);
                            })
                        }else{
                            if(this){
                            this.$notify.error({
                                title: 'Error',
                                message: _error.message,
                            });
                            }
                        }
                    }
                }).catch(() => {
   
                });
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
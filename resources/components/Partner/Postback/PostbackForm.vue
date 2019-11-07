<template>
    <el-card>
        <div slot="header">
            <el-row>
                <el-col :span="24" class="my-1">
                    <span class="h2 text-capitalize">Postback</span>
                </el-col>
            </el-row>
        </div>
        <el-row type="flex" justify="center">
            <el-col :span="14">
                <el-form :model="postback_url_form" label-width="180px">
                    <el-form-item label="Postback URL:" class="mb-1">
                        <el-input show-password v-model="postback_url_form.postback_url" placeholder="https://your-url.com"></el-input>
                    </el-form-item>
                    <hr>
                    <div class="text-center">
                        <el-button 
                        type="primary" 
                        @click="submitForm"
                        :loading="form_loading">
                        Save
                        </el-button>
                    </div>
                </el-form>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center" class="my-4">
            <el-col :span="24">
                <el-alert
                effect="dark"
                title="Postback Parameters"
                :closable="false"
                class="postback-alert"
                >
                <client-only>
                    <el-row class="my-3" :gutter="24">
                        <el-col :span="12" class="border-right border-left">
                            <h5>campaign_id={campaign_id}</h5>
                            <h5>campaign_name={campaign_name}</h5>
                            <h5>partner_id={partner_id}</h5>
                            <h5>source={source}</h5>
                            <h5>device={device}</h5>
                            <h5>datetime={datetime}</h5>
                            <h5>payout={payout}</h5>
                            <h5>s1={s1}</h5>
                            <h5>s2={s2}</h5>
                            <h5>s3={s3}</h5>
                            <h5>s4={s4}</h5>
                            <h5>s5={s5}</h5>
                        </el-col>
                        <el-col :span="12" class="border-right">
                            <h5>Campaign ID.</h5>
                            <h5>Campaign Name, Encoded.</h5>
                            <h5>Partner ID.</h5>
                            <h5>Source of click, e.g. Facebook, Instagram.</h5>
                            <h5>Device, e.g. Mobile or Desktop.</h5>
                            <h5>Date and time in YYYY-MM-DD HH:MM:SS format.</h5>
                            <h5>Earnings from the conversion, float format.</h5>
                            <h5>S1 tracking parameter.</h5>
                            <h5>S2 tracking parameter.</h5>
                            <h5>S3 tracking parameter.</h5>
                            <h5>S4 tracking parameter.</h5>
                            <h5>S5 tracking parameter.</h5>
                        </el-col>
                        <el-col :span="24">
                            <hr>
                            <h4>Example of postback URL:</h4>
                            <el-input value="https://your-url.com?campaign_id={campaign_id}&campaign_name={campaign_name}&payout={payout}"></el-input>
                            <hr>
                            <h4>Example of postback URL sent from our server:</h4>
                            <el-input value="https://your-url.com?campaign_id=4232&campaign_name=foo%20bar&payout=24.22"></el-input>
                        </el-col>
                    </el-row>
                </client-only>
                </el-alert>
            </el-col>
        </el-row>
    </el-card>
</template>

<script>

export default {
    data() {
        return {
            postback_url_form: {
                postback_url: '',
            },
            form_loading: false
        }
    },
    methods: {
        submitForm(){
            this.form_loading = true;
            setTimeout(() => {
                this.form_loading = false;
            }, 2000);
        }
    },
}
</script>

<style lang="scss">
    .postback-alert{
        .el-alert__content{
            width: 100% !important;
        }    
    }
</style>
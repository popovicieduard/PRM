<template>
  <el-card class="campaign-form">
    <div slot="header">
      <span class="h2 text-capitalize">Add New Campaign</span>
    </div>
    <el-row :gutter="12" class="my-2">
      <el-col :span="24" class="mx-auto">
        <el-form :model="campaign" label-width="180px">
          <el-steps :active="steps" finish-status="success" align-center class="my-5" >
            <el-step title="Details"></el-step>
            <el-step title="Settings"></el-step>
            <el-step title="Targeting & Budget"></el-step>
          </el-steps>
          <el-row class="mx-auto" v-show="steps == 0">
            <el-col :span="18">
              <div class="steps">
                <el-form-item label="Campaign Title">
                  <el-input v-model="campaign.title" placeholder="This will be showed to partners"></el-input>
                </el-form-item>
                <el-form-item label="Campaign Description">
                  <el-input
                    type="textarea"
                    v-model="campaign.description"
                    placeholder="A short description about your campaign"
                  ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button type="primary" @click="nextStep()">Next</el-button>
            </el-col>
          </el-row>
          <el-row class="mx-auto" v-show="steps == 1">
            <el-col :span="18">
              <div class="steps">
                <el-form-item label="Conversion Goal">
                  <el-select v-model="campaign.conversion_goal" placeholder="Pick a conversion goal">
                    <el-option label="Complete Survey" value="survey"></el-option>
                    <el-option label="Sign-up" value="sign-up"></el-option>
                    <el-option label="Purchase" value="purchase"></el-option>
                  </el-select>
                </el-form-item>
                <categories @setCategories="setCategories"/>
                <el-form-item label="Landing Page">
                  <el-input
                    placeholder="https://landing.com/"
                    v-model="campaign.url"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button type="primary" @click="prevStep()">Previous</el-button>
              <el-button type="primary" @click="nextStep()">Next</el-button>
            </el-col>
          </el-row>
          <el-row class="mx-auto" v-show="steps == 2">
            <el-col :span="24">
              <div class="steps">
                <countries @setCountries="setCountries"/>
                <devices @setDevices="setDevices"/>
                <el-form-item label="Commision (USD)">
                  <el-input-number
                    v-model="campaign.commision"
                    controls-position="right"
                    :precision="2"
                    :step="0.1"
                    :max="500"
                    :min="0.1"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="Daily Partner Cap">
                  <el-input-number v-model="campaign.cap" :min="20" :step="10"></el-input-number>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="24" class="text-center">
              <el-button type="primary" @click="prevStep()">Previous</el-button>
              <el-button type="success" @click="onSubmit">Create</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import Categories from "@/components/utils/CampaignCategories";
import Countries from "@/components/utils/CountrySelect";
import Devices from "@/components/utils/DeviceTargeting";
import qs from 'qs';

export default {
  components: {
    Categories,
    Countries,
    Devices
  },
  data() {
    return {
      error: null,
      campaign: {
        title: "",
        description: "",
        conversion_goal: "",
        categories: [],
        url: "",
        countries: [],
        devices: [],
        commision: 0.1,
        cap: 100
      },
      steps: 0
    };
  },
  methods: {
    setCategories(categories){
      this.campaign.categories = categories
    },
    setCountries(countries){
      this.campaign.countries = countries
    },
    setDevices(devices){
      this.campaign.devices = devices
    },
    async onSubmit() {
      try {
        await this.$axios.post('advertiser/create-campaign', {
          form: {
            title: this.campaign.title,
            description: this.campaign.description,
            conversion_goal: this.campaign.conversion_goal,
            categories: this.campaign.categories,
            url: this.campaign.url,
            countries: this.campaign.countries,
            devices: this.campaign.devices,
            commision: this.campaign.commision,
            cap: this.campaign.cap,
          },
          paramsSerializer: form => {
            return qs.stringify(form)
          }
        }).then((data) => {
          console.log(data)
        })
      } catch (error) {
          error.response.data.forEach((error) =>{
            	setTimeout(() => {
                this.$notify.error({
                  title: 'Error',
                  message: error.message,
                });
              }, 100);
          })
      }
    },
    nextStep(){
      this.steps++;
    },
    prevStep(){
      this.steps--;
    },
  }
};
</script>

<style scoped>

  .campaign-form{
    min-height: 550px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<template>
  <el-card class="campaign-form">
    <div slot="header">
      <span class="h2 text-capitalize">Add New Campaign</span>
    </div>
    <el-row :gutter="12" class="my-2">
      <el-col :span="24" class="mx-auto">
        <el-form :model="campaign" label-width="180px">
          <el-steps :active="steps" finish-status="success" align-center class="my-5">
            <el-step title="Details"></el-step>
            <el-step title="Settings"></el-step>
            <el-step title="Targeting & Budget"></el-step>
          </el-steps>
          <el-row class="mx-auto" v-show="steps == 0">
            <el-col :span="18">
              <div class="steps">
                <el-form-item label="Campaign Name">
                  <el-input
                    v-model="campaign.name"
                    placeholder="This is for reference in dashboard"
                  ></el-input>
                </el-form-item>
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
                <el-form-item label="Campaign Instructions">
                  <el-input
                    type="textarea"
                    v-model="campaign.instructions"
                    placeholder="Campaign instructions such as: goal KPI's, notes to partners, etc..."
                  ></el-input>
                </el-form-item>
                <el-form-item label="Campaign Creative">
                <el-upload
                  action=""
                  list-type="picture-card"
                  :auto-upload="false"
                  :limit="1">
                  <i class="el-icon-plus"></i>
                </el-upload>
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
                <el-form-item label="Campaign Categories">
                  <el-select
                    v-model="campaign.categories"
                    multiple
                    collapse-tags
                    placeholder="Select Categories"
                  >
                    <el-option
                      v-for="category in categories"
                      :key="category.value"
                      :label="category.label"
                      :value="category.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Landing Page">
                  <el-input
                    placeholder="https://landing.com/"
                    v-model="campaign.url"
                  ></el-input>
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
                <el-form-item label="Country Targeting">
                  <el-select
                    v-model="campaign.countries"
                    filterable
                    multiple
                    collapse-tags
                    placeholder="Select"
                  >
                    <el-option
                      v-for="country in countries"
                      :key="country.value"
                      :label="country.label"
                      :value="country.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Device Targeting">
                  <el-checkbox-group v-model="campaign.devices">
                    <el-checkbox label="Desktop"></el-checkbox>
                    <el-checkbox label="Mobile"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
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
                <el-form-item label="Daily Cap">
                  <el-input-number v-model="campaign.cap" :min="20"></el-input-number>
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
import CampaignCategories from "@/components/utils/CampaignCategories";
import CountrySelect from "@/components/utils/CountrySelect";

export default {
  props: {
    campaign: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      categories: CampaignCategories.data,
      countries: CountrySelect.data,
      steps: 0,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.campaign);
    },
    nextStep() {
      this.steps++;
    },
    prevStep() {
      this.steps--;
    }
  }
};
</script>

<style lang="scss" scoped>
.campaign-form{
  min-height: 800px;
}
.avatar-uploader .el-upload {
  cursor: pointer;
  width: 100% !important;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff !important;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  border: 1px #d9d9d9 solid;
  border-radius: 6px;
  width: 100%;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100%;
  height: 178px;
  border-radius: 6px;
  display: block;
}
</style>
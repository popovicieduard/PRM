<template>
  <el-row>
    <el-col>
      <EditCampaign v-if="campaign" :campaign="campaign" />
    </el-col>
  </el-row>
</template>

<script>
import EditCampaign from "@/components/Advertiser/Campaigns/EditCampaign";
export default {
  components: {
    EditCampaign
  },
  data() {
    return {
      campaign: null,
    };
  },
  created() {
    if(!this.campaign){
      this.$router.push({'name': 'advertiser-campaigns'})
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.get(
          `advertiser/campaign/${params.campaignId}`
      );
      return { campaign: data };
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
  }
};
</script>
<template lang="html">
  <div class="loading-page" v-if="loading">
    <div class="circle-border">
      <div class="circle-core"></div>
    </div>  
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 35px;
  font-family: sans-serif;
  z-index: 2001;
}

.circle-border {
  position: relative;
  left: 55%;
  width: 80px;
  height: 80px;
  padding: 3px;
  border-radius: 50%;
  background: rgb(255, 255, 255, 0.8);
  background: linear-gradient(0deg, rgba(243, 44, 251,0.1) 33%, rgba(152, 20, 253,1) 100%);
  animation: spin .8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  z-index: 1;
}

@keyframes spin {
  from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
}
</style>
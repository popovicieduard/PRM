<template>
  <el-container min-height="100vh">
    <el-container class="main-container">
      <el-header>
        <Header />
      </el-header>
        <el-main>
          <transition name="page">
            <nuxt />
          </transition>
        </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "@/components/Homepage/Includes/Header";

export default {
  components: {
    Header,
  },
  transition: "page",
};
</script>

<style lang="scss">
@import '@/assets/theme/scss/_variables.scss';

.el-aside {
  height: 100%;
}

.main-container {
  background-color: $secondary;
  max-height: 100vh;

  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: $secondary; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $gray-500; 
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: $gray-600; 
  }
  
}

@font-face {
  font-family: LLBrown;
  src: url("~assets/fonts/BrownProTT-Regular.ttf") format("truetype");
}

@font-face {
  font-family: LLBrown Bold;
  font-weight: bold;
  src: url("~assets/fonts/lineto-brown-pro-bold.woff") format("woff");
}
html {
  overflow-y: hidden;
}

body {
  font-family: LLBrown, Open Sans, Segoe UI, sans-serif !important;
  background-color: $secondary;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}

.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 200ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
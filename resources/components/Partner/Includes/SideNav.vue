<template>
  <perfect-scrollbar>
    <el-menu class="sidebar-menu border-0" :router="true" :default-active="activeIndex">
      <el-menu-item 
      index="partner" 
      :route="{name: 'partner'}" 
      class="menu-item  text-lg-left text-center">
        <i class="icon-dashboard"></i>
        <span class="menu-item__title d-none d-lg-inline">Dashboard</span>
      </el-menu-item>
      <el-menu-item
        index="partner-campaigns"
        :route="{name: 'partner-campaigns'}"
        class="menu-item  text-lg-left text-center"
      >
        <i class="icon-campaigns"></i>
        <span class="menu-item__title d-none d-lg-inline">Campaigns</span>
      </el-menu-item>
      <el-menu-item
        index="partner-statistics"
        :route="{name: 'partner-statistics'}"
        class="menu-item text-lg-left text-center"
      >
        <i class="icon-statistics"></i>
        <span class="menu-item__title d-none d-lg-inline">Statistics</span>
      </el-menu-item>
      <!-- <el-menu-item
        index="partner-postback"
        :route="{name: 'partner-postback'}"
        class="menu-item text-lg-left text-center"
      >
        <div class="icon-postback"></div>
        <span class="menu-item__title d-none d-lg-inline">Postback</span>
      </el-menu-item>
      <el-menu-item
        index="partner-payments"
        :route="{name: 'partner-payments'}"
        class="menu-item text-lg-left text-center"
      >
        <div class="icon-payments"></div>
        <span class="menu-item__title d-none d-lg-inline">Payments</span>
      </el-menu-item> -->
      <el-menu-item
        index="partner-settings"
        :route="{name: 'partner-settings'}"
        class="menu-item text-lg-left text-center"
      >
        <div class="icon-settings"></div>
        <span class="menu-item__title d-none d-lg-inline">Settings</span>
      </el-menu-item>
    </el-menu>
  </perfect-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null
    };
  },
  mounted: function() {
    this.activeIndex = this.$route.name;
  },
  watch: {
    $route(to, from) {
      this.activeIndex = to.name;
    }
  }
};
</script>

<style lang="scss">
@import '@/assets/theme/scss/_variables.scss';

.sidebar-menu {
  z-index: 2002;
  background-color: $secondary !important;
  min-height: 100vh;
  padding-top: 90px;

  .menu-item {
    color: #909399;

    &.is-active {
      color: #000;
    }

    &:hover {
      color: #000;
    }

    &:focus,
    &:hover {
      background-color: $secondary !important;
    }

    &__title{
      margin-left: 0.5rem !important;
      font-weight: 500 !important;
    }
  }
}

.icon-settings {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,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")
    50% 50% no-repeat;
  background-size: 100%;
}

.icon-statistics {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,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")
    50% 50% no-repeat;
  background-size: 100%;
}

.icon-campaigns {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,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")
    50% 50% no-repeat;
  background-size: 100%;
}

.icon-dashboard {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,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")
    50% 50% no-repeat;
  background-size: 100%;
}

.icon-postback {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA/wD/AP+gvaeTAAAEP0lEQVRIie3Ub2jVVRjA8e9z9ru/393ctNCb6cgCK82p5WzqkuyqOKWlYTablWgLwQX+QSVQ30whg6JZggVFJFPSbbBEa5ZoalMXgyVU01AqNGmijvAPc7v3d87Ti7i2TS2v+ip6Xp7znOfDc/7Bfz3kThR5cJHGXJKxAtnAb3c5mpo/lOQdB4eU6UDPo1JhhAj7neOSwGCEfFU2HPuIDSDadY25VWzUKzqsl/B1xLIj0kFREPJ91PFH1FHlGQqjSv5jr1IF2q2pWwIL5+vQQNnuO+ZFHVmZhoOB5YHA0h4JmZPVwR7PsSZwuHHzWNR1bdpbOr5Mc7wkB1UpF8NolBJPmLm3StpSOU/N1ekIb7gMJpuQxsuZPJI607Q7zOpgqW+pDhy5gaVUOni6KwZwYLPsDEKOZiYY6zua+16kIDXnpQtGLXMwTBDHIS9CvK5WLt8gr1GFPJRfBAYBhyHNDuNx9fwQ/AR3B45TdVukFaCkRGM9cyMhuVHLeT+kTyTkYmo8LTAWIxJ1SNQyyA/p/+Isnfryc5rvhxzqis6Zrv2ijpJe8EXUEfcTNKXmburSVMTVa4kRqa2VK2Uz9ATQrkKNKKOBYoFxH++QIwCvlWh2Zyf1wCaUpINpn+yUl1K1bniGZTM0x7csFSg9C6ZfO1perD4hp/sXU5oxggUYVra+CVbpB7DwGc3Vdmp82GaUFhU2oUzsWve64PIiHWoTVItSnQiZEAT0DR33Gah8aBKlwRDqSFCI4Lc5mlHWL52mrVjuB1YBrcBmscxc/5Wc+Udw5WQd5pTtnmO+wkDfcJgkJz0YILB18HAWaIJCoPHMj2wMQnYLLHMZnLRXaMuIUC6wVpVn39ojx3rW7wZWTNGBzlKnIXNFGAOUhkni6xqktWKSFjlYOCDJSnX4x0+w8dcv2RZAFHgXSwSDw7LVBIyr2CUXe2LXgH6SSnWsxTACR0lSmLqu4a93FklyHkPx55UgwncouwOIrj4gD1fkqd+7NxnLGuXK9ZCucfWWvv2E3iOGfcZS5AwHiVCwYr+cB9jwpMYSyiExvGBDYsbwjhqWiON9P4dHF++Szn+DUnH1HWYqY4KQ/b5Q7FuqUxjA4gY55wvjl38jR14/LLsDy9kg5GRg0XuzCW8Wgy5bGlhyVLmA0lcdv/dMXNwg5wA+KNRcY8nFckEysLNrxaYDXu0w4jgVOAb7lpbAUni95Jo8zc7qpCZwrI5CeRDyaTpYN7BTaQosj5sE30Ydw6tH6vRu2CiNOZ/6QNkWhLQGllkS8l66YLev7bORukQd+SqsMbAd4SjQKI5cNcxWx1pjaFHHZivMeP4H+em2QEWlfhhVRlCTwQpNUuAgT6BNoN7BFAyrjDJr2lFpSRe7Bkyhe4ewCFgCHAF+BvoAcYFm47F8Ykv37+q2wFTsi6vnn6ZAlUEol5IeTROP//1U/o8bxZ9FOLagDraFvQAAAABJRU5ErkJggg==")
    50% 50% no-repeat;
  background-size: 100%;
}

.icon-payments {
  display: inline-block;
  width: 28px;
  height: 28px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAABmJLR0QA/wD/AP+gvaeTAAAED0lEQVRIie2WbWiVZRjHf9dzznmeM9FCLEcLl5i02iIGvWij0KFWFmZKB02MhtkUMoigHAzCMVZtROtloVtoupxbG2mbkKQJhcPADw1jWgurkWvrhUI3k+2c536uPpxzds7OSzuD+tb/031f1/2//td1PffLA//jX4bMlLDgOa1QZaeAIjRcfEf2/yeCRTu0wDW0CIy7wo48Fwn7aBKwfT62DTTJ8EyTz4riSg2VVOqFkm1aORNfJvxjhXds1/n+CLsVgl6EyrOt8nNtrxZ5Hs0AKlTuul++W7JV8yOwWxUH5Zm+fdmrzSp4b4WGgFdFaTh9QFri9n2faScQirE7t6yQDdNxkuFPNdy3SecGfLylhvl4LP+8TYaS/YUT/BYfqybGAF/ul67lFXpKlebyJ3Wl6+fZU+/L71krfHCjPoLF6wqNxw/xHoimJvRtt87xebwAYCzeuHWtjGWq5KFNGlKoRan+tF0+ShNcs0EfEGjw4Cn18VOmIDOFGAotOIDFiz3tcgKSWmq7XLCEMeA0hm+SeDejjCBcBRai/EF0HShzEOYBgyizEG4Avk/i3gZ85bkJ25SWhkJqOy7nVai2FC8ak12uYVVHjwxvXqevAT6BMzHBJSq4B49I1cZHtcDn47gFNQCeYIlSN+GnuKtLwnGNKZumq0vCW9dqtSq1CIdRVqC0Hjwa3eY6zivBAGcEZseSKR+PcA9AR48MP71GP0B4CeEkynoRqg8miQFYqX23Iww4Luf2dkuVbei1YSDuazsmo7ZhxB+m3h+m3jaMtB2T0UkuDNiG3r3dUuW4nLMjCW7GCmMkLBMdO256SkED8a0rZqrPcSH6IaLrPF9q9AyCsyJgYhEdTYhPBjVAPFCKL89M6hEw4PNIQ3qFEdBYVUEXJOUuclyQSHSsqT4DGks26IHkIhgg0apMLXW8aBLiUWCE6+qWaXPcJy4FStQmhkUoVXXL9DKAKFeNn6b0lobBi4k4CprStqAB8YPnsScAjRZZL4mu5IkqN+FxeIpgZ0h9vw6xEsMtTWW6U13uVpjXVKZFk0RDobpstwLceLGea4DbswimYUEV+VMELw2yxRHKgdaY6WgGXguACM5dYzTmKgZwRRidFHx7sTqOx2OiXK/CndORZZyJsjE2z0Twi3HenRTMn81qNVyyLF4m7Y1Ih5lgaeHj8nF7qX4okGi58PATfZkf4I5SbUxc3h55KOUYluaSra3kAcyd4Pm/gtgYjGVx5WwfowBHSnUhHhUA6vHL+n7Z45ikY7Hua2kH2nMRA/ikWH+MVfRmcIIiCwZWn0+8/naEcQsGY9M/IXpOZ/ybGMfJIh3yIpSs+kEu57L+xCK91grQn3YOc0XQpcaz6O9drOHpV4OCLYaavwFBAJ/1OIwz8wAAAABJRU5ErkJggg==")
    50% 50% no-repeat;
  background-size: 100%;
}
</style>
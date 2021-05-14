<template>
  <center>
    <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
      <tbody>
        <AppHeader></AppHeader>
        <tr id="pagespace" title="" style="height:10px"></tr>
        <tr>
          <td>
            <router-view/>
          </td>
        </tr>
        <AppFooter></AppFooter>
      </tbody>
    </table>
  </center>
</template>

<style lang="scss">
@import "./assets/scss/application.scss";
@import "./assets/scss/scaffolds.scss";

</style>

<script>
import AuthStore from '@/store-cold/auth/index.js';
import AppHeader from '@/components/AppHeader/AppHeader';
import AppFooter from '@/components/AppFooter/AppFooter';

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data: () => ({
    drawer: false,
  }),
  methods: {
    logoutFunction() {
      AuthStore.clearAuthData();
      this.$router.push('/');
    }
  }

}
</script>


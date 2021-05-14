<template src="./AppComponent.html"></template>

<script>
export default {
    name: 'AppComponent',
    components: {
    },
    props: {
      componentProp: Object,
    },
    data: () => ({
      componentData: [],
    }),
    watch: {
      componentProp: function () {
        console.log("props have changed!")
      },
    },
    methods: {
      refreshComponentData: function() {
        console.log(componentData);
      }
    },
    mounted() {
      this.refreshComponentData();
    }
}
</script>

<style lang="scss" src="./AppComponent.scss"></style>
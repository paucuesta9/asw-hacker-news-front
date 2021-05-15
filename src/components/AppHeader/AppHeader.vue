<template src="./AppHeader.html"></template>

<script>
export default {
    name: 'AppHeader',
    data: () => ({
        user: localStorage.getItem('user'),
    }),
    methods: {},

}
</script>

<style lang="scss" src="./AppHeader.scss"></style>
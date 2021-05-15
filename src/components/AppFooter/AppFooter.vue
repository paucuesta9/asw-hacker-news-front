<template src="./AppFooter.html"></template>

<script>
export default {
    name: 'AppFooter',
    data: () => ({
        user: localStorage.getItem('user'),
    }),
    methods: {},
}
</script>

<style lang="scss" src="./AppFooter.scss"></style>
<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

import AppComponent from '@/components/AppComponent/AppComponent';

export default {
    name: 'Home',
    components: {
      //AppComponent,
    },
    data: () => ({
        posts: [],
    }),
    methods: {
        getPosts: function(){
            DataProvider("POSTS", "GET_POSTS").then((res) => {
                
                console.log(res);
            });
            DataProvider("COMMENTS", "GET_COMMENTS", {user_id: 1}).then((res) => {
                console.log(res);
            })
        },
        buildPostsData: function(postsData) {
            console.log(postsData);
        },
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>
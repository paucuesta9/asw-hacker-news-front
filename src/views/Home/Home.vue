<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Home',
    data: () => ({
        posts: [],
    }),
    methods: {
        getPosts: function(){
            DataProvider("POSTS", "GET_POSTS").then((res) => {
                let newPosts = JSON.parse(JSON.stringify(res));
                newPosts.forEach(post => {
                    post.voted = true;
                    post.typePost = post.url == "" ? "ask" : "link";
                });
                this.posts = newPosts;
            });
            DataProvider("COMMENTS", "GET_COMMENTS", {user_id: 1}).then((res) => {
                console.log(res);
            })
        },
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>
<template src="./Ask.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Ask',
    data: () => ({
        user: localStorage.getItem('user'),
        posts: [],
    }),
    methods: {
        getPosts: function(){
            DataProvider("POSTS", "GET_POSTS").then((res) => {
                let newPosts = JSON.parse(JSON.stringify(res));
                newPosts.forEach(post => {
                    post.voted = true;
                    post.typePost = post.url == "" ? "ask" : "link";
                    if(post.typePost == "ask") this.posts.push(post);
                });
            });
        },
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss" src="./Ask.scss"></style>
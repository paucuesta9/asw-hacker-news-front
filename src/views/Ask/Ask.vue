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
        timeAgo: function(time) {
            var seconds = Date.now() - new Date(time);
            seconds = Math.floor(seconds/1000);
            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss" src="./Ask.scss"></style>
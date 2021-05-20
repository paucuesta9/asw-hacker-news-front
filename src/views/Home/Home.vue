<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Home',
    data: () => ({
        user: localStorage.getItem('user'),
        posts: [],
    }),
    methods: {
        getPosts: function(){
            DataProvider("POSTS", "GET_POSTS").then((res) => {
                let newPosts = JSON.parse(JSON.stringify(res));
                DataProvider("POSTS", "GET_POSTS").then((result) => {
                    let votedPosts = JSON.parse(JSON.stringify(result));
                    newPosts.forEach(post => {
                        let found = votedPosts.find(p => p.id == post.id);
                        if(found != undefined){
                            post.voted = true;
                            //console.log("si");
                        } 
                        else post.voted = false;
                        post.typePost = post.url == "" ? "ask" : "link";
                    });
                    console.log(votedPosts);
                });
                this.posts = newPosts;
            });
        },
        votePost: function(post){
            DataProvider("POSTS", "VOTE_POST", post.id).then((res) => {
              console.log(res);  
            });
        },
        unvotePost: function(post){
            DataProvider("POSTS", " UNVOTE_POST", post.id).then((res) => {
              console.log(res);  
            });
        },
    },
    mounted() {
        this.getPosts();
    }
}
</script>

<style lang="scss" src="./Home.scss"></style>
<template src="./Post.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

//Components
import AppCommentInTree from '@/components/AppCommentInTree/AppCommentInTree';

export default {
    name: 'Post',
    components: {
        AppCommentInTree,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        post: {},
        comments: [],
        commentFormError: "",
        commentFormText: "",
    }),
    methods: {
        getPost: async function(){
            let newPost = await DataProvider("POSTS", "GET_POST", {post_id: this.$route.params.id}).then((res) => {return res});
            let votedPosts = await DataProvider("POSTS", "GET_VOTED_POSTS").then((res) => {return res});
            newPost.voted = votedPosts.find(p => p.id == newPost.id) != undefined ? true : false;
            newPost.typePost = newPost.url == "" ? "ask" : "link";
            newPost.time_elapsed = getTimeSince(newPost.created_at);
            newPost.user_username = await DataProvider("USERS", "GET_USER", newPost.user_id).then((res) => {return res.username});
            newPost.num_comments = await DataProvider("COMMENTS", "GET_COMMENTS", {post_id: newPost.id}).then((res) => {return res.length});
            this.post = newPost;
        },
        getComments: function(){
            DataProvider("COMMENTS", "GET_COMMENTS", {post_id: this.$route.params.id}).then((res) => {
                this.comments = res;
            })
        },
        submitComment: function(e){
            e.preventDefault();
            if(this.commentFormText != "") {
                this.commentFormError = "";
                let newComment = {
                    text: this.commentFormText,
                    post_id: this.post.id,
                }
                DataProvider("COMMENTS", "NEW_COMMENT", newComment).then(() => {
                    this.commentFormText = "";
                    this.getComments();
                }).catch((error) => {
                    this.commentFormError = error;
                });
            }
            else {
                this.commentFormError = "The comment can't be empty!";
            }
        },
        votePost: function(post){
            DataProvider("POSTS", "VOTE_POST", post.id).then((res) => {
              this.getPost();
            });
        },
        unvotePost: function(post){
            DataProvider("POSTS", "UNVOTE_POST", post.id).then((res) => {
              this.getPost();
            });
        },
    },
    beforeMount() {
        this.getPost();
        this.getComments();
    }
}
</script>

<style lang="scss" src="./Post.scss"></style>
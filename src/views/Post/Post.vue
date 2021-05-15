<template src="./Post.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
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
        getPost: function(){
            DataProvider("POSTS", "GET_POST", {post_id: this.$route.params.id}).then((res) => {
                this.post = res;
            })
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
                //let newComment = {
                //    text: this.commentFormText,
                //    url: this.url,
                //    text: this.text,
                //}
                //DataProvider("POSTS", "NEW_POST", newPost).then(() => {
                //    this.$router.push({ name: "Home"})
                //}).catch((error) => {
                //    this.error = error;
                //});
            }
            else {
                this.commentFormError = "The comment can't be empty!";
            }
        },
    },
    beforeMount() {
        this.getPost();
        this.getComments();
    }
}
</script>

<style lang="scss" src="./Post.scss"></style>
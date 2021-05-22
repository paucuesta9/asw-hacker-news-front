<template src="./Reply.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'Reply',
    components: {
        AppReplyInTree,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        post: {},
        reply: {},
        replies: [],
        user: {},
        replyFormError: "",
        replyFormText: "",
    }),
    methods: {
        getReply: function(){
            DataProvider("REPLIES", "GET_REPLY", {reply_id: this.$route.params.id}).then((res) => {
                this.reply = res;
                this.getPost();
                this.getUser();
            })
        },
        getReplies: function(){
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: this.$route.params.id, parent_type: "Reply"}).then((res) => {
                this.replies = res;
            })
        },
        submitReply: function(e){
            e.preventDefault();
            if(this.replyFormText != "") {
                this.replyFormError = "";
                let newReply = {
                   text: this.commentFormText,
                   parent_id: this.$route.params.id,
                   parent_type: "Reply",
                }
                DataProvider("REPLIES", "NEW_REPLY", newPost).then(() => {
                   this.$router.push({ name: "Home"})
                }).catch((error) => {
                   this.error = error;
                });
            }
            else {
                this.commentFormError = "The reply can't be empty!";
            }
        },
        getPost: function(){
            DataProvider("POSTS", "GET_POST", {post_id: this.comment.post_id}).then((res) => {
                this.post = res;
            })
        },
        getUser: function(){
            DataProvider("USERS", "GET_USER", {user_id: this.reply.user_id}).then((res) => {
                this.user = res;
            })
        },
    },
    beforeMount() {
        this.getReply();
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./Reply.scss"></style>
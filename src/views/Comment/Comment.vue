<template src="./Comment.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppCommentInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'Comment',
    components: {
        AppCommentInTree,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        comment: {},
        replies: [],
        replyFormError: "",
        replyFormText: "",
    }),
    methods: {
        getComment: function(){
            DataProvider("COMMENTS", "GET_COMMENT", {comment_id: this.$route.params.id}).then((res) => {
                this.comment = res;
            })
        },
        getReplies: function(){
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: this.$route.params.id, parent_type: "Comment"}).then((res) => {
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
                   parent_type: "Comment",
                }
                DataProvider("REPLIES", "NEW_REPLY", newPost).then(() => {
                   this.$router.push({ name: "Home"})
                }).catch((error) => {
                   this.error = error;
                });
            }
            else {
                this.commentFormError = "The comment can't be empty!";
            }
        },
    },
    beforeMount() {
        this.getComment();
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./Comment.scss"></style>
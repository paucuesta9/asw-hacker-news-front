<template src="./Comment.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';
import { getTimeSince } from '@/helpers/index.js';

export default {
    name: 'Comment',
    components: {
        AppReplyInTree,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        comment: {},
        replies: [],
        replyFormError: "",
        replyFormText: "",
    }),
    methods: {
        getComment: async function(){
            let newComment = await DataProvider("COMMENTS", "GET_COMMENT", {comment_id: this.$route.params.id}).then((res) => {return res});
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            newComment.voted = votedComments.find(c => c.id == newComment.id) != undefined ? true : false;
            newComment.time_elapsed = getTimeSince(newComment.created_at);
            newComment.user_username = await DataProvider("USERS", "GET_USER", newComment.user_id).then((res) => {return res.username});
            newComment.num_replies = await DataProvider("REPLIES", "GET_REPLIES", {parent_id: newComment.id, parent_type: "Comment"}).then((res) => {
                this.replies = res;
                return res.length;
            });
            newComment.post_title = await DataProvider("POSTS", "GET_POST", {post_id: newComment.post_id}).then((res) => {return res.title});
            this.comment = newComment;
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
    }
}
</script>

<style lang="scss" src="./Comment.scss"></style>
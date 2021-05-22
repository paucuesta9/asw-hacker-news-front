<template src="./Reply.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';
import { getTimeSince } from '@/helpers/index.js';

export default {
    name: 'Reply',
    components: {
        AppReplyInTree,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        reply: {},
        replies: [],
        replyFormError: "",
        replyFormText: "",
    }),
    methods: {
        getReply: async function(){
            let newReply = await DataProvider("REPLIES", "GET_REPLY", {reply_id: this.$route.params.id}).then((res) => {return res});
            let votedReplies = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            newReply.voted = votedReplies.find(c => c.id == newReply.id) != undefined ? true : false;
            newReply.time_elapsed = getTimeSince(newReply.created_at);
            newReply.user_username = await DataProvider("USERS", "GET_USER", newReply.user_id).then((res) => {return res.username});
            newReply.num_replies = await DataProvider("REPLIES", "GET_REPLIES", {parent_id: newReply.id, parent_type: "Reply"}).then((res) => {
                this.replies = res;
                return res.length;
            });
            //newReply.post_title = await DataProvider("POSTS", "GET_POST", {post_id: newReply.post_id}).then((res) => {return res.title});
            this.reply = newReply;
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
        this.getReply();
    }
}
</script>

<style lang="scss" src="./Reply.scss"></style>
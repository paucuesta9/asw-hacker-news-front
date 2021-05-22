<template src="./AppReplyInTree.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'AppReplyInTree',
    components: {
        AppReplyInTree
    },
    props: {
        replyObj: Object,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        replies: [],
        reply: {},
    }),
    methods: {
        getReplies: async function(){
            let newReply = JSON.parse(JSON.stringify(this.replyObj));
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            newReply.voted = votedComments.find(c => c.id == newReply.id) != undefined ? true : false;
            newReply.time_elapsed = getTimeSince(newReply.created_at);
            newReply.user_username = await DataProvider("USERS", "GET_USER", newReply.user_id).then((res) => {return res.username});
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: newReply.id, parent_type: "Reply" }).then((res) => {
                this.replies = res;
            });
            this.reply = newReply;
        },
        voteReply: function(reply){
            DataProvider("REPLIES", "VOTE_REPLY", reply.id).then((res) => {
              this.reply.voted = true;
            });
        },
        unvoteReply: function(reply){
            DataProvider("REPLIES", "UNVOTE_REPLY", reply.id).then((res) => {
              this.reply.voted = false;
            });
        },
    },
    beforeMount() {
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./AppReplyInTree.scss"></style>
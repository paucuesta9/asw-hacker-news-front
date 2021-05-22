<template src="./AppCommentInTree.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'AppCommentInTree',
    components: {
        AppReplyInTree
    },
    props: {
        commentObj: Object,
    },
    data: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        replies: [],
        comment: {},
    }),
    methods: {
        getReplies: async function(){
            let newComment = JSON.parse(JSON.stringify(this.commentObj));
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            newComment.voted = votedComments.find(c => c.id == newComment.id) != undefined ? true : false;
            newComment.time_elapsed = getTimeSince(newComment.created_at);
            newComment.user_username = await DataProvider("USERS", "GET_USER", newComment.user_id).then((res) => {return res.username});
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: newComment.id, parent_type: "Comment" }).then((res) => {
                this.replies = res;
            });
            this.comment = newComment;
        },
        voteComment: function(comment){
            DataProvider("COMMENTS", "VOTE_COMMENT", comment.id).then((res) => {
              this.comment.voted = true;
            });
        },
        unvoteComment: function(comment){
            DataProvider("COMMENTS", "UNVOTE_COMMENT", comment.id).then((res) => {
              this.comment.voted = false;
            });
        },
    },
    beforeMount() {
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./AppCommentInTree.scss"></style>
<template src="./Threads.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

export default {
    name: 'Threads',
    data: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        comments: [],
    }),
    methods: {
        getComments: async function() {
            let userComments = [];
            if(this.$route.name == "CommentsUser") {
                userComments = await DataProvider("COMMENTS", "GET_COMMENTS", {user_id: this.$route.params.id}).then((res) => {return res});
            }
            else if(this.$route.name == "Threads") {
                userComments = await DataProvider("COMMENTS", "GET_COMMENTS", {user_id: this.user.id}).then((res) => {return res});
            }
            else if(this.$route.name == "Comments_voted") {
                userComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            }
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            
            await Promise.all(userComments.map(async (comment) => {
                comment.voted = votedComments.find(vc => vc.id == comment.id) != undefined ? true : false;
                comment.typeParent = !!comment.id_post ? "post" : "comment";
                comment.time_elapsed = getTimeSince(comment.created_at);
                comment.user_username = await DataProvider("USERS", "GET_USER", comment.user_id).then((res) => {return res.username});
                if (!!comment.parent_id) {
                    let text = await DataProvider("COMMENTS", "GET_COMMENT", {comment_id: comment.parent_id}).then((res) => {return res});
                    comment.parentText = text.text;
                }
                else {
                    let text = await DataProvider("POSTS", "GET_POST", {post_id: comment.post_id}).then((res) => {return res});
                    comment.parentText = text.text;

                }
            }));

            this.comments = userComments;
        },

        voteComment: function (comment) {
            DataProvider("COMMENTS", "VOTE_COMMENT", comment.id).then((res) => {
              this.getComments();
            });
        },

        unvoteComment: function (comment) {
            DataProvider("COMMENTS", "UNVOTE_COMMENT", comment.id).then((res) => {
              this.getComments();
            });
        },
    },

    beforeMount() {
        this.getComments();
    },
}
function pointsComparator(a, b) {
    return b.points - a.points;
}
</script>

<style lang="scss" src="./Threads.scss"></style>
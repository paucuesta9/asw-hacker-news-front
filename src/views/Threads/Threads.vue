<template src="./Threads.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Threads',
    data: () => ({
        user: localStorage.getItem('user'),
        comments: [],
    }),
    methods: {
        getComments: async function() {
            let userComments = await DataProvider("COMMENTS", "GET_COMMENTS", {user_id: "1"}).then((res) => {return res});
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENT").then((res) => {return res});

            await Promise.all(userComments.map(async (comment) => {
                comment.voted = votedComments.find(vc => vc.id == comment.id) != undefined ? true : false;
                comment.typeParent = !!comment.id_post ? "post" : "comment";

                let id;

                if (!!comment.parent_id) {
                    id = comment.parent_id;
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

        timeAgo: function(time) {
            var seconds = Date.now() - new Date(time);
            seconds = Math.floor(seconds/1000);
            var interval = seconds / 31536000;

            if (interval > 1) {
                return Math.floor(interval) + " years";
            }
            interval = seconds / 2592000;
            if (interval > 1) {
                return Math.floor(interval) + " months";
            }
            interval = seconds / 86400;
            if (interval > 1) {
                return Math.floor(interval) + " days";
            }
            interval = seconds / 3600;
            if (interval > 1) {
                return Math.floor(interval) + " hours";
            }
            interval = seconds / 60;
            if (interval > 1) {
                return Math.floor(interval) + " minutes";
            }
            return Math.floor(seconds) + " seconds";
        },
    },

    beforeMount() {
        this.getComments();
    },

    mounted() {
    }
}
</script>

<style lang="scss" src="./Threads.scss"></style>
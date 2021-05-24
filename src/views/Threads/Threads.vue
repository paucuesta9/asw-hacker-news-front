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
            let votedComments = await DataProvider("COMMENTS", "GET_VOTED_COMMENTS").then((res) => {return res});
            this.comments =  userComments;

            await Promise.all(userComments.map(async (comment) => {
                comment.voted = votedComments.find(c => c.id == comment.id) != undefined ? true : false;
                console.log(DataProvider("POSTS", "GET_POST", {id: comment.post_id}));
                comment.pare = await DataProvider("POSTS", "GET_POST", {post_id: comment.post_id == undefined ? comment.parent_id : comment.post_id}).then((res) => {return res.id});
                console.log(comment.pare);
            }));
        },

        voteComment: function (comment) {

        },

        unvoteComment: function (comment) {

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
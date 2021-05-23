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
            this.comments =  userComments;
        },

        getText: async function() {
            this.comments.forEach(async x => {
                let id;

                if (!!x.parent_id) {
                    id = x.parent_id;
                    let text = await DataProvider("COMMENTS", "GET_COMMENT", {comment_id: x.parent_id}).then((res) => {return res});
                    x.parentText = text.text;
                }

                else {
                    let text = await DataProvider("POSTS", "GET_POST", {post_id: x.post_id}).then((res) => {return res});
                    x.parentText = text.text;

                }
            });
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
        this.getText();
    },

    mounted() {
        /* this.getComments();
        this.getText(); */
    }
}
</script>

<style lang="scss" src="./Threads.scss"></style>
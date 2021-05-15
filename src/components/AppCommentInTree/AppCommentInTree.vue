<template src="./AppCommentInTree.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'AppCommentInTree',
    components: {
        AppReplyInTree
    },
    props: {
        comment: Object,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        replies: [],
    }),
    methods: {
        getReplies: function(){
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: this.comment.id, parent_type: "Comment" }).then((res) => {
                this.replies = res;
            });
        },
    },
    beforeMount() {
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./AppCommentInTree.scss"></style>
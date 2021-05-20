<template src="./AppReplyInTree.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import AppReplyInTree from '@/components/AppReplyInTree/AppReplyInTree';

export default {
    name: 'AppReplyInTree',
    components: {
        AppReplyInTree
    },
    props: {
        reply: Object,
    },
    data: () => ({
        user: localStorage.getItem('user'),
        replies: [],
    }),
    methods: {
        getReplies: function(){
            DataProvider("REPLIES", "GET_REPLIES", {parent_id: this.reply.id, parent_type: "Reply" }).then((res) => {
                console.log(res);
                this.replies = res;
            });
        },
    },
    beforeMount() {
        this.getReplies();
    }
}
</script>

<style lang="scss" src="./AppReplyInTree.scss"></style>
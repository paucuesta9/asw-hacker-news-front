<template src="./Home.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

export default {
    name: 'Home',
    data: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        posts: [],
    }),
    methods: {
        getPosts: async function(){
            let newPosts = await DataProvider("POSTS", "GET_POSTS").then((res) => {return res});
            let votedPosts = await DataProvider("POSTS", "GET_VOTED_POSTS").then((res) => {return res});

            await Promise.all(newPosts.map(async (post) => {
                post.voted = votedPosts.find(p => p.id == post.id) != undefined ? true : false;
                post.typePost = post.url == "" ? "ask" : "link";
                post.time_elapsed = getTimeSince(post.created_at)
                post.user_username = await DataProvider("USERS", "GET_USER", post.user_id).then((res) => {return res.username});
                post.num_comments = await DataProvider("COMMENTS", "GET_COMMENTS", {post_id: post.id}).then((res) => {return res.length});
            }));
            // Filter Posts
            if(this.$route.name == "Ask") newPosts = newPosts.filter(post => post.typePost == "ask");

            // Sort posts
            if(this.$route.name == "Newest") newPosts.sort(dateTimeComparator);
            else newPosts.sort(pointsComparator);
            this.posts = newPosts;
        },
        votePost: function(post){
            DataProvider("POSTS", "VOTE_POST", post.id).then((res) => {
              this.getPosts();
            });
        },
        unvotePost: function(post){
            DataProvider("POSTS", "UNVOTE_POST", post.id).then((res) => {
              this.getPosts();
            });
        },
    },
    mounted() {
        this.getPosts();
    }
}

function dateTimeComparator(a, b) {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
}
function pointsComparator(a, b) {
    return b.points - a.points;
}
</script>

<style lang="scss" src="./Home.scss"></style>

for (const file of files) {
    const contents = await fs.readFile(file, 'utf8');
    console.log(contents);
  }
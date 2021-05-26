<template src="./User.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';
import { getTimeSince } from '@/helpers/index.js';

export default {
    name: 'User',
    data: () => ({
        loggedUser: JSON.parse(localStorage.getItem('user')),
        user: {},
        about: "",
        error: "",
    }),
    methods: {
        getUser: async function(){
            let newUser = await DataProvider("USERS", "GET_USER", this.$route.params.id).then((res) => {return res});
            console.log(newUser);
            newUser.created_atAgo = getTimeSince(newUser.created_at);
            this.user = newUser;
            this.about = newUser.about;
        },
        aboutCheck: function(e){
            e.preventDefault();
            if(this.about != "") {
                DataProvider("USERS", "PUT_USER", {about:this.about})
            }
            else {
                this.error = "The user can't have an empty about!";
            }
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
        this.getUser();
    }
}
</script>

<style scoped lang="scss" src="./User.scss"></style>
<template src="./AppHeader.html"></template>

<script>
import auth from '@/store-cold/auth/index.js';

export default {
    name: 'AppHeader',
    data: () => ({
        user: JSON.parse(localStorage.getItem('user')),
        usersSelectOptions: [
            {id: 1, username: "Pau Cuesta"},
            {id: 2, username: "Joan Vilarrasa"}
        ],
    }),
    methods: {
        setNewUser: function(){
            auth.setUser(this.userSelectedId);
        }
    },
    beforeMount() {
        this.userSelectedId = this.user == null ? 2 : this.user.id;
    }

}
</script>

<style lang="scss" src="./AppHeader.scss"></style>
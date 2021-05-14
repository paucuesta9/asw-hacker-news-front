<template>
    <div class="view-container">
        <p>some stuff here</p>
    </div>
</template>

<script>
import { DataProvider } from "@/data-providers/_Index.js"

export default {
    name: "users",
    data(){
        return{
            users: [],
        }
    },
    methods: {
        obtenir_users: function(){
            //DataProvider("USERS", "USERS", {}).then((res) => {
            //    this.users = res.users;
            //})

        },
    },
    mounted() {
        this.obtenir_users();
    }
}

</script>

<style scoped>
table {
  width: 100%;
  border: 1px solid white;
}

</style>
<template src="./Submit.html"></template>

<script>
import { DataProvider } from '@/data-providers/_Index.js';

export default {
    name: 'Submit',
    data: () => ({
        user: localStorage.getItem('user'),
        title: "",
        url: "",
        text: "",
        error: "",
    }),
    methods: {
        submitFormData: function(e){
            e.preventDefault();
            if(this.title != "") {
                if(this.url != "" && this.text != "") {
                    this.error = "You cannot fill both text and url fields";
                }
                else if(this.url == "" && this.text == "") {
                    this.error = "You need to fill either text or url fields";
                }
                else {
                    this.error = "";
                    let newPost = {
                        title: this.title,
                        url: this.url,
                        text: this.text,
                    }
                    DataProvider("POSTS", "NEW_POST", newPost).then(() => {
                        this.$router.push({ name: "Home"})
                    }).catch((error) => {
                        this.error = error;
                    });
                }
            }
            else {
                this.error = "The post needs a title!";
            }
        },
    }
}
</script>

<style scoped lang="scss" src="./Submit.scss"></style>
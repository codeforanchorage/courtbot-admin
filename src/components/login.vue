<template>
<div>
    <form id="login" v-on:submit.prevent="sendLogin($event)" >
        <legend>Login</legend>
        <p>
            <input type="text" class="header"  v-model="user" required />
            <label>User Name</label>
        </p>
        <p>
            <input type="password" class="header"  v-model="password" required />
            <label>Password</label>
        </p>
        <button type="submit" v-if="!loading">Login</button>
        <div id="loading" v-if="loading">Loading</div>
        <span id="error" v-if="error">{{error}}</span>
        </form>
    </div>
</template>

<script>
import config from '@/config.js'
import auth from '@/auth.js'

const apiURL = config.API_URL + 'admin_login'

export default {
    name: 'login',
    data() {
        return {
            user: '',
            password: '',
            error: undefined,
            loading: false
        }
    },
    methods:{
        sendLogin: function(e){
            this.loading = true
            this.error=false
            this.$http.post(apiURL, {user: this.user, password: this.password} )
            .then(r => r.json())
            .then(r => {
                this.loading = false
                if(r.token){
                    auth.token =  r.token
                    this.$router.push('/')
                }
                console.log("recieved token", r)
                })
            .catch(err => {
                this.loading = false
                this.error = err.body.message
                this.password = ''
                e.target.reset() // brings placeholder text back in safari
                e.target.querySelector("input").blur()
                console.log("error: ", err)
                })
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   form {
        position: relative;
        width: min-content;
        padding: 2em;
        padding-top: 1em;
        border: 1px solid steelblue;
        margin-left: auto;
        margin-right: auto;

    }
    legend{
        font-weight: 800;
    }
    input {
    font-size:18px;
    padding:10px 10px 5px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid steelblue;
    }
    form p {
        position: relative;
        margin-top: 2.5em;
    }
    input:focus { outline:none; }

    label {
    color:#999;
    font-size:1em;
    font-weight:normal;
    position:absolute;
    pointer-events:none;
    left:5px;
    top:1em;
    transition:0.2s ease all;
    -moz-transition:0.2s ease all;
    -webkit-transition:0.2s ease all;
    }

    input:focus ~ label, input:valid ~ label {
    top:-20px;
    font-size:1em;
    color: steelblue;
    }

    #error{
        color:darkred
    }

</style>

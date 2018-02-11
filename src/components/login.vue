<!--
    Displays login panel and sends login to API.
    On success API should respond with a JWT which is handled
    by src/auth.js
-->
<template>
    <div id="loginContainer">
        <form id="login" v-on:submit.prevent="sendLogin($event)" >
            <fieldset>
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
            </fieldset>
        </form>
    </div>
</template>

<script>
import auth from '@/auth.js'

const apiURL = 'admin_login'

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
            .then(r => r.data)
            .then(r => {
                this.loading = false
                if(r.token){
                    auth.token =  r.token
                    this.$router.push('/')
                }
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
   #routerview{
       position:absolute;
       margin: 0px !important;
       top:0px;
       left:0px;
       width: 100%;
       height: 100%;
       background-color: #fafafa;
       opacity: .75;
   }
   form {
        position: absolute;
        top: 50%;
        width: min-content;
        background-color: white;
        padding: 2em;
        margin-left: 50%;
        transform: translate(-50%, -60%);
        border-radius: 5px;
        box-shadow: 2px 2px 10px 3px #eee;
    }
    fieldset {
        border: 9px solid steelblue;
        padding: 2em;
        padding-top: 1em;
        border-radius: 5px;
    }
    button {
        margin-top: 2em;
        border: none;
        padding: .75em;
        background-color: steelblue ;
        color: white;
        border-radius: 5px;
        font-weight: bold;
        font-size:.75em;
    }
    legend{
        font-weight: 800;
        padding: 0 1em 0 1em;
        background-color: white;
    }
    input {
        font-size:18px;
        padding:10px 10px 5px 5px;
        display:block;
        max-width:400px;
        border:none;
        border-bottom:1px solid steelblue;
    }
    form p {
        position: relative;
        margin-top: 1.5em;
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
    @media (max-width: 800px){

    }
</style>

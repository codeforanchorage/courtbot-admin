<template>
  <div id="app">
    <div id="header">
        <router-link :to="{name: 'Root'}"><h1>Alaska Courtbot</h1></router-link>
        <form  v-on:submit.prevent="goToCitation($event)" v-if = 'auth.loggedIn'>
            <input type="text" class="header"  v-model="citationNumber" required />
            <label>Search Citation ID</label>
        </form>
        <div id = "user" v-if = 'auth.loggedIn' >
            {{auth.user}} <button v-on:click="logout">logout</button>
        </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
    import auth from './auth'
    export default {
        name: 'app',
        data () {
            return {
                citationNumber:"",
                auth: auth
            }
        },
        methods: {
            goToCitation: function(e){
                this.$router.push({ name: 'Citation-Search', params: { citationNumber: this.citationNumber }}, () => {
                        this.citationNumber = undefined;
                        e.target.reset() // brings placeholder text back in safari
                        e.target.querySelector("input").blur()
                })
            },
            logout: function(){
                auth.logOut()
                this.$router.push('/login')
            }
        }
    }
</script>

<style>
a {
    text-decoration: none;
    color: #2c3e50;
}
a:hover {
    color: steelblue;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 20px 20px 20px 20px;
}
#header {
    margin-top:30px;
    margin-bottom: 50px;
    display: flex;
}
h1 {
    margin:2px 1em 2px 2px;
}
form { position: relative;}
input {
    font-size:18px;
    padding:10px 10px 5px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid steelblue;
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
#user {
    position:absolute;
    right: 15px;
    top: 10px;
    border: 1px solid steelblue;
    padding-left: .3em;
}
#user button{
    background-color: steelblue;
    color: white;
    border: none;
    font-size: .875em;
    margin:0px;
    padding: .5em;
}
#user button:hover{
    background-color: white;
    color: steelblue;
}
</style>

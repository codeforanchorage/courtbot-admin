<template>
  <div id="app">
    <div id="header">
        <router-link :to="{name: 'Root'}"><h1>Courtbot Admin</h1></router-link>
        <div id = "user" v-if = 'auth.loggedIn' >
            {{auth.user}} <button v-on:click="logout">logout</button>
        </div>
    </div>
    <form  v-on:submit.prevent="goToCitation($event)" v-if = 'auth.loggedIn'>
            <input type="text" class="header"  v-model="citationNumber" required />
            <label>Search Citation ID</label>
        </form>
    <router-view id="routerview"></router-view>
    <div id="footer">
         A <a href="http://codeforanchorage.org">Code for Anchorage</a> project
    </div>
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
    h3 {
        text-transform: uppercase;
        font-size: 1em;
    }
</style>
<style scoped>
#routerview {
    margin: 3.5em 1em 0 1em;
    clear: both;
    padding-bottom: 80px;
}

#app {
    position: relative;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0px 0px 0px 0px;
    min-height: 100%;
}
#header {
    position: relative;
    display: flex;
    background-color:steelblue;
    padding:0px 20px 0px 20px;
}
h1 {
    margin:2px 1em 2px 2px;
    font-size: 1.25em;
    color: white;
    font-weight: 400;
    text-transform: uppercase;
}
form {
    position: relative;
    float: right;
    margin-right: 1em;
    }
input {
    font-size:16px;
    background-color: #fcfcfc;
    color: grey;
    font-weight: normal;
    padding:10px 10px 8px 5px;
    display:block;
    width:300px;
    border:none;
    border-bottom:1px solid lightgray;
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
    top:2.5em;
    font-size:1em;
    color: steelblue;
}
#user {
    position:absolute;
    right: 0px;
    top: 0px;
    padding-left: .5em;
    font-size: .875em;
    height: 100%;
}
#user button{
    position: relative;
    background-color: steelblue;
    color: white;
    border: none;
    font-size: .875em;
    margin:0px;
    padding: .5em;
    padding-right: 1em;
    height: 100%;
}

#user button:hover{
    background-color: white;
    color: steelblue;
}
#footer {
    position: absolute;
    bottom: 0px;
    font-size: .75em;
    text-transform: uppercase;
    height: 25px;
    text-align: center;
    width: 100%;
}
@media (max-width: 800px){
    form {
        float: left;
        margin-bottom: 2em;
        margin-left: 1.25em;
    }
}

</style>

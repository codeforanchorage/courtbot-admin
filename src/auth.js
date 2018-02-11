/*
    Currently this is just a wrapped for local storage.
    A JWT token should come from the API backend login
    This stores the token in local storage where it can be
    used to indicate login status and returned to API to authenticate.
*/

class auth{
    constructor(){
        this.loggedIn = !!this.token
        this.user = this.loggedIn ? this.getuser() : null
    }
    get token(){
        return localStorage.getItem('token')
    }
    set token(token) {
        localStorage.setItem('token', token)
        this.loggedIn = true;
        this.user = this.getuser()
    }
    logOut(){
        localStorage.removeItem('token')
        this.loggedIn = false
    }
    getuser(){
        if(!this.token) return null;
        var base64Url = this.token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        var data = JSON.parse(window.atob(base64));
        return data.user
    }
}

export default new auth()
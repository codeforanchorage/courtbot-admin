export default {
    API_URL: process.env.NODE_ENV == 'development' ? 'http://10.0.2.2:5000/api/' : 'https://courtbot-anc-test.herokuapp.com/api/'
}
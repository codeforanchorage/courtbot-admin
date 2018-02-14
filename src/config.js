export default {
    API_URL: process.env.NODE_ENV == 'development' ? 'http://localhost:5000/api/' : 'https://courtbot-anc-test.herokuapp.com/api/',
    TIME_ZONE: 'America/Anchorage'
}
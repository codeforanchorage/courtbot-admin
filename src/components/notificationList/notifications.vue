<template>
    <div class="notification_list">
        <h3>Notifications from past 30 days</h3>
        <div id="container">
            <div class="listing" v-for='record in records' v-bind:key='record.tpye'>
                <h3>{{record.type}}</h3>
                <notification class="notice" :notification='n' v-for='n in record.notices' v-bind:key='n.created_at'></notification>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/config.js'
import notification from '@/components/notificationList/notification'

const apiURL = config.API_URL + 'notifications'

export default {
    name: 'notification_list',
    data () {
        return {
            records:[],
        }
    },
    components:{
        notification: notification
    },
    methods: {
        findNotifications: function(id){
            this.search_error = ""
            this.$http.get(apiURL)
            .then(r => r.json())
            .then(r => this.records = r)
            .catch(e => console.log("error: ", e))
        }
    },
    beforeMount: function(){
        this.findNotifications()
    }
}

</script>

<style scoped>
    h3{
        text-transform:capitalize
    }
    #container {
            display: flex;
    }
    .listing {
        padding: 0 2em;
        border-right: 1px solid #ddd;
    }
    .notice:nth-child(even) {
        background-color: #f7fafc;
    }
</style>


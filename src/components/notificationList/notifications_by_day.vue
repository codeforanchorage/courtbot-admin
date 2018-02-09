<template>
    <div class="notification_list">
        <h3>Notifications sent during the past 30 days</h3>
        <p class="instruct">
            Notifictions listed as <i>reminder</i> are sent to users who have a hearing scheduled the next day. Those listed as <i>expired</i> are sent when a user has requested notifications for a case ID that was never found. Notifications marked <i>matched</i> are sent when we first discover a case that the user has asked us to watch for before it was in the system.
            <div id="notifications">
                <div class="day" v-for='record in records' v-bind:key='record.created_at'>
                    <h4>{{record.created_at | moment("dddd, MMMM Do YYYY, h:mm a")}} ({{record.notices.length}})</h4>
                    <ul>
                        <notification class="notice" :notification='n' v-for='n in record.notices' v-bind:key='n.created_at'></notification>
                    </ul>
                </div>
            </div>
    </div>
</template>

<script>
import config from '@/config.js'
import notification from '@/components/notificationList/notification_list_item'

const apiURL = config.API_URL + 'notifications_by_day'

export default {
    name: 'notifications_by_day',
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
        text-transform:capitalize;
    }
    h4 {
        font-weight: normal;
    }
    #notifications{
        border-top: 1px solid #ddd;
    }
    .notice:nth-child(even) {
        background-color: #f7fafc;
    }
    ul{
        padding-left: 1.5em;
    }
    p, ul {
        max-width: 800px;
    }
    p.instruct {
        color: #666;
        font-size: .875em;
        padding-left: 1.5em;
    }
</style>


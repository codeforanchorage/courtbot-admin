<!-- should decrypted phone numbers be available? -->
<template>
    <div v-bind:class="['request', {'inactive': !request.active}]">
        <div id="link">
            <router-link class="phone" v-if="showphone" :to="{name: 'Phone-Search', params:{phoneHash:request.phone} }">&#9742;</router-link>
        </div>

        <div id = "request_info">
            <div id="caseLink">
                <router-link class="caselink" v-if="showcase" :to="{name: 'Citation-Search', params:{citationNumber:request.case_id} }">{{request.case_id}}</router-link>
             </div>
            Requested:  {{request.created_at | moment("dddd, MMMM Do YYYY")}} <br>
            <span v-if="!request.active">{{active}}</span>

            <div  v-if="request.notifications.length > 0" id="notifications" class="notifcations">
                <h5>Notifications Sent</h5>
                <notification :notification="notification" v-for="notification in request.notifications" v-bind:key="notification.created_at"></notification>
            </div>
            <div v-else id="no-notificatiosn" class="notifcations" >
                <h5>No notifications sent</h5>
            </div>
        </div>
    </div>

</template>

<script>
import notification from './notification.vue'
export default {
    name: 'reminder',
    props:{
        request: {
            type: Object
        },
        showphone: {
            type: Boolean
        },
        showcase: {
            type: Boolean
        }
    },
    computed: {
        active:  function(){
            return this.request.active ? "Active": "User has disabled this request"
        }
    },
    components: {
        'notification': notification
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   h5{
        font-weight: normal;
        text-transform: uppercase;
        margin-bottom: 0px;
        margin-top:.5em;
    }
   .request {
       border: 1px solid #ddd;
       border-top: 4px solid #69aa79;
       margin-bottom:.5em;
       padding: .2em;
        display: flex;
   }
   div .inactive{
        border-top: 4px solid #aaa;
   }
    #request_info{
        padding: .5em;
    }
   .phone {
       font-size:1.5em;
       margin:.25em;
       padding-bottom:0;
   }

</style>

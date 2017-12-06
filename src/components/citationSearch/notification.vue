<template>
    <div class="notification">
        <div>{{notification.created_at | moment("dddd, MMMM Do YYYY")}} <br>
            Type: {{notification.type}}
            <div class="error" v-if="notification.error">
                Error sending notification:<br>
                {{notification.error}}
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'notification',
    props:{
        notification: {
            type: Object
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   h3 {
       font-size: 1em;
   }
   .notification {
       border-top: 1px solid #ddd;
       padding-top: .4em;
       margin-bottom:.5em;
       margin-top: .4em;
   }
   .error{
       margin-top: .5em;
       color:firebrick;
   }
</style>

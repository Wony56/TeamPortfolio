<template>
    <div class="container">
        <form @submit.prevent="createMessage">
            <div>
                <input type="text" name="message" placeholder="Enter message..."
                v-model="newMessage"/>

                <p v-if="errorText">{{errorText}}</p>
            </div>

            <button class="submit" name="action">SUBMIT</button>
        </form>
    </div>
</template>

<script>
import fb from '../views/firebase/init';

export default {
    
    name: 'CreateMessage',
    props: ['name'],
    data() {

        return {

            newMessage: null,
            errorText: null
        }
    },
    methods: {

        createMessage() {

            if(this.newMessage) {

                fb.collection('message').add({

                    message: this.newMessage,
                    name: this.name,
                    timestamp: new Data()
                }).catch(err => {

                    console.log(err);
                });
                this.newMessage = null;
                this.errorText = null;
            }
            else {

                this.errorText = "A message must be entered first!";
            }
        }
    }
}
</script>

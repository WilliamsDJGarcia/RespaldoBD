<template>
  <div id = "app">
    <h1>PERRO</h1>
    <input type="text" v-model= "inputMessage"/>
    <button @click= "sendMessage(inputMessage)">Send</button>   
    <ul>
      <li v-bind:key ="m" v-for= "m in messages">{{m}}</li>
    </ul>
  </div>
</template>

<script>
import Ws from '@adonisjs/websocket-client'
const ws = Ws('ws://localhost:3333')



export default {
  name: 'App',
  components: {
  },
  async created(){
    this.initializeChatWs();
  },
  data () {
    return {
      //
      chat : null,
      inputMessage: '',
      messages :[
        "Hola1"
      ],
    }
  },
  methods:{
    sendMessage : async function(message){
      this.chat.emit('message', message)
    },
    initializeChatWs: async function(){
      ws.connect();
      this.chat = ws.subscribe('chat');

      let chat = this.chat;

      chat.on('ready',()=>{
        this.sendMessage("helio")
      })

      chat.on('message', (event)=>{
        console.log(event);
      })
    },
    receivedMessage: async function (msg) {
      this.messages.push(msg)
    }
  }
}
</script>

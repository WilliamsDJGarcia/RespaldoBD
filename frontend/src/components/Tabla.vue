
<template>
    <v-app>
        <v-toolbar dark color="primary">
            
            <v-toolbar-title class="white--text">RespaldaBD</v-toolbar-title>
        
            <v-spacer></v-spacer>
        
            <v-layout row justify-center>
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <v-btn slot="activator" color="#2196F3" dark>Crear Configuración</v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Registro</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-layout wrap>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Nombre del archivo de respaldo" v-model ="name" id="name" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field label="Nombre_BD" v-model ="name_bd" id="name_bd"></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6 md4>
                            <v-text-field
                              id ="user_bd"
                              v-model= "user_bd"
                              label="User_BD*"
                              hint="Usuario manejador BD"
                              persistent-hint
                              required
                            ></v-text-field>
                          </v-flex>
                          <v-flex xs12>
                            <v-text-field label="Password*" type="password" v-model ="password_bd" id="password_bd" required></v-text-field>
                          </v-flex>
                          <v-flex xs12 sm6>
                              <v-dialog
                              
                              ref="dialog"
                              v-model="modal"
                              :return-value.sync="date"
                              persistent
                              lazy
                              full-width
                              width="290px"
                            >
                              <v-text-field
                              id ="date_backup"
                                slot="activator"
                                v-model="date"
                                label="Picker in dialog"
                                prepend-icon="event"
                                readonly
                              ></v-text-field>
                              <v-date-picker v-model="date" scrollable>
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                              </v-date-picker>
                            </v-dialog>
                          </v-flex>
                          <v-flex xs12 sm6>
                              <v-dialog
                              
                              ref="dialog"
                              v-model="modal2"
                              :return-value.sync="time"
                              persistent
                              lazy
                              full-width
                              width="290px"
                            >
                              <v-text-field
                              id ="time_backup"
                                slot="activator"
                                v-model="time"
                                label="Picker in dialog"
                                prepend-icon="access_time"
                                readonly
                              ></v-text-field>
                              <v-time-picker
                                v-if="modal2"
                                v-model="time"
                                full-width
                              >
                                <v-spacer></v-spacer>
                                <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                                <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                              </v-time-picker>
                            </v-dialog>
                          </v-flex>
                        </v-layout>
                      </v-container>
                      <small>*Campos obligatorios</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
                      <v-btn color="blue darken-1" @click ="respaldoBD">Save</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
          </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="config"
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td>{{props.item.id}}</td>
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right" >{{ props.item.name_bd }}</td>
            <td class="text-xs-right" >{{ props.item.user_bd }}</td>
            <td class="text-xs-right" >{{ props.item.password_bd }}</td>
            <td class="text-xs-right" >{{ props.item.date_backup }}</td>
            <td class="text-xs-right" >{{ props.item.time_backup }}</td>
            <td class="text-xs-center">
              <v-btn color="green" dark @click= "sendMessage(props.item)">
              <v-icon dark>backup</v-icon>
            </v-btn></td>
            <td>
                <v-btn color = "red" @click ="eliminar(props.item)">
                    <v-icon dark left>remove_circle</v-icon>Eliminar
                </v-btn>
            </td>
            <td>
                <v-btn color= "blue" @click= "editar(props.item)">
                    <v-icon>fas fa-edit</v-icon>Editar
                </v-btn>
            </td>
          </template>
          
        </v-data-table>
      </v-app>
</template>


<script>
  import {API} from '../servicios/axios';
  import Ws from '@adonisjs/websocket-client'
  const ws = Ws('ws://localhost:3333')

        export default {
          async created(){
           this.initializeWs();
          },
          data () {
            return {
              headers: [
              {
                  text: 'ID',
                  align: 'left',
                  sortable: false
                },
                {
                  text: 'Nombre del archivo',
                  align: 'left',
                  sortable: false
                },
                { text: 'name_bd'},
                { text: 'user_bd'},
                { text: 'password_bd'},
                { text: 'date_backup'},
                { text: 'time_backup'}
              ],
              config:[]
              ,
              setting : null,
        dialog: false,
        date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      time: null,
        modal2: false,
        name: '',
        name_bd: '',
        user_bd: '',
        password_bd: '',
        date_backup: '',
        time_backup: '',
        status: '0'
            }
          },
         
    mounted(){
      this.cargarDatos();
    },

     methods:{
      async created(){
        this.initializeWs();
      },
      respaldoBD(){
        API.post("/backup",{
          name: this.name + ".sql",
          name_bd: this.name_bd,
          user_bd: this.user_bd,
          password_bd: this.password_bd,
          date_backup: this.date,
          time_backup: this.time,
          status: this.status
        })
        .then(response => {
          this.dialog= false;
          this.cargarDatos();
          console.log(response)

        })
        // alert("Registro exitoso")
      },
      cargarDatos(){
        API.get("/backup")
      .then(response => {
        this.config = response.data
        console.log(response)
      }) 
    },
    eliminar(item){
      alert(item.id)
      API.delete("/backup-eliminar/" + item.id)
      .then(response => {
         this.cargarDatos();
         console.log(response);
       })
    },
    editar(item){
      API.put("/backup-editar/" + item.id)
      .then(response => {
        this.id = item.id, 
        this.name= item.name,
        this.name_bd = item.name_bd,
        this.user_bd = item.user_bd,
        this.password_bd = item.password_bd,
        this.date_backup =item.date,
        this.time_backup = item.time,
        this.dialog= true
        alert(response)
      })
    },
    sendMessage : async function(item){
      this.setting.emit('message',item.id )
    },
    initializeWs: async function(){
      ws.connect();
      this.setting = ws.subscribe('setting');

      let setting = this.setting;

      setting.on('message', (event)=>{
        console.log(event);
      })
    }
        }
      }
</script>

<style>

</style>
    
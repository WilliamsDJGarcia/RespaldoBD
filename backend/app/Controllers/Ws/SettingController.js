'use strict'
const Setting = use('App/Models/Setting');
const exec = require('child_process').exec;

class SettingController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onMessage(id){
    this.socket.broadcastToAll('message',id)
    this.show(id);
  }

  async show (id) {
    
    let setting = await Setting.findOrFail(id);
    console.log(setting.user_bd);
    console.log(setting.password_bd);
    console.log(setting.name_bd);
    console.log(setting.name)
    
    // exec('mysqldump' + ' --user='+ setting.$originalAttributes.user_bd + ' --password='+setting.$originalAttributes.password_bd+ ' -h 127.0.0.1 -P 3306' + setting.$originalAttributes.name_bd+ ' > ' + setting.$originalAttributes.name)
    exec('mysqldump --user=pc --password=hola1 -h 127.0.0.1 caja > cajita.sql')

    console.log('mysqldump' + ' --user='+ [setting.$attributes.user_bd] + ' --password='+[setting.$attributes.password_bd]+ ' -h 127.0.0.1 -P 3306 ' + [setting.$attributes.name_bd]+ ' > ' + [setting.$attributes.name])
    }
}

module.exports = SettingController
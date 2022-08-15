const { Client, Guild, MessageEmbed } = require("discord.js")
const mongoose = require("mongoose")
const { db_credentials } = require('../../Structures/config.json')

module.exports = {
    name: 'ready',
    once: true,
    /**
    * @param {Client} client
    * @param {Guild} guild
    */
    async execute(client) {
        console.log('Puppet bot is online!')
        client.user.setActivity('neco arc stumble to death.', {type: 'WATCHING'})

        const URI = db_credentials 
        const URIParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
            mongoose.connect(URI, URIParams, err => {
                
                if (err) console.log('⚠ Couldnt connect to Puppet Database, ' + err)
                else console.log(`🔘 Successfully connected to Puppet Database.`)
            
            }
        )
       const RestartsModel = require('../../Structures/Schema/Restarts.js')
       const current_restarts = await RestartsModel.findOne({owner: 'Darkeew'})
       if (!current_restarts){
           await RestartsModel.create({restarts: '1', allguilds: client.guilds.cache.map(guild => guild.id)})
           return
       } else {
           current_restarts.restarts++
           await current_restarts.save()
       }
       const CasesModel = require('../../Structures/Schema/Cases')


        //Change this
        //const g = '986357448925401168' //Test server id
        const g = '946518364216520774' //Puppet server id

        const guild = client.guilds.cache.get(g)

       // Ban Checker
       setInterval(async () => {
        const bc = await CasesModel.find().sort('-time')
        x = 0
        do{
            if(bc[x].type === 'ban'){
                if(bc[x].time){
                    if(bc[x].expired === false){
                        break
                    } else {
                        x++
                    }
                } else {
                    x++
                }
            } else {
                x++
            }
        } while (x !== bc.length)
        if(!bc[x]) return 
        
            const user = bc[x].punished
            const c = bc[x].case
            await CasesModel.findOneAndUpdate({case: c},{expired: true})
            guild.members.unban(user)
       }, 5000)
       // Warn Checker
       setInterval(async () =>{
        const wc = await CasesModel.find().sort('-time')
        x = 0
        do{
            if(wc[x].type === 'warn'){
                if(wc[x].time){
                    if(wc[x].expired === false){
                        break
                    } else {
                        x++
                    }
                } else {
                    x++
                }
            } else {
                x++
            }
        } while (x !== wc.length)
        if(!wc[x]) return 
            const c = wc[x].case
            if(wc[x].time < Date.now()/1000){
            const UMM = require('../../Structures/Schema/UserModeration')
            const rm = await UMM.findOne({user: wc[x].punished})
            const nw = rm.warns - 1
            await UMM.findOneAndUpdate({user: wc[x].punished},{warns: nw})
            await CasesModel.findOneAndUpdate({case: c},{expired: true})
            const member = guild.members.cache.get(wc[x].punished)
            member.send({embeds: [
                new MessageEmbed()
                .setAuthor({name: 'Case Expired'})
                .setDescription(
`**Case ${wc[x].case}** has been expired. Be more careful next time and read the rules!
> Reason of the punishment: \`${wc[x].reason}\`
> Punisher: <@!${wc[x].punisher}> (${wc[x].punisher})

> Reason for expire: \`14 days have passed since case ${wc[x].case} was made\`.
                `)
                .setColor('DARK_GOLD')
            ]}).catch(error => {
                // get ignored
            })
        }
       }, 5000)
    }
}
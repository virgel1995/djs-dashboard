const passport = require("passport")
const DiscordStrategy = require("passport-discord")
const { findOne } = require("../database/schemas/user")
const User = require("../database/schemas/user")

passport.serializeUser(
    (user , done) => {
done(null , user.discordId)
    })

passport.deserializeUser(
   async (discordId , done) => {
try {
   const user = await findOne({discordId})
   return user ? done(null,user) : done(null , null)
    


} catch (error) {
    done(error ,null)
    console.error(error.message)
}



})





passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    scope: ["identify", "guilds"],

},
    async (accessToken, refreshToken, profile, done) => {
        const { id, username, discriminator, avatar, guilds } = profile;

        try {

            const findUser = await User.findByIdAndUpdate({ discordId: id }, {
                discordTag: `${username}#${discriminator}`,
                avatar,
                guilds
            }, { new: true })
            if (findUser) {
                console.log("founded it")
                return done(null, findUser)
            } else {
                const newUser = await User.create({
                    discordId: id,
                    discordTag: `${username}#${discriminator}`,
                    avatar,
                    guilds
                })
                return done(null, newUser)
            }

        } catch (e) {
            done(e, null)
            console.error(e.message)
        }




        console.log(id, username, discriminator, avatar, guilds)



        console.log("hello from discord file")
    }


))
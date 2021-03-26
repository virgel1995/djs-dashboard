const mongoose = require("mongoose")

const guildSchemas = new mongoose.Schema({
    guildId: {
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true
    },
    prefix: {
        type: String,
        required:true,
        default: "!",

    },
    AutoRole: {
        type: String,
        required: false,
    },
// guild channels
    MemberLogChannel: {
        type: String,
        required: false,
    },
    LogChannel: {
        type: String,
        required: false,
    },
    BumpChannelServers: {
        type: String,
        required: false,
    },
    BumpChannelBots: {
        type: String,
        required: false,
    },
    // guild Bump Channels server settings
    BumpServerDescription: {
        type: String,
        required: false,
    },
    BumpServerInviteurl: {
        type: String,
        required: false,
    },

})
module.exports = mongoose.model("guild", guildSchemas)


/**hints
 * mongoose.SchemaTypes.String {{{ => equal <=}} String
 *
 */
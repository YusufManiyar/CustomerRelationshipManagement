const twilio = require('twilio');
const ivrManager = require('../provider/ivr.js')

module.exports = {
    call: async (req, res) => {
        const {callFrom, callTo } = req.body
        console.log("🚀 ~ call: ~ req.body:", req.body)
        const call = await ivrManager.sendCall({callFrom, callTo})

        // res.type('text/xml');
        return res.json(call)
    },

    msg: (req, res) => {
        const twiml = new twilio.twiml.VoiceResponse();
        const selectedOption = req.body.Digits;
        console.log(req.body)

        if (selectedOption == '1') {
            ivrManager.sendMsg(req.body)
            twiml.say('The interview link has been sent to your phone. Goodbye!');
            twiml.hangup();
        } else if (selectedOption == '2'){
            twiml.say('Thank you for your time, feel free to reach out if you change your mind. Have a great day!');
            twiml.hangup();
        }else {
            twiml.say('Invaild option. Goodbye!');
            twiml.hangup();
        }

        res.type('text/xml');
        res.send(twiml.toString());
    }
}
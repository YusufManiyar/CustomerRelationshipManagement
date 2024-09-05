const twilio = require('twilio');

console.log(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTHO_TOKEN)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTHO_TOKEN;

const client = twilio(accountSid, authToken);

module.exports = {

    sendMsg: ({From, To}) => {
        client.messages.create({
            body: 'Thank you! Here is your personalized interview link: https://v.personaliz.ai/?id=9b697c1a&uid=fe141702f66c760d85ab&mode=test',
            from: From,
            to: To,      
        }).then(message => console.log(`Message sent with SID: ${message.sid}`))
        .catch(error => console.error('Error sending message:', error));
    },

    sendCall: async ({callFrom, callTo}) => {
        try {
            console.log(callFrom, callTo)
            const twiml = new twilio.twiml.VoiceResponse();

            // Play the audio file and prompt for input
            twiml.play('https://ect82q.bn.files.1drv.com/y4mGYURLog88TliAQzjx2o-VVvuPFqH5VpPhp94ha_9lvoKiack4PwOHLaSyluMnLwBHoOZSM2sD1BrnHGtqB1vxc3z6F9C1DgE8FCh7OFnF9Kin2GY60PYca53fTrOkDd7l-An-AJHhUHzrckxYwL47_rmJajno_iZeCWeNWjLo2mzqT1qh11EtXoHHjouyVSvjJLhJvdahEfKn0kNE_pbbA?');
            twiml.gather({
                numDigits: 1,
                action: 'https://17ef-2405-201-1d-6c1a-17f8-f0e7-9821-c1c6.ngrok-free.app/handle-key',
                method: 'POST',
            });

            const call = await client.calls.create({
            twiml: twiml.toString(),
            to: callTo,                            // The recipient's phone number
            from: callFrom                         // Your Twilio phone number
            })
            console.log(`Call initiated with SID: ${call.sid}`)

            return call
        } catch(error) {
            console.error('Error making call:', error)
            throw error
        }
    }
}

 


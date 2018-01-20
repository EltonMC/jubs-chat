var request = 	require('request');

class Onesignal{

    sendMessage (device, message){
        let restKey = 'ZTYwMDgzM2QtM2U0Yi00ZmNlLWFhMWItNDJjZTBkNTBjOGQ0';
        let appID = 'c6e40e76-770a-459e-a067-b25db23ec5df';
        request(
            {
                method:'POST',
                uri:'https://onesignal.com/api/v1/notifications',
                headers: {
                    "authorization": "Basic "+restKey,
                    "content-type": "application/json"
                },
                json: true,
                rejectUnauthorized: false,
                requestCert: false,
                body:{
                    'app_id': appID,
                    'contents': {br: message},
                    'headings': {br: 'Você recebeu uma nova mensagem'},
                    'include_player_ids': Array.isArray(device) ? device : [device]
                }
            },
            function(error, response, body) {
                if(!body.errors){
                    console.log(body);
                }else{
                    console.error('Error:', body.errors);
                }
                
            }
        );
    }
}

module.exports = new Onesignal();
var request = 	require('request');

var sendMessage = function(device, message){
	var restKey = 'ZTYwMDgzM2QtM2U0Yi00ZmNlLWFhMWItNDJjZTBkNTBjOGQ0';
	var appID = 'c6e40e76-770a-459e-a067-b25db23ec5df';
	request(
		{
			method:'POST',
			uri:'https://onesignal.com/api/v1/notifications',
			headers: {
				"authorization": "Basic "+restKey,
				"content-type": "application/json"
			},
			json: true,
			body:{
				'app_id': appID,
				'contents': {en: message},
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

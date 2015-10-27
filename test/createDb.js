var request = require('request');

/* for testing purpose */
var mapInfo = [
	{
		"panoid": "00000000",
    "isEntry": true,
		"heading": 0,
		"transition":
		[
			{
				"lat": -17,
				"lng": -60,
				"size": 22,
        "rotateX": 95,
        "rotateY": 0,
        "rotateZ": -100,
        "objSphereRadius": 90,
				"nextID": "00000001"
			}
		]
	},
	{
		"panoid": "00000001",
		"heading": 280,
    "isEntry": false,
		"transition":
		[
			{
				"lat": -15,
				"lng": 32.7,
				"size": 30,
        "rotateX": 90,
        "rotateY": 0,
        "rotateZ": -65,
        "objSphereRadius": 90,
				"nextID": "00000000"
			},
			{
				"lat": -10,
				"lng": 274.5,
				"size": 30,
        "rotateX": 90,
        "rotateY": 0,
        "rotateZ": 189,
        "objSphereRadius": 90,
				"nextID": "00000002"
			}
		]
	},
	{
		"panoid": "00000002",
		"heading": 275.8,
    "isEntry": false,
		"transition":
		[
			{
				"lat": -16,
				"lng": 78,
				"size": 60,
        "rotateX": 95,
        "rotateY": 1,
        "rotateZ": -25,
        "objSphereRadius": 90,
				"nextID": "00000001"
			},
			{
				"lat": -20,
				"lng": 268.9,
				"size": 30,
        "rotateX": 90,
        "rotateY": 0,
        "rotateZ": 180,
        "objSphereRadius": 90,
				"nextID": "00000003"
			}
		]
	},
	{
		"panoid": "00000003",
		"heading": 270.3,
    "isEntry": false,
		"transition":
		[
			{
				"lat": -20,
				"lng": 85.7,
				"size": 30,
        "rotateX": 90,
        "rotateY": 1,
        "rotateZ": -10,
        "objSphereRadius": 90,
				"nextID": "00000002"
			}
		]
	}
];

request({
  method: 'POST',
  uri: 'http://localhost:6686/auth/provider/notoken',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    id: 'testid',
    name: 'Richard',
    emails: ['richard925215@gmail.com']
  })
},
function(err, response, body) {
  if (err) { return console.log(err); }
  var userid = JSON.parse(body).userid || undefined;
  if (!userid) {
    return console.log('Failed to signin');
  }
  console.log('userid: '+userid);
  mapInfo.forEach(function(photometa) {
    photometa.userid = userid;
    request({
      method: 'POST',
      uri: 'http://localhost:6687/maps/photometa',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(photometa)
    }, function(err, response, body) {
      if (err) { return console.log(err); }
      console.log('reponse: %s, body: %s', response, JSON.stringify(body));
    });
  });
});



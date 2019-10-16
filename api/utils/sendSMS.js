const axios = require('axios');
const authKey = '235391Ae7cMna4J5da79840';

function sendSMS(mobile, template) {
    axios({
        url: 'https://api.msg91.com/api/v2/sendsms?country=91',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: {
            'sender': 'RKSVDL',
            'route': '4',
            'country': '91',
            'sms': [
                {
                    'message': template,
                    'to': [
                        mobile
                    ]
                }
            ]
        },
        method: 'POST'
    })
    // https.request({
    //     hostname: ,
    //     method: 'POST',
    //     body: {

    //     }
    // })
    // https.get(encodeURI(`https://api.msg91.com/api/sendhttp.php?mobiles=91${mobile}&authkey=${authKey}&route=4&sender=PROCKT&message=${template}&country=91`), (resp) => {
    //     let data = '';

    //     // A chunk of data has been recieved.
    //     resp.on('data', (chunk) => {
    //         data += chunk;
    //         console.log('data', data)
    //     });
    // }).on("error", (err) => {
    //     console.log("Error: " + err.message);
    // });
}

module.exports = sendSMS;
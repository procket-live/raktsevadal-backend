const axios = require('axios');
const authKey = '235391Ae7cMna4J5da79840';

function sendSMS(mobile, template) {
    const options = {
        url: 'https://api.msg91.com/api/v2/sendsms?country=91',
        headers: {
            'authKey': authKey,
            'Content-Type': 'application/json'
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
    };
    axios(options).then((res) => {
        console.log('rrreesss', res);
    })
}

module.exports = sendSMS;
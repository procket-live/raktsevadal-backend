const axios = require('axios');
const querystring = require('querystring');
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

function sendSMS2(mobile, template) {
    const params = {
        mobiles: `91${mobile}`,
        authkey: authKey,
        route: 4,
        sender: 'RKSVDL',
        message: encodeURIComponent(template),
        country: 91,
    };

    const query = querystring.stringify(params);

    const options = {
        url: `https://api.msg91.com/api/sendhttp.php?${query}`,
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'GET'
    };

    axios(options).then((res) => {
        console.log('rrreesss', res);
    })
}

module.exports = sendSMS2;
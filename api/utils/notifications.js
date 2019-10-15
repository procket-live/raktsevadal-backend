var FCM = require('fcm-node');
var serverKey = 'AAAAMEZk5hA:APA91bHmOIhlL39eqoV93E_dKa7h2EsuxNRtntE3Uz4NErI8r6TmAdP9OhSxP2zknk9bfSCsslZ_fZEzXrwLP4Ga-0bH651Qswe35L3iknbxSO-o2RhcZiHYj_pu6ZBTFbua-BDSQc2E'; // put your server key here
var fcm = new FCM(serverKey);

function sendNotification(title, body, registration_ids = [], data = {}) {
    var message = {
        registration_ids: registration_ids, // Multiple tokens in an array
        collapse_key: '',

        notification: {
            title: title,
            body: body
        },

        data: data
    };

    fcm.send(message, function (err, response) {
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });
}

module.exports = sendNotification;
module.exports = {

    curlToNodeJS: function (id, token) {

        var request = require('request');

        var headers = {
            'PRIVATE-TOKEN': token
        };

        var options = {
            url: `https://lab.ssafy.com/api/v4/users/${id}/events`,
            headers: headers
        };

        return request(options);
    }
}

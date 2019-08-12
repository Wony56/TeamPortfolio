
export default {

    // 네이버 캡차 API 예제 - 키발급
    getCaptchaKey() {
        var express = require('express');
        var app = express();
        var client_id = 'g6QamGJQjl_AbO9jwcpL';
        var client_secret = 'sjo5yYUSkx1';
        var code = "0";
        app.get('/captcha/nkey', function (req, res) {
            var api_url = 'https://openapi.naver.com/v1/captcha/nkey?code=' + code;
            var request = require('request');
            var options = {
                url: api_url,
                headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
            };
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
                    res.end(body);
                } else {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            });
        });
        app.listen(3000, function () {
            console.log('http://127.0.0.1:3000/captcha/nkey app listening on port 3000!');
        });
    },
    // 네이버 캡차 API 예제 - 이미지수신
    getCaptchaImage() {
        var express = require('express');
        var app = express();
        var client_id = 'g6QamGJQjl_AbO9jwcpL';
        var client_secret = 'sjo5yYUSkx';
        var fs = require('fs');
        app.get('/captcha/image', function (req, res) {
            var api_url = 'https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=' + req.query.key;
            var request = require('request');
            var options = {
                url: api_url,
                headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
            };
            var writeStream = fs.createWriteStream('./captcha.jpg');
            var _req = request.get(options).on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type'])
            });
            _req.pipe(writeStream); // file로 출력
            _req.pipe(res); // 브라우저로 출력
        });
        app.listen(3000, function () {
            console.log('http://127.0.0.1:3000/captcha/image?key=캡차키 app listening on port 3000!');
        });
    },
    // 네이버 캡차 Open API 예제 - 키 입력값 비교
    compareCaptcha() {
        var express = require('express');
        var app = express();
        var client_id = 'g6QamGJQjl_AbO9jwcpL';
        var client_secret = 'sjo5yYUSkx';
        var code = "1";
        app.get('/captcha/result', function (req, res) {
            var api_url = 'https://openapi.naver.com/v1/captcha/nkey?code=' + code + '&key=' + req.query.key + '&value=' + req.query.value;
            var request = require('request');
            var options = {
                url: api_url,
                headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
            };
            request.get(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    res.writeHead(200, { 'Content-Type': 'text/json;charset=utf-8' });
                    res.end(body);
                } else {
                    res.status(response.statusCode).end();
                    console.log('error = ' + response.statusCode);
                }
            });
        });
        app.listen(3000, function () {
            console.log('http://127.0.0.1:3000/captcha/result?key=캡차키&value=캡차밸류 app listening on port 3000!');
        });
    }
}
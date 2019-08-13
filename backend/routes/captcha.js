// 네이버 캡차 API 예제 - 키발급
var express = require('express');
var app = express.Router();
var client_id = 'g6QamGJQjl_AbO9jwcpL';
var client_secret = 'sjo5yYUSkx';
var fs = require('fs');

app.get('/captcha/nkey', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/captcha/nkey?code=0';
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 
// 네이버 캡차 API 예제 - 이미지수신
app.get('/captcha/image', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/captcha/ncaptcha.bin?key=' + req.query.key;
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    var writeStream = fs.createWriteStream('./captcha.jpg');
    var _req = request.get(options).on('response', function(response) {
       console.log(response.statusCode) // 200
       console.log(response.headers['content-type'])
    });
  _req.pipe(writeStream); // file로 출력
  _req.pipe(res); // 브라우저로 출력
 });

// 네이버 캡차 Open API 예제 - 키 입력값 비교
app.get('/captcha/result', function (req, res) {
   var api_url = 'https://openapi.naver.com/v1/captcha/nkey?code=1&key=' + req.query.key + '&value=' + req.query.value;
   var request = require('request');
   var options = {
       url: api_url,
       headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
   request.get(options, function (error, response, body) {
     if (!error && response.statusCode == 200) {
       res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
       res.end(body);
     } else {
       res.status(response.statusCode).end();
       console.log('error = ' + response.statusCode);
     }
   });
 });
 
 module.exports = app;
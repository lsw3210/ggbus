import logo from './logo.svg';
import './App.css';

const test = '132'; 

let request = require('request');
let cheerio = require('cheerio');
 
const $url = 'http://openapi.gbis.go.kr/ws/rest/busarrivalservice/station';

const $key ='R2DQ7bRdwI0Eet9NTN825ucrDez%2FWkBqCG2CpqZFvQRxRZGYGFmBNftY%2Bvb56uQ%2Bqs%2BehP31AHkzr7YMMcVR3g%3D%3D';

const $station = '233001450';

const $api_url = $url + '?serviceKey=' + $key + '&stationId=' + $station;

console.log($api_url);

request($api_url, function(err, res, body) {
  $ = cheerio.load(body);

  $('busArrivalList').each(function(idx){
    let no1 = $(this).find('plateNo1').text();
    let no2 = $(this).find('plateNo2').text();
    console.log(`도착 예정 버스: ${no1}, 다음 도착 버스: ${no2 ? no2 : '---'}`);
  });
});

export default App;

var axios = require('axios');
var https = require('https');

var data = JSON.stringify({
  "data": [
    "QggFAQRIiyJBDcLssUp5XPEp0g95wc720ipRAqYR33T754DQRccvJ9f1xQPTEs4qAuV0Y7MCbjTx0JHTXP4JAacrPXC30LSnRuAl+bLexhrzoSEMMCQN2tOPEni4kU0mXLTVoHLIIcH5GOJBTPCzXurV2FZqaB0dD8T4xy1J7lTmJLVN7NcIpDZixNwR7YTub0/cGa8ut15dmj7AaUwNCbFXI7u8Zo/uf9Yz5QILRxA4l9wBag8JfeUcOvCwHGJoo72hiBL8gPlW3/ff/8Xx9LVaAVebGPNqJwsD5GmJ1zwRiOoIL0IFWRkMb/iCgNciHzbQdeIahIx++UsiPngO9Q=="
  ]
});

var config = {
  method: 'post',
  url: 'https://cbotserver.herokuapp.com/api/v1/cards',
  headers: { 
    'Authorization': 'cdcf6e8885c16f65ddbce478dfeacbc4', 
    'Content-Type': 'application/json'
  },
  data : data
};

module.exports.up1 = () => {
    axios(config)
    .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
    //   console.log(error);
    });
} 

module.exports.up2 = () => {
    https.get("https://decode_add.herokuapp.com/")
}
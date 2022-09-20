const request = require('request');

const options = {
    uri:'http://localhost:3001/journal',
    method: 'POST',
    body: {
        id:'1000',
        name:'joe',
    },
    json:true
};


request.get({url:'http://localhost:3001/journal_with_pagenum?pageNum=' + 1 },function(error, response, body){
    console.log(body);
})
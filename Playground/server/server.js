const http = require('http');
const _ = require('lodash')

const server = http.createServer((req,res)=>{
    console.log('Its a hit',_.random());
    res.setHeader('Content-Type','text/html');
    res.write('<div>hello peeps!<div>');
    res.write('<h2>hello peeps!<h2>');
    res.end();
})

server.listen(5000,'localhost',()=>{
    console.log('listening on 5000!')
})
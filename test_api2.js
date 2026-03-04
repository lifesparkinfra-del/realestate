const http = require('http');
http.get('http://127.0.0.1:3000/api/content', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => console.log(JSON.stringify(JSON.parse(data), null, 2)));
}).on('error', err => console.error(err));

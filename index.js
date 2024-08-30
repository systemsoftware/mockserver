const app = require('http').createServer();

const randomObject = () => {
    let obj = {};
    for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
        obj[Math.random().toString(36).substring(7)] = Math.floor(Math.random() * 1000);
    }
    return obj;
}

app.on('request', (req, res) => {
if(!isNaN(req.url.split('/')[1])) { res.statusCode = parseInt(req.url.split('/')[1]) || 200; }
let data = require('fs').readFileSync('data.json', 'utf8')
data = data.split('<METHOD>').join(req.method)
data = data.split('<URL>').join(req.url)
data = data.split('<BODY>').join(JSON.stringify(req.body))
data = data.split('<HEADERS>').join(JSON.stringify(req.headers))
data = data.split('<RANDOM_NUMBER>').join(Math.floor(Math.random() * 1000))
data = data.split('<RANDOM_STRING>').join(Math.random().toString(36).substring(7))
data = data.split('<RANDOM_BOOLEAN>').join(Math.random() > 0.5)
data = data.split('<RANDOM_ARRAY>').join(JSON.stringify(Array.from({length: Math.floor(Math.random() * 10)}, () => Math.floor(Math.random() * 1000))))
data = data.split('<RANDOM_OBJECT>').join(JSON.stringify(randomObject()))
data = data.split('"{').join('{').split('}"').join('}').split('"\[').join('\[').split('\]"').join('\]')
res.end(data)
})

app.listen(process.argv[2] || process.env.PORT || 3000, () => { console.log('Server is running on port', process.argv[2] || process.env.PORT || 3000) })
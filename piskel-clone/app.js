const server = require('server-js');
const path = require('path');
const port = process.env.PORT || 8080;


server.use(server.static(__dirname));

server.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './index.html'));
});

server.listen(port);

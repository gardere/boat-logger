const http = require('http');

module.exports = configuration => { 
    const fetch = () => {
        return new Promise((resolve, reject) => {
            http.get('http://localhost:8081', (resp) => {
            let data = '';
            
            resp.on('data', (chunk) => {
                data += chunk;
            });
            
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
            
            }).on("error", (err) => {
            console.error("Error getting data: " + err.message);
            reject(err);
            });
        });
    };

    return {
        fetch
    }
};
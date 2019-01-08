const http = require('http');

module.exports = configuration => { 
    const fetch = () => {
        return new Promise((resolve, reject) => {
            http.get(configuration.READINGS_HTTP_ENDPOINT, (resp) => {
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
    };
};
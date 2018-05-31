const fs = require('fs');

module.exports = configuration => {
    let inMemoryData = {}; //This is a dictionary with the series name as the key and a subdictionary (of timestamp/measures) as the value
    
    const logDataPoint = (key, time, value) => {
        if (inMemoryData[key] === undefined) {
            inMemoryData[key] = {};
        }
        inMemoryData[key][time] = value;
    };
    
    const persistData = () => {
        const readingKey = Object.keys(inMemoryData)[0];
        const latestTimestamp = Math.max(...Object.keys(inMemoryData[readingKey]));
        const dataToPersist = inMemoryData;
        inMemoryData = {};
        fs.writeFile(`logger-data/data_${latestTimestamp}.json`, JSON.stringify(dataToPersist), 'utf8', ()=>{});
    };

    const storeReadings = readings => {
        const datetime = (readings['position'] || {datetime: 0}).datetime;
        if (datetime === 0) {
            console.log('no valid timestamp yet... let\'s wait for the gps to acquire some data');
        } else {
            Object.entries(readings).forEach(readingKvp => {
                const key = readingKvp[0];
                const value = readingKvp[1];
                logDataPoint(key, datetime, key === 'rdg' ? value : JSON.stringify(value));
            });
        }
    };
    
    return {
        storeReadings,
        persistData
    }; 
}


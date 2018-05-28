// load the configuration
const configuration = require('./configuration.json');

// initialise the logger module, passing it the configuration
const logger = require('./logger')(configuration);

const readingsFetcher = require('./readingsFetcher')(configuration);

const init = () => {
    // start a first timer to read values
    setInterval(async () => {
        try {
            // read values
            const readings = await readingsFetcher.fetch();
            // send them to the logger class
            logger.storeReadings(readings);
        } catch (error) {
            console.error('Error trying to log data', error);
        }
    }, configuration.MEASURE_FREQUENCY_MILLISECONDS);

    // start a second timer to persist the logger module data
    setInterval(() => {
        logger.persistData();
    }, configuration.PERSIST_DATA_FREQUENCY_MILLISECONDS);
};

init();
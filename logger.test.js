jest.mock('fs');

const loggerFactory = require('./logger');
const fs = require('fs');

const configuration = {"LOGGER_DATA_FOLDER": "test-folder"};



describe('loggerTests', () => {
    beforeEach(() => {
        fs.__resetWrittenFiles();
    });

    test('logger does not fail when there is no data to persist', () => {
        const logger = loggerFactory(configuration);
        logger.persistData();
        expect(fs.__getWrittenFiles().length).toBe(1);
    });
    
    test('logger persists empty data file to disk', () => {
        const logger = loggerFactory(configuration);
        logger.persistData();
        const writtenFiles = fs.__getWrittenFiles();
        expect(writtenFiles.length).toBe(1);
        expect(writtenFiles[0].content).toBe('{}');
    });

    test('persisted file name should use the latest timestamp of the first monitored value', () => {
        const logger = loggerFactory(configuration);
        logger.storeReadings({ "position": { datetime: 12345678 } });
        logger.storeReadings({ "position": { datetime: 12345679 } });
        logger.storeReadings({ "position": { datetime: 12345677 } });
        logger.persistData();
        const writtenFiles = fs.__getWrittenFiles();
        const path = require('path');
        expect(writtenFiles[0].filename).toBe(path.join(configuration.LOGGER_DATA_FOLDER, 'data_12345679.json'));
    });

    test('after persisting data, the buffer should be reset', () => {
        const logger = loggerFactory(configuration);
        logger.storeReadings({ "position": { datetime: 12345678 } });
        logger.persistData();
        expect(fs.__getWrittenFiles()[0].content).not.toBe('{}');
        logger.persistData();
        expect(fs.__getWrittenFiles()[1].content).toBe('{}');
    });
});



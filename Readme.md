# Boat Dashboard - Logger

## Description

The role of this component is to fetch the latest readings on a set interval and persist them.

It helps building historical views (GPS route, instruments readings) and replay the data for bench testing.

This component runs on the Raspberry Pi and can be disabled without having any notable impact on the rest of the system.

## Components

### readingsFetcher.js

This component makes a simple HTTP connection to the local server to retrieve latest readings.

### logger.js

Provides the logic to store data temporarily (in memory) and persist to disk.

## The Shape of Data

Each resulting file contains a JSON dictionary.
* top level keys are readings keys/names (for instance, it can be *voltage*, *position*, *fuel-level*, ...)
* top level values are dictionaries:
    * each key is a timestamp (JS timestamps),
    * each value is a reading

For instance a log file can look like this:

```
{
    "rpm": {
        "1527920481000": "900",
        "1527920496000": "825",
        "1527920500000": "900",
        "1527920503000": "1200",
        "1527920504000": "1275",
        "1527920508000": "1725"
    },
    "position": {
        "1527920481000": "{\"longitude\":151.3012237548,\"latitude\":-33.5061264038,\"speed\":0,\"course\":0,\"numberOfSatellites\":6,\"hdop\":1.31,\"datetime\":1527920481000}",
        "1527920484000": "{\"longitude\":151.3012237548,\"latitude\":-33.5061264038,\"speed\":0,\"course\":0,\"numberOfSatellites\":6,\"hdop\":1.31,\"datetime\":1527920484000}"
    }
}
```
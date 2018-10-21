const MBTiles = require('@mapbox/mbtiles');

let tiles = {};

const createMbtiles = (path) => {
    return new Promise((resolve, reject) => {
        path = path + '?mode=rwc';
        new MBTiles(path, function (err, mbtiles) {
            if (err) reject(err);
            resolve(mbtiles);
        });
    })
}

createMbtiles('db/data/result_weekday.mbtiles')
    .then(result => {
        tiles.weekday = result;
    })
    .catch(err => {
        console.log(err)
    })

createMbtiles('db/data/result_weekday_2000.mbtiles')
    .then(result => {
        tiles.weekday2000 = result;
    })
    .catch(err => {
        console.log(err)
    })

createMbtiles('db/data/result_weekday_10000.mbtiles')
    .then(result => {
        tiles.weekday10000 = result;
    })
    .catch(err => {
        console.log(err)
    })


createMbtiles('db/data/result_weekend.mbtiles')
    .then(result => {
        tiles.weekend = result;
    })
    .catch(err => {
        console.log(err);
    })

createMbtiles('db/data/result_weekend_2000.mbtiles')
    .then(result => {
        tiles.weekend2000 = result;
    })
    .catch(err => {
        console.log(err);
    })

createMbtiles('db/data/result_weekend_10000.mbtiles')
    .then(result => {
        tiles.weekend10000 = result;
    })
    .catch(err => {
        console.log(err);
    })

module.exports = tiles;
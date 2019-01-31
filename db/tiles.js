const MBTiles = require('@mapbox/mbtiles');

const LAYERS = require("./layers");

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

LAYERS.server.forEach((layer, i) => {
    createMbtiles(`db/data/${layer}`)
        .then(result => {
            tiles[LAYERS.client[i]] = result;
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = tiles;
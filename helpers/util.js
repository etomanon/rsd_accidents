const db = require('../db/db');
const jStat = require('jStat').jStat;
const filter = require('lodash/filter');

const util = {
    getRange: (table, points, segmentLength) => {
        return new Promise((resolve, reject) => {
            const startRange = (parseFloat(segmentLength) / 100) * 75;
            db.many(
                'SELECT ${points:name} FROM ${table:name} WHERE ST_Length(wkb_geometry) BETWEEN ${startRange} AND ${segmentLength}',
                {
                    points,
                    table,
                    startRange,
                    segmentLength: parseFloat(segmentLength)
                })
                .then((data) => {
                    // console.log(data)
                    // res.send(data[0].jsonb_build_object);
                    const filtered = filter(data, (o) => { return o[points] !== 0; });
                    console.log(filtered)
                    resolve(data)
                })
                .catch((err) => {
                    console.log('ERROR:', err)
                    reject(err)
                })
        })
    }
};

module.exports = util;



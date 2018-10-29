const db = require('../db/db');
const jStat = require('jStat').jStat;
const filter = require('lodash/filter');
const values = require('lodash/values');
const flatten = require('lodash/flatten');
const geostats = require('geostats');

const util = {
    getRange: (table, hour, segmentLength) => {
        return new Promise((resolve, reject) => {
            const startRange = (parseFloat(segmentLength) / 100) * 75;
            const points = hour === -1 ? 'points_total' : 'points_other';
            let sql, config;
            if (points === 'points_total') {
                sql = 'SELECT ${points:name} FROM ${table:name} WHERE ST_Length(wkb_geometry) BETWEEN ${startRange} AND ${segmentLength}';
                config = {
                    points,
                    table,
                    startRange,
                    segmentLength: parseFloat(segmentLength)
                };
            }
            else {
                sql = 'SELECT ${points:raw} FROM ${table:name} WHERE ST_Length(wkb_geometry) BETWEEN ${startRange} AND ${segmentLength}';
                const hourArray = [];
                for (let hours = 0; hours < 24; hours++) {
                    hourArray.push("points_" + hours);
                }
                config = {
                    points: hourArray.join(','),
                    table,
                    startRange,
                    segmentLength: parseFloat(segmentLength)
                };
            }
            db.many(
                sql,
                config
            )
                .then((data) => {
                    let filtered = [];
                    if (points === 'points_total') {
                        filtered = filter(data, o => o[points] !== 0)
                            .map(val => val = val[points]);
                    }
                    else {
                        data.forEach(row => {
                            filtered.push(values(row));
                        });
                        filtered = flatten(filtered);
                        filtered = filtered.filter(value => {
                            return value !== 0;
                        });
                    }
                    let geo = new geostats(filtered);
                    geo.getClassJenks(3);
                    resolve({
                        table: table + segmentLength,
                        length: segmentLength,
                        hour: hour,
                        ranges: geo.bounds
                    });
                })
                .catch((err) => {
                    console.log('ERROR:', err)
                    reject(err)
                })
        })
    }
};

module.exports = util;



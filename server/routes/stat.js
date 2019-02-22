
const express = require('express');
const router = express.Router();

const db = require('../db/db');
const util = require('../helpers/util');
const graphs = require('../helpers/graphs');


router.get("/", (req, res) => {
    const ranges = [];
    [-1, 0].forEach(hour => {
        ["result_weekday", "result_weekend"].forEach(table => {
            [30, 2000, 10000].forEach(val => {
                ranges.push(util.getRange(table, hour, val));
            });
        })
    })

    return Promise.all(ranges)
        .then(values => {
            return res.send(values);
        })
        .catch(err => {
            return res.send(err);
        })
})

router.post("/graphs", (req, res) => {
    const data = graphs.get(req.body.bbox);
    data.then(data => res.send(data));
})


module.exports = router;

//     'features', jsonb_agg(features.feature)
    // )
    // FROM (
    //   SELECT jsonb_build_object(
    //     'type',       'Feature',
    //     'id',         ogc_fid,
    //     'geometry',   ST_AsGeoJSON(wkb_geometry)::jsonb,
    //     'properties', to_jsonb(inputs) - 'ogc_fid' - 'wkb_geometry'
    //   ) AS feature
    //   FROM (SELECT * FROM roads_accidents) inputs) features;
    //   `

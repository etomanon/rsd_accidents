
const express = require('express');
const router = express.Router();

const db = require('../db/db');
const util = require('../helpers/util');


router.get("/:weekpart/:segmentLength/:hour", (req, res) => {
    const { weekpart, segmentLength, hour } = req.params;
    const points = hour === "-1" ? 'points_total' : 'points_' + hour;
    const range = util.getRange(`result_${weekpart}`, points, `${segmentLength}`);
    return range
    .then(value => {
        return res.send(value);
    })
    .catch(err => {
        return res.send(err);
    })
    
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
    
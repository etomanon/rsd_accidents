const express = require('express');
const router = express.Router();

const db = require('../db/db');
const tiles = require('../db/tiles');

const LAYERS = require("../db/layers");

LAYERS.client.forEach(layer => {
    router.get(`/${layer}/:z/:x/:y`, (req, res) => {
        const { x, y, z } = req.params;
        if (tiles[layer] !== undefined) {
            tiles[layer].getTile(z, x, y, (err, data, headers) => {
                if (err) {
                    console.log(err);
                    res.end();
                }
                res.set(headers);
                res.send(data);
            });
        }
        else {
            console.log(tiles[layer]);
            res.end();
        }
    })   
})

module.exports = router;



    // const sql = `
    // SELECT jsonb_build_object(
    //     'type',     'FeatureCollection',
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
    // db.many(sql)
    //     .then(function (data) {
    //         res.send(data[0].jsonb_build_object);
    //     })
    //     .catch(function (err) {
    //         console.log('ERROR:', err)
    //         res.send(err);
    //     })
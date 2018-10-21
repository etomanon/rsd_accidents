const express = require('express');
const router = express.Router();

const db = require('../db/db');
const tiles = require('../db/tiles');


router.get("/weekday/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekday !== undefined) {
        tiles.weekday.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekday);
        res.end();
    }
})

router.get("/weekday2000/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekday2000 !== undefined) {
        tiles.weekday2000.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekday);
        res.end();
    }
})

router.get("/weekday10000/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekday10000 !== undefined) {
        tiles.weekday10000.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekday);
        res.end();
    }
})

router.get("/weekend/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekend !== undefined) {
        tiles.weekend.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekend);
        res.end();
    }
})

router.get("/weekend2000/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekend2000 !== undefined) {
        tiles.weekend2000.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekend);
        res.end();
    }
})

router.get("/weekend10000/:z/:x/:y", (req, res) => {
    const { x, y, z } = req.params;
    if (tiles.weekend10000 !== undefined) {
        tiles.weekend10000.getTile(z, x, y, (err, data, headers) => {
            if (err) {
                console.log(err);
                res.end();
            }
            res.set(headers);
            res.send(data);
        });
    }
    else {
        console.log(tiles.weekend);
        res.end();
    }
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
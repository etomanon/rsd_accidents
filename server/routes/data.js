const express = require('express');
const router = express.Router();

const db = require('../db/db');
const tiles = require('../db/tiles');
const turf = require("@turf/turf");
const geostats = require('geostats');

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

router.post('/grid', function (req, res, next) {
    const sqlTable = "SELECT * FROM ${table:name} WHERE wkb_geometry && ST_MakeEnvelope(${xMin}, ${yMin}, ${xMax}, ${yMax}, 3857)) inputs"
    const geojson = `
    SELECT jsonb_build_object(
        'type',     'FeatureCollection',
        'features', jsonb_agg(features.feature)
    )
    FROM (
      SELECT jsonb_build_object(
        'type',       'Feature',
        'id',         ogc_fid,
        'geometry',   ST_AsGeoJSON(wkb_geometry)::jsonb,
        'properties', to_jsonb(inputs) - 'ogc_fid' - 'wkb_geometry'
      ) AS feature
      FROM (${sqlTable}) features;
      `
    let bbox = req.body.bbox
    db.many(geojson, { table: "accidents", xMin: bbox[0], yMin: bbox[1], xMax: bbox[2], yMax: bbox[3] })
        .then(function (data) {
            let accidents = (data[0].jsonb_build_object);
            if (!accidents.features) return res.json({
                geojson: { type: "Polygon", coordinates: [] },
                legend: {
                    ranges: [],
                    countFeatures: []
                }
            });
            accidents = turf.toWgs84(accidents);
            let min = [bbox[0], bbox[1]];
            let max = [bbox[2], bbox[3]]
            min = turf.toWgs84(min);
            max = turf.toWgs84(max);
            bbox = min.concat(max);
            let bboxPolygon = turf.bboxPolygon(bbox);
            let area = turf.area(bboxPolygon);
            let cellSide = Math.sqrt(area) / 20;
            let options = { units: 'meters' };
            let geojson = turf.squareGrid(bbox, cellSide, options);
            let clone = turf.clone(geojson);
            let points = { features: [] };
            let counts = [];
            geojson.features.forEach((el, ix) => {
                points = turf.pointsWithinPolygon(accidents, el);
                accidents.features = accidents.features.filter(accident => {
                    return !points.features.some(point => point.id === accident.id)   
                })
                clone.features[ix].properties.points = points.features.length
                if (points.features.length > 0) counts.push(points.features.length);
            })
            clone.features = clone.features.filter(f => f.properties.points > 0);
            let final = turf.toMercator(clone);

            let geo = new geostats(counts);
            geo.getClassJenks(3);
            geo.doCount();

            res.json({
                geojson: final,
                legend: {
                    ranges: geo.bounds,
                    countFeatures: geo.counter
                }
            });
        })
        .catch(function (err) {
            console.log('ERROR:', err)
            res.send(err);
        })

});

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
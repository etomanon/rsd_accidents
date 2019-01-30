const db = require('../db/db');

const graphs = {
  get: (bbox) => {
    return new Promise((resolve, reject) => {
      const config = {
        xmin: bbox["0"],
        ymin: bbox["1"],
        xmax: bbox["2"],
        ymax: bbox["3"]
      }
      let where = " WHERE wkb_geometry && ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, 3857)"
      let total_length = "(SELECT SUM(ST_LENGTH(wkb_geometry)) / 100 FROM result_weekday" + where + ")";
      let sql = 'SELECT highway AS name, SUM(points_total) AS value, SUM(ST_LENGTH(wkb_geometry) / ' + total_length + ') AS length_share FROM result_weekday';
      sql += where + ' GROUP BY highway;'
      db.many(
        sql,
        config
      )
        .then((data) => {
          console.log(data);
          resolve(data);
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = graphs;
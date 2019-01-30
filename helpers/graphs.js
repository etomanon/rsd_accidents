const db = require('../db/db');

const TABLES = [{
  name: "result_weekday",
  title: "Pracovní týden"
}, {
  name: "result_weekend",
  title: 'Víkend'
}];

const graphs = {
  pie: (config) => {
    let where = " WHERE wkb_geometry && ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, 3857)";
    let total_length = "(SELECT SUM(ST_LENGTH(wkb_geometry)) / 100 FROM ${table:name}" + where + ")";
    let sql = 'SELECT highway AS name, SUM(points_total) AS value, SUM(ST_LENGTH(wkb_geometry) / ' + total_length + ') AS length_share FROM ${table:name}';
    sql += where + ' GROUP BY highway;';
    return db.many(
      sql,
      config
    )
  },
  get: (bbox) => {
    return new Promise((resolve, reject) => {
      let config = {
        xmin: bbox["0"],
        ymin: bbox["1"],
        xmax: bbox["2"],
        ymax: bbox["3"]
      }
      const pies = TABLES.map(table => {
        return graphs.pie({ ...config, table: table.name })
      })
      Promise.all(pies)
        .then((pies) => {
          const data = TABLES.map((table, i) => {
            const { name, title } = table;
            return {
              table: name,
              title: title,
              data: pies[i]
            }
          })
          resolve(data);
        })
        .catch(err => reject(err))
    })
  }
}

module.exports = graphs;
const db = require('../db/db');
const _ = require('lodash');

const TABLES = [{
  name: "result_weekday",
  title: "Pracovní týden"
}, {
  name: "result_weekend",
  title: 'Víkend'
}];

const where = " WHERE wkb_geometry && ST_MakeEnvelope(${xmin}, ${ymin}, ${xmax}, ${ymax}, 3857) AND ST_Length(wkb_geometry) < 2001";

const graphs = {
  line: (config) => {
    let sql = 'SELECT ${points:raw} FROM ${table:name}' + where;
    return db.many(
      sql,
      config
    )
  },
  pie: (config) => {
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
      const hourArray = [];
      for (let hours = 0; hours < 24; hours++) {
        hourArray.push(`SUM(points_${hours}) AS points_${hours}`);
      }
      const lines = TABLES.map(table => {
        return graphs.line({ ...config, table: table.name, points: hourArray.join(',') })
      })
      Promise.all([...pies, ...lines])
        .then((result) => {
          const pie = TABLES.map((table, i) => {
            const { name, title } = table;
            return {
              table: name,
              title: title,
              data: result[i]
            }
          })
          let lineData = [];
          const line = TABLES.forEach((table, i) => {
            const { name, title } = table;
            const data = result[i + TABLES.length][0];
            Object.keys(data).forEach((key, index) => {
              lineData[index] = {
                ...lineData[index],
                [name]: data[key],
                name: index + ':00'
              };
            });
          })
          const final = {
            pie,
            line: lineData
          }
          resolve(final)
        })

        .catch(err => reject(err))
    })
  }
}

module.exports = graphs;
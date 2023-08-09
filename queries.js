const Pool = require('pg').Pool;
const { user, host, database, password, db_port } = require('./config');
const pool = new Pool({
  user,
  host,
  database,
  password,
  db_port
});

const createRecord = (request, response) => {
  const { dom_content_load_start, dom_content_load_end, dom_complate, response_start, response_end, response_status, hostname } = request.body;
  pool.query(
    'INSERT INTO tb_analysis (dom_content_load_start, dom_content_load_end, dom_complate, response_start, response_end, response_status, host_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [dom_content_load_start, dom_content_load_end, dom_complate, response_start, response_end, response_status, hostname],
    (error, results) => {
    if (error) {
      console.log(error);
      return response.status(400).send({
        message: `Something gone wrong - ${error}`,
      });
    }
    console.log(`${results.rows[0].host_name} succesfull`);
    response.status(201).send({
      message: `Record added for hostname: ${results.rows[0].host_name}`,
    });
  });
};

const listRecords = (request, response) => {
  pool.query('SELECT * FROM tb_analysis', (error, results) => {
    if (error) {
      console.log(error);
      return response.status(400).send({
        message: `Something gone wrong - ${error}`,
      });
    }
    response.status(200).send(results.rows);
  });
}

module.exports = {
  createRecord,
  listRecords,
}
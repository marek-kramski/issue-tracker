const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 5151;
const {Issue} = require('./sequelize');

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);

app.get('/issues', (req, res) => {

  Issue.findAll()
    .then(response => {
      res.send({data: response});
    })
    .catch(err => {
      console.log('Oops! something went wrong, : ', err);
    });
});

app.put('/issues/:id', (req, res) => {
  Issue.update(
    {
      issueTitle: req.body.issueTitle,
      issueDescription: req.body.issueDescription,
      issueName: req.body.issueName,
      issueStatus: req.body.issueStatus,
    },
    {
      where: {id: req.params.id}
    })
    .then(response =>
      res.send({updatedIssueId: response})
    )
    .catch(err => {
      console.log('Oops! something went wrong, : ', err);
    });
});

//exported for testing purposes
module.exports = {
  app
};
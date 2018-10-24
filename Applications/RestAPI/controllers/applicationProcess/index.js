const applicationProcessDB = require("../../modules/dbconnection/models").applicationProcess();
const { Subject } = require("rxjs");

const getApplicationsToInvite = new Subject();
const responser = new Subject();

getApplicationsToInvite.subscribe(data => {
  applicationProcessDB.getApplicationProcessesToInvite((err, result) => {
    data.data = result;
    responser.next(data);
  });
});

responser.subscribe(data => {
  data.response.json(data.data);
});

module.exports.getApplicationsToInvite = getApplicationsToInvite;

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const NodeCache = require("node-cache");
const cron = require("node-cron");
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
const cache = new NodeCache();


const req= {
  username:"umar23faiz",
  password:"umar23faiz"
}

// This function is to just test the functionality through posstman and not being called from anywhere
app.post("/api/overview", async (req, res) => {
  let view = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/ui/views",req.body);
  let customApp = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/apps/local",req.body);
  let reports = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/saved/searches",req.body);
  let fields = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/search/fields",req.body);
  let index = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/indexes",req.body);
  let lookup = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/lookup-table-files",req.body);
  let alert = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/alerts/fired_alerts/",req.body);
  let sourceTypes = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/saved/sourcetypes",req.body);
  let userRole = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/search/jobs/export?search=| rest /services/authentication/current-context splunk_server=local | table title roles",req.body);
  const response = {
    KO: {
      Dashboards: view.entry,
      Apps: customApp.entry,
      Reports: reports.entry,
      Alerts: alert.entry,
    },
    Lookup:{
      Index: index.entry,
      Lookups: lookup.entry,
      Fields: fields.entry,
      sourceType: sourceTypes.entry,
    },
    Overview: {
      dashboard: view.entry.length,
      customApps: customApp.entry.length,
      report: reports.entry.length,
      index: index.paging.total,
      lookup: lookup.paging.total,
      fields: fields.entry.length,
      alert: alert.paging.total,
      sourceType: sourceTypes.paging.total,
    },
    userRole:userRole.result.roles
  };
  cache.set(`response_${req.body.username}`, response, 3600);

  res.json(response);
});


function fetchDataFromUrl(url,request) {
  return new Promise(async (resolve, reject) => {
    const authHeader =
    "Basic " + Buffer.from(`${request.username}:${request.password}`).toString("base64");
    const headers = {
      'Authorization': authHeader,
    };

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    const params = {
      output_mode: "json",
    };
    try {
      const response = await axios.get(url, { headers, params, httpsAgent });
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

app.post("/api/cached-overview", (req, res) => {
 const cachedResponse = cache.get(`response_${req.body.username}`);

  if (cachedResponse) {
    console.log("Returning cached overview");
    res.json(cachedResponse);
  } else {
    axios.post("http://localhost:3001/api/overview", req.body )
    .then((response) => {
      console.log("Fetched overview from /api/overview");
      res.json(response.data);
    })
    .catch((error) => {
      console.error("Error fetching overview", error);
      res.status(500).json({ message: "Error fetching overview" });
    });
  }
});
const fetchAndCacheOverviewData = async (req) => {
  console.log("Running /api/overview cron job");
  let view = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/ui/views",req);
  let customApp = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/apps/local",req);
  let reports = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/saved/searches",req);
  let fields = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/search/fields",req);
  let index = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/indexes",req);
  let lookup = await fetchDataFromUrl(process.env.SPLUNK_URL+"/servicesNS/-/-/data/lookup-table-files",req);
  let alert = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/alerts/fired_alerts/",req);
  let sourceTypes = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/saved/sourcetypes",req);
  let userRole = await fetchDataFromUrl(process.env.SPLUNK_URL+"/services/search/jobs/export?search=| rest /services/authentication/current-context splunk_server=local | table title roles",req);
  const response = {
    KO: {
      Dashboards: view.entry,
      Apps: customApp.entry,
      Reports: reports.entry,
      Alerts: alert.entry
    },
    Lookup:{
      Index: index.entry,
      Lookups: lookup.entry,
      Fields: fields.entry,
      sourceType: sourceTypes.entry,
    },
    Overview: {
      dashboard: view.entry.length,
      customApps: customApp.entry.length,
      report: reports.entry.length,
      index: index.paging.total,
      lookup: lookup.paging.total,
      fields: fields.entry.length,
      alert: alert.paging.total,
      sourceType: sourceTypes.paging.total,
    },
    userRole:userRole.result.roles
  };
  cache.set(`response_${req.username}`, response, 3600);

  console.log("Cron job completed");
};

fetchAndCacheOverviewData(req);

cron.schedule("0 * * * *", () => fetchAndCacheOverviewData(req), {
  scheduled: true,
});

// Uncomment to run locally:
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const serverlessExpress = require('@vendia/serverless-express');

const server = serverlessExpress({ app });

module.exports.handler = async (event, context) => {
  return serverlessExpress.proxy(server, event, context, 'PROMISE').promise;
};

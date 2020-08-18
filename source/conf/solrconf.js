const solrConf = {
  solrSearchUrl: "http://localhost:8983/solr",
  journalPath: "/journal",
  historyPath: "/history",
  displayFields: ["updated_dt","created_dt","id","title"],
  facetFields: {
    "tags": "tags_ss",
    "mentions": "mentions",
  },
  facetQueries: {
    "date_range": {
      "Today": "updated_dt:[NOW/DAY TO NOW/DAY+1DAY]",
      "This Week": "updated_dt:[NOW/DAY-7DAYS TO NOW/DAY+1DAY]",
      "Last Week": "updated_dt:[NOW/DAY-14DAYS TO NOW/DAY-7DAYS]",
      "This Month": "updated_dt:[NOW/DAY-1MONTH TO NOW/DAY+1DAY]",
      "Last Month": "updated_dt:[NOW/DAY-2MONTH TO NOW/DAY-1MONTH]"
    }
  },
  pageSize: 10,
  facetLimit: 25
};

export default solrConf;

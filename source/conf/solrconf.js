const solrConf = {
  solrSearchUrl: "http://localhost:8983/solr/journal",
  displayFields: ["created_dt","id","title","text"],
  facetFields: {
    "tags": "tags_ss",
    "mentions": "mentions",
  },
  facetQueries: {
    "date_range": {
      "Today": "created_dt:[NOW-1DAY/DAY TO NOW]",
      "This Week": "created_dt:[NOW-7DAY/DAY TO NOW]",
      "Last Week": "created_dt:[NOW-14DAY/DAY TO NOW-7DAY/DAY]",
      "This Month": "created_dt:[NOW-1MONTH/DAY TO NOW]",
      "This Year": "created_dt:[NOW-1YEAR/DAY TO NOW]"
    }
  },
  pageSize: 10,
  facetLimit: 25
};

export default solrConf;

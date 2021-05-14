export class HistoryService {
  solrConf: any;
  constructor(jsonConfig) {
    this.solrConf = jsonConfig;
  }

  saveDocumentState(doc) {
    if (!doc.id) {
      return
    }
    
    var history = {
      // id: auto populated
      // created_dt: auto populated
      author_id: "coming soon", // coming soon
      journal_id: doc.id,
      text: doc.text
    };

    var reqBody = JSON.stringify([history]);

    console.log("Publishing history:");
    console.log(history);

    fetch(this.solrConf.solrSearchUrl+this.solrConf.historyPath+"/update?commitWithin=1000", {
      method: 'post',
      body: reqBody,
      headers: new Headers({
      		'Content-Type': 'application/json'
        })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw "not ok";
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      alert("ERROR: " + error);   // FIXME very unfriendly
      throw error;    // for stacktrace in console
    });
  }
}

// export default HistoryService;
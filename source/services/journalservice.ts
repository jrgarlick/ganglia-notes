export class JournalService {
  constructor(jsonConfig, errorHandler = (error) => {
      alert("ERROR: " + error);   // FIXME very unfriendly
      throw error;    // for stacktrace in console
    }
  }) {
    this.solrConf = jsonConfig;
    this.errorHandler = errorHandler;
  }

  saveDocument(document) {
    var reqBody = JSON.stringify([document]);
    fetch(solrConf.solrSearchUrl+solrConf.journalPath+"/update?commitWithin=1000", {
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
    .catch(this.errorHandler);
  }
}

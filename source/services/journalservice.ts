export class JournalService {
  constructor(jsonConfig, errorHandler = (error) => {
      alert("ERROR: " + error);   // FIXME very unfriendly
      throw error;    // for stacktrace in console
    }) {
    this.solrConf = jsonConfig;
    this.errorHandler = errorHandler;
  }

  loadDocument(documentId, loadCallback) {
    var response = fetch(this.solrConf.solrSearchUrl+this.solrConf.journalPath+"/select?q=id%3A"+documentId, {
      method: 'get',
      headers: new Headers({
      		'Content-Type': 'application/json'
        })
    })
    .then((response) => {
      if (response.ok) {
        return(response.json());
      } else {
        throw "not ok";
      } 
    })
    .then((solrResponse) => {
      if (solrResponse.response.numFound === 1) {
        const solrDoc = solrResponse.response.docs[0];
        loadCallback(solrDoc);
      }
    })
    .catch(this.errorHandler);
  }

  saveDocument(document) {
    var reqBody = JSON.stringify([document]);
    fetch(this.solrConf.solrSearchUrl+this.solrConf.journalPath+"/update?commitWithin=1000", {
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

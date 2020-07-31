export class JournalService {
  constructor(jsonConfig, errorHandler = (error) => {
      alert("ERROR: " + error);   // FIXME very unfriendly
      throw error;    // for stacktrace in console
    }) {
    this.solrConf = jsonConfig;
    this.errorHandler = errorHandler;
  }

  loadDocument(documentId, setDocument) {
    var response = fetch(this.solrConf.solrSearchUrl+this.solrConf.journalPath+"/select?q=id%3A"+documentId, {
      method: 'get',
      headers: new Headers({
      		'Content-Type': 'application/json'
        })
    })
    .then((response) => {
      if (response.ok) {
        var solrResponse = response.json();
        if (solrResponse.numFound === 1) {
          document = solrResponse.docs[0];
        }
        console.log("JSON Document");
        console.log(document);

        setDocument(document);
      } else {
        throw "not ok";
      }
    })
    .catch(this.errorHandler);

    console.log(response);
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

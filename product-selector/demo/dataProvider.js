export class DataProvider {
    constructor(config) {
      this.host = config.host;
      // https://mock-senda-node.herokuapp.com/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS
      // https://bbva.mx/financial-overview/v0/financial-overview?contracts.productType=ACCOUNTS
    }
    getUrl() {
      return `/financial-overview/v0/financial-overview`;
    }
    constructUrl(params) {
      return `${this.host}${this.getUrl()}${params}`;
    }
    async generateRequest(params) {
      try{
          const resp = await fetch(this.constructUrl(params))
          return this.onSuccess(resp)
      }
      catch(error){
        return this.onError(error)
      }
    }
    onError(error) {
      return `Sucedió un error carnal: ${error}`;
    }
    async onSuccess(response) {
      return await response.json();
    }
  }

import { BGADPFinancialOverviewGetV0 } from '@cells-components/bgadp-financial-overview-v0';

export class GftFinancialOverviewSercice{

    constructor(){

    }
 
    async getProducts(){
        let products = []
        let data = await this.getData()
       
        data = data.data.contracts
        data.forEach(product => {
            const CURRENCY = product.detail.specificAmounts[0].amounts[0].currency
            let indexCurrency = products.length ? products.findIndex( element => element.currency === CURRENCY) : -1
            
            if(indexCurrency < 0){ 
                products.push({
                currency:CURRENCY,
                products:[]
                }) 
                indexCurrency = products.length -1;
            }
            
           
            
            products[indexCurrency].products.push({
                "alias": product.alias,
                "balance": product.detail.specificAmounts[0].amounts[0].amount,
                "entity": "",
                "id": product.id,
                "printedNumber": product.number
            })

        })

        return products;
    }

    async getData(){
       return await this.getDataBGADP()
    }

    async getDataBGADP(){
        let dataProvider = new BGADPFinancialOverviewGetV0({
            host: 'https://mock-senda-node.herokuapp.com',
            requiresTsec: false
        });
        let resp = await dataProvider.generateRequest()
        resp = resp.response
        return JSON.parse(resp)
    }

  
}
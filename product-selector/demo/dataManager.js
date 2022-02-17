import { DataProvider } from './dataProvider.js'

export class DataManager{
    constructor(){

    }

    async getServiceData(){
        const dataProvider = new DataProvider({
            host: 'https://mock-senda-node.herokuapp.com'
        })

        let data  = await dataProvider.generateRequest('?contracts.productType=ACCOUNTS')
        
        return data ;
    }

    async convertData(){
        
        let products = []
        let data = await this.getServiceData()
       
        data = data.data.contracts
        data.forEach(product => {
            const CURRENCY = product.detail.specificAmounts[0].amounts[0].currency
            
            if(!products.length || products[products.length - 1].currency !== CURRENCY){ 
                products.push({
                currency:CURRENCY,
                products:[]
                }) 
            }
            
            let indexCurrency = products.findIndex( element => element.currency === CURRENCY)
            
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

    async getProducts(){
       return await this.convertData()
    }

}
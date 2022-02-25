import sinon from 'sinon';
import { assert, fixtureCleanup } from '@open-wc/testing'; // eslint-disable-line import/no-extraneous-dependencies
import { BGADPFinancialOverviewGetV0 } from '@cells-components/bgadp-financial-overview-v0';

import { GftFinancialOverviewSercice } from '../src/gft-financial-overview-service';
import { accountsFO,mappedAccountsFO,responseServer} from './mocks/myMocks.js'
suite('GftFinancialOverviewSercice class', () => {


  teardown(() => {
    fixtureCleanup();
  });


  suite('Financial overview basic promise with accounts', () => {
    let stubFOPromise;
    const service = new GftFinancialOverviewSercice();

    setup(async () => {
      stubFOPromise = sinon.stub(service, 'getDataBGADP');
    });

    test('getAccountsFinancialOverview method returns accounts\' financial overview data mapped', async () => {
      stubFOPromise.returns(
        Promise.resolve(accountsFO )
      );

      const result = await service.getProducts();

      assert.deepEqual(result, mappedAccountsFO);
 
      stubFOPromise.restore();
    });

  });
});


suite('GftFinancialOverviewSercice BGADP', () => {
  
  let stubFOPromise;
  let dataProvider = new BGADPFinancialOverviewGetV0({
    host: 'https://mock-senda-node.herokuapp.com',
    requiresTsec: false
  });

  teardown(() => {
    fixtureCleanup();
  });


  setup(async () => {
    stubFOPromise = sinon.stub(dataProvider, 'generateRequest');
  });

  test('the response OF BGADP must be equal to server', async () => {
    stubFOPromise.returns(
      
      Promise.resolve({ "response": accountsFO  } )
    );
    const service = new GftFinancialOverviewSercice();

    const result = await service.getDataBGADP();
    assert.deepEqual(result, responseServer);

    stubFOPromise.restore();
  });

  
});


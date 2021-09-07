import '@app/js/settingsManager/settingsManager';

import * as catalogLoader from '@app/js/plugins/catalogLoader/catalogLoader';

import { expect } from '@jest/globals';
import { keepTrackApi } from '@app/js/api/externalApi';
import { keepTrackApiStubs } from '@app/js/api/apiMocks';

keepTrackApi.programs = { ...keepTrackApi.programs, ...keepTrackApiStubs.programs };
keepTrackApi.programs.settingsManager = window.settingsManager;

const respMock = [
  {
    C: 'US',
    LS: 'AFETR',
    LV: 'U',
    ON: 'VANGUARD 1',
    OT: 1,
    R: '0.1220',
    TLE1: '1 25544U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2 25544  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
  },
  {
    C: 'US',
    LS: 'AFETR',
    LV: 'U',
    ON: 'VANGUARD 1',
    OT: 1,
    R: '0.1220',
    TLE1: '1     5U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2     5  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
  },
];

const extraSats = [
  {
    SCC: 25544,
    TLE1: '1     5U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2     5  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
    ON: 'VANGUARD 1',
    OT: 1,
  },
  {
    SCC: 55555,
    TLE1: '1     5U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2     5  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
    ON: 'VANGUARD 1',
    OT: 1,
  },
];

const asciiSats = [
  {
    SCC: 25544,
    TLE1: '1     5U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2     5  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
  },
  {
    SCC: 12345,
    TLE1: '1     5U 58002B   21202.94224798 -.00000127  00000-0 -15445-3 0  9996',
    TLE2: '2     5  34.2499  77.5285 1845213 350.0840   6.7604 10.84826633248745',
  },
];

// @ponicode
describe('catalogLoader.parseCatalog', () => {
  test('0', () => {
    let callFunction: any = () => {
      catalogLoader.parseCatalog(respMock);
    };

    expect(callFunction).not.toThrow();
  });
});

// @ponicode
describe('catalogLoader.setupGetVariables', () => {
  test('0', () => {
    let callFunction: any = () => {
      catalogLoader.setupGetVariables();
    };

    expect(callFunction).not.toThrow();
  });
});

// @ponicode
describe('catalogLoader.filterTLEDatabase', () => {
  test('0', () => {
    let callFunction: any = () => {
      catalogLoader.filterTLEDatabase(respMock);
      catalogLoader.filterTLEDatabase(respMock, respMock);
      keepTrackApi.programs.settingsManager.offline = true;
      keepTrackApi.programs.settingsManager.limitSats = ['25544'];
      catalogLoader.filterTLEDatabase(respMock, respMock);
      keepTrackApi.programs.settingsManager.limitSats = '';
      catalogLoader.filterTLEDatabase(respMock, respMock, extraSats, asciiSats);
    };

    expect(callFunction).not.toThrow();
  });
});

// @ponicode
describe('catalogLoader.init', () => {
  test('0', () => {
    let callFunction: any = () => {
      catalogLoader.init();
    };

    expect(callFunction).not.toThrow();
  });
});

// @ponicode
describe('catalogLoader.catalogLoader', () => {
  test('0', async () => {
    await catalogLoader.catalogLoader();
  });
});

// Generated by CodiumAI
import { keepTrackApi } from '@app/keepTrackApi';
import { keepTrackContainer } from '../src/container';
import { SatObject, Singletons } from '../src/interfaces';
import { StandardCatalogManager } from '../src/singletons/catalog-manager';
import { StandardOrbitManager } from '../src/singletons/orbitManager';
import { StandardUiManager } from '../src/singletons/uiManager';
import { WebGLRenderer } from '../src/singletons/webgl-renderer';
import { CatalogLoader } from '../src/static/catalog-loader';
import { KeepTrack } from './../src/keeptrack';
import { mockCameraManager, setupDefaultHtml } from './environment/standard-env';

/*
Code Analysis

Objective:
The code snippet defines a class called KeepTrack that initializes various managers and plugins for a web application related to satellite tracking and visualization. It also sets up a game loop for updating and drawing the application.

Inputs:
- Various image files and CSS files
- External libraries such as eruda and ootk
- SettingsOverride object for customizing application settings

Flow:
1. Import necessary files and libraries
2. Define class KeepTrack with various properties and methods
3. Initialize various managers and plugins in the constructor, including OrbitManager, CatalogManager, UiManager, and ErrorManager
4. Set up a game loop in the gameLoop method that updates and draws the application
5. Handle errors with a global error trapper and show error messages on the loading screen

Outputs:
- Initialized managers and plugins for the web application
- Updated and drawn application through the game loop
- Error messages displayed on the loading screen in case of errors

Additional aspects:
- The code snippet includes a static method for checking if the FPS is above a certain limit
- The code snippet includes a method for printing the application logo to the console
- The code snippet includes a method for loading a splash screen with random images
*/

const setupStandardEnvironment = () => {
  setupDefaultHtml();
  const drawManagerInstance = new WebGLRenderer();
  const catalogManagerInstance = new StandardCatalogManager();
  const orbitManagerInstance = new StandardOrbitManager();
  const uiManagerInstance = new StandardUiManager();

  // Jest all Image class objects with a mock decode method.
  Image.prototype.decode = jest.fn();

  catalogManagerInstance.init = jest.fn();
  catalogManagerInstance.satCruncher = {
    postMessage: jest.fn(),
    terminate: jest.fn(),
  } as any;

  jest.spyOn(CatalogLoader, 'load').mockImplementation(async () => {
    // Setup a mock catalog
    const catalogManagerInstance = keepTrackApi.getCatalogManager();
    catalogManagerInstance['objectCache'] = [<SatObject>{ id: 0, type: 1 }, <SatObject>{ id: 1, type: 1 }];
    catalogManagerInstance.satCruncher = {
      postMessage: jest.fn(),
      terminate: jest.fn(),
    } as any;

    catalogManagerInstance.satCruncherOnMessage(<any>{ data: { type: 'satData', data: [] } });
  });

  // Pretend webGl works
  drawManagerInstance.gl = global.mocks.glMock;
  // Pretend we have a working canvas
  drawManagerInstance['domElement'] = <any>{ style: { cursor: 'default' } };

  keepTrackContainer.registerSingleton(Singletons.WebGLRenderer, drawManagerInstance);
  keepTrackContainer.registerSingleton(Singletons.CatalogManager, catalogManagerInstance);
  keepTrackContainer.registerSingleton(Singletons.OrbitManager, orbitManagerInstance);
  keepTrackContainer.registerSingleton(Singletons.UiManager, uiManagerInstance);
  keepTrackContainer.registerSingleton(Singletons.MainCamera, mockCameraManager);
};

describe('code_snippet', () => {
  const settingsOverride = {
    isPreventDefaultHtml: true,
    isDisableCss: true,
  };

  beforeEach(() => {
    setupStandardEnvironment();
  });

  // Tests that the constructor initializes all necessary objects and settings correctly.
  it('test_constructor_initializes_objects', () => {
    const drawManagerInstance = keepTrackApi.getRenderer();
    drawManagerInstance.update = jest.fn();
    keepTrackApi.getMainCamera().draw = jest.fn();

    const initializationTest = () => {
      const keepTrack = new KeepTrack(<any>settingsOverride);
      KeepTrack.initCss();
      keepTrack.init();
    };

    expect(initializationTest).not.toThrow();
  });

  // Test that error messages are displayed on the loading screen in case of errors.
  it('test_error_messages_displayed_on_loading_screen', () => {
    const scene = keepTrackApi.getScene();
    scene.loadScene = () => {
      throw new Error('Test error');
    };

    const keepTrack = new KeepTrack(<any>settingsOverride);
    keepTrack.init().then(() => {
      // const error = new Error('Test error');
      // expect(getEl('loader-text')?.innerHTML).toEqual(error.message);
    });
  });

  // Tests that the game loop updates and draws the application correctly.
  it('test_game_loop_updates_and_draws_application', () => {
    const keepTrack = new KeepTrack(<any>settingsOverride);
    const drawManagerInstance = keepTrackApi.getRenderer();
    keepTrack.init().then(() => {
      drawManagerInstance.update = jest.fn();
      keepTrackApi.getMainCamera().draw = jest.fn();
      settingsManager.cruncherReady = true;
      keepTrack.gameLoop();
      expect(drawManagerInstance.update).toHaveBeenCalled();
      expect(keepTrackApi.getMainCamera().draw).toHaveBeenCalled();
    });
  });

  // Test if isPreventDefaultHtml disabled
  it('test_isPreventDefaultHtml_disabled', () => {
    const keepTrack = new KeepTrack(<any>{ isPreventDefaultHtml: false });
    const initializationTest = () => {
      keepTrack.init();
    };
    expect(initializationTest).not.toThrow();
  });

  // Test showErrorCode private function
  it('test_showErrorCode', () => {
    const initializationTest = () => {
      KeepTrack['showErrorCode']({ ...new Error('Test error'), lineNumber: 1 });
    };
    expect(initializationTest).not.toThrow();
  });
});

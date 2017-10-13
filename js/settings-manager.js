(function () {
  var settingsManager = {};

  //  Version Control
  settingsManager.versionNumber = 'v0.25.8';
  settingsManager.versionDate = 'October 12, 2017';

  settingsManager.shadersReady = false;
  settingsManager.cruncherReady = false;

  // Search Variables
  settingsManager.searchLimit = 200;

  // Map Variables
  settingsManager.mapWidth = 800;
  settingsManager.mapHeight = 600;

  // ColorScheme settingsManager
  settingsManager.otherSatelliteTransparency = 0.1;

  settingsManager.socratesOnSatCruncher = null;

  settingsManager.isSharperShaders = false;

  settingsManager.isEditTime = false;
  settingsManager.isPropRateChange = false;

  settingsManager.isOnlyFOVChecked = false;
  settingsManager.isBottomIconsEnabled = false;
  settingsManager.isBottomMenuOpen = false;
  settingsManager.isMapMenuOpen = false;

  settingsManager.currentColorScheme = null;
  settingsManager.limitSats = '';

  settingsManager.mapUpdateOverride = false;
  settingsManager.lastMapUpdateTime = 0;

  window.settingsManager = settingsManager;
})();

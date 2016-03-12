'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Transactions = new Module('transactions');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Transactions.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Transactions.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Transactions.menus.add({
    title: 'transactions example page',
    link: 'transactions example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Transactions.aggregateAsset('css', 'transactions.css');
  Transactions.aggregateAsset('css', 'common.css');
  Transactions.aggregateAsset('css', '../../../../../../bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css');
  Transactions.aggregateAsset('css', '../../../../../../bower_components/angular-chart.js/dist/angular-chart.css');
  Transactions.aggregateAsset('css', '../../../../../../bower_components/sweetalert/dist/sweetalert.css');

  Transactions.aggregateAsset('js', '../../../../../../bower_components/sweetalert/dist/sweetalert.min.js');
  Transactions.aggregateAsset('js', '../../../../../../bower_components/ngSweetAlert/SweetAlert.js');
  Transactions.aggregateAsset('js', '../../../../../../bower_components/Chart.js/Chart.min.js', {global:false,  weight: -1});
  Transactions.aggregateAsset('js', '../../../../../../bower_components/angular-chart.js/angular-chart.js');
  Transactions.aggregateAsset('js', '../../../../../../bower_components/moment/moment.js', {global:false,  weight: -1});
  Transactions.aggregateAsset('js', '../../../../../../bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js');

  Transactions.angularDependencies(['ngFileUpload', 'ui.bootstrap', 'ui.bootstrap.datetimepicker', 'formly', 'formlyBootstrap', 'ngAside', 'chart.js', 'oitozero.ngSweetAlert']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Transactions.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Transactions.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Transactions.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Transactions;
});

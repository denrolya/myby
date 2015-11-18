'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Myby = new Module('myby');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Myby.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Myby.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Myby.menus.add({
    title: 'myby example page',
    link: 'myby example page',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Myby.aggregateAsset('css', 'myby.css');
  Myby.aggregateAsset('css', 'font-awesome.min.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Myby.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Myby.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Myby.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Myby;
});

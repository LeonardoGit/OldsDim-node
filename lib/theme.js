'use strict';

var Theme = require('../models/theme');

var ThemeLibrary = function() {
    return {
        addDefaultThemes: function() { //add four permissions
            Theme.find({},function(err, themes) {
                if (themes.length == 0) {
                    var u0 = new Theme({
                        group_id: 'default',
                        name:  'Default',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(255,255,255)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(232, 232, 232)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u1 = new Theme({
                        group_id: 'default',
                        name:  'Grid Light',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(255,255,255)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(0, 0, 0)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u2 = new Theme({
                        group_id: 'default',
                        name:  'Dark Unica',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(54,54,56)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(112, 112, 115)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u3 = new Theme({
                        group_id: 'default',
                        name:  'Sand Signika',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(255,255,255)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(0, 0, 0)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u4 = new Theme({
                        group_id: 'default',
                        name:  'Grid',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(255,255,255)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(0, 0, 0)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u5 = new Theme({
                        group_id: 'default',
                        name:  'Skies',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(255,255,255)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(0, 0, 0)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u6 = new Theme({
                        group_id: 'default',
                        name:  'Dark Blue',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(47, 47, 95)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(160, 160, 160)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u7 = new Theme({
                        group_id: 'default',
                        name:  'Dark Green',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(47, 94, 47)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(160, 160, 160)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    var u8 = new Theme({
                        group_id: 'default',
                        name:  'Dark Grey',
                        data: [
                            {
                                invert_color: false,
                                background_color: 'rgba(95, 95, 95)',
                                background_image: '',
                                borders: true,
                                border_color: 'rgba(160, 160, 160)'
                            }
                        ],
                        type: 'all',
                        core_theme: true,
                        created_on: new Date()
                    });

                    //Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
                    u0.save();
                    u1.save();
                    u2.save();
                    u3.save();
                    u4.save();
                    u5.save();
                    u6.save();
                    u7.save();
                    u8.save();
                }
            });
        },
        serialize: function(theme, done) {
            done(null, theme);
        },
        deserialize: function(theme, done) {
            Theme.findOne({
                name: theme.name
            }, function(err, theme) {
                done(null, theme);
            });
        }
    };
};

module.exports = ThemeLibrary;

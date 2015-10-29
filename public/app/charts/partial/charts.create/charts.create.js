angular
.module('charts')
.controller('ChartsCreateCtrl', ['$scope', 'auth', 'Charts', 'ChartTypes', 'Files',
function ($scope, auth, Charts, ChartTypes, Files) {
    $scope.auth = auth;
    $scope.chartTypes = ChartTypes;

    $scope.chartSelectedSettings = {
        series: {}
    };
    $scope.csvFiles = null;
    $scope.selectedCSV = null;

    $scope.tab = {
        loading: false
    };

    $scope.settings = {
        yAxis: {
            labels: {
                preFix: '$',
                postFix: 'money'
            }
        },
        xAxis: {
            labels: {
                preFix: '$',
                postFix: 'money'
            }
        }
    };

    $scope.chartConfig = {
        options: {
            title: {
                text: null,
                align: 'center',
                style: {
                    color: 'rgba(5,5,5,1)',
                    fontSize: '18px'
                }
            },
            subtitle: {
                text: null,
                align: 'center',
                style: {
                    color: 'rgba(138,138,138,1)',
                    fontSize: '14px'
                }
            },
            xAxis: {
                title: {
                    text: null,
                    align: 'middle',
                    style: {
                        color: 'rgba(112,112,112,1)',
                        fontSize: '10px'
                    }
                },
                labels: {
                    formatter: function () {
                        var value = this.value;
                        var preFix = $scope.settings.xAxis.labels.preFix;
                        var postFix = $scope.settings.xAxis.labels.postFix;

                        if (preFix) {
                            value = preFix + ' ' + value;
                        }

                        if (postFix) {
                            value = value + ' ' + postFix;
                        }

                        return value;
                    }
                },
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: null,
                    align: 'middle',
                    style: {
                        color: 'rgba(112,112,112,1)',
                        fontSize: '10px'
                    }
                },
                labels: {
                    formatter: function () {
                        var value = this.value;
                        var preFix = $scope.settings.yAxis.labels.preFix;
                        var postFix = $scope.settings.yAxis.labels.postFix;

                        if (preFix) {
                            value = preFix + ' ' + value;
                        }

                        if (postFix) {
                            value = value + ' ' + postFix;
                        }

                        return value;
                    }
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            exporting: false,
            tooltip: {
                valueSuffix: '°C'
            }
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    };

    $scope.$watch(function () {
        return $scope.settings;
    }, function (newSettings, oldSettings) {
        $scope.$broadcast('highchartsng.redraw');
    });

    /////////////////////////////////////////////////////////////
    ///   Initialize
    /////////////////////////////////////////////////////////////

    $scope.init = function () {
        getFiles();
        $scope.chartSelectedSettings.series.colors = ['#2F7ED8','#0D233A', '#8BBC21', '#910000', '#1AADCE'];
    };

    /**
     * @name getFiles
     * @desc Call API to get files.
     *
     * load cvs files
     */
    function getFiles () {
        Files
            .getFiles()
            .then(success, error);

        function success(files) {
            $scope.csvFiles = files;
            $scope.loadSuccess = true;
            $scope.loading = false;
        }

        function error(response) {
            $scope.loadError = true;
            $scope.loading = false;
        }
    }

    /**
     * @name ResetData
     *
     * Reset selected categories, subcategories and values.
     * Also remove from the table columns too.
     */
    function ResetData () {
        $scope.chartSelectedSettings.category.categories = [];
        $scope.chartSelectedSettings.category.subcategories = [];
        $scope.chartSelectedSettings.category.values = [];
    }

    ////////////////////////////////////////////////////////////////
    ///     Choose Type
    ////////////////////////////////////////////////////////////////

    /**
     * Select chart type to create. This is applied globally on this page.
     *
     * @param type
     * @returns none
     */
    $scope.selectChartType = function(type) {
        $scope.chartSelectedSettings.type = type;
    };
    $scope.isSelectedChartType = function(type) {
        if (!$scope.chartSelectedSettings.type) {
            return false;
        }
        return $scope.chartSelectedSettings.type.type === type.type;
    };

    //////////////////////////////////////////////////////////////////
    ///          Choose Data
    //////////////////////////////////////////////////////////////////
    /**
     * Select CVS file to render on this page.
     *
     * @param cvs
     */
    $scope.selectCSV = function (csv) {
        $scope.chartSelectedSettings.csv = csv;

        $scope.tab.loading = true;

        Files.getFileData(csv, function(err, data) {
            if (data) {
                $scope.chartSelectedSettings.csv.data = d3.csv.parse(data.Body.toString());
            }
            $scope.tab.loading = false;
            $scope.$digest();
        });

        ResetData();
    };
    $scope.isSelectedCSVFile = function (csv) {
        if (!$scope.chartSelectedSettings.csv) {
            return false;
        }
        return $scope.chartSelectedSettings.csv.id == csv.id;
    };

    ////////////////////////////////////////////////////////////
    ///          Categories select
    ////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////
    ///          Series
    ////////////////////////////////////////////////////////////

    $scope.updateSeriesColor = function (index, color) {
        $scope.chartSelectedSettings.series.colors[index] = color;
    };


    $scope.init();

}]);
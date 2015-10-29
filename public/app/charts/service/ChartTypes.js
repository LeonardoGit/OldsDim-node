(function(){
'use strict';

angular.module('charts')
    .factory('ChartTypes', function() {

        var chartTypes = [{
            icon: '/app/assets/img/chart-icons/table-charts/table-76x76.png',
            title: 'Table Chart',
            shortTitle: 'Table',
            multiselect: true,
            showSubcat: false,
            showDrilldown: false,
            displaySeriesType: true,
            type: 'table',
            colFormatTooltip: "The following options will change the format of the values in the selected column.",
            colFormatHelpText: "Select a column to the change the values format.",
            colTooltip: "The following list displays the columns from the selected csv file that can be displayed in your table chart.",
            colHelpText: "Select the columns that you want to display in your table chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/pie-charts/pie-chart/pie-chart-76x76.png',
            title: 'Pie Chart',
            shortTitle: 'Pie',
            multiselect: false,
            semiCircle: false,
            donut: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a pie slice.",
            displaySeriesType: true,
            type: 'pie',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the name of the pie slices in your pie chart.",
            catHelpText: "Select a column that will be used to represent the category (name) of the pie slices in your pie chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your pie chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your pie chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the size of the pie slices in your pie chart.",
            valueHelpText: "Select a column that will be used to represent the value (size) of the pie slices in your pie chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/bar-charts/basic-bar/basic-bar-76x76.png',
            title: 'Bar Chart',
            shortTitle: 'Bar',
            multiselect: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a bar.",
            stacking: 'none',
            displaySeriesType: true,
            type: 'bar',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your bar chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) your bar chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your bar chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your bar chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the width of the bars in your bar chart.",
            valueHelpText: "Select a column that will be used to represent the value (width) of the bars in your bar chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/column-charts/basic-column/basic-column-76x76.png',
            title: 'Column Chart',
            shortTitle: 'Column',
            multiselect: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a column.",
            stacking: 'none',
            displaySeriesType: true,
            type: 'column',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the name of the x-Axis categories in your column chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your column chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your column chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your column chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the height of the columns in your column chart.",
            valueHelpText: "Select a column that will be used to represent the value (height) of the columns in your column chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/line-charts/basic-line/basic-line-76x76.png',
            title: 'Line Chart',
            shortTitle: 'Line',
            multiselect: false,
            showSubcat: true,
            showDrilldown: false,
            stacking: 'none',
            displaySeriesType: true,
            type: 'line',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your line chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your line chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your line chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your line chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the plots of the lines in your line chart.",
            valueHelpText: "Select a column that will be used to represent the value (plots) of the lines in your line chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/area-charts/basic-area/png/basic-area-76x76.png',
            title: 'Area Chart',
            shortTitle: 'Area',
            multiselect: false,
            showSubcat: true,
            showDrilldown: false,
            stacking: 'none',
            displaySeriesType: true,
            type: 'area',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your area chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your area chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your area chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your area chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the plots of the areas in your area chart.",
            valueHelpText: "Select a column that will be used to represent the value (plots) of the areas in your area chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/scatter-bubble-charts/scatter-plot/png/scatter-plot-76x76.png',
            title: 'Scatter Chart',
            shortTitle: 'Scatter',
            multiselect: true,
            showSubcat: false,
            showDrilldown: false,
            displaySeriesType: true,
            type: 'scatter',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your scatter chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your scatter chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the plots in your scatter chart.",
            valueHelpText: "Select a column that will be used to represent the value (plots) in your scatter chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/scatter-bubble-charts/bubble-chart/png/bubble-chart-76x76.png',
            title: 'Bubble Chart',
            shortTitle: 'Bubble',
            multiselect: true,
            showSubcat: false,
            showDrilldown: false,
            displaySeriesType: true,
            type: 'bubble',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your bubble chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your bubble chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the size of the bubbles in your bubble chart.",
            valueHelpText: "Select a column that will be used to represent the value (size) of the bubbles in your bubble chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/pyramid-chart/png/pyramid-chart-76x76.png',
            title: 'Pyramid Chart',
            shortTitle: 'Pyramid',
            multiselect: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a pyramid section.",
            displaySeriesType: true,
            type: 'pyramid',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the name of the sections in your pyramid chart.",
            catHelpText: "Select a column that will be used to represent the category (name) of the sections in your pyramid chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your pyramid chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your pyramid chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the size of the sections in your pyramid chart.",
            valueHelpText: "Select a column that will be used to represent the value (size) of the sections in your pyramid chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/funnel-chart/png/funnel-chart-76x76.png',
            title: 'Funnel Chart',
            shortTitle: 'Funnel',
            multiselect: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a funnel section.",
            displaySeriesType: true,
            type: 'funnel',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the name of the sections in your funnel chart.",
            catHelpText: "Select a column that will be used to represent the category (name) of the sections in your funnel chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your funnel chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your funnel chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the size of the sections in your funnel chart.",
            valueHelpText: "Select a column that will be used to represent the value (size) of the sections in your funnel chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/waterfall/png/waterfall-76x76.png',
            title: 'Waterfall Chart',
            shortTitle: 'Waterfall',
            multiselect: false,
            showSubcat: true,
            showDrilldown: true,
            drillTooltip: "Only display the subcategories when user clicks on a waterfall.",
            displaySeriesType: true,
            type: 'waterfall',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your waterfall chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your waterfall chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your waterfall chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your waterfall chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the height of the waterfalls in your waterfall chart.",
            valueHelpText: "Select a column that will be used to represent the value (height) of the waterfalls in your waterfall chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/polar-chart/png/polar-chart-76x76.png',
            title: 'Polar Chart',
            shortTitle: 'Polar',
            showSubcat: false,
            type: 'polar',
            chart: 'polar',
            displaySeriesType: true,
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/spider-web/png/spider-web-76x76.png',
            title: 'Spider Web Chart',
            shortTitle: 'Spider Web',
            multiselect: false,
            showSubcat: true,
            showDrilldown: false,
            displaySeriesType: false,
            type: 'spiderweb',
            catTooltip: "The following list displays the columns from the selected csv file that can be used to represent the x-Axis categories in your spider web chart.",
            catHelpText: "Select a column that will be used to represent the categories (x-Axis) in your spider web chart.",
            subcatTooltip: "The following list displays the columns from the selected csv file that can be used to represent subcategories of the categories in your spider web chart.",
            subcatHelpText: "Select a column that will be used to represent the subcategory of the categories in your spider web chart.",
            valueTooltip: "The following list displays the numeric columns from the selected csv file that can be used to represent the plots of the lines in your spider web chart.",
            valueHelpText: "Select a column that will be used to represent the value (plots) of the lines in your spider web chart.",
            enable: true
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/wind-rose/png/wind-rose-76x76.png',
            title: 'Wind Rose',
            shortTitle: 'Wind Rose',
            type: 'windrose',
            chart: 'windrose',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/box-plot/png/box-plot-76x76.png',
            title: 'Box Plot',
            shortTitle: 'Box Plot',
            type: 'boxplot',
            chart: 'boxplot',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/more-chart-types/error-bar/png/error-bar-76x76.png',
            title: 'Error Bar',
            shortTitle: 'Error Bar',
            type: 'errorbar',
            chart: 'errorbar',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/scatter-bubble-charts/3d-bubbles/png/3d-bubbles-76x76.png',
            title: 'Bubble 3D',
            shortTitle: 'Bubble 3D',
            type: 'bubble',
            chart: 'bubble3d',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/heat-maps/heat-maps/png/heat-maps-76x76.png',
            title: 'Heat Map Chart',
            shortTitle: 'Heat Map',
            multiselect: false,
            type: 'heatmap',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/tree-maps/tree-map-with-color-axes/png/tree-map-with-color-axes-76x76.png',
            title: 'Tree Map',
            shortTitle: 'Tree Map',
            type: 'treemap',
            chart: 'treemap',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/tree-maps/tree-map-with-levels/png/tree-map-with-levels-76x76.png',
            title: 'Tree Map Levels',
            shortTitle: 'Tree Map Levels',
            type: 'treemap',
            chart: 'treemaplevels',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/dynamic-charts/spline-updating/png/spline-updating-76x76.png',
            title: 'Spline Updating Each Second',
            shortTitle: 'Updating Spline',
            type: 'spline',
            chart: 'splineupdating',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/dynamic-charts/master-detail-chart/png/master-detail-chart-76x76.png',
            title: 'Master Detail',
            shortTitle: 'Master Detail',
            type: 'masterdetail',
            chart: 'masterdetail',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/column-line-pie/png/column-line-pie-76x76.png',
            title: 'Column, Line & Pie',
            shortTitle: 'Column, Line & Pie',
            type: 'combinations',
            chart: 'combinationscolumnlinepie',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/duel-axis-line-column/png/duel-axis-line-column-76x76.png',
            title: 'Duel Axis, Line & Column',
            shortTitle: 'Duel Axis, Line & Column',
            type: 'combinations',
            chart: 'combinationsaxislinecolumn',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/multiple-axes/png/multiple-axes-76x76.png',
            title: 'Multiple Axes',
            shortTitle: 'Multiple Axes',
            type: 'multipleaxes',
            chart: 'multipleaxes',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/scatter-regression-line/png/scatter-regression-line-76x76.png',
            title: 'Scatter With Regression Line',
            shortTitle: 'Scatter Regression',
            type: 'scatterregression',
            chart: 'scatterregression',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/meteogram/png/meteogram-76x76.png',
            title: 'Meteogram',
            shortTitle: 'Meteogram',
            type: 'meteogram',
            chart: 'meteogram',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/combinations/advance-timeline/png/advance-timeline-76x76.png',
            title: 'Advance Timeline',
            shortTitle: 'Advance Timeline',
            type: 'advancetimeline',
            chart: 'advancetimeline',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/gauges/angular/png/angular-76x76.png',
            title: 'Angular',
            shortTitle: 'Angular',
            type: 'gauge',
            chart: 'angular',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/gauges/solid-gauge/png/solid-gauge-76x76.png',
            title: 'Solid',
            shortTitle: 'Solid',
            type: 'gauge',
            chart: 'solid',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/gauges/clock/png/clock-76x76.png',
            title: 'Clock',
            shortTitle: 'Clock',
            type: 'gauge',
            chart: 'clock',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/gauges/gauge-with-dual-axes/png/gauge-with-dual-axes-76x76.png',
            title: 'Dual Axes',
            shortTitle: 'Dual Axes',
            type: 'gauge',
            chart: 'dualaxes',
            enable: false
        }, {
            icon: '/app/assets/img/chart-icons/gauges/vu-meter/png/vu-meter-76x76.png',
            title: 'VU Meter',
            shortTitle: 'VU Meter',
            type: 'gauge',
            chart: 'vumeter',
            enable: false
        }];

        return chartTypes;

    });
})();
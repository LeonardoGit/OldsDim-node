'use strict';

angular
	.module('core')
	.factory('wijets', ['$window', wijets]);

function wijets($window) {

	$window.$.wijets.registerAction( {
        handle: "colorpicker",
        html: '<div class="dropdown"><span class="button-icon has-bg dropdown-toggle" data-toggle="dropdown"><i class="ti ti-palette"></i></span>'+
        '<ul class="panel-color-list dropdown-menu arrow" role="menu">'+
            '<li><span data-style="panel-info"></span></li>'+
            '<li><span data-style="panel-primary"></span></li>'+
            '<li><span data-style="panel-blue"></span></li>'+
            '<li><span data-style="panel-indigo"></span></li>'+
            '<li><span data-style="panel-deeppurple"></span></li>'+
            '<li><span data-style="panel-purple"></span></li>'+
            '<li><span data-style="panel-pink"></span></li>'+
            '<li><span data-style="panel-danger"></span></li>'+
            '<li><span data-style="panel-teal"></span></li>'+
            '<li><span data-style="panel-green"></span></li>'+
            '<li><span data-style="panel-success"></span></li>'+
            '<li><span data-style="panel-lime"></span></li>'+
            '<li><span data-style="panel-yellow"></span></li>'+
            '<li><span data-style="panel-warning"></span></li>'+
            '<li><span data-style="panel-orange"></span></li>'+
            '<li><span data-style="panel-deeporange"></span></li>'+
            '<li><span data-style="panel-midnightblue"></span></li>'+
            '<li><span data-style="panel-bluegray"></span></li>'+
            '<li><span data-style="panel-bluegraylight"></span></li>'+
            '<li><span data-style="panel-black"></span></li>'+
            '<li><span data-style="panel-gray"></span></li>'+
            '<li><span data-style="panel-default"></span></li>'+
            '<li><span data-style="panel-white"></span></li>'+
            '<li><span data-style="panel-brown"></span></li>'+
        '</ul></div>',
        onClick: function () {
        },
        onInit: function () {
            var headerStyle = $(this).getWidgetState('headerStyle');
            if (headerStyle) {
                var widget = $(this).closest('[data-widget]');
                widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
                    .addClass(headerStyle);
            }
            var button = $(this);
            $(this).find('.dropdown-menu').bind('click', function (e) {
                e.stopPropagation();
            });
            $(this).find('li span').bind('click', function (e) {
                var widget = button.closest('[data-widget]');
                widget.removeClass('panel-info panel-primary panel-blue panel-indigo panel-deeppurple panel-purple panel-pink panel-danger panel-teal panel-green panel-success panel-lime panel-yellow panel-warning panel-orange panel-deeporange panel-midnightblue panel-bluegray panel-bluegraylight panel-black panel-gray panel-default panel-white panel-brown')
                    .addClass($(this).attr('data-style'));
                $(button).setWidgetState('headerStyle', $(this).attr('data-style'));
                e.stopPropagation();
            });
        }
    });

    $window.$.wijets.registerAction( {
      handle: "refresh-demo",
      html: '<span class="button-icon"><i class="ti ti-reload"></i></span>',
      onClick: function () {
        var params = $(this).data('actionParameters');
        var widget = $(this).closest('[data-widget]');
        widget.append('<div class="panel-loading"><div class="panel-loader-' + params.type + '"></div></div>');
        setTimeout( function () {
          widget.find('.panel-loading').remove();
        }, 2000);
      }
    });

    return $window.$.wijets;
}
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'common/handlebars-extensions'], function(Marionette) {
    var AppLayout;
    return AppLayout = (function(_super) {
      __extends(AppLayout, _super);

      function AppLayout() {
        return AppLayout.__super__.constructor.apply(this, arguments);
      }

      AppLayout.prototype.className = 'navigator coding-rules-navigator';

      AppLayout.prototype.template = getTemplate('#coding-rules-layout');

      AppLayout.prototype.spinner = '<i class="spinner"></i>';

      AppLayout.prototype.regions = {
        headerRegion: '.navigator-header',
        actionsRegion: '.navigator-actions',
        resultsRegion: '.navigator-results',
        detailsRegion: '.navigator-details',
        filtersRegion: '.navigator-filters'
      };

      AppLayout.prototype.onRender = function() {
        return this.$(this.detailsRegion.el).css('bottom', jQuery('#footer').outerHeight());
      };

      AppLayout.prototype.showSpinner = function(region) {
        return this.$(this[region].el).html(this.spinner);
      };

      return AppLayout;

    })(Marionette.Layout);
  });

}).call(this);

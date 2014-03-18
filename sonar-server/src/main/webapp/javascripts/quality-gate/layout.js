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

      AppLayout.prototype.className = 'navigator quality-gates-navigator';

      AppLayout.prototype.template = getTemplate('#quality-gates-layout');

      AppLayout.prototype.regions = {
        headerRegion: '.navigator-header',
        actionsRegion: '.navigator-actions',
        resultsRegion: '.navigator-results',
        detailsRegion: '.navigator-details'
      };

      AppLayout.prototype.initialize = function(options) {
        return this.listenTo(options.app.qualityGates, 'all', this.updateLayout);
      };

      AppLayout.prototype.updateLayout = function() {
        var empty;
        empty = this.options.app.qualityGates.length === 0;
        this.$(this.headerRegion.el).toggle(!empty);
        return this.$(this.detailsRegion.el).toggle(!empty);
      };

      AppLayout.prototype.onRender = function() {
        this.updateLayout();
        return this.$(this.detailsRegion.el).css('bottom', jQuery('#footer').outerHeight());
      };

      return AppLayout;

    })(Marionette.Layout);
  });

}).call(this);

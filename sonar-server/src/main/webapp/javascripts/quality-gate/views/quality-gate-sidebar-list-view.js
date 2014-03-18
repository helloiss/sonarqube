(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'handlebars', 'quality-gate/models/quality-gate', 'quality-gate/views/quality-gate-sidebar-list-item-view', 'quality-gate/views/quality-gate-sidebar-list-empty-view'], function(Marionette, Handlebars, QualityGate, QualityGateSidebarListItemView, QualityGateSidebarListEmptyView) {
    var QualityGateSidebarListView;
    return QualityGateSidebarListView = (function(_super) {
      __extends(QualityGateSidebarListView, _super);

      function QualityGateSidebarListView() {
        return QualityGateSidebarListView.__super__.constructor.apply(this, arguments);
      }

      QualityGateSidebarListView.prototype.tagName = 'ol';

      QualityGateSidebarListView.prototype.className = 'navigator-results-list';

      QualityGateSidebarListView.prototype.itemView = QualityGateSidebarListItemView;

      QualityGateSidebarListView.prototype.emptyView = QualityGateSidebarListEmptyView;

      QualityGateSidebarListView.prototype.itemViewOptions = function(model) {
        return {
          app: this.options.app,
          highlighted: model.get('id') === +this.highlighted
        };
      };

      QualityGateSidebarListView.prototype.highlight = function(id) {
        this.highlighted = id;
        return this.render();
      };

      return QualityGateSidebarListView;

    })(Marionette.CollectionView);
  });

}).call(this);

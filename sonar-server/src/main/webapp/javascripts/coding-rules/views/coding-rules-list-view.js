(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'coding-rules/views/coding-rules-list-item-view', 'coding-rules/views/coding-rules-list-empty-view'], function(Marionette, CodingRulesListItemView, CodingRulesListEmptyView) {
    var CodingRulesListView;
    return CodingRulesListView = (function(_super) {
      __extends(CodingRulesListView, _super);

      function CodingRulesListView() {
        return CodingRulesListView.__super__.constructor.apply(this, arguments);
      }

      CodingRulesListView.prototype.tagName = 'ol';

      CodingRulesListView.prototype.className = 'navigator-results-list';

      CodingRulesListView.prototype.itemView = CodingRulesListItemView;

      CodingRulesListView.prototype.emptyView = CodingRulesListEmptyView;

      CodingRulesListView.prototype.itemViewOptions = function() {
        return {
          listView: this,
          app: this.options.app
        };
      };

      CodingRulesListView.prototype.selectFirst = function() {
        return this.$el.find('*:first').click();
      };

      return CodingRulesListView;

    })(Marionette.CollectionView);
  });

}).call(this);

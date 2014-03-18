(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['navigator/filters/filter-bar', 'navigator/filters/base-filters', 'navigator/filters/favorite-filters', 'navigator/filters/more-criteria-filters'], function(FilterBarView, BaseFilters, FavoriteFiltersModule, MoreCriteriaFilters) {
    var CodingRulesFilterBarView;
    return CodingRulesFilterBarView = (function(_super) {
      __extends(CodingRulesFilterBarView, _super);

      function CodingRulesFilterBarView() {
        return CodingRulesFilterBarView.__super__.constructor.apply(this, arguments);
      }

      CodingRulesFilterBarView.prototype.collectionEvents = {
        'change:enabled': 'changeEnabled'
      };

      CodingRulesFilterBarView.prototype.events = {
        'click .navigator-filter-submit': 'search'
      };

      CodingRulesFilterBarView.prototype.getQuery = function() {
        var query;
        query = {};
        this.collection.each(function(filter) {
          return _.extend(query, filter.view.formatValue());
        });
        return query;
      };

      CodingRulesFilterBarView.prototype.onAfterItemAdded = function(itemView) {
        if (itemView.model.get('type') === FavoriteFiltersModule.FavoriteFilterView) {
          return jQuery('.navigator-header').addClass('navigator-header-favorite');
        }
      };

      CodingRulesFilterBarView.prototype.addMoreCriteriaFilter = function() {
        var disabledFilters;
        disabledFilters = this.collection.where({
          enabled: false
        });
        if (disabledFilters.length > 0) {
          this.moreCriteriaFilter = new BaseFilters.Filter({
            type: MoreCriteriaFilters.MoreCriteriaFilterView,
            enabled: true,
            optional: false,
            filters: disabledFilters
          });
          return this.collection.add(this.moreCriteriaFilter);
        }
      };

      CodingRulesFilterBarView.prototype.changeEnabled = function() {
        var disabledFilters;
        if (this.moreCriteriaFilter != null) {
          disabledFilters = _.reject(this.collection.where({
            enabled: false
          }), function(filter) {
            return filter.get('type') === MoreCriteriaFilters.MoreCriteriaFilterView;
          });
          if (disabledFilters.length === 0) {
            this.moreCriteriaFilter.set({
              enabled: false
            }, {
              silent: true
            });
          } else {
            this.moreCriteriaFilter.set({
              enabled: true
            }, {
              silent: true
            });
          }
          this.moreCriteriaFilter.set({
            filters: disabledFilters
          }, {
            silent: true
          });
          return this.moreCriteriaFilter.trigger('change:filters');
        }
      };

      CodingRulesFilterBarView.prototype.search = function() {
        this.options.app.state.set({
          query: this.options.app.getQuery(),
          search: true
        });
        return this.options.app.fetchFirstPage();
      };

      CodingRulesFilterBarView.prototype.fetchNextPage = function() {
        return this.options.app.fetchNextPage();
      };

      return CodingRulesFilterBarView;

    })(FilterBarView);
  });

}).call(this);

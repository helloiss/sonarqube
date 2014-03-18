(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'common/handlebars-extensions'], function(Marionette) {
    var CodingRulesStatusView;
    return CodingRulesStatusView = (function(_super) {
      __extends(CodingRulesStatusView, _super);

      function CodingRulesStatusView() {
        return CodingRulesStatusView.__super__.constructor.apply(this, arguments);
      }

      CodingRulesStatusView.prototype.template = getTemplate('#coding-rules-status-template');

      CodingRulesStatusView.prototype.collectionEvents = {
        'all': 'render'
      };

      CodingRulesStatusView.prototype.ui = {
        orderChoices: '.navigator-actions-order-choices'
      };

      CodingRulesStatusView.prototype.events = {
        'click .navigator-actions-order': 'toggleOrderChoices',
        'click @ui.orderChoices': 'sort',
        'click .navigator-actions-bulk': 'bulkChange'
      };

      CodingRulesStatusView.prototype.onRender = function() {
        if (!this.collection.sorting.sortText) {
          this.collection.sorting.sortText = this.$('[data-sort=' + this.collection.sorting.sort + ']:first').text();
          return this.render();
        }
      };

      CodingRulesStatusView.prototype.toggleOrderChoices = function(e) {
        e.stopPropagation();
        this.ui.orderChoices.toggleClass('open');
        if (this.ui.orderChoices.is('.open')) {
          return jQuery('body').on('click.coding_rules_actions', (function(_this) {
            return function() {
              return _this.ui.orderChoices.removeClass('open');
            };
          })(this));
        }
      };

      CodingRulesStatusView.prototype.sort = function(e) {
        var asc, el, sort;
        e.stopPropagation();
        this.ui.orderChoices.removeClass('open');
        jQuery('body').off('click.coding_rules_actions');
        el = jQuery(e.target);
        sort = el.data('sort');
        asc = el.data('asc');
        if (sort !== null && asc !== null) {
          this.collection.sorting = {
            sort: sort,
            sortText: el.text(),
            asc: asc
          };
          return this.options.app.fetchFirstPage();
        }
      };

      CodingRulesStatusView.prototype.bulkChange = function() {
        return this.options.app.codingRulesBulkChangeView.show();
      };

      CodingRulesStatusView.prototype.serializeData = function() {
        return _.extend(CodingRulesStatusView.__super__.serializeData.apply(this, arguments), {
          paging: this.collection.paging,
          sorting: this.collection.sorting
        });
      };

      return CodingRulesStatusView;

    })(Marionette.ItemView);
  });

}).call(this);

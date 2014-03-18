(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['navigator/filters/ajax-select-filters'], function(AjaxSelectFilters) {
    var QualityProfileFilterView, QualityProfileSuggestions;
    QualityProfileSuggestions = (function(_super) {
      __extends(QualityProfileSuggestions, _super);

      function QualityProfileSuggestions() {
        return QualityProfileSuggestions.__super__.constructor.apply(this, arguments);
      }

      QualityProfileSuggestions.prototype.url = function() {
        return "" + baseUrl + "/api/qualityprofiles/list";
      };

      return QualityProfileSuggestions;

    })(AjaxSelectFilters.Suggestions);
    return QualityProfileFilterView = (function(_super) {
      __extends(QualityProfileFilterView, _super);

      function QualityProfileFilterView() {
        return QualityProfileFilterView.__super__.constructor.apply(this, arguments);
      }

      QualityProfileFilterView.prototype.initialize = function() {
        QualityProfileFilterView.__super__.initialize.apply(this, arguments);
        this.choices = new QualityProfileSuggestions;
        return this.listenTo(this.model, 'change:value', this.updateParentQualityProfile);
      };

      QualityProfileFilterView.prototype.updateParentQualityProfile = function() {
        var selected;
        selected = this.getSelected();
        if (selected.length === 1) {
          return this.model.set('parentQualityProfile', selected[0].get('parent'));
        } else {
          return this.model.unset('parentQualityProfile');
        }
      };

      QualityProfileFilterView.prototype.createRequest = function(v) {
        return jQuery.ajax({
          url: baseUrl + '/api/qualityprofiles/show',
          type: 'GET',
          data: {
            key: v
          }
        }).done((function(_this) {
          return function(r) {
            return _this.choices.add(new Backbone.Model({
              id: r.qualityprofile.id,
              text: r.qualityprofile.text,
              parent: r.qualityprofile.parent,
              checked: true
            }));
          };
        })(this));
      };

      return QualityProfileFilterView;

    })(AjaxSelectFilters.AjaxSelectFilterView);
  });

}).call(this);

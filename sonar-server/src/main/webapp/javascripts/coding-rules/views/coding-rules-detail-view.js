(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'backbone.marionette', 'coding-rules/views/coding-rules-detail-quality-profiles-view', 'common/handlebars-extensions'], function(Backbone, Marionette, CodingRulesDetailQualityProfilesView) {
    var CodingRulesDetailView;
    return CodingRulesDetailView = (function(_super) {
      __extends(CodingRulesDetailView, _super);

      function CodingRulesDetailView() {
        return CodingRulesDetailView.__super__.constructor.apply(this, arguments);
      }

      CodingRulesDetailView.prototype.template = getTemplate('#coding-rules-detail-template');

      CodingRulesDetailView.prototype.regions = {
        qualityProfilesRegion: '#coding-rules-detail-quality-profiles'
      };

      CodingRulesDetailView.prototype.ui = {
        tagsChange: '.coding-rules-detail-tags-change',
        tagInput: '.coding-rules-detail-tag-input',
        tagsEdit: '.coding-rules-detail-tag-edit',
        tagsEditDone: '.coding-rules-detail-tag-edit-done',
        tagsList: '.coding-rules-detail-tag-list',
        descriptionExtra: '#coding-rules-detail-description-extra',
        extendDescriptionLink: '#coding-rules-detail-extend-description',
        extendDescriptionForm: '#coding-rules-detail-extend-description-form',
        extendDescriptionSubmit: '#coding-rules-detail-extend-description-submit',
        extendDescriptionText: '#coding-rules-detail-extend-description-text',
        extendDescriptionSpinner: '#coding-rules-detail-extend-description-spinner',
        cancelExtendDescription: '#coding-rules-detail-extend-description-cancel',
        qualityProfileActivate: '#coding-rules-quality-profile-activate'
      };

      CodingRulesDetailView.prototype.events = {
        'click @ui.tagsChange': 'changeTags',
        'click @ui.tagsEditDone': 'editDone',
        'click @ui.extendDescriptionLink': 'showExtendDescriptionForm',
        'click @ui.cancelExtendDescription': 'hideExtendDescriptionForm',
        'click @ui.extendDescriptionSubmit': 'submitExtendDescription',
        'click @ui.qualityProfileActivate': 'activateQualityProfile'
      };

      CodingRulesDetailView.prototype.initialize = function(options) {
        return this.qualityProfilesView = new CodingRulesDetailQualityProfilesView({
          collection: new Backbone.Collection(options.model.get('qualityProfiles'))
        });
      };

      CodingRulesDetailView.prototype.onRender = function() {
        var qp;
        this.qualityProfilesRegion.show(this.qualityProfilesView);
        this.ui.tagInput.select2({
          tags: _.difference(this.options.app.tags, this.model.get('tags')),
          width: '500px'
        });
        this.ui.tagsEdit.hide();
        this.ui.extendDescriptionForm.hide();
        this.ui.extendDescriptionSpinner.hide();
        qp = this.options.app.getActiveQualityProfile();
        if (qp != null) {
          return this.$('.coding-rules-detail-quality-profile').first().addClass('active');
        }
      };

      CodingRulesDetailView.prototype.changeTags = function() {
        this.ui.tagsEdit.show();
        return this.ui.tagsList.hide();
      };

      CodingRulesDetailView.prototype.editDone = function() {
        var tags;
        this.ui.tagsEdit.html('<i class="spinner"></i>');
        tags = this.ui.tagInput.val();
        return jQuery.ajax({
          type: 'POST',
          url: "" + baseUrl + "/api/codingrules/set_tags",
          data: {
            tags: tags
          }
        }).done((function(_this) {
          return function() {
            _this.model.set('tags', tags.split(','));
            return _this.render();
          };
        })(this));
      };

      CodingRulesDetailView.prototype.showExtendDescriptionForm = function() {
        this.ui.descriptionExtra.hide();
        return this.ui.extendDescriptionForm.show();
      };

      CodingRulesDetailView.prototype.hideExtendDescriptionForm = function() {
        this.ui.descriptionExtra.show();
        return this.ui.extendDescriptionForm.hide();
      };

      CodingRulesDetailView.prototype.submitExtendDescription = function() {
        this.ui.extendDescriptionForm.hide();
        this.ui.extendDescriptionSpinner.show();
        return jQuery.ajax({
          type: 'POST',
          url: "" + baseUrl + "/api/codingrules/extend_description",
          dataType: 'json',
          data: {
            text: this.ui.extendDescriptionText.val()
          }
        }).done((function(_this) {
          return function(r) {
            _this.model.set({
              extra: r.extra,
              extraRaw: r.extraRaw
            });
            return _this.render();
          };
        })(this));
      };

      CodingRulesDetailView.prototype.activateQualityProfile = function() {
        this.options.app.codingRulesQualityProfileActivationView.model = this.model;
        return this.options.app.codingRulesQualityProfileActivationView.show();
      };

      return CodingRulesDetailView;

    })(Marionette.Layout);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'handlebars', 'quality-gate/collections/conditions', 'quality-gate/views/quality-gate-detail-header-view', 'quality-gate/views/quality-gate-detail-conditions-view', 'quality-gate/views/quality-gate-detail-projects-view'], function(Marionette, Handlebars, Conditions, QualityGateDetailHeaderView, QualityGateDetailConditionsView, QualityGateDetailProjectsView) {
    var QualityGateDetailView;
    return QualityGateDetailView = (function(_super) {
      __extends(QualityGateDetailView, _super);

      function QualityGateDetailView() {
        return QualityGateDetailView.__super__.constructor.apply(this, arguments);
      }

      QualityGateDetailView.prototype.template = Handlebars.compile(jQuery('#quality-gate-detail-template').html());

      QualityGateDetailView.prototype.regions = {
        conditionsRegion: '#quality-gate-conditions',
        projectsRegion: '#quality-gate-projects'
      };

      QualityGateDetailView.prototype.modelEvents = {
        'change': 'render'
      };

      QualityGateDetailView.prototype.onRender = function() {
        this.showConditions();
        return this.showProjects();
      };

      QualityGateDetailView.prototype.showConditions = function() {
        var conditions, view;
        conditions = new Conditions(this.model.get('conditions'));
        view = new QualityGateDetailConditionsView({
          app: this.options.app,
          collection: conditions,
          gateId: this.model.id,
          qualityGate: this.model
        });
        return this.conditionsRegion.show(view);
      };

      QualityGateDetailView.prototype.showProjects = function() {
        var view;
        view = new QualityGateDetailProjectsView({
          app: this.options.app,
          model: this.model,
          gateId: this.model.id
        });
        return this.projectsRegion.show(view);
      };

      return QualityGateDetailView;

    })(Marionette.Layout);
  });

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'handlebars', 'select-list'], function(Marionette, Handlebars) {
    var QualityGateDetailProjectsView;
    return QualityGateDetailProjectsView = (function(_super) {
      __extends(QualityGateDetailProjectsView, _super);

      function QualityGateDetailProjectsView() {
        return QualityGateDetailProjectsView.__super__.constructor.apply(this, arguments);
      }

      QualityGateDetailProjectsView.prototype.template = Handlebars.compile(jQuery('#quality-gate-detail-projects-template').html());

      QualityGateDetailProjectsView.prototype.onRender = function() {
        if (!this.model.get('default')) {
          return new SelectList({
            el: this.$('#select-list-projects'),
            width: '100%',
            readOnly: !this.options.app.canEdit,
            format: function(item) {
              return item.name;
            },
            searchUrl: "" + baseUrl + "/api/qualitygates/search?gateId=" + this.options.gateId,
            selectUrl: "" + baseUrl + "/api/qualitygates/select",
            deselectUrl: "" + baseUrl + "/api/qualitygates/deselect",
            extra: {
              gateId: this.options.gateId
            },
            selectParameter: 'projectId',
            selectParameterValue: 'id',
            labels: {
              selected: t('quality_gates.projects.with'),
              deselected: t('quality_gates.projects.without'),
              all: t('quality_gates.projects.all'),
              noResults: t('quality_gates.projects.noResults')
            },
            tooltips: {
              select: t('quality_gates.projects.select_hint'),
              deselect: t('quality_gates.projects.deselect_hint')
            }
          });
        }
      };

      QualityGateDetailProjectsView.prototype.serializeData = function() {
        return _.extend(QualityGateDetailProjectsView.__super__.serializeData.apply(this, arguments), {
          canEdit: this.options.app.canEdit
        });
      };

      return QualityGateDetailProjectsView;

    })(Marionette.ItemView);
  });

}).call(this);

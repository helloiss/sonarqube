(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone.marionette', 'handlebars', 'quality-gate/models/condition', 'quality-gate/views/quality-gate-detail-condition-view', 'quality-gate/views/quality-gate-detail-conditions-empty-view'], function(Marionette, Handlebars, Condition, QualityGateDetailConditionView, QualityGateDetailConditionsEmptyView) {
    var QualityGateDetailConditionsView;
    return QualityGateDetailConditionsView = (function(_super) {
      __extends(QualityGateDetailConditionsView, _super);

      function QualityGateDetailConditionsView() {
        return QualityGateDetailConditionsView.__super__.constructor.apply(this, arguments);
      }

      QualityGateDetailConditionsView.prototype.template = Handlebars.compile(jQuery('#quality-gate-detail-conditions-template').html());

      QualityGateDetailConditionsView.prototype.itemView = QualityGateDetailConditionView;

      QualityGateDetailConditionsView.prototype.emptyView = QualityGateDetailConditionsEmptyView;

      QualityGateDetailConditionsView.prototype.itemViewContainer = '.quality-gate-conditions tbody';

      QualityGateDetailConditionsView.prototype.ui = {
        metricSelect: '#quality-gate-new-condition-metric',
        introductionShowMore: '.quality-gate-introduction-show-more',
        introductionMore: '.quality-gate-introduction-more'
      };

      QualityGateDetailConditionsView.prototype.events = {
        'click @ui.introductionShowMore': 'showMoreIntroduction',
        'change @ui.metricSelect': 'addCondition'
      };

      QualityGateDetailConditionsView.prototype.itemViewOptions = function() {
        return {
          app: this.options.app,
          collectionView: this
        };
      };

      QualityGateDetailConditionsView.prototype.appendHtml = function(compositeView, itemView) {
        var container;
        if (compositeView.isBuffering) {
          compositeView.elBuffer.appendChild(itemView.el);
          return compositeView._bufferedChildren.push(itemView);
        } else {
          container = this.getItemViewContainer(compositeView);
          return container.prepend(itemView.el);
        }
      };

      QualityGateDetailConditionsView.prototype.onRender = function() {
        this.ui.introductionMore.hide();
        return this.ui.metricSelect.select2({
          allowClear: false,
          width: '250px',
          placeholder: t('alerts.select_metric')
        });
      };

      QualityGateDetailConditionsView.prototype.groupedMetrics = function() {
        var metrics;
        metrics = this.options.app.metrics;
        metrics = _.groupBy(metrics, 'domain');
        metrics = _.map(metrics, function(metrics, domain) {
          return {
            domain: domain,
            metrics: _.sortBy(metrics, 'short_name')
          };
        });
        return _.sortBy(metrics, 'domain');
      };

      QualityGateDetailConditionsView.prototype.serializeData = function() {
        return _.extend(QualityGateDetailConditionsView.__super__.serializeData.apply(this, arguments), {
          canEdit: this.options.app.canEdit,
          metricGroups: this.groupedMetrics()
        });
      };

      QualityGateDetailConditionsView.prototype.showMoreIntroduction = function() {
        this.ui.introductionShowMore.hide();
        return this.ui.introductionMore.show();
      };

      QualityGateDetailConditionsView.prototype.addCondition = function() {
        var condition, metric;
        metric = this.ui.metricSelect.val();
        this.ui.metricSelect.select2('val', '');
        condition = new Condition({
          metric: metric,
          gateId: this.options.gateId
        });
        return this.collection.unshift(condition);
      };

      QualityGateDetailConditionsView.prototype.updateConditions = function() {
        var conditions;
        conditions = this.collection.map(function(item) {
          return _.extend(item.toJSON(), {
            metric: item.get('metric').key
          });
        });
        return this.options.qualityGate.set({
          conditions: conditions
        }, {
          silent: true
        });
      };

      return QualityGateDetailConditionsView;

    })(Marionette.CompositeView);
  });

}).call(this);

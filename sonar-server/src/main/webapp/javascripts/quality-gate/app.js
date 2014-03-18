(function() {
  requirejs.config({
    baseUrl: "" + baseUrl + "/javascripts",
    paths: {
      'jquery': 'third-party/jquery',
      'backbone': 'third-party/backbone',
      'backbone.marionette': 'third-party/backbone.marionette',
      'handlebars': 'third-party/handlebars',
      'moment': 'third-party/moment',
      'select-list': 'common/select-list'
    },
    shim: {
      'backbone.marionette': {
        deps: ['backbone'],
        exports: 'Marionette'
      },
      'backbone': {
        exports: 'Backbone'
      },
      'handlebars': {
        exports: 'Handlebars'
      },
      'moment': {
        exports: 'moment'
      },
      'select-list': {
        exports: 'SelectList'
      }
    }
  });

  requirejs(['backbone', 'backbone.marionette', 'handlebars', 'quality-gate/collections/quality-gates', 'quality-gate/views/quality-gate-sidebar-list-view', 'quality-gate/views/quality-gate-actions-view', 'quality-gate/views/quality-gate-edit-view', 'quality-gate/router', 'quality-gate/layout', 'common/handlebars-extensions'], function(Backbone, Marionette, Handlebars, QualityGates, QualityGateSidebarListItemView, QualityGateActionsView, QualityGateEditView, QualityGateRouter, QualityGateLayout) {
    var App, appXHR, qualityGatesXHR;
    jQuery.ajaxSetup({
      error: function(jqXHR) {
        var errorBox, text, _ref;
        text = jqXHR.responseText;
        errorBox = jQuery('.modal-error');
        if (((_ref = jqXHR.responseJSON) != null ? _ref.errors : void 0) != null) {
          text = _.pluck(jqXHR.responseJSON.errors, 'msg').join('. ');
        }
        if (errorBox.length > 0) {
          return errorBox.show().text(text);
        } else {
          return alert(text);
        }
      }
    });
    jQuery('html').addClass('navigator-page quality-gates-page');
    App = new Marionette.Application;
    App.qualityGates = new QualityGates;
    App.openFirstQualityGate = function() {
      if (this.qualityGates.length > 0) {
        return this.router.navigate("show/" + (this.qualityGates.models[0].get('id')), {
          trigger: true
        });
      } else {
        return App.layout.detailsRegion.reset();
      }
    };
    App.deleteQualityGate = function(id) {
      App.qualityGates.remove(id);
      return App.openFirstQualityGate();
    };
    App.unsetDefaults = function(id) {
      return App.qualityGates.each(function(gate) {
        if (gate.id !== id) {
          return gate.set('default', false);
        }
      });
    };
    App.addInitializer(function() {
      this.layout = new QualityGateLayout({
        app: this
      });
      return jQuery('body').append(this.layout.render().el);
    });
    App.addInitializer(function() {
      this.codingRulesHeaderView = new QualityGateActionsView({
        app: this
      });
      return this.layout.actionsRegion.show(this.codingRulesHeaderView);
    });
    App.addInitializer(function() {
      this.qualityGateSidebarListView = new QualityGateSidebarListItemView({
        collection: this.qualityGates,
        app: this
      });
      return this.layout.resultsRegion.show(this.qualityGateSidebarListView);
    });
    App.addInitializer(function() {
      this.qualityGateEditView = new QualityGateEditView({
        app: this
      });
      return this.qualityGateEditView.render();
    });
    App.addInitializer(function() {
      this.router = new QualityGateRouter({
        app: this
      });
      return Backbone.history.start();
    });
    App.addInitializer(function() {
      var initial;
      initial = Backbone.history.fragment === '';
      if (initial) {
        return App.openFirstQualityGate();
      }
    });
    appXHR = jQuery.ajax({
      url: "" + baseUrl + "/api/qualitygates/app"
    }).done((function(_this) {
      return function(r) {
        App.canEdit = r.edit;
        App.periods = r.periods;
        App.metrics = r.metrics;
        return window.messages = r.messages;
      };
    })(this));
    qualityGatesXHR = App.qualityGates.fetch();
    return jQuery.when(qualityGatesXHR, appXHR).done(function() {
      jQuery('#quality-gate-page-loader').remove();
      return App.start();
    });
  });

}).call(this);

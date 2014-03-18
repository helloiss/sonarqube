(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone'], function(Backbone) {
    var Condition;
    return Condition = (function(_super) {
      __extends(Condition, _super);

      function Condition() {
        return Condition.__super__.constructor.apply(this, arguments);
      }

      Condition.prototype.url = function() {
        return "" + baseUrl + "/api/qualitygates/create_condition";
      };

      Condition.prototype.save = function() {
        var data, method;
        method = !this.isNew() ? 'update' : 'create';
        data = {
          metric: this.get('metric').key,
          op: this.get('op'),
          warning: this.get('warning'),
          error: this.get('error')
        };
        if (this.get('period') !== '0') {
          data.period = this.get('period');
        }
        if (!this.isNew()) {
          data.id = this.id;
        } else {
          data.gateId = this.get('gateId');
        }
        return jQuery.ajax({
          url: "" + baseUrl + "/api/qualitygates/" + method + "_condition",
          type: 'POST',
          data: data
        }).done((function(_this) {
          return function(r) {
            return _this.set('id', r.id);
          };
        })(this));
      };

      Condition.prototype["delete"] = function() {
        return jQuery.ajax({
          url: "" + baseUrl + "/api/qualitygates/delete_condition",
          type: 'POST',
          data: {
            id: this.id
          }
        });
      };

      return Condition;

    })(Backbone.Model);
  });

}).call(this);

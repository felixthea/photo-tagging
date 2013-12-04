(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function PhotoFormView () {
    this.$el = $('<div></div>');
  };

  _.extend(PhotoFormView.prototype, {
    render: function () {
      var that = this;

      that.$el.empty();

      var templateFn = JST["photo_form"];
      var renderedContent = templateFn({})

      that.$el.append(renderedContent);
      return that;
    }
  })
})(this)

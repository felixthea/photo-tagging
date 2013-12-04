(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoFormView = PT.PhotoFormView = function PhotoFormView () {
    this.$el = $('<div></div>');

    var that = this;

    that.$el.on('submit', 'form', function(event) {
      event.preventDefault();
      that.submit(event);
    })
  };

  _.extend(PhotoFormView.prototype, {
    render: function () {
      var that = this;

      that.$el.empty();

      var templateFn = JST["photo_form"];
      var renderedContent = templateFn({})

      that.$el.append(renderedContent);
      return that;
    },

    submit: function(event) {
      var formData = event.currentTarget
      var photoData = $(formData).serializeJSON();
      var photo = new PT.Photo(photoData)

      photo.create()
    }
  })
})(this)

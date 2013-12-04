(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function PhotoDetailView(photo) {
    this.$el = $('<div></div>');
    this.photo = photo;

    this.$el.on("click", "a", function(event) {
      event.preventDefault();
      PT.showPhotosIndex();
    })
  }

  _.extend(PhotoDetailView.prototype, {
    render: function () {
      var that = this;

      that.$el.empty();

      var templateFn = JST["photo_detail"];

      var renderedContent = templateFn({
        photo: that.photo
      })

      that.$el.append(renderedContent);
      return that;
    }
  })
})(this);

(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoDetailView = PT.PhotoDetailView = function PhotoDetailView(photo) {
    var that = this;
    this.$el = $('<div></div>');
    this.photo = photo;

    this.$el.on("click", "a", function(event) {
      event.preventDefault();
      PT.showPhotosIndex();
    });

    this.$el.on("click", "img", function(event) {
      event.preventDefault();
      that.popTagSelectView(event);
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
    },

    popTagSelectView: function(event) {
      var tsv = new PT.TagSelectView(this.photo, event)
      this.$el.append(tsv.render().$el)
    }
  })
})(this);

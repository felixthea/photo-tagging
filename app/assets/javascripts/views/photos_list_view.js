(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotosListView = PT.PhotosListView = function PhotosListView () {
    this.$el = $('<div></div>');

    var that = this;

    PT.Photo.on("add", function() {
      PT.Photo.fetchByUserId(CURRENT_USER_ID, function() {
        that.render()
      });
    });
  }

  _.extend(PhotosListView.prototype, {
    render: function () {
      var that = this;

      this.$el.empty();

      this.$el.append('<ul class="photos_list"></ul>')

      PT.Photo.all.forEach(function(photo) {
        that.$el.append("<li>" + photo.get("title") + "</li>")
      });

      return this;
    }
  })
})(this)
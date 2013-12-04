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

    this.$el.on("click", "a", function(event) {
      event.preventDefault();
      var photo = that.showDetail(event);
      PT.showPhotoDetail(photo);
    })
  }

  _.extend(PhotosListView.prototype, {
    render: function () {
      var that = this;

      this.$el.empty();

      this.$el.append('<ul class="photos_list"></ul>')

      PT.Photo.all.forEach(function(photo) {
        that.$el.append("<li><a href=# data-id=" + photo.get("id") + ">" + photo.get("title") + "</a></li>")
      });

      return this;
    },

    showDetail: function(event) {
      var id = $(event.currentTarget).attr("data-id");
      return PT.Photo.find(id);
    }
  })
})(this)
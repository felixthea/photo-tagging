//= require jquery
//= require jquery_ujs
//= require jquery.serializeJSON
//= require underscore
//
//= require_tree ./models
//= require_tree ./views
//= require_tree ../templates
//
//= require_tree .

(function(root) {
  var PT = root.PT = (root.PT || {});

  var Photo = PT.Photo = function Photo (pojo) {
    this.attributes = pojo;
  }

  _.extend(PT, {
    initialize:   function () {
      PT.Photo.fetchByUserId(CURRENT_USER_ID, function () {
        PT.showPhotosIndex();
      });
    },

    showPhotoDetail: function (photo) {
      var content = $("#content");

      var photoDetailView = new PT.PhotoDetailView(photo);
      content.html(photoDetailView.render().$el);
    },

    showPhotosIndex: function () {
      var content = $("#content");
      content.empty();

      var photosListView = new PT.PhotosListView();
      content.append(photosListView.render().$el);

      var photoFormView = new PT.PhotoFormView();
      content.append(photoFormView.render().$el);
    },
  });

  _.extend(Photo.prototype, {
    get: function(attrName) {
      return this.attributes[attrName];
    },

    set: function(attrName, val) {
      this.attributes[attrName] = val;
    },

    create: function(callback) {
      if (this.attributes.id || this.attributes.id <= 0) {
        return;
      }

      $.ajax({
        url: '/api/photos',
        type: 'POST',
        data: {photo: this.attributes },
        success: callback
      });
    },

    save: function(callback) {
      var that = this;
      if (this.attributes.id) {
        var photoId = this.attributes.id;
        var ownerId = this.attributes.ownerId;

        $.ajax({
          url: "/api/users/" + ownerId + "/photos/" + photoId,
          type: 'PUT',
          data: that.attributes,
          success: function(resp) {
            _.extend(that.attributes, resp);
            callback(that)
          }
        })
      } else {
          that.create(callback);
      }
    }
  })

  _.extend(Photo, {
    all: [],

    fetchByUserId: function(userId, callback) {

      var that = this;

      $.ajax({
        url: "/api/users/" + userId + "/photos",
        type: 'GET',
        success: function(resp) {
          resp.forEach(function(photo) {
            var photo = new Photo(photo)
            that.all.push(photo);
          });

          callback();
        }
      })
    }
  })
})(this);

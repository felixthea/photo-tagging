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
      if (this.get("id") || this.get("id") <= 0) {
        return;
      }

      $.ajax({
        url: '/api/photos',
        type: 'POST',
        data: this.attributes,
        success: callback
      });

      Photo.trigger("add");
    },

    save: function(callback) {
      var that = this;
      if (this.get("id")) {
        var photoId = this.get("id");
        var ownerId = this.get("owner_id");

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
          that.all = []

          resp.forEach(function(photo) {
            var photo = new Photo(photo)
            that.all.push(photo);
          });

          callback();
        }
      })
    },

    _events: {},

    on: function(eventName, callback) {
      if (this._events[eventName]) {
        this._events[eventName].push(callback);
      } else {
        this._events[eventName] = [];
        this._events[eventName].push(callback);
      }
    },

    trigger: function(eventName) {
      this._events[eventName].forEach(function(callback) {
        callback();
      })
    },

    find: function(id) {
      var id = +id
      var photos = PT.Photo.all;

      var photo = _.filter(photos, function(photo) {
        return photo.get("id") === id
      })

      return photo[0];
    }
  })
})(this);

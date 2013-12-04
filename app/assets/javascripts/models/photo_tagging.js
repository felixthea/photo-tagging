(function(root) {
  var PT = root.PT = (root.PT || {});

  var PhotoTagging = PT.PhotoTagging = function PhotoTagging(pojo) {
    this.attributes = pojo;
  }

  _.extend(PhotoTagging.prototype, {
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

      console.log(callback)

      $.ajax({
        url: '/api/photo_taggings',
        type: 'POST',
        data: this.attributes,
        success: callback
      });
    }
  })

  _.extend(PhotoTagging, {
    all: [],

    fetchByPhotoId: function(photoId, callback) {

      var that = this;

      $.ajax({
        url: "/api/photos/" + photoId + "/photo_taggings",
        type: 'GET',
        success: function(resp) {
          that.all = []

          resp.forEach(function(photo_tag) {
            var photo_tag = new PhotoTagging(photo)
            that.all.push(photo_tag);
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
      var photo_taggings = PT.PhotoTagging.all;

      var photo_tag = _.filter(photo_taggings, function(photo_tag) {
        return photo_tag.get("id") === id
      })

      return photo_tag[0];
    }
  })
})(this);
(function(root) {
  var PT = root.PT = (root.PT || {});

  var TagSelectView = PT.TagSelectView = function TagSelectView(photo, event) {
    var that = this;
    that.$el = $('<div></div>');
    that.photo = photo;
    that.event = event;
  }

  _.extend(TagSelectView.prototype, {
    render: function() {
      var imgY = $('img').position().top;
      var imgX = $('img').position().left;
      var relY = event.offsetY;
      var relX = event.offsetX;

      var absY = imgY + relY;
      var absX = imgX + relX;

      var $img_div = $('<div></div>');

      $img_div.addClass('photo-tag').css({
        position: 'absolute',
        top: absY,
        left: absX
      });

      this.$el.append($img_div);

      return this;
    }
  })
})(this);

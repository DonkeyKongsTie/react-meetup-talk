var React = require('React'),
    _ = require('underscore');
var Tray = module.exports = React.createClass({displayName: "Tray",

  render: function() {
    var self = this;
    var li = function(kitten) {
      return (
        React.createElement("li", {
          key: kitten.id,
          onClick: self.props.onRemoveFavorite(kitten)
        }, 
          React.createElement("img", {src: "images/" + kitten.href + ".jpg"})
        )
      );
    };
    return (
      React.createElement("div", {id: "favorites-tray"}, 
        React.createElement("ul", null, _.map(this.props.favorites, li))
      )
    )
  }
});
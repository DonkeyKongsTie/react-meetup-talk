var React = require('React'),
    Tray = require('./component'),
    should = require('should');

describe('Tray component', function() {

  it('renders a list of favorited kittens', function () {
    should(React.renderToString(React.createElement(Tray, {
      favorites: [
        { name: "Fluffy", href: 'fluffy', id: 1 },
        { name: "Mittens", href: 'mittens', id: 2 }
      ],
      onRemoveFavorite: function () {}
    }))).containEql('images/fluffy.jpg');
  });
});
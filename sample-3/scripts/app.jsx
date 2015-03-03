// 
// Top-level component
// 
var App = React.createClass({

  getInitialState: function() {
    return { favorites: [] }
  },

  render: function() {
    return (
      <div>
        <List
          onFavorite={this.onFavorite}
          favorites={this.state.favorites} />
        <Tray
          onRemoveFavorite={this.onRemoveFavorite}
          favorites={this.state.favorites} />
      </div>
    )
  },

  onFavorite: function(kitten) {
    var self = this;
    return function() {
      self.setState({ favorites: self.state.favorites.concat(kitten) });
    }
  },

  onRemoveFavorite: function(kitten) {
    var self = this;
    return function() {
      self.setState({ favorites: _.without(self.state.favorites, kitten) });
    }
  }
});

// 
// The main view that renders the list of kittens
// 
var List = React.createClass({

  getInitialState: function() {
    return { kittens: [] }
  },

  componentDidMount: function() {
    this.nextPage();
  },

  render: function() {
    var self = this;
    var li = function(kitten) {
      var isFavorited = _.findWhere(self.props.favorites, { id: kitten.id });
      return (
        <li
          key={kitten.id}
          onClick={self.props.onFavorite(kitten)}
          className={isFavorited ? 'favorited' : ''}
        >
          <img src={"images/" + kitten.href + ".jpg"} />
        </li>
      );
    };
    return (
      <div>
        <div id='favorites-list'>
          <ul>{_.map(this.state.kittens, li)}</ul>
        </div>
        <button id='next-page' onClick={this.nextPage}>Next</button>
      </div>
    )
  },

  nextPage: function() {
    var kittens = _.times(30, function() {
      return _.sample(fixtures());
    });
    this.setState({ kittens: this.state.kittens.concat(kittens) });
  }
});

// 
// The favorites tray that sits at the bottom
// 
var Tray = React.createClass({

  render: function() {
    var self = this;
    var li = function(kitten) {
      return (
        <li onClick={self.props.onRemoveFavorite(kitten)}>
          <img src={"images/" + kitten.href + ".jpg"} />
        </li>
      );
    };
    return (
      <div id='favorites-tray'>
        <ul>{_.map(this.props.favorites, li)}</ul>
      </div>
    )
  }
});

// 
// Initialize function that sets everything up
// 
$(function() {
  React.render(<App />, $('#container')[0]);
});

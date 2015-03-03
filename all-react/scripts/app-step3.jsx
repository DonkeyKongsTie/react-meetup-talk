// 
// Top-level component
// 
var App = React.createClass({

  render: function() {
    return (
      <div>
        <List />
        <Tray />
      </div>
    )
  }
});

// 
// The main view that renders the list of kittens
// 
var List = React.createClass({

  getInitialState: function() {
    return { kittens: [], favorites: [] }
  },

  componentDidMount: function() {
    this.nextPage();
  },

  render: function() {
    var self = this;
    var li = function(kitten) {
      var isFavorited = _.findWhere(self.state.favorites, { id: kitten.id });
      return (
        <li
          key={kitten.id}
          onClick={self.onFavorite(kitten)}
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

  onFavorite: function(kitten) {
    var self = this;
    return function() {
      self.setState({ favorites: self.state.favorites.concat(kitten) });
    }
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
    return <div id='favorites-tray'></div>
  }
});

// 
// Initialize function that sets everything up
// 
$(function() {
  React.render(<App />, $('#container')[0]);
});

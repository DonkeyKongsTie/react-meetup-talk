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
    return { kittens: [], favorited: [] }
  },

  componentDidMount: function() {
    this.nextPage();
  },

  render: function() {
    var self = this;
    var li = function(kitten, index) {
      return (
        <li
          key={kitten.id}
          onClick={self.favorite(index)}
          className={self.state.favorited.indexOf(index) >= 0 ? 'favorited' : ''}
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

  favorite: function(index) {
    var self = this;
    return function() {
      self.setState({ favorited: self.state.favorited.concat(index) });
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

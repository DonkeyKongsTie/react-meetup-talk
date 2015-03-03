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
    return { kittens: [] }
  },

  componentDidMount: function() {
    this.nextPage();
  },

  render: function() {
    var li = function(kitten) {
      return (
        <li key={kitten.id}>
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
    var newKittens = this.state.kittens.concat(kittens);
    this.setState({ kittens: newKittens });
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

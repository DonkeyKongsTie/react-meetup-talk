// 
// Top-level data
// 
var kittens = [];
var favorites = [];

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
  React.render(<App favorites={favorites}  />, $('#container')[0]);
});

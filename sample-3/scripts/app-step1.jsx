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

  render: function() {
    return (
      <div>
        <div id='favorites-list'></div>
        <button id='next-page'>Next</button>
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

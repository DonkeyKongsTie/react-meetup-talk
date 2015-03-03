// 
// Top-level data
// 
var kittens = [_.sample(fixtures())];
var favorites = [];

// 
// Top-level component
// 
var App = React.createClass({

  render: function() {
    return (
      <div>
        <List kittens={this.props.kittens} />
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
    var li = function(kitten) {
      return (
        <li key={kitten.id}>
          <img src={"images/" + kitten.href + ".jpg"} />
        </li>
      );
    };
    console.log(this.props.kittens)
    return (
      <div>
        <div id='favorites-list'>
          <ul>{_.map(this.props.kittens, li)}</ul>
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
  React.render(<App favorites={favorites} kittens={kittens}  />, $('#container')[0]);
});

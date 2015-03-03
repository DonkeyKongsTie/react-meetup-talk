(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 
// Top-level component
// 
var App = React.createClass({displayName: "App",

  getInitialState: function() {
    return { favorites: [] }
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(List, {
          onFavorite: this.onFavorite, 
          favorites: this.state.favorites}), 
        React.createElement(Tray, {
          onRemoveFavorite: this.onRemoveFavorite, 
          favorites: this.state.favorites})
      )
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
var List = React.createClass({displayName: "List",

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
        React.createElement("li", {
          key: kitten.id, 
          onClick: self.props.onFavorite(kitten), 
          className: isFavorited ? 'favorited' : ''
        }, 
          React.createElement("img", {src: "images/" + kitten.href + ".jpg"})
        )
      );
    };
    return (
      React.createElement("div", null, 
        React.createElement("div", {id: "favorites-list"}, 
          React.createElement("ul", null, _.map(this.state.kittens, li))
        ), 
        React.createElement("button", {id: "next-page", onClick: this.nextPage}, "Next")
      )
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
var Tray = React.createClass({displayName: "Tray",

  render: function() {
    var self = this;
    var li = function(kitten) {
      return (
        React.createElement("li", {onClick: self.props.onRemoveFavorite(kitten)}, 
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

// 
// Initialize function that sets everything up
// 
$(function() {
  React.render(React.createElement(App, null), $('#container')[0]);
});


},{}]},{},[1]);

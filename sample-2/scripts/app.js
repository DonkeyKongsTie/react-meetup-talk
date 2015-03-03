(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// 
// Top-level collections of favorites and the list of kittens
// 
var kittens = new Backbone.Collection();
var favorites = new Backbone.Collection();

// 
// The main view that renders the list of kittens
// 
var ListView = Backbone.View.extend({

  template: _.template(
    '<ul>' + 
      '<% favorites.each(function(kitten) { %>' +
        '<li data-id="<%= kitten.get("id") %>">' + 
          '<img src="images/<%= kitten.get("href") %>.jpg">' +
          '<%= kitten.get("name") %>' +
        '</li>' +
      '<% }); %>' +
    '</ul>'
  ),

  initialize: function(options) {
    this.favorites = options.favorites;
    this.collection.on('add', _.bind(this.render, this));
    this.favorites.on('remove', _.bind(this.onRemoveFavorite, this))
    this.nextPage();
  },

  onRemoveFavorite: function(kitten) {
    this.$('[data-id="' + kitten.get('id') + '"]').removeClass('favorited');
  },

  render: function() {
    this.$('#favorites-list').html(
      this.template({ favorites: this.collection })
    );
  },

  events: {
    'click #next-page': 'nextPage',
    'click li': 'favoriteKitten'
  },

  nextPage: function() {
    this.collection.add(_.times(30, function() {
      return _.sample(fixtures());
    }));
  },

  favoriteKitten: function(event) {
    var id = Number($(event.currentTarget).attr('data-id'));
    var kitten = this.collection.get(id);
    this.favorites.add(kitten);
    $(event.currentTarget).addClass('favorited');
  }
});

// 
// The favorites tray that sits at the bottom
// 
var Tray = React.createClass({displayName: "Tray",

  componentDidMount: function() {
    var self = this;
    this.props.favorites.on('add remove', function() {
      self.forceUpdate();
    });
  },

  render: function() {
    var self = this;
    var li = function(kitten) {
      return (
        React.createElement("li", {onClick: self.removeFavorite(kitten)}, 
          React.createElement("img", {src: "images/" + kitten.get('href') + ".jpg"})
        )
      );
    };
    return React.createElement("ul", null, this.props.favorites.map(li));
  },

  removeFavorite: function(kitten) {
    var self = this;
    return function() {
      self.props.favorites.remove(kitten);
    };
  }
});

// 
// Initialize function that sets everything up
// 
$(function() {
  new ListView({
    el: $('#favorites'),
    collection: kittens,
    favorites: favorites
  });
  React.render(React.createElement(Tray, {favorites: favorites}), $('#favorites-tray')[0]);
});


},{}]},{},[1]);

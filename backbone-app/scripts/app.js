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
var TrayView = Backbone.View.extend({

  template: _.template(
    '<ul>' + 
      '<% favorites.each(function(kitten) { %>' +
        '<li data-id="<%= kitten.get("id") %>">' + 
          '<img src="images/<%= kitten.get("href") %>.jpg">' +
        '</li>' +
      '<% }); %>' +
    '</ul>'
  ),

  initialize: function() {
    this.collection.on('add remove', _.bind(this.render, this));
  },

  render: function() {
    this.$el.html(
      this.template({ favorites: this.collection })
    );
  },

  events: {
    'click li': 'remove'
  },

  remove: function(event) {
    var id = Number($(event.currentTarget).attr('data-id'));
    var kitten = this.collection.get(id);
    this.collection.remove(kitten);
  }
});

// 
// Initialize function that sets everything up
// 
$(function() {
  new TrayView({
    el: $('#favorites-tray'),
    collection: favorites
  });
  new ListView({
    el: $('#favorites'),
    collection: kittens,
    favorites: favorites
  });
});

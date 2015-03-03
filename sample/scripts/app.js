var tmpl = [
  '<div>',
    '<h1><%= name %></h1>',
  '</div>'
].join('')

$(function() {
  $('#favorites-list').html(_.template(tmpl)({ name: 'foo' }));
});
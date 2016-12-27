var interval;

function getString(url) {
  return new Promise(function(resolve, reject) {
    $.get(url).done(resolve).fail(reject);
  });
}

function onReady(string) {
  var factor = 1000, spacing = 50, counter = 0, array = [];
  insertDOM(clockify(string), string.length);
  while (array.length < string.length) array.push(array.length);
  clearInterval(interval);
  interval = setInterval(animateLetters, factor, spacing, function() { return ++counter; }, array);
}

function setup() {
  var query = location.search.slice(1);
  return getString('https://pizzatime-api.herokuapp.com/')
    .then(function(data) {
      return query === 'surpriseme' ? data.data : Promise.reject();
    }).catch(function() {
      return query || 'pizzatime';
    }).then(onReady);
}

$(document).ready(function() {
  onReady(location.search.slice(1) || 'pizzatime');
  setup();
  $(window).blur(function() {
    clearInterval(interval);
  });
  $(window).focus(function() {
    setup();
  });
});

function animateLetter(id, spacing) {
  var $letter = $('.num-' + id), $sibling = $letter.clone();
  $letter.parent().append($sibling);
  $letter.animate({ top: -spacing }, function() {
    $letter.remove();
  });
  $sibling.animate({ top: -spacing }, function() {
    $sibling.css({ top: 0 });
  });
}

function animateLetters(spacing, next, array) {
  var elapsed = next();
  array.forEach(function(i) {
    var id = Math.pow(3, i);
    if (elapsed % id === 0) animateLetter(i, spacing);
  });
}

function clockify(string) {
  var before = string.split(''), after = [];
  while (before.length) {
    after.unshift(before.pop());
    if (before.length) after.unshift(before.pop());
    if (before.length) after.unshift(':');
  }
  return after.join('');
}

function insertDOM(string, length) {
  var $clock = $('.clock');
  $clock.empty();
  string.split('').forEach(function(letter) {
    if (letter === ':') {
      $clock.append('<div><span class="colon">:</span></div>');
    } else {
      $clock.append('<div><span class="digit num-' + (--length) + '">' + letter + '</span></div>');
    }
  });
}

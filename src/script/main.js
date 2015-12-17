$(document).ready(function() {
  var factor = 1000, spacing = 50, counter = 0;
  var string = window.location.search.slice(1) || 'pizzatime';
  var length = string.length;
  string = clockify(string);
  insert(string, length);
  var array = [];
  while (array.length < length) array.push(array.length);
  setInterval(animateLetters, factor, spacing, function() { return ++counter; }, array);
});

function animateLetter(id, spacing) {
  var $letter = $('.num-' + id);
  var $sibling = $letter.clone();
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
  var before = string.split('');
  var after = [];
  while (before.length) {
    after.unshift(before.pop());
    if (before.length) after.unshift(before.pop());
    if (before.length) after.unshift(':');
  }
  return after.join('');
}

function insert(string, length) {
  var $clock = $('.clock');
  string.split('').forEach(function(letter) {
    if (letter === ':') {
      $clock.append('<div><span class="colon">:</span></div>');
    } else {
      $clock.append('<div><span class="digit num-' + (--length) + '">' + letter + '</span></div>');
    }
  });
}

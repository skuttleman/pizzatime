$(document).ready(function() {
  var factor = 1000, spacing = 55, counter = 0;
  setInterval(animateLetters, factor, spacing, function() { return ++counter; });
});

function animateLetter(id, spacing) {
  var $letter = $('.num-' + id);
  var $sibling = $letter.clone();
  $letter.parent().append($sibling);
  $letter.animate({ top: -spacing}, function() {
    $letter.remove();
  });
  $sibling.animate({ top: -spacing}, function() {
    $sibling.css({ top: 0 });
  });
}

function animateLetters(spacing, next) {
  var elapsed = next();
  [1,2,4,8,16,32,64,128,256].forEach(function(id) {
    if (elapsed % id === 0) animateLetter(id, spacing);
  });
}

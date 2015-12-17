$(document).ready(function() {
  var factor = 1000, spacing = 50, counter = 0;
  setInterval(animateLetters, factor, spacing, function() { return ++counter; });
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

function animateLetters(spacing, next) {
  var elapsed = next();
  [0,1,2,3,4,5,6,7,8].forEach(function(i) {
    var id = Math.pow(3, i);
    if (elapsed % id === 0) animateLetter(i, spacing);
  });
}

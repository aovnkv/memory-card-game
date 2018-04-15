## Need to refactor
- refactor `makeDeck()` func that it changes `<ul class='deck'>` all children `<li>` innerhtml after restart or page refresh;
it's needed for performance advantage - now it removes and build nodes causing browser reflow.
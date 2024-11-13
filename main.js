$(document).ready(function() {
    // When a card is clicked, update the link
    $('.card').on('click', function() {
        var game = $(this).data('game');
        var gameLink = '';

        // Modify the link for each game
        if (game === 'Game 1') {
            gameLink = "rock-paper-scissors/game1.html";
        } else if (game === 'Game 2') {
            gameLink = 'memory-game/game2.html';
        } else if (game === 'Game 3') {
            gameLink = 'breakout/game3.html';
        } else if (game === 'Game 4') {
            gameLink = 'space-invadors/game4.html';
        }

        // Update the link dynamically
        $(this).find('.game-link').attr('href', gameLink);
    });
});

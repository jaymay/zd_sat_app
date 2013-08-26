(function() {
  return {

    events: {
      'app.activated':'init'
    },

    init: function() {
      // Hide 2 custom fields
      var ratingField = this.ticketFields('custom_field_' + this.setting('predictionRating'));
      ratingField.hide();

      var scoreField = this.ticketFields('custom_field_' + this.setting('predictionScore'));
      scoreField.hide();

      // Render layout
      this.switchTo('main', {
        rating: ratingField.value(),
        score: scoreField.value()
      });
    }

  };
}());

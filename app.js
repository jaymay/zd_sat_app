(function() {
  return {

    events: {
      'app.activated':'init'
    },

    init: function() {
      // Hide 2 custom fields
      var ratingField = this.ticketFields( this.customFieldName('predictionRating') ),
          scoreField = this.ticketFields( this.customFieldName('predictionScore') ),
          ratingValue = this.ticket().customField( this.customFieldName('predictionRating') ),
          scoreValue = this.ticket().customField( this.customFieldName('predictionScore') );

      ratingField.hide();
      scoreField.hide();

     // ratingField.disable();
     // scoreField.disable();

      if (ratingValue === "") {
        this.switchTo('no_score');
      } else {
        this.switchTo('score', {
          rating: ratingValue,
          score: Math.round(scoreValue * 100) / 100
        });
      }
    },

    customFieldName: function(name){
      return 'custom_field_' + this.setting(name);
    }

  };
}());

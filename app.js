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

      // Render layout
      this.switchTo('score', {
        rating: ratingValue,
        score: scoreValue
      });
    },

    customFieldName: function(name){
      return 'custom_field_' + this.setting(name);
    }

  };
}());

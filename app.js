(function() {
  return {

    events: {
      'app.activated':'doSomething',
      'click .predict':'sendData'
    },

    requests: {
      'postData' : function(data){
        return {
          // For more info about jQuery AJAX -> http://api.jquery.com/jQuery.ajax/
          url: 'https://www.googleapis.com/prediction/v1.5/hostedmodels/zendesk/predict',
          type: 'POST',
          data: data
        };
      }
    },

    doSomething: function() {
      this.switchTo('main', {
        id: this.ticket().id(),
        subject: this.ticket().subject(),
        description: this.ticket().description()
      });
    },

    // When the button with .predict is pressed, this function will fire
    sendData: function() {
      // Which then calls the request "postData", and should pass through the data (at the moment it's an empty object)
      this.ajax( 'postData', {
        id: this.ticket().id, description: this.ticket().description()
      });
    }
  };
}());

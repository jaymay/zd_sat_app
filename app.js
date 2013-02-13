(function() {

  var METRICS_URL     = '/api/v2/tickets/%@/metrics.json',
      GOOGLE_API_URL    = 'https://www.googleapis.com/prediction/v1.5/hostedmodels/zendesk/predict?%@',
      OPTION_TEMPLATE = '<option value="%@">%@</option>';
  
  return {

    events: {
      'app.activated':'doSomething',
      'click .predict':'sendData'
    },

    requests: {
      'postData' : function(data, key){
        return {
          // For more info about jQuery AJAX -> http://api.jquery.com/jQuery.ajax/
          url: helpers.fmt(GOOGLE_API_URL,key),
          type: 'POST',
          data: data
        };
      },
      //Get the following data from the Zendesk API to pass as features to the Predicton API
        //subject,
        //description,
        //ticket_type_id,
        //reopens,
        //replies,
        //group_stations,
        //first_reply_time_in_minutes,
        //requester_wait_time_in_minutes,
        //industry,
        //employee_count,
        //target_audience
      'getStats' : function(ticketID){
        return{
          url: helpers.fmt(METRICS_URL, ticketID),
          type: 'GET'
        };
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
    }
  };
}());

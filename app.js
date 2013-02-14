(function() {

  var METRICS_URL     = '/api/v2/tickets/%@/metrics.json',
      TICKET_AUDITS_URL = '/api/v2/tickets/%@/audits.json',
      GOOGLE_API_URL    = 'https://www.googleapis.com/prediction/v1.5/hostedmodels/zendesk/predict?%@',
      OPTION_TEMPLATE = '<option value="%@">%@</option>';

  return {

    events: {
      'app.activated':'doSomething',
      'click .predict':'sendData',
      'getStats.done':'handleGetStats',  //TODO: Change event handler to sendData event
      'getAudits.done':'handleGetAudits',
      'getStats.fail':'handleError',
      'getAudits.fail':'handleError'
    },

    requests: {
      'postData' : function(data, key){
        return {
          // For more info about jQuery AJAX -> http://api.jquery.com/jQuery.ajax/
          // TODO: Get Ruby server to send request for OAUTH token
          url: helpers.fmt(GOOGLE_API_URL,key),
          type: 'POST',
          data: data
        };
      },

      'getStats' : function(ticketID){
        return{
          url: helpers.fmt(METRICS_URL, ticketID),
          type: 'GET'
        };
      },

      'getAudits' : function(ticketID){
        return{
          url: helpers.fmt(TICKET_AUDITS_URL, ticketID),
          type: 'GET'
        };
      }
    },

    doSomething: function() {
      this.switchTo('main', {
        id: this.ticket().id(),
        subject: this.ticket().subject(),
        description: this.ticket().description()
      });

      // Request the metrics about the ticket
      this.ajax('getStats', this.ticket().id());
    },

    // When data is returned from the metrics api, do something
    handleGetStats: function(data){
      var ticket_metric = data.ticket_metric;

      console.log(ticket_metric); // See what data is returned
      console.log("ticket_type: " + this.ticket().type());
      console.log("reopens: " + ticket_metric.reopens); // How many times has it been reopened?
      console.log("replies: " + ticket_metric.replies);
      console.log("group_stations: " + ticket_metric.group_stations);
      console.log("reply_time_in_minutes: " + ticket_metric.reply_time_in_minutes.calendar);
      console.log("req_wait_time_in_minutes: " + ticket_metric.requester_wait_time_in_minutes.calendar);
      console.log("comment: " + this.comment().text());
      //TODO: Add account benchmark features

    },
    // When data is returned from the metrics api, do something
    handleGetAudits: function(data){
      var ticket_audits = data.audits;

      console.log('hello');
    },

    // When the button with .predict is pressed, this function will fire
    sendData: function(data) {
      // Which then calls the request "postData", and should pass through the data (at the moment it's an empty object)
      var ticket_metric = data.ticket_metric;
      this.ajax( 'postData', {
        subject: this.ticket().subject(),
        description: this.ticket().description(),
        ticket_type: this.ticket().type(),
        reopens: ticket_metric.reopens,
        replies: ticket_metric.replies,
        group_stations: ticket_metric.group_stations,
        first_reply_time_in_minutes: ticket_metric.reply_time_in_minutes.calendar,
        req_wait_time_in_minutes: ticket_metric.requester_wait_time_in_minutes.calendar
      });
    },

    handleError: function(data){
      alert('Something went wrong with a request');
      console.log(data);
    }

  };
}());

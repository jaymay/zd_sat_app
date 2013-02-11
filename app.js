(function() {

  return {
    events: {
      'app.activated':'doSomething'
    },

    doSomething: function() {
    	this.switchTo('main', {
    		id: this.ticket().id(),
    		description: this.ticket().description()
    	});
    }
  };

}());

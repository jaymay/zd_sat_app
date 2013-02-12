(function() {
  return {
    events: {
      'app.activated':'fetchText'
    },
    fetchText: function() {
      this.switchTo('main', {
        id: this.ticket().id(),
        subject: this.ticket().subject(),
        description: this.ticket().description()
      });
    }
  };
}());

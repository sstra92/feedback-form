(function(window){
  window.extractData = function() {
    var ret = $.Deferred();
    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    function onReady(smart)  {
      if (smart.hasOwnProperty('patient')) {
        var patient = smart.patient;
        var pt = patient.read();
        $.when(pt).fail(onError);
        $.when(pt).done(function(patient) {
          var p = defaultPatient();
          p.id = patient.id;
          p.identifier = patient.identifier;
          ret.resolve(p);
        });
      } else {
        onError();
      }
    }

    FHIR.oauth2.ready(onReady, onError);
    return ret.promise();

  };

  function defaultPatient(){
    return {
      pid: {value: ''},
      identifier: {value: ''}
    };
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#pid').html(p.id)
    $('#identifier').html(p.identifier)
  };

})(window);

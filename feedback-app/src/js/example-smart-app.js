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
      } else if (smart.hasOwnProperty('practitioner')) {
        var practitioner = smart.practitioner;
        var pract = practitioner.read();
        $.when(pract).fail(onError);
        $.when(pract).done(function(patient) {
          var pr = defaultPractitioner();
          pr.id = pract.id;
          // p.identifier = patient.identifier;
          ret.resolve(pr);
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

  function defaultPractitioner(){
    return {
      id: {value: ''}
    }
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#patient-id').html(p.id)
    $('#identifier').html(p.identifier)
    $('#practitioner-id').html(pr.id)
  };

})(window);

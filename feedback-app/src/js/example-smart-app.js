(function(window){
  window.extractData = function() {
    var ret = $.Deferred();
    function onError() {
      console.log('Loading error', arguments);
      ret.reject();
    }

    // function onReady(smart)  {
    //   if (smart.hasOwnProperty('patient')) {
    //     var patient = smart.patient;
    //     var pt = patient.read();
    //     $.when(pt).fail(onError);
    //     $.when(pt).done(function(patient) {
    //       var p = defaultPatient();
    //       p.id = patient.id;
    //       p.identifier = patient.identifier;
    //       ret.resolve(p);
    //     });
    //   } else if (smart.hasOwnProperty('practitioner')) {
    //     var practitioner = smart.practitioner;
    //     var pract = practitioner.read();
    //     $.when(pract).fail(onError);
    //     $.when(pract).done(function(practitioner) {
    //       var pr = defaultPractitioner();
    //       pr.id = practitioner.id;
    //       pr.identifier = practitioner.identifier;
    //       pr.name = practitioner.name;
    //       ret.resolve(pr);
    //     });
    //   } else {
    //     onError();
    //   }
    // }


      function onReady(smart)  {
      if (smart.hasOwnProperty('practitioner')) {
        var practitioner = smart.practitioner;
        var pract = practitioner.read();
        $.when(pract).fail(onError);
        $.when(pract).done(function(practitioner) {
          var pr = defaultPractitioner();
          pr.id = practitioner.id;
          pr.identifier = practitioner.identifier;
          pr.name = practitioner.name;
          ret.resolve(pr);
        });
      } else if (smart.hasOwnProperty('patient')) {
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

  function defaultPractitioner(){
    return {
      id: {value: ''},
      identifier: {value: ''},
      name: {value: ''}
    }
  }

  window.drawVisualization = function(p) {
    $('#holder').show();
    $('#loading').hide();
    $('#patient-id').html(p.id)
    $('#identifier').html(p.identifier)
    $('#practitioner-id').html(pr.id)
    $('#practitioner-identifier').html(pr.identifier)
    $('#practitioner-name').html(pr.name)
  };

})(window);

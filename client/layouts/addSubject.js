import './addSubject.html';
import Papa from 'papaparse';
import { subject } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.newSubject.helpers({
  subject(){
    return subject;
  }
});

Template.readCSV.events({
  "click .btnReadCsv": function(event, template) {
      Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          complete: function(results, file) {
            Meteor.call( 'parseUpload', results.data, ( error, response ) => {
              if ( error ) {
                alert('warning');
              } else {
                alert( 'Upload complete!' );
              }
            });
          },
          skipEmptyLines: true
      });
   }
 });

AutoForm.hooks({
  addSubjectForm: {
    onSubmit: function (doc) {
      this.done();
    },
    OnSuccess: function (doc){
      alert("A new subject has been added");
      FlowRouter.go("/");
    },
    OnError: function (doc){
      alert("This subject can not be added");
      return false;
    }
  }
});

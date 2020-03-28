import './content.html';
import { student } from '../../lib/collections/collection.js';
import { subject } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import Papa from 'papaparse';

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

Template.student.helpers({
  student: function() {
    return student.find();
  }
});


Template.subject.helpers({
  subject: function() {
    return subject.find();
  }
});

Template.example.events({
    'click .takePhoto': function(e, instance) {

        e.preventDefault();
        var cameraOptions = {
            width: 800,
            height: 600
        };
        MeteorCamera.locale.takePhoto = "Capture Image";

        MeteorCamera.getPicture(cameraOptions, function (error, data) {


           if (!error) {
               instance.$('.photo').attr('src', data);

           }
        });
    }
});

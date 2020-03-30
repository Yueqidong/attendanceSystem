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
    var listOfStudent = Session.get('studentEnrolled');
    console.log(listOfStudent);
    return student.find({studentID:{$in:listOfStudent}}).fetch();
  }
});


Template.subject.helpers({
  subject: function() {
    return subject.find();
  }
});

Template.subject.events({
  'change #dropdown': function(event,template){
    var selectedValue = $(event.target).val();
    console.log(selectedValue);
    var doc = subject.findOne({subjectCode:selectedValue}, {fields:{_id:0, enrollment:1}});
    Session.set('studentEnrolled',doc.enrollment);
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

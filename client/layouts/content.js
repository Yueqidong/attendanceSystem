import './content.html';
import { student } from '../../lib/collections/collection.js';
import { subject, record } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import Papa from 'papaparse';
import swal from 'sweetalert';

Template.readCSV.events({
  "click .btnReadCsv": function(event, template) {
      Papa.parse(template.find('#csv-file').files[0], {
          header: true,
          complete: function(results, file) {
            Meteor.call( 'parseUpload', results.data, ( error, response ) => {
              if ( error ) {
                alert('warning');
              } else {
                swal("Good job!", "Upload complete!", "success");
              }
            });
          },
          skipEmptyLines: true
      });
   }
 });

 Template.content.events({
   'click .markAttendance':function(e,inst){
     e.preventDefault();
     var student = this;
     var subjectCode = inst.$('#dropdown').val();
     var week = inst.$('[name=week]').val();
     var studentName = student.name;
     var studentID = student.studentID;
     var remark = inst.$('[data-id='+ studentID +']').val();
     Meteor.call('recordAttendance',subjectCode,week,studentName,studentID,remark,(error,response)=>{
       if ( error ) {
         console.log( error.reason );
       } else {
         swal("Good job!", "The attendance is taken", "success");
           }
     });
   },
   'change #week': function(event, template){
     var week = $(event.target).val();
     var listOfID = Session.get('studentEnrolled');
     Meteor.call('updateWeek', week, listOfID);
   }
 });

Template.student.helpers({
  student: function() {
    var listOfStudent = Session.get('studentEnrolled');
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
    var doc = subject.findOne({subjectCode:selectedValue}, {fields:{_id:0, enrollment:1}});
    var studentArray = doc.enrollment;
    console.log(studentArray.length);
    Session.set('studentEnrolled',doc.enrollment);
    //Meteor.call('recordFirst',selectedValue, studentArray,(error,response)=>{
      //if ( error ) {
        //console.log( error.reason );
      //}
    //});
    for(let i = 0; i<studentArray.length; i++){
      let studentID = studentArray[ i ],
          studentDoc = student.findOne({studentID: studentID}),
          studentName = studentDoc.name;
      record.insert({subjectCode:selectedValue, studentName:studentName, studentID:studentID, week:"null", attendance:false, remark:"null"});
    }

  }

});

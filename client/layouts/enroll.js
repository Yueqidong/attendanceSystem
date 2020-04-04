import './enroll.html';
import { subject,student } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert';

Template.studentID.helpers({
  student: function() {
    return student.find();
  }
});

Template.selectSubject.helpers({
  subject: function() {
    return subject.find();
  }
});

Template.enroll.events({
  'submit form':function(e){
    e.preventDefault();
    var name = $(e.target).find('[name=studentID]').val();
    var subjectCode = $(e.target).find('[name=subjectCode]').val();
    Meteor.call('enrollSubject',name,subjectCode,(error,response)=>{
      if ( error ) {
        console.log( error.reason );
      } else {
        swal("Good job!", "The subject is enrolled", "success");
          }
    });
  }
});

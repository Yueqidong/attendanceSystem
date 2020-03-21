import './addStudent.html';
import { student } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.addStudent.events({
  'submit form':function(e){
    e.preventDefault();

    var post= {
      name: $(e.target).find('[name=studentName]').val(),
      studentID: $(e.target).find('[name=studentID]').val(),
      gender: $(e.target).find('[name=gender]').val(),
      nationality: $(e.target).find('[name=Nationality]').val(),
      programme: $(e.target).find('[name=programme]').val()
    };

    post._id = student.insert(post);
    alert("Student profile has been created");
    FlowRouter.go("/");
  }
});

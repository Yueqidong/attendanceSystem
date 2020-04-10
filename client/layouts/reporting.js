import './reporting.html';
import { subject,student,record } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import swal from 'sweetalert';


Template.belowEighty.helpers({
  belowEighty: function() {
    var studentIDList =[];
    var studentArray = [];
    var numOfStudent = student.find().count();
    var studentDoc = student.find().fetch();
    //Write in a method on the server side
    for(let i = 0; i<numOfStudent; i++){
      studentIDList.push(studentDoc[i].studentID);
    }

    for(let x = 0; x<numOfStudent; x++){
      let item = studentIDList[ x ],
          exist = record.findOne({studentID:item});
      if(!exist){
        //console.log("Student record not found");
      }else{
        studentArray.push(item);
        //console.log(studentArray);
      }
    }
    var belowEighty = [];
    for(let x = 0;x<studentArray.length; x++){
      let totalRecord = record.find({studentID:studentArray[x]}).count(),
          attend = record.find({studentID:studentArray[x],attendance:true}).count();
      if(attend/totalRecord<=0.8){
        belowEighty.push(studentArray[x]);
      }else{

      }
    }


    //console.log(belowEighty);
    return student.find({studentID:{$in:belowEighty}});
  }
});

Template.reporting.events({
  'submit form':function(e){
    e.preventDefault();
    var email = $(e.target).find('[name=email]').val();
    var studentID = $(e.target).find('[name=studentID]').val();
    var doc = student.findOne({studentID:studentID});
    var name = doc.name;
    var from = "attendancenoreply@gmail.com";
    var subject = "Attendance Report";
    var text = "Please notice that the attendance rate of this student (Student Name:" + name + ", Student ID:" +studentID+ ") is below 80%.";
    Meteor.call('sendEmail',email,from,subject,text,(error, response)=>{
      if(error){
        console.log(error.reason);
      }else{
        swal("Good job!", "The report is sent", "success");
      }
    });
  }
});

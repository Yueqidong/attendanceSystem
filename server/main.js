import { student } from '../lib/collections/collection.js';
import { subject } from '../lib/collections/collection.js';
import { record } from '../lib/collections/collection.js';
import './lib/config.js';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Email } from 'meteor/email';
import {PythonShell} from 'python-shell';

Fiber = Npm.require('fibers');
exec = Npm.require('child_process').exec;

Meteor.methods({
  parseUpload( data ) {
    for ( let i = 0; i < data.length; i++ ) {
      let item   = data[ i ],
          exists = student.findOne( { studentID: item.studentID } );

      if ( !exists ) {
        student.insert( item );
      } else {
        console.warn( 'Rejected. This item already exists.' );
      }
    }
  },
  enrollSubject(name,subjectCode){

    var doc=subject.findOne({subjectCode:subjectCode});
    subject.update({_id:doc._id},{$addToSet:{"enrollment":name}});
  },
  recordAttendance(subjectCode,week,studentName,studentID,remark){
    var attendance = true;
    doc = record.findOne({studentID: studentID});
    record.update({_id:doc._id},{$set:{"attendance":attendance, "remark":remark}});
  },
  updateWeek(week, listOfID){
    for(let i = 0; i<listOfID.length; i++){
      let studentID = listOfID[ i ],
          recordDoc = record.findOne({studentID: studentID});
      record.update({_id:recordDoc._id},{$set:{"week":week}});
    }
  },
  sendEmail(email, from, subject, text){
    //check([email, from, subject, text], [String]);
    Meteor.defer(()=>{
      Email.send({to:email,
        from:from,
        subject:subject,
        text:text
      });
    });
  },
  exportAllContacts() {
		var fields = [
			"subjectCode",
			"studentName",
			"studentID",
			"week",
			"attendance",
      "remark"
		];

		var data = [];

		var records = record.find().fetch();
		_.each(records, function(c) {
			data.push([
				c.subjectCode,
				c.studentName,
				c.studentID,
				c.week,
				c.attendance,
        c.remark
			]);
		});

		return {fields: fields, data: data};
	},
  myPythonCall() {
    PythonShell.run('C:/Users/Yue Qi Dong/face/face_recognition.py', null, function (err) {
      if (err) throw err;
      console.log('finished');
    });
  }

});



student.allow({
  insert: function (userId, doc) {
  return !! userId;
}
});

subject.allow({
  insert: function (userId, doc) {
    return !! userId;
},
  update: function(userId, doc)  {
    return !! userId;
  }
});

record.allow({
  insert: function (userId, doc) {
  return !! userId;
},
  update: function (userId, doc)  {
  return !! userId;
}
});


Meteor.publish("student",function(){
  return student.find();
});

Meteor.publish("subject",function(){
  return subject.find();
});

Meteor.publish("record",function(){
  return record.find();
});

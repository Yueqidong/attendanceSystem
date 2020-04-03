import { student } from '../lib/collections/collection.js';
import { subject } from '../lib/collections/collection.js';
import { record } from '../lib/collections/collection.js';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { ReactiveAggregate } from 'meteor/tunguska:reactive-aggregate';


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

import { student } from '../lib/collections/collection.js';
import { subject } from '../lib/collections/collection.js';
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
  update: function(userID, doc)  {
    return !! userId;
  }
});

Meteor.publish("student",function(){
  return student.find();
});

Meteor.publish("subject",function(){
  return subject.find();
});

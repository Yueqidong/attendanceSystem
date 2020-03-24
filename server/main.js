import { student } from '../lib/collections/collection.js';
import { subject } from '../lib/collections/collection.js';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';


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
}
});

Meteor.publish("student",function(){
  return student.find();
});

Meteor.publish("subject",function(){
  return subject.find();
});

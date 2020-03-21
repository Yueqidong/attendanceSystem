import { student } from '../lib/collections/collection.js';
import { Meteor } from 'meteor/meteor';


  // code to run on server at startup
  if (student.find().count() === 0) {
  student.insert({
    name: 'Introducing Telescope',
    studentID: 'B1560124',
    gender:'male',
    nationality:'American',
    programme:'IT'
  });

  student.insert({
    name: "Joanne Amberg",
    studentID:"B1600212",
    gender: "female",
    nationality:"American",
    programme:"Business"
  });

  student.insert({
    name: "Jenna Corin",
    studentID: "B1700123",
    gender: "female",
    nationality:'Malaysian',
    programme:"IT"
  });
}
student.allow({
  insert: function (userId, doc) {
  return !! userId;
}
});

Meteor.publish("student",function(){
  return student.find();
});

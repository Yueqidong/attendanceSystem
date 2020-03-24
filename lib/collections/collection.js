import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const student = new Mongo.Collection('student');
export const subject = new Mongo.Collection('subject');

const subjectSchema = new SimpleSchema({
  subjectCode:{
    type: String,
    label: "Subject Code",
    index:true,
    unique:true
  },
  subjectName:{
    type: String,
    label: "Subject Name",
    index:true,
    unique:true
  }
});

subject.attachSchema(subjectSchema);

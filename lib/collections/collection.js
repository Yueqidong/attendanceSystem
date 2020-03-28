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
  },
  enrollment:{
    type: Array,
    optional: true
  },
  'enrollment.$':String,
});


const studentSchema = new SimpleSchema({
  name:{
    type: String,
    label: "Student Name"
  },
  studentID:{
    type: String,
    label: "Student ID",
    index:true,
    unique:true
  },
  gender:{
    type:String,
    label:"Gender"
  },
  nationality:{
    type:String,
    label:"Nationality"
  },
  programme:{
    type:String,
    label:"Programme"
  }
});

subject.attachSchema(subjectSchema);
//ubject.schema = subjectSchema;
student.attachSchema(studentSchema);

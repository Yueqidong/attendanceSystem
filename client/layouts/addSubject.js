import './addSubject.html';
import Papa from 'papaparse';
import { subject } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';


Template.newSubject.helpers({
  subject(){
    return subject;
  }
});

import { student } from '../lib/collections/collection.js';
import { subject } from '../lib/collections/collection.js';
import '../lib/routes/routes.js';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';


Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Meteor.subscribe("student");
Meteor.subscribe("subject");

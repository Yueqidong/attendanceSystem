import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/client/layouts/layout.js';
import '/client/layouts/header.js';
import '/client/layouts/content.js';
import '/client/layouts/reporting.js';
import '/client/layouts/visual.js';
import '/client/layouts/addStudent.js';
import '/client/layouts/addSubject.js';
import '/client/layouts/enroll.js';

FlowRouter.route('/', {
    name: 'home',
    action(){
        BlazeLayout.render('layout');
  }
});

FlowRouter.route('/add', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'content'});
  }
});

FlowRouter.route('/report', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'reporting'});
  }
});

FlowRouter.route('/visual', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'visual'});
  }
});

FlowRouter.route('/addStudent', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'addStudent'});
  }
});

FlowRouter.route('/addSubject', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'addSubject'});
  }
});

FlowRouter.route('/enroll', {
    name: 'home',
    action(){
        BlazeLayout.render('layout', {main:'enroll'});
  }
});

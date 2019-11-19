import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '/client/layouts/layout.js';
import '/client/layouts/header.js';
import '/client/layouts/content.js';
import '/client/layouts/reporting.js';
import '/client/layouts/visual.js';

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

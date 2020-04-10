import './export.html';
import './exporter.js';
import { Template } from 'meteor/templating';
import swal from 'sweetalert';

Template.export.events({
  "click #export": function() {
    MyAppExporter.exportAllContacts();
  }
});

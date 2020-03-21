import './content.html';
import { student } from '../../lib/collections/collection.js';
import { Template } from 'meteor/templating';

Template.student.helpers({
  student: function() {
    return student.find();
  }
});

Template.example.events({
    'click .takePhoto': function(e, instance) {

        e.preventDefault();
        var cameraOptions = {
            width: 800,
            height: 600
        };
        MeteorCamera.locale.takePhoto = "Capture Image";

        MeteorCamera.getPicture(cameraOptions, function (error, data) {


           if (!error) {
               instance.$('.photo').attr('src', data);

           }
        });
    }
});

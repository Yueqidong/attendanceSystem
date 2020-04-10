import './visual.html';
import { subject,student,record } from '../../lib/collections/collection.js';
import { Chart } from 'chart.js';
import { Template } from 'meteor/templating';


Template.getSubject.helpers({
  subject: function() {
    return subject.find();
  }
});

Template.visual.events({
  'change #subjectCode':function(event, template){
    var subjectCode = $(event.target).val();
    var studentIDList =[];
    var studentArray = [];
    var numOfStudent = student.find().count();
    var studentDoc = student.find().fetch();

    for(let i = 0; i<numOfStudent; i++){
      studentIDList.push(studentDoc[i].studentID);
    }

    for(let x = 0; x<numOfStudent; x++){
      let item = studentIDList[ x ],
          exist = record.findOne({studentID:item, subjectCode:subjectCode});
      if(!exist){
        //console.log("Student record not found");
      }else{
        studentArray.push(item);

      }
    }
    var rateList =[];
    for(let x = 0;x<studentArray.length; x++){
      let totalRecord = record.find({studentID:studentArray[x]}).count(),
          attend = record.find({studentID:studentArray[x],attendance:true}).count(),
          rate = attend/totalRecord*100;
      rateList.push(rate);
    }
    Session.set('subjectCode',subjectCode);
    Session.set('studentArray',studentArray);
    Session.set('rateList',rateList);
  }
});

Template.charts.helpers({
  createChart: function(){
    var studentArray = Session.get('studentArray');
    var rateList = Session.get('rateList');
    var subjectCode = Session.get('subjectCode');
    Meteor.defer(function() {
     // Create standard Highcharts chart with options:
     Highcharts.chart('chart', {
       title: {
       text: 'Attendance rate (percentage)'
     },
      xAxis: {
        categories: studentArray
     },
     yAxis: {
       title: {
         text: 'Total percent of attendance rate'
       }
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },
       series: [{
         type: 'column',
         name: subjectCode,
         data: rateList
       }]
     });
   });
  }
});

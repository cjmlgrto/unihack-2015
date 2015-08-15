Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  
  Template.body.helpers({
    notes: function () {
      return Notes.find({}, {sort: {created: -1}});
    }
  });
  
  Template.body.events({
    "click .create-new-note": function() {
      var text = document.getElementById('new-note').value;
      Notes.insert({
        text: text,
        created: new Date()
      });
      text = "";
    }
  });
  
  Template.note.events({
    "click .edit-note": function() {
      
    }
  });
  
}
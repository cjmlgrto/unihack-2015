Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  
  Template.body.helpers({
    notes: function () {
      return Notes.find({}, {sort: {created: -1}});
    }
  });
  
  Template.body.events({
    "submit .new-note": function(event) {
      event.preventDefault();
      var text = event.target.text.value;
      Notes.insert({
        text: text,
        created: new Date()
      });
      event.target.text.value = "";
    }
  });
  
}
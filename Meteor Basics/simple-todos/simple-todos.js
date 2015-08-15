// This is the "Tasks" mongo database
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
  
  // This is the data that gets passed to the body template
  Template.body.helpers({
    tasks: function() {
      // returns any text from the database, and sorts it
      return Tasks.find({}, {sort: {createdAt: -1}});
    }
  });
  
  Template.body.events({
    "submit .new-task": function (event) {
      
      // prevent browser default
      event.preventDefault();
      
      console.log(event);
      
      // get value from the event (the form element)
      var text = event.target.text.value;
      
      // Inserts the input text into the "Tasks" mongo database
      Tasks.insert({
        text: text,
        createdAt: new Date()
      });
      
      // Clear textbox
      event.target.text.value = "";
      
    }
    
    
  });
  
  Template.task.events({
    
    "click .toggle-checked": function () {
      // toggles checkstate
      Tasks.update(this._id, {
        $set: {checked: ! this.checked}
      });
    },
    "click .delete": function () {
      Tasks.remove(this._id);
    }
    
  });
  
}
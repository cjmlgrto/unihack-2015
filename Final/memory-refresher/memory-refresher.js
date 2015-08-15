Notes = new Mongo.Collection("notes")

var date_raw = new Date();
var current_date = date_raw.toUTCString();

if (Meteor.isClient) {
  
  Template.body.helpers({
    notes_list: function() {
      return Notes.find({});
    },
    notes_open: function() {
      return Notes.find({open: true});
    }
  });
  
  Template.body.events({
    "click .create-note": function() {
      Notes.insert({
        text: "Edit this note",
        date: current_date
      })
    }
  });
  
  Template.note_item.events({
    "click .delete": function() {
      Notes.remove(this._id);
    },
    "click .note_item": function() {
      Meteor.call("openall");
      
      Notes.update(
        this._id,
        {
          $set: {open: true}
        }
      );
    }
  });
  
  Template.note_open.events({
    "change .editor": function() {
      var id = this._id + "-open"
      var text = document.getElementById(id).value
      
      Notes.update(
        this._id,
        {
          text: text,
          date: current_date
        }
      );
      
    }
  });
  
}

if (Meteor.isServer) {

  Meteor.startup(function() {
    return Meteor.methods({
      
      openall: function() {
        return Notes.update(
          {},
          {
            $set: {open: false}
          },
          {multi: true}
        );
      }
      
    });
  });

}
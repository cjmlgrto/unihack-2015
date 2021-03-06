Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  
  Template.body.helpers({
    note_items: function() {
      return Notes.find({}, {sort: {modified: -1}});
    },
    open_notes: function() {
      return Notes.find({open: true});
    }
  });
  
  Template.body.events({
    // create-note
    "click #create-note": function() {
      var d = new Date();
      var date = d.toUTCString();
      Notes.insert({
        text: "",
        modified: date
      });
    }
    
  });
  
  Template.note_item.events({
    // deletes the note
    "click .delete": function() {
      Notes.remove(this._id);
    },
    // open the note
    "click .note_item": function() {
      // update only the clicked one
      Notes.update(
        this._id,
        {
          $set: {open: ! this.open}
        }
      );
    }    
  });
  
  Template.open_note.events({
    "change .editor": function() {
      var id = this._id + "-open"
      var text = document.getElementById(id).value
      var d = new Date();
      var date = d.toUTCString();
      
      console.log(text);
      
      Notes.update(this._id, {
        text: text,
        modified: date
      });
    }
  });
  
  
};
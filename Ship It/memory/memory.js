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
        text: "New note",
        date: current_date
      });
    }
  });
  
  Template.note_item.events({
    "click .note_items": function() {
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {
        console.log("Notifications enabled!")
      }
      Meteor.call("closeAll");
      Notes.update(
        this._id,
        {
          $set: {open: true}
        }
      );
      var data_text = this.text
      setInterval(function(){
        var notification = new Notification("Time for a Memory Refresh!", {
          icon: "",
          body: data_text
        });
        notification.onclick = function() {
          window.open("")
        }
      }, 5000);
    },
    "click .delete": function() {
      Notes.remove(this._id);
    }
  });
  
  Template.note_open.events({
    "blur .open-note-editor": function() {
      var id = this._id + "-open"
      var text = document.getElementById(id).value
      Notes.update(
        this._id,
        {
          text: text,
          date: current_date
        }
      );
      Notes.update(
        this._id,
        {
          $set: {open: true}
        }
      );
    },
    "blur .tags": function() {
      var id = this._id + "-tagger"
      var tag = document.getElementById(id).value
      console.log(tag)
      Notes.update(
        this._id,
        {
          text: this.text,
          date: current_date,
          tag: tag
        }
      );
      Notes.update(
        this._id,
        {
          $set: {open: true}
        }
      );
    }
  });
  
}

if (Meteor.isServer) {

  Meteor.startup(function() {
    return Meteor.methods({
      
      closeAll: function() {
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
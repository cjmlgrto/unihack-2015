Notes = new Mongo.Collection("notes")

var date_raw = new Date();
var current_date = date_raw.toUTCString();
var selected = "";
var temp = "";

if (Meteor.isClient) {
  
  Template.body.helpers({
    notes_list: function() {
      return Notes.find({});
    },
    notes_open: function() {
      return Notes.find({open: true});
    },
    flash_cards: function() {
      return Notes.find({});
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
      // enable notifications
      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {
        console.log("Notifications enabled!")
      }
      
      // close all other notes
      Meteor.call("openall"); 
      
      // onclick, open the note
      Notes.update(
        this._id,
        {
          $set: {open: true}
        }
      );
      
      // show the notification x seconds after modification
      var data_text = this.text
      dsetInterval(function(){
        var notification = new Notification("Time for a Memory Refresh!", {
          icon: "",
          body: data_text
        });
        notification.onclick = function() {
          window.open("")
        }
      }, 5000);
    }
  });
  
  Template.note_open.events({
    "blur .editor": function() {
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
    },
    
    "mouseup .editor": function() {
     
      if (window.getSelection) {
        selected = window.getSelection().toString();
      } 
      
    },
    
    "click .add-yo": function() {
      
      temp = selected + "|" + temp
      
      Notes.update(
        this._id,
        {
          $set: {flashcard: temp}
        }
      );
      
    }
  });
  
  Template.flash_card.helpers({

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


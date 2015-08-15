function parse() {
  var editor = document.getElementById("editor")

  var selected = ""
  
  if (window.getSelection) {
    selected = window.getSelection().toString()
  }

  var tmp = editor.innerHTML
  var repl = tmp.replace(selected, "<span>" + selected + "</span>")
  
  editor.innerHTML = repl
  
  var date = new Date();
  var highlight = selected + "\n" + date
  
  
  console.log("In the meantime, this gets sent to the database: \n" + highlight)

}
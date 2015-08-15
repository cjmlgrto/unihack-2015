  var selected = "";
  
  if (window.getSelection) {
    selected = window.getSelection();
  }
  
  console.log(selected)
  
  var element = "";
  var len = document.getElementsByTagName("span").length;
  var spand = "";
  
  for (i=0; i<len; i++) {
    element = document.getElementsByTagName("span")[i];
    
    if (selected.containsNode(element, true)) {
      spand = i
    }
  }
function strip(text){
	words_f=[]
	var chars=['"',"'",'/','(',')',',','.',';',':','!','#','$','*','?'];
	for(i=0, i<text.length, i++){
		for(n=0, n<chars.length, n++){
			if(text[i]==chars[n]){
				text=text.replace(i, ' ');
			}
		}
	}
	var words=text.split(' ');
	for(i=0, i<words.length, i++){
		if(words[i]!=''){
			words_f.push(words[i]);
		}
	}
	return words_f;
}

var text = prompt("Insert text");
strip(text);
console.log(words_f);
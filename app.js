(function(){
  var FireBaseModule = function () {
	var config = {
	  apiKey: "AIzaSyAc3oC0CJsZ9smd0IduxL-Hpxa1mphmYQU",
	  authDomain: "smartfridge-392c5.firebaseapp.com",
	  databaseURL: "https://smartfridge-392c5.firebaseio.com",
	  storageBucket: "smartfridge-392c5.appspot.com",
	  messagingSenderId: "574467206616"
    };
	var isInitialised = false;
	
	  function init(){
		  firebase.initializeApp(config);
		  isInitialised = true;
	  }
	  
	  function getDB(){
		  return isInitialised ? firebase.database() : null;
	  }
	  
	  function addValueWatcher(url, callback){
		  var reference = getDB().ref(url);
		  reference.on('value', function(snapshot){
			 if(typeof callback === 'function'){
				 return callback(snapshot.val());
			 } 
		  });
	  }
	  
	  return {
		  init: init,
		  getDB: getDB,
		  addValueWatcher: addValueWatcher
	  }
  }
  
  window.onload = function(){
	  var firebaseModule = new FireBaseModule();
	  var userId = 'ohNOtS8ybqbb9L9ZIN9nfKldGLC3';
	  
	  function openFridge(){
			var fridgeOpen = document.getElementById('fridge-opened'); 
			var fridgeClose = document.getElementById('fridge-closed');
		fridgeOpen.className = '';
		fridgeClose.className = 'hidden';
	  }
	  
	  function closeFridge(){
		var fridgeOpen = document.getElementById('fridge-opened'); 
		var fridgeClose = document.getElementById('fridge-closed');
		fridgeOpen.className = 'hidden';
		fridgeClose.className = '';
	  }
	  
	  firebaseModule.init();
	  firebaseModule.addValueWatcher('users', function(changedEntity){
		  console.log('changed');
		  if(changedEntity[userId] && changedEntity[userId] === 1) {
			 openFridge();
			  console.log('UserGeted');
		  } else {
			  closeFridge();
		  }
	  });
  };
}())
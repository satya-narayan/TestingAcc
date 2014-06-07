function satya(id){
    // About object is returned if there is no 'id' parameter
   var about = {
      Version: 0.1,
      Author: "Satyanarayan Dash",
      Created: "June 2014"
   };
 
   if (id) {
 
      // Avoid clobbering the window scope:
      // return a new _ object if we're in the wrong scope
      if (window === this) {
         return new satya(id);
      }
 
      // We're in the correct object scope:
      // Init our element object and return the object
      this.e = document.getElementById(id);
      return this;
   } else {
      // No 'id' parameter was given, return the 'about' object
      return about;
   }
}
 
// our dot-operator methods
satya.prototype = {
   name : function(){
   		return 'This is Satyanarayan Dash';
   }
};
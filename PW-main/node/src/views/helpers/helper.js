const toLower = function(value) {
  return value.toLowerCase();
}
const toUpper = function(value) {
  return value.toUpperCase();
}

const showError = function(errors,field){
  let message;
  if (typeof errors != 'undefined'){
    errors.errors.forEach(error => {
      if(error.path === field){
        message = error.message;
      }
    })
    return message;
  }
}

function checked(currentValue , value){
  if(currentValue == value){
    return "checked"
  }else{
    return "";
  }
}

module.exports = { toLower, toUpper , showError ,checked};
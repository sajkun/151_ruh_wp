function formatMoney(number, decPlaces, decSep, thouSep) {
  decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
  decSep = typeof decSep === "undefined" ? "." : decSep;
  thouSep = typeof thouSep === "undefined" ? "," : thouSep;
  var sign = number < 0 ? "-" : "";
  var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
  var j = (j = i.length) > 3 ? j % 3 : 0;

  var reverted_i = reverseString(i);
  var numbers = reverted_i.match(/.{1,3}/g);

  numbers.reverse();

  for(id in numbers){
    numbers[id] =  reverseString(numbers[id]);
  }

  return sign +
    numbers.join(thouSep)+
    (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
}

function reverseString(str) {
    var splitString = str.split("");
    var reverseArray = splitString.reverse();
    var joinArray = reverseArray.join(""); // "olleh"

    return joinArray; // "olleh"
}

function goBack() {
  window.history.back();
}


function get_sum_from_price(sum){
  if(typeof(sum) === 'undefined'){
    return 0;
  }

  if(isNaN(sum) && 'string' !== typeof(sum)){
    return 0;
  }

  if(!sum){
    return 0;
  }


  if(sum === 0){
    return 0;
  }


  if((sum) === 'undefined'){
    return 0;
  }

  if(typeof(sum) === 'string'){
    var exp = new RegExp("\\D", "gi");
    var pierces = sum.split('.');
    var summ = pierces[0].replace(exp, '');

    return parseFloat(summ);
  }

  if(typeof(sum) === 'number'){
    return sum;
  }

  return 0;
}



function clog(content, label, debug){
  if('undefined' === typeof(theme_debug)){
    return;
  }

  if('undefined' !== typeof(debug_vue) && 'undefined' !== typeof(debug) &&  debug){
    if('undefined' !== typeof(label) && 0 !== label){
      debug_vue.log(content,label);
    }
    else{
      debug_vue.log(content);
    }
  }

  if('undefined' !== typeof(label) && 0 !== label){
    console.group(label);
  }

  console.log(content);

  if('undefined' !== typeof(label) || 0 === label){
    console.groupEnd();
  }
}

function strlog(content, color , label){
  if('undefined' === typeof(theme_debug)){
    return;
  }

  var template = '';

  switch(color){
    case 'red':
      template = '\x1b[31m %s ';
      break;
    case 'green':
      template = '\x1b[32m %s ';
      break;
    case 'blue':
      template = '\x1b[34m %s ';
      break;
    default:
      template = '\x1b[34m %s ';
      break;
  }



  if('undefined' != typeof(label)){
    template = '\x1b[0m%s' + template + '\x1b[0m';
    console.log(template, label, content);
    // console.log('\x1b[0m%s\x1b[31m %s \x1b[0m' , time_str, err.message );
  }else{
    console.log(template, content);
  }

}


function strip(val){
  return JSON.parse(JSON.stringify(val));
}

function open_new_lead(){
  list_app.show_list = false;
  list_app.$refs.single_lead.visible= false;
  list_app.$refs.new_lead.visible= true;
}




var DateDiff = {

    inMinutes: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(60*1000));
    },


    inHours: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(3600*1000));
    },

    inDays: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

function range(start, end) {
  var sequence = [];
  if (!end) {
    end = start;
    start = 0;
  }
  for (var i = start; i < end; i += 1) {
    sequence.push(i);
  }
  return sequence;
}

// copy keys and values of b onto (and over) those of a
function merge(a,b){
  Object.keys(b).forEach(function(key){ a[key] = b[key]})
  return a;
}

// zip('abc'.split(''), '123'.split('')) => {a: '1', b: '2'}
function zipPairs(A, B) {
  var pairs = [];
  A.forEach(function(a, i) {
    var b = B[i];
    pairs.push([a,b]);
  })
  return pairs
}

function zip(A,B){
  var pairs = zipPairs(A,B);
  var o = {};
  pairs.forEach(pair => o[pair[0]] = pair[1])
  return o
}

function delimited2collection(delimiter, text){
  var delimRE = new RegExp(delimiter, 'g');
  return text.trim().split('\n').map(line=>line.split(delimRE));
}

function which(collection, criteria){
  return collection.filter((item, i) => {
    if(Object.keys(criteria).every(key => item[key] == criteria[key])){
      return i 
    }
  })
}

function where(collection, criteria){
  var 
    attrs = Object.keys(criteria)
 
  return collection.filter(function(item){
    return attrs.every(function(attr){
      var value = criteria[attr];
      return item[attr] == value;
    })
  })
}

function unique(sequence){ 
  var seen = {};
  sequence.forEach(function(item){ seen[item] = true; })
  return Object.keys(seen);
}

function count(sequence){
  var tally = {};
  sequence.forEach(function(item){
    if(!(item in tally)){ 
      tally[item] = 0 
    }
    tally[item] += 1;
  })
  return tally;
}


function frequency(sequence) {
  return sequence.reduce(function(tally, item){
    
    if (!(item in tally)) {
      tally[item] = 0
    }
    tally[item] += 1;

    return tally;
  },
  {})
}

function byFrequency(sequence){
  var tally = frequency(sequence);

  return Object.keys(tally).map(k => [tally[k], k])
    .sort((a,b) => a[0] > b[0]);
}

function nest(collection, attr){
  return collection.reduce(function(nest, current){
    nest[current[attr]] = current;
    return nest;
  }, 
  {})
}

function groupBy(collection, attr){
  return collection.reduce(function(grouped, current){
    var value = current[attr];
    if(value in grouped){
      grouped[value].push(current)
    } else { 
      grouped[value] = [current]
    }
    return grouped;
  }, 
  {})
}

var tokenize = function(text){ return text.split(/[\.\?\! ]/)};

// var ngrams = function(sequence, n){
//   return sequence
//     .slice(0, sequence.length-n+1)
//     reduce(function(a,b,i){
//       console.log([a,b,i]);
//       a.concat(sequence.slice(i, i+n))
//     }, [])
// }

var ngrams = (seq, n) => {
  var grams = [];
  for(var i=0; i<seq.length-n+1; i++){
    grams.push(seq.slice(i,i+n));
  }
  return grams;
}

var bigrams = seq => ngrams(seq,2);


var choice = seq => seq[Math.floor(Math.random()*seq.length)] 

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
var shuffle = array => {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var transpose = array => {
  return Object.keys(array[0]).map(column => {
    return array.map(row => row[column]); 
  }); 
}

var trimObject = o => {
  var trimmed = {};
  Object.keys(o).forEach(key => {
    var value = o[key];
    if(typeof key == 'string') key = key.trim();
    if(typeof value == 'string') value = value.trim();
    trimmed[key] = value;
  }) 
  return trimmed
};

var html2dom = html => new DOMParser().parseFromString(html, "text/html")
var xml2dom = html => new DOMParser().parseFromString(html, "text/xml")


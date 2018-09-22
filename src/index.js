module.exports = function check(str, bracketsConfig) {
  var op_brackets = [],
      ed_brackets = [],
      same_brackets = [],
      opnum = [],
      closenum = [],
      samenum = [],
      ind = 0,
      indexes = [],
      length = bracketsConfig.length;
  for (var i = 0; i < length; i++) {
    if (bracketsConfig[i][0] === bracketsConfig[i][1]) {
      same_brackets.push(bracketsConfig[i][0]);
      samenum.push(0);
    }
    else {
      op_brackets.push(bracketsConfig[i][0]);
      ed_brackets.push(bracketsConfig[i][1]);
      opnum.push(0);
      closenum.push(0);
    }
  }

  for (var i = 0; i < str.length; i++) {
    ind = same_brackets.indexOf(str[i])
    if (ind !== -1) {
        samenum[ind] += 1;
        if (samenum[ind] % 2 === 1) {
          indexes.push(ind + length)
        }
        else if (ind + length === indexes[indexes.length - 1]){
          indexes.pop()
        }
        else {
          return false;
        }
    }
    else {
      ind = op_brackets.indexOf(str[i]);
      if (ind !== -1) {
        opnum[ind] += 1;
        indexes.push(ind);
      }
      else {
        ind = ed_brackets.indexOf(str[i]);
        closenum[ind] += 1;
        if (ind === indexes[indexes.length - 1]) {
          indexes.pop();
        }
        else {
          return false;
        }
      }
      if (closenum[ind] > opnum[ind]) return false;
    }
  }
   for  (var i = 0; i < opnum.length; i++) {
     if (opnum[i] !== closenum[i]) return false;
   }
  return true;
}

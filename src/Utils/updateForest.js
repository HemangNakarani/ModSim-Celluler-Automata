const min = 0;
const max = 1000000;

function getRandomInt() {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updateSite = (
  value,
  N,
  S,
  E,
  W,
  probImmune,
  probLightning,
  twostepstoburn,
  neighbours = true,
  probFire = {0:0, 1:0.88888889, 2:0.94117647,3: 0.96, 4:0.96969697}
) => {

  var pl = getRandomInt();
  if (pl < probLightning * max) {
    if (value === 1) {
      return 2;
    } else if (value === 2) {
      return 3;
    }
  }

  if (value === 0) {
    return 0;
  } else if (value === 1) {
    if (neighbours) {
      var cnt = 4;
      if (N === 1 || N === 0) {
        cnt -= 1;
      }
      if (S === 1 || S === 0) {
        cnt -= 1;
      }
      if (E === 1 || E === 0) {
        cnt -= 1;
      }
      if (W === 1 || W === 0) {
        cnt -= 1;
      }

      var bunP = getRandomInt();

      if (bunP < (probFire[cnt]*(1-probImmune)* max)) {
        return 2;
      } else {
        return 1;
      }

    } else {
      var r1 = getRandomInt();
      if (
        r1 > probImmune * max &&
        (N === 2 ||
          S === 2 ||
          E === 2 ||
          W === 2 ||
          N === 3 ||
          S === 3 ||
          E === 3 ||
          W === 3)
      ) {
        return 2;
      } else {
        return 1;
      }
    }
  } else if (value === 2) {
    if (twostepstoburn) {
      return 3;
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export { updateSite };

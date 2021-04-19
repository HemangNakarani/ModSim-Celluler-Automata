const min=0;
const max=1000000;

function getRandomInt() {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initForest = (numRows, numCols, probTree, probBurning) => {

  const rows = [];

  for (let i = 0; i < numRows; i++) {
    rows.push(Array.from(Array(numCols), () => {

        var r1 = getRandomInt();
        
        if( r1 < probTree*max)
        {
            var r2 = getRandomInt();
            
            if( r2 < probBurning*max)
            {
                return 2;
            }
            else
            {
                return 1;
            }
        }
        else
        {
            return 0;
        }
    }));
  }

//   for(let i=0;i<numRows;i++)
//   {
//       rows[i][0] = 0;
//       rows[i][numCols-1] = 0;
//   }
//   for(let i=0;i<numCols;i++)
//   {
//       rows[0][i] = 0;
//       rows[numRows-1][i] = 0;
//   }

  return rows;
};

export { initForest };

const FivesOne = () => ({
  klass: 'one',
  position: {
    top: '70%',
    left: '50%'
  },
  deal: {
    0: [0, 0],
    1: [0, 0]
  }
});

const FivesTwo = () => ({
  klass: 'two',
  position: {
    top: '50%',
    left: '16%'
  }
});


const FivesFive = () => ({
  klass: 'five',
  position: {
    top: '50%',
    left: '84%'
  },
  deal: {
    0: [-420, -1180],
    1: [0, -240]
  }
});

const FivesThree = () => ({
  klass: 'three',
  position: {
    top: '15%',
    left: '35%'
  } 
});


const FivesFour = () => ({
  klass: 'four',
  position: {
    top: '15%',
    left: '65%'
  },
  deal: {
    0: [20, -540],
    1: [100, -60]
  }
});

export const fives = [
  FivesOne(),
  FivesTwo(),
  FivesThree(),
  FivesFour(),
  FivesFive()
];

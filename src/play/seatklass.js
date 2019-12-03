const FivesOne = () => ({
  klass: 'seatone',
  position: {
    top: '90%',
    left: '50%'
  },
  deal: {
    transform: 'rotate(0deg)',
    0: [-680, -40],
    1: [-180, -55]
  },
  action: {
    0: [62, 50],
    1: [26, 50]
  },
  button: {
    0: [50, 50]
  }
});

const FivesTwo = () => ({
  klass: 'seattwo',
  position: {
    top: '50%',
    left: '4%'
  },
  deal: {
    transform: 'rotate(90deg)',
    0: [-810, -560],
    1: [-120, -25]
  },
  action: {
    0: [50, 15],
    1: [26, 50]
  },
  button: {
    0: [50, 25]
  }
});


const FivesFive = () => ({
  klass: 'seatfive',
  position: {
    top: '50%',
    left: '96%'
  },
  deal: {
    transform: 'rotate(-90deg)',
    0: [-885, 560],
    1: [-200, 85]
  },
  action: {
    0: [50, 80],
    1: [26, 50]
  },
  button: {
    0: [50, 80]
  }
});

const FivesThree = () => ({
  klass: 'seatthree',
  position: {
    top: '8%',
    left: '30%'
  },
  deal: {
    transform: 'rotate(-20deg)',
    0: [140, 406],
    1: [100, -15]
  },
  action: {
    0: [30, 28],
    1: [26, 50]
  },
  button: {
    0: [30, 38]
  }
});


const FivesFour = () => ({
  klass: 'seatfour',
  position: {
    top: '8%',
    left: '70%'
  },
  deal: {
    0: [20, -540],
    1: [100, -60]
  },
  action: {
    0: [32, 63],
    1: [26, 50]
  },
  button: {
    0: [32, 63]
  }
});

export const fives = [
  FivesOne(),
  FivesTwo(),
  FivesThree(),
  FivesFour(),
  FivesFive()
];

const FivesOne = () => ({
  klass: 'one',
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
  klass: 'two',
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
  klass: 'five',
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
    0: [50, 70]
  }
});

const FivesThree = () => ({
  klass: 'three',
  position: {
    top: '15%',
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
  klass: 'four',
  position: {
    top: '15%',
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

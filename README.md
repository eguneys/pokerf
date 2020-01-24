# PokerF

### Configuration

    {
      stakes: {
        unit: 0.5,
        currency: '$'
      },
      fen: 'F 1 0 0 20!30 0 1\nI 50 20 RR20\nI 100 20 CA',
      clock: {
        running: true,
        initial: 60,
        times: 60
      },
      seats: [
        {
          img: 'image_url'
        },
        null,
        null,
        null,
        null
      ],
      events: {
        sit: (seatIndex) => {},
        flag: () => {},
        move: (move) => {}
      },
      seatIndexes: [0, 1, 2],
      status: 'status text',
      me: {
        status: 'WN', // WN | WO | I
        hand: 'Ah 2s',
        possibleMoves: 'CA FO AA300'
      }
    }

### API

* Configure

    let api = Pokerground({
        fen,
        clock,
        seats,
        events,
        seatIndexes
    });

* Join

    api.join({
      seatIndex,
      seat: {
        name,
        img,
        status
      }
    });


* Leave

    api.leave({ seatIndex });

* Me Join

    api.meSet({ 
        side: 0,
        status: 'I',
        hand: 'Ah 2s',
        possibleMoves: 'CA FO RR10'
    });


* Deal

    api.deal({
        fen: 'gamefen',
        seatIndexes: [0, 1, 2]
    });

* Move

    api.move({
      newStack: 100,
      newWager: 100,
      newRole: 'F',
      uci: 'FO'
    })

* Next Turn

    api.nextTurn({
        toAct: 1
    });

* Next Round

    api.nextRound({
      toAct: 0,
      middle: {
        flop,
        turn,
        river
      },
      pots: '100 0 1 2~10 0 1 2'
    });

* One Win

    api.oneWin({
      winners: {
        pots: '100 0',
        stacks: [100, 90]
      }
    });

* Showdow
n 
    api.showdown({
      winners,
      middle: {
        flop,
        turn,
        river
      },
      hands: [
        { hole: 'Ah Ac', rank: 'threepair', hand: 'Ah Ac As Qd Ts' },
        null,
        null
      ]
    });

### Table

#### Me
    
    Status
        WN Waiting for next Hand
        WO Waiting for other players
        I Involved


### Fen

     bettingRound button turnToAct lastFullRaise!runningPot~sidePot
     stack recentWager lastAction|. 

     (P|F|T|R) 0 0 100!100 0 1 2 3~50 0 1 2
     100 10 C
     100 10 R200
     100 10 .


### How to render recent actions

All in has three forms. all-in call, all-in non-full-raise, all-in full-raise.

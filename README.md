# PokerF

### Configuration

    {
      fen: '10 F 1 0 0 20!30 0 1\nI 50 20 RR20\nI 100 20 CA',
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

    api.mejoin({ 
        side: 0,
        status: 'I',
        hand: 'Ah 2s',
        possibleMoves: 'FO CA CH RR100' });


### Table

#### Me
    
    Status
        WN Waiting for next Hand
        WO Waiting for other players
        I Involved


### Fen

     blinds bettingRound button turnToAct allowRaiseUntil lastFullRaise!runningPot~sidePot
     stack recentWager lastAction|. 

     (P|F|T|R) 0 0 0 100!100 0 1 2 3~50 0 1 2
     100 10 C
     100 10 R200
     100 10 .


### How to render recent actions

All in has three forms. all-in call, all-in non-full-raise, all-in full-raise.

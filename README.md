# PokerF

### Fen

     bettingRound button turnToAct allowRaiseUntil lastFullRaise!runningPot~sidePot
     stack recentWager lastAction|. 

     (P|F|T|R) 0 0 0 100!100 0 1 2 3~50 0 1 2
     100 10 C
     100 10 R200
     100 10 .


### How to render recent actions

There are four acting rounds (preflop, flop etc), on each round players make actions consecutively, (raise call etc). Each player acts on their turn. But if a player folds or goes all-in, they no longer allowed to act and they don't get a turn anymore. In order to render the game state at any acting point I need to know two things, the players that are currently involved on the hand (those that haven't folded or gone all-in), and the players latest actions on the latest acting turn. I keep all actions but don't keep who made them, I can calculate the owner of actions by iterating on all the actions starting from the first.

Game State need to know

stacks
blinds
button
small blind
big blind
next to act
last to act
involved
middle pot

recent actions

All in has three forms. all-in call, all-in non-full-raise, all-in full-raise.

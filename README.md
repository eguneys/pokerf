# PokerF

### Fen

`60b 40s 100B 100 100!20(. 5 10 . .)~10!0\n`

stacks!pots

stacks

b Button
s small blind
B big blind

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
recent bets
recent actions

    acts: [{
        uci: act,
        who: index,
    }],
    involved: [index]
    next: index


All in has three forms. all-in call, all-in non-full-raise, all-in full-raise.

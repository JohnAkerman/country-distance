

# Country Distance

## High Level Features

User is presented with a centre city, e.g. London.
They are then provided with two other cities and they have to guess which is the closest to the centre city.

## Bugs
- All three locations *could* become the same value

## Planned Ideas


- [ ] Nicer UI
    - [ ] Improve the way CSS is stored - style components?
    - [ ] Ensure it is usable on mobile
- [ ] Timed game
    - [ ] Show count down progress
    - [ ] Let user specify round time
    - [ ] Next question is shown if timer runs out, classes as fail
- [ ] Score System
    - [ ] Award points for harder locations
    - [ ] Award more points for speed
    - [ ] Award points for more locations shown
- [ ] Store results in localStorage to track score over time
    - [ ] Leaderboard of previous games?
    - [ ] Allow users to store name on scores
- [ ] Menus
    - [ ] Splash screen
    - [ ] Game screen
    - [ ] Settings
        - [ ] Ability to swap between km/miles
        - [ ] Ability to hide country names (Improve score greatly)
        - [ ] Continent filtering, so only countries in Asia
- [ ] Allow ability to make it harder by showing more locations
    - [ ] Allow for 50/50 (reduced points)
    - [ ] Sort by distance, allow users to order the cities by closest using drag and drop
- [ ] Set certain locations 'easy' such as London, others are hard such as Gaborone, Botswanan
- [ ] Ability to show city on a map after question is answered, useful for very tough questions
- [ ] Toggle flags to make it easier - using ISO flags. How to load via node modules?
- [ ] Points system = time used * difficulty of question?

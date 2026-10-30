# Independent Inner Worlds — Time-based Mechanic

This p5.js prototype presents two characters whose inner worlds are revealed through independent, time-based icon sequences. The work runs automatically and does not require a mouse click.

## Inspiration

The project is inspired by surreal, dreamlike representations of inner thoughts and by the idea that another person's inner world is only briefly visible. The illustrated twilight landscape, translucent figures and glowing organic icons shaped the visual direction. Instead of using clean interface-style symbols, the project uses irregular, luminous PNG icons so that thoughts feel alive, unstable and connected to the surrounding environment.

The composition also takes inspiration from visual maps of memory and emotion: icons may overlap the figures, while faint curved lines and small moving nodes suggest connections between thoughts without competing with the main imagery.

## Techniques

The prototype uses the following p5.js techniques:

- `preload()` and `loadImage()` load the background, character and icon PNG files before the animation begins.
- `millis()` measures global time. Each character subtracts its own start time to create an independent local timeline.
- Two classes organise the system. `CharacterTimeline` manages one character's timer, current stage, figure and icon collection. `ThoughtIcon` manages one icon's opacity, colour amount, scale, position, movement and focus state.
- Arrays store five reusable `ThoughtIcon` objects for each character.
- `map()`, `constrain()` and `lerp()` create smooth changes between stage targets.
- `sin()` and `cos()` create repeatable local drifting, breathing and size changes. The sketch does not use `random()`, Perlin noise or audio data for this mechanic.
- A grayscale copy of each icon is generated with `filter(GRAY)`. The grayscale and colour images are crossfaded to create the ghost-to-colour reveal and the colour-drain ending.
- `beginShape()`, `curveVertex()` and `circle()` draw the faint connecting lines and small nodes behind each character.
- Responsive scaling keeps the original 1440 × 810 composition centred when the browser window changes size.

### Timeline

The page begins with one three-second quiet period. After that, each character uses a continuous 15-second loop with no extra waiting between repetitions:

1. **0–3 seconds:** both figures are visible, but all icons remain hidden. This opening delay happens only once.
2. **3 seconds:** Character A begins its first sequence.
3. **10.5 seconds:** Character B begins from zero when Character A is halfway through its first sequence.
4. **Reveal:** icons change from transparent grayscale forms into full colour.
5. **Active:** all five icons drift and breathe gently.
6. **Focus:** one core icon becomes larger and brighter while surrounding icons become less dominant and move slightly inward.
7. **Settle:** scale changes and local movement gradually stop.
8. **Dissolve:** colour drains away before the grayscale icons fade out.
9. **Continuous restart:** after a character reaches the end of its 15-second sequence, its local timeline immediately returns to Reveal. The initial three-second delay is not repeated.

Character A uses the clock as its core icon. Character B uses the house as its core icon.

## Mechanic ownership

| Team member | Mechanic | Responsibility |
|---|---|---|
| **Leona** | **Time-based** | Controls the delayed reveal, colour transition, icon movement, focus, settling, colour drain and disappearance. Character A and Character B run on offset independent timelines. |
| **[Add team member name]** | **User Input** | Add a short description of how viewer input affects the shared artwork. |
| **[Add team member name]** | **Audio** | Add a short description of how sound data affects the shared artwork. |
| **[Add team member name]** | **Noise / Randomness** | Add a short description of how noise or controlled randomness affects the shared artwork. |

> Replace the three bracketed names and descriptions before final submission. They are intentionally left as placeholders so that no team member's work is misrepresented.

## AI acknowledgement

ChatGPT by OpenAI was used to help organise and generate parts of this prototype code. In particular, it assisted with:

- structuring the `CharacterTimeline` and `ThoughtIcon` classes;
- coordinating the two offset local timelines;
- planning the Reveal, Active, Focus, Settle and Dissolve stages;
- creating the grayscale-to-colour image crossfade;
- combining `lerp()`, `sin()` and `cos()` into smooth, repeatable icon movement;
- creating the responsive 16:9 composition and subtle line-and-node accents;
- reviewing asset paths and preparing the project for VS Code.

The generated code works by calculating a global time with `millis()`. Each `CharacterTimeline` subtracts its own start time and uses the remainder of its 15-second duration to calculate a looping `localTime`. `stageFromTime()` converts this local time into a visual stage, and each `ThoughtIcon` interpolates towards the opacity, colour, scale, position and motion values required by that stage.

The AI-assisted sections are also acknowledged in the opening comment of `sketch.js`. The visual direction, asset selection, timing decisions, mechanic boundaries and final evaluation remain part of the team's design process.

## External references

No external code examples were copied into this prototype.

The project uses the official p5.js library and documentation:

- [p5.js Reference](https://p5js.org/reference/) — consulted for standard functions including `loadImage()`, `millis()`, `lerp()`, `sin()`, `cos()`, `filter()`, `curveVertex()` and canvas transformations.
- [p5.js 1.9.4 CDN build](https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.4/p5.min.js) — loaded by `index.html`.

All artwork files in the `assets` folder were supplied for this team project. If any image was created by, licensed from or adapted from an external artist or generator, add the creator, licence and source link here before submission.

## Interaction instructions

1. Open the project folder in Visual Studio Code.
2. Open `index.html` with the **Live Server** extension, or use another local web server.
3. Allow the page to run automatically. No click is required.
4. Wait through the one-time three-second quiet opening.
5. Character A begins at 3 seconds. Character B begins independently at 10.5 seconds.
6. Watch the icons reveal their colour, move, focus on one core thought, become still, lose colour and disappear.
7. Each character immediately restarts after its own 15-second sequence; the three-second opening delay is not repeated.
8. Press **R** at any time to restart the entire experience, including the initial three-second quiet period.

An internet connection is required when opening the page because `index.html` loads p5.js from the CDN.

## Project structure

```text
TimeBased_Dream_Timelines/
├── index.html
├── style.css
├── sketch.js
├── README.md
└── assets/
    ├── background.png
    ├── people/
    │   ├── character-a.png
    │   └── character-b.png
    └── icons/
        ├── A_calendar.png
        ├── A_clock.png
        ├── A_document.png
        ├── A_message.png
        ├── A_phone.png
        ├── B_fish.png
        ├── B_house.png
        ├── B_plant.png
        ├── B_sailboat.png
        └── B_star.png
```

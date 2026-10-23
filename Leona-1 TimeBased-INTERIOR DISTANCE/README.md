# Time-based Icon Garden

This version uses the supplied cosmic background and two supplied full-body character images. Thought icons are rendered as solid, irregular liquid-gel forms while preserving the original time-based sequence.

## Run in VS Code

1. Open the entire `TimeBased_Icon_Garden` folder in VS Code.
2. Install **Live Server** or **p5.vscode** if required.
3. Open `index.html` using Live Server or the p5.vscode preview.
4. Click either full-body figure.
5. Click the second figure at any time to run two independent timelines.
6. Press `R` to reset.

The project loads p5.js from a CDN, so the first run needs an internet connection.

## Visual design

- The background uses `assets/background.png` and scales to cover the browser window.
- Character A uses `assets/characterA-colour.png`.
- Character B uses `assets/characterB-colour.png`.
- The character PNG files keep their transparent backgrounds and are drawn behind the thought icons.
- Nine icons belong to each person, with repeated symbols and different sizes.
- Only four fixed bubbles belong to each person.
- Icon containers use deterministic `curveVertex()` shapes with layered translucent fills.
- The blob edges deform gently with fixed `sin()` and `cos()` calculations.
- Coloured icons use solid white symbols so they remain readable over the cosmic background.
- Icon movement stays close to each icon's original position.
- The code uses no `random()` and no `noise()`.

## Time sequence

1. 0–1s: three primary icons appear together as uniform outlines.
2. 1–4s: those icons gain layered colour, glow and small movement.
3. 4–7s: six additional icons appear together and movement increases.
4. 7–10s: the core icon grows while surrounding icons dim and move slightly inward.
5. 10–13s: movement and glow stop, colour drains, then icons fade in order.

## Group integration

Hansen's input code can start the timelines with:

```javascript
activateCharacter("A");
activateCharacter("B");
```

The shared `draw()` function should call:

```javascript
updateTimeMechanic();
drawTimeMechanic();
```

Remove the standalone `mousePressed()` function after connecting the final User Input file.

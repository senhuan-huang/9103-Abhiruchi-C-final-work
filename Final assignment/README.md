# INTERIOR DISTANCE

**IDEA9103 Creative Coding Major Project – Abhiruchi Group C**

> *If we could see each other’s thoughts, would we understand each other better?*

## Project Overview

*Interior Distance* is an original interactive artwork created with p5.js. It explores the emotional distance that can remain between two people, even when they are physically close or deeply connected.

Two anonymous figures stand near each other and appear calm. However, neither person fully expresses what is happening internally. Through interaction, the viewer can reveal fragments of their thoughts, memories, responsibilities and emotions. These fragments are visible, but they still require interpretation.

The work asks whether seeing another person’s inner world would create genuine understanding, or whether some emotional distance would still remain.

## Character Setting

### Character A – Reality and Pressure

Character A represents a temporary mental state shaped by deadlines, responsibilities and repeated daily tasks. Their inner world contains clocks, documents, phone alerts and other symbols of pressure.

Warm colours, repeated paths and compressed movement communicate tension and responsibility.

### Character B – Memory and Imagination

Character B represents a temporary mental state shaped by memories, emotional connection and imagined places beyond the present.

Their inner world contains a home, plants, fish, a boat and stars. Cool colours and expanding movement communicate imagination, memory and emotional openness.

These characters are not fixed personality types. They represent temporary mental states that anyone may experience.

## Inspiration

The visual direction was inspired by Brazilian digital artist **Arthur Machado** and his exploration of digital space, memory, fantasy and psychological perception.

The project was particularly influenced by the following visual qualities:

- Translucent human figures
- Soft colour gradients
- Surreal and dreamlike environments
- Luminous circles and bubbles
- Distorted and irregular forms
- The contrast between a quiet exterior and a vivid inner world

### Influence on the Final Design

Machado’s work influenced our decision to represent thoughts as atmospheric visual fragments rather than literal text.

The final artwork uses two luminous figures with contrasting colour palettes. Character A uses warmer coral, orange and yellow tones, while Character B uses cooler cyan, violet and pink tones.

The characters initially appear quiet and visually restrained. After interaction, icons, particles, paths, light and movement reveal their inner worlds. The irregular liquid containers around the thought icons help them stand out against the cosmic background and make the thoughts feel unstable, alive and constantly changing.

The project does not directly reproduce Machado’s artworks. Instead, it adapts selected qualities from his visual language to create an original interactive experience.

## Interaction Instructions

1. Open the project in a browser using Live Server.
2. Wait for the artwork and media assets to load.
3. Move the cursor over Character A or Character B to observe the available mouse feedback.
4. Click a character to reveal that character’s inner world.
5. Character A and Character B can be activated at different times.
6. Each character follows an independent visual timeline.
7. Observe how colour, icons, movement, particles and sound change during the experience.
8. Allow approximately thirteen seconds to observe the complete Time-based icon sequence.
9. Click the other character to compare the two inner worlds.

### Additional Controls

- **Audio control:** [TO BE COMPLETED BY AUDIO MECHANIC OWNER]
- **Keyboard controls:** [WRITE “NONE” IF THERE ARE NO KEYBOARD CONTROLS]
- **Reset control:** [ADD THE RESET KEY OR ACTION]
- **Other interactions:** [TO BE COMPLETED BY USER INPUT MECHANIC OWNER]

## Techniques and Code Structure

The project was created with **p5.js** and combines four distinct mechanics:

1. User Input
2. Audio
3. Perlin Noise and Randomness
4. Time-based Interaction

Each mechanic is stored in a separate script file. The main `sketch.js` file brings the mechanics together and controls the shared canvas, character placement and overall drawing order.

The project uses:

- p5.js canvas drawing
- Image loading and layered composition
- Mouse interaction and character selection
- Audio analysis and sound-reactive visuals
- Perlin noise and random values
- Frame-based timing
- Classes and objects
- Arrays of visual elements
- Smooth interpolation
- Trigonometric movement
- Custom shapes using vertices
- Responsive canvas scaling
- Modular JavaScript files

### Project Structure

Update this section so that it matches the final repository exactly.

```text
INTERIOR-DISTANCE/
├── index.html
├── style.css
├── sketch.js
├── user-input.js
├── audio-mechanic.js
├── noise-mechanic.js
├── time-mechanic.js
├── assets/
│   ├── images/
│   └── audio/
├── README.md
├── LICENSE
└── .gitignore
```

## How the Four Mechanics Work Together

The mechanics have separate technical responsibilities but contribute to one connected experience.

- **User Input** identifies which character the viewer selects and activates that character’s inner world.
- **Audio** connects sound information to visual energy, brightness, movement or particle behaviour.
- **Perlin Noise and Randomness** creates continuous organic variation in bubbles, paths, halos or other atmospheric elements.
- **Time-based Interaction** controls the life cycle of the thought icons, including their appearance, colour, quantity, movement, focus and disappearance.

The separation of the mechanics keeps the code modular while allowing the visual effects to appear as one cohesive artwork.

## Mechanic Ownership

| Team Member | Mechanic | Script File | Responsibility |
|---|---|---|---|
| Senhuan Huang | User Input | `[ADD EXACT FILENAME]` | [TO BE COMPLETED BY SENHUAN] |
| Xinya Huang | Audio | `[ADD EXACT FILENAME]` | [TO BE COMPLETED BY XINYA] |
| Runqing Tian | Perlin Noise and Randomness | `[ADD EXACT FILENAME]` | [TO BE COMPLETED BY RUNQING] |
| Leona Li | Time-based Interaction | `time-mechanic.js` or `[ADD FINAL FILENAME]` | Controls the independent thirteen-second life cycle of each character’s thought icons. |

## Individual Mechanic Details

### User Input – Senhuan Huang

**Purpose**

[EXPLAIN WHAT THE USER INPUT MECHANIC CONTRIBUTES TO THE CONCEPT]

**Interaction**

[EXPLAIN WHAT THE VIEWER DOES]

**Visual Result**

[EXPLAIN WHAT CHANGES ON SCREEN]

**Main Techniques**

- [ADD MOUSE OR KEYBOARD FUNCTIONS]
- [ADD HIT-DETECTION METHOD]
- [ADD IMPORTANT VARIABLES OR CLASSES]

**Main Script**

`[ADD EXACT SCRIPT FILENAME]`

---

### Audio – Xinya Huang

**Purpose**

[EXPLAIN WHAT THE AUDIO MECHANIC CONTRIBUTES TO THE CONCEPT]

**Audio Source**

[ADD THE TRACK, RECORDING OR SOUND SOURCE]

**Visual Result**

[EXPLAIN WHICH VISUAL PROPERTIES RESPOND TO THE AUDIO]

**Main Techniques**

- [ADD AUDIO ANALYSIS TECHNIQUE]
- [ADD LEVEL OR FREQUENCY TECHNIQUE]
- [ADD IMPORTANT VARIABLES OR CLASSES]

**Main Script**

`[ADD EXACT SCRIPT FILENAME]`

---

### Perlin Noise and Randomness – Runqing Tian

**Purpose**

[EXPLAIN WHAT THE NOISE AND RANDOMNESS MECHANIC CONTRIBUTES TO THE CONCEPT]

**Visual Result**

[EXPLAIN WHICH ELEMENTS USE NOISE AND WHICH USE RANDOM VALUES]

**Main Techniques**

- `noise()` – [EXPLAIN HOW IT IS USED]
- `random()` or `randomSeed()` – [EXPLAIN HOW IT IS USED]
- [ADD IMPORTANT VARIABLES OR CLASSES]

**Main Script**

`[ADD EXACT SCRIPT FILENAME]`

---

### Time-based Interaction – Leona Li

**Purpose**

The Time-based mechanic controls the complete visual life cycle of the thought icons after a character is selected.

Character A and Character B store separate start times and elapsed times. Therefore, they can begin at different moments and move through the sequence independently. If Character A is activated first, only Character A’s icons begin. Character B starts its own sequence from zero when it is selected later.

**Thirteen-Second Sequence**

1. **Outline – 0 to 1 second**  
   Three primary thought icons appear together as simple outlines.

2. **Colour – 1 to 4 seconds**  
   The primary icons gain colour, glow and gentle local movement. Their irregular liquid containers become visible.

3. **Expansion – 4 to 7 seconds**  
   Six secondary icons appear, bringing the total to nine. Their movement range and liquid deformation increase.

4. **Focus – 7 to 10 seconds**  
   One core icon becomes larger and brighter. The surrounding icons become dimmer and move slightly towards it.

5. **Dissolve – 10 to 13 seconds**  
   Movement and glow stop first. Colour fades, and the icons disappear in a controlled order. The character then returns to the Quiet state.

**Main Techniques**

- `frameCount` measures the progress of the sequence.
- `stageFromTime()` maps elapsed time to one of five visual stages.
- `lerp()` creates smooth changes in opacity, colour, glow, scale and position.
- `sin()` and `cos()` create repeatable local movement and liquid deformation.
- `beginShape()` and `curveVertex()` create irregular liquid containers.
- `CharacterWorld` manages one character’s timer, stage and icon collection.
- `ThoughtIcon` stores and updates the visual state of one icon.
- An array stores the nine `ThoughtIcon` objects belonging to each character.

The movement does not use random values, Perlin noise or audio data. This keeps the Time-based mechanic technically separate from the other mechanics while maintaining a consistent visual style.

**Main Script**

`time-mechanic.js` or `[REPLACE WITH THE FINAL EXACT FILENAME]`

## AI Acknowledgement

Generative AI tools were used during the development process for selected concept exploration, visual references, code assistance, debugging and documentation.

Each team member must describe their own AI use below. AI-generated or AI-assisted code must also be acknowledged in comments inside the relevant script file.

### User Input – Senhuan Huang

- **AI tool used:** [TO BE COMPLETED]
- **What it was used for:** [TO BE COMPLETED]
- **How the assisted code works:** [TO BE COMPLETED]
- **How the code was reviewed or changed:** [TO BE COMPLETED]

### Audio – Xinya Huang

- **AI tool used:** [TO BE COMPLETED]
- **What it was used for:** [TO BE COMPLETED]
- **How the assisted code works:** [TO BE COMPLETED]
- **How the code was reviewed or changed:** [TO BE COMPLETED]

### Perlin Noise and Randomness – Runqing Tian

- **AI tool used:** [TO BE COMPLETED]
- **What it was used for:** [TO BE COMPLETED]
- **How the assisted code works:** [TO BE COMPLETED]
- **How the code was reviewed or changed:** [TO BE COMPLETED]

### Time-based Interaction – Leona Li

ChatGPT was used to assist with planning, developing, explaining and debugging parts of the Time-based mechanic.

It assisted with:

- Structuring the `CharacterWorld` and `ThoughtIcon` classes
- Creating independent timers for Character A and Character B
- Organising the thirteen-second sequence into five visual stages
- Using `lerp()` for smooth visual transitions
- Using fixed `sin()` and `cos()` values for repeatable movement
- Developing irregular liquid containers with `curveVertex()`
- Improving variable names, comments and code organisation
- Explaining the mechanic in the project documentation

The Time-based code measures the elapsed frames after a character is activated. The elapsed time is converted into Outline, Colour, Expansion, Focus or Dissolve. Each `ThoughtIcon` then updates its opacity, colour, glow, scale, position, motion and deformation according to the current stage.

### AI-Generated Visual Assets

If any final background, character, icon or texture was created or modified using generative AI, complete the following table.

| Asset | AI Tool | What the Tool Was Used For | Changes Made by the Team |
|---|---|---|---|
| Background | [ADD TOOL OR WRITE “NOT AI-GENERATED”] | [ADD DETAILS] | [ADD DETAILS] |
| Character A | [ADD TOOL OR WRITE “NOT AI-GENERATED”] | [ADD DETAILS] | [ADD DETAILS] |
| Character B | [ADD TOOL OR WRITE “NOT AI-GENERATED”] | [ADD DETAILS] | [ADD DETAILS] |
| Other assets | [ADD TOOL OR WRITE “NONE”] | [ADD DETAILS] | [ADD DETAILS] |

## External References

Any external artwork, code, tutorial, sound, image or asset used in the final project must include a working link and a short explanation.

### Artistic References

- Arthur Machado, *New DLA* (2016).  
  Link: [ADD THE ORIGINAL SOURCE LINK]  
  Influence: Translucent human forms, distorted digital bodies and psychological visual space.

- Arthur Machado, *Nobody H Me* (2016).  
  Link: [ADD THE ORIGINAL SOURCE LINK]  
  Influence: Dreamlike colour, memory, landscape and digital atmosphere.

- Arthur Machado, *In Natura* (2015).  
  Link: [ADD THE ORIGINAL SOURCE LINK]  
  Influence: Luminous organic forms, surreal environments and floating visual elements.

- Arthur Machado, *Sin título* (2015).  
  Link: [ADD THE ORIGINAL SOURCE LINK]  
  Influence: Fragmented bodies and the contrast between visible and hidden identity.

## Team Members

| Team Member | Mechanic |
|---|---|
| Senhuan Huang | User Input |
| Xinya Huang | Audio |
| Runqing Tian | Perlin Noise and Randomness |
| Leona Li | Time-based Interaction |

// Cat portraits — looping CSS sprite-sheet animations. Frame counts/sizes are matched
// by the `.portrait--damiano` / `.portrait--iliana` rules in style.css, so keep those
// in sync if these ever change.
export const CHARACTERS = {
  // Internal keys (damiano/iliana) stay as-is — they're just identifiers used by CSS
  // classes, asset filenames, and `speaker:` refs in day content. Only the display
  // `name` shown in the dialogue box changes here.
  damiano: { name: "Boy Kitty", image: "assets/portraits/damiano.png" }, // CatMegaFree Mochi — 10 frames @32x32
  iliana: { name: "Girl Kitty", image: "assets/portraits/iliana.png" }, // CatPackFree draculacat — 6 frames @32x32
};

export function getCharacter(speakerKey) {
  return CHARACTERS[speakerKey] ?? null;
}

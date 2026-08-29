// The password screen shown before the calendar. See src/systems/auth.js for how the
// password itself is checked/stored.
import { checkPassword } from "./systems/auth.js";

export function renderGate(root, onUnlock) {
  root.innerHTML = `
    <div class="gate-view">
      <h1 class="gate-title">Our Life</h1>
      <p class="gate-subtitle">This one's just for you.</p>
      <form class="gate-form">
        <input type="password" class="gate-input" placeholder="Password" autocomplete="off" />
        <button type="submit" class="gate-submit">Unlock</button>
      </form>
      <p class="gate-error"></p>
    </div>
  `;

  const form = root.querySelector(".gate-form");
  const input = root.querySelector(".gate-input");
  const error = root.querySelector(".gate-error");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const ok = await checkPassword(input.value);
    if (ok) {
      onUnlock();
      return;
    }
    error.textContent = "That's not it — try again.";
    form.classList.remove("is-shaking");
    // Force reflow so re-adding the class restarts the animation on repeated wrong guesses.
    void form.offsetWidth;
    form.classList.add("is-shaking");
    input.value = "";
    input.focus();
  });
}

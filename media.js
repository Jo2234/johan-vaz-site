// Keep one walkthrough audible at a time; native controls handle playback.
const walkthroughs = [...document.querySelectorAll('.walkthrough-card video')];

for (const active of walkthroughs) {
  active.addEventListener('play', () => {
    for (const other of walkthroughs) {
      if (other !== active) other.pause();
    }
  });
}

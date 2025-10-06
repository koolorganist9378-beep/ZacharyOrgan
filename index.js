// For mouse press
document.querySelectorAll('.key').forEach(key => {
  key.addEventListener('mousedown', () => key.classList.add('active'));
  key.addEventListener('mouseup', () => key.classList.remove('active'));
  key.addEventListener('mouseleave', () => key.classList.remove('active'));
});

// For MIDI press
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(access => {
    for (let input of access.inputs.values()) {
      input.onmidimessage = e => {
        const [cmd, note, vel] = e.data;
        const key = document.querySelector(`.key[data-note='${note}']`);
        if (!key) return;
        if (cmd === 144 && vel > 0) key.classList.add('active');
        if (cmd === 128 || (cmd === 144 && vel === 0)) key.classList.remove('active');
      };
    }
  });
}

// Toggle stop lighting
document.querySelectorAll('.stop').forEach(stop => {
  stop.addEventListener('click', () => {
    stop.classList.toggle('active');
  });
});
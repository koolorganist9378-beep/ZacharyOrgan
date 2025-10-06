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

// Request MIDI Access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      alert("Web MIDI not supported in this browser. Use Chrome or Edge.");
    }

    function onMIDISuccess(midiAccess) {
      console.log("MIDI ready!");
      const inputs = midiAccess.inputs.values();
      for (let input of inputs) {
        input.onmidimessage = handleMIDIMessage;
      }
    }

    function onMIDIFailure() {
      console.error("Could not access your MIDI devices.");
    }

    function handleMIDIMessage(message) {
      const [command, note, velocity] = message.data;

      if (command === 144 && velocity > 0) {
        noteOn(note);
      } else if (command === 128 || (command === 144 && velocity === 0)) {
        noteOff(note);
      }
    }

    function noteOn(note) {
      const key = document.querySelector(`.key[data-note='${note}']`);
      if (key) key.classList.add('active');
    }

    function noteOff(note) {
      const key = document.querySelector(`.key[data-note='${note}']`);
      if (key) key.classList.remove('active');
    }

    document.querySelectorAll('.stop').forEach(stop => {
  stop.addEventListener('click', () => {
    stop.classList.toggle('active');
  });
});

// Make stops glow when active
document.querySelectorAll('.stop').forEach(stop => {
  stop.addEventListener('click', () => {
    stop.classList.toggle('active');
  });
});

// Add your key lighting, MIDI input, etc. below


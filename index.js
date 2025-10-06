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

// Make stops glow when active
document.querySelectorAll('.stop').forEach(stop => {
  stop.addEventListener('click', () => {
    stop.classList.toggle('active');
  });
});

// Add your key lighting, MIDI input, etc. below

// --- MIDI Connection Debug ---
console.log("🔍 Checking for WebMIDI support...");
if ("requestMIDIAccess" in navigator) {
  console.log("✅ Browser supports WebMIDI. Requesting access...");
  navigator.requestMIDIAccess({ sysex: false })
    .then(onMIDISuccess)
    .catch(onMIDIFailure);
} else {
  console.error("❌ This browser does NOT support WebMIDI.");
}

function onMIDISuccess(midiAccess) {
  console.log("✅ MIDI ready! Inputs found:", midiAccess.inputs.size);
  if (midiAccess.inputs.size === 0) {
    console.warn("⚠️ No MIDI devices detected. Plug one in and refresh.");
  }
  for (let input of midiAccess.inputs.values()) {
    console.log("🎹 Listening to:", input.name);
    input.onmidimessage = handleMIDIMessage;
  }
}

function onMIDIFailure(err) {
  console.error("❌ MIDI access failed:", err);
}

function handleMIDIMessage(event) {
  const [cmd, note, vel] = event.data;
  console.log("MIDI data:", cmd, note, vel);
}
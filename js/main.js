(function() {

	var pointer, pointerX = 0, pointerY = 0,
		frequencySpan, noteSpan,
		playing = false,
		audioContext, jsNode, theremin;

	function animate() {

		var y = (pointerY - 50);
		var x = (pointerX - 50);

		pointer.style.transform = 'translate3d(' + x + 'px, ' + y + 'px, 0)';

		if(playing) {
			updateDisplay();
		}
	}

	function updateDisplay() {
		frequencySpan.innerHTML = zeroPad(Math.round(theremin.frequency), 4) + ' Hz';
		noteSpan.innerHTML = frequencyToNote(theremin.frequency);

	}

	function zeroPad(v, num_digits) {
		var s = String(v);
		if(s.length < num_digits) {
			var dif = num_digits - s.length;
			for(var i = 0; i < dif; i++) {
				s = '<span class="inactive">0</span>' + s;
			}
		}
		return s;
	}

	function frequencyToNoteNumber(f) {
		return Math.round(12 * Math.log(f / 440.0) + 69);
	}

	function noteNumberToNote(n) {
		var notes = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'],
			name = n % 12,
			octave = Math.floor(n / 12) - 1,
			note = notes[name];

		return note + (note.length < 2 ? '-' : '') + octave;
	}

	function frequencyToNote(f) {
		return noteNumberToNote(frequencyToNoteNumber(f));
	}

	/*function audioProcess(event) {
		var buffer = event.outputBuffer,
			bufferLeft = buffer.getChannelData( 0 ),
			bufferRight = buffer.getChannelData( 1 ),
			numSamples = bufferLeft.length,
			synthOutputBuffer = [];

		if(playing) {
			synthOutputBuffer = theremin.getBuffer( numSamples );
			for(var i = 0; i < synthOutputBuffer.length; i++) {
				bufferLeft[i] = synthOutputBuffer[i];
				bufferRight[i] = synthOutputBuffer[i];
			}
		} else {
			for(var i = 0; i < numSamples; i++) {
				bufferLeft[i] = 0;
				bufferRight[i] = 0;
			}
		}
	}*/

	function init() {
		
		pointer = document.getElementById('pointer');
		frequencySpan = document.querySelector('#frequency span');
		noteSpan = document.getElementById('note');

		window.addEventListener('mousemove', function(e) {
			moveTo(e.clientX, e.clientY);
		}, false);

		window.addEventListener('touchmove', function(e) {
			var touch = e.touches[0];
			moveTo(touch.clientX, touch.clientY);
		}, false);

		var divToggle = document.getElementById('toggle'),
			spanToggle = document.querySelector('#toggle span'),
			on_msg = 'Turn it <strong>ON</strong>',
			off_msg = 'Turn it <strong>OFF</strong>';

		divToggle.addEventListener('click', function(e) {

			playing = !theremin.togglePlaying();

			if(playing) {
				controls.className = 'inactive';
				spanToggle.innerHTML = on_msg;
				pointer.className = 'inactive';
			} else {
				controls.className = 'active';
				spanToggle.innerHTML = off_msg;
				pointer.className = 'active';
			}

			playing = !playing;
		}, false);

		divToggle.style.opacity = 1;
		spanToggle.innerHTML = on_msg;
		
		initAudio();
		
		updateDisplay();

		animate();
	}

	function moveTo(x, y) {
		pointerX = x;
		pointerY = y;
		theremin.setPitchBend( x / window.innerWidth );
		theremin.setVolume( 1 - y / window.innerHeight );
		animate();
	}

	function initAudio() {
		audioContext = new AudioContext();
		theremin = new Theremin(audioContext);
		//jsNode = audioContext.createScriptProcessor(4096);
		//jsNode.onaudioprocess = audioProcess;

		//jsNode.connect( audioContext.destination );
		theremin.connect( audioContext.destination );
	}
	
	window.onload = function() {

		if(AudioDetector.detects(['webAudioSupport'])) {
			init();
		}
	};

}());

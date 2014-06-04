function Theremin(audioContext) {
	var position = 0, frequency,
		inverseSamplingRate,
		TWO_PI = Math.PI * 2.0;

	var oscillatorNode = audioContext.createOscillator();
	oscillatorNode.start();

	var gainNode = audioContext.createGain();
	var playing = false;
	
	this.samplingRate = 44100;
	inverseSamplingRate = 1.0 / this.samplingRate;
	this.pitchBase = 50;
	this.pitchBend = 0;
	this.pitchRange = 2000;
	this.volume = 0.5;
	this.maxVolume = 0.5;
	this.frequency = this.pitchBase;

	frequency = this.pitchBase;

	this.togglePlaying = function() {
		if(playing) {
			oscillatorNode.disconnect(gainNode);
		} else {
			oscillatorNode.connect(gainNode);
		}
		playing = !playing;
		return playing;
	};

	/*this.getBuffer = function(numSamples) {
		var out = [];

		var v = this.volume * this.maxVolume;

		for(var i = 0; i < numSamples; i++) {
			
			out[i] = v * Math.sin(position * TWO_PI);

			position += frequency * inverseSamplingRate;

			while(position > 1.0) {
				position -= 1;
			}

		}

		return out;
	};*/

	this.setPitchBend = function(v) {
		this.pitchBend = v;
		this.frequency = this.pitchBase + this.pitchBend * this.pitchRange;
		frequency = this.frequency;
		oscillatorNode.frequency.value = frequency;
	};

	this.setVolume = function(volume) {
		// TODO
	};
	
	this.connect = function(output) {
		//this.oscillator.connect(output);
		gainNode.connect(output);
	};



	return this;
}

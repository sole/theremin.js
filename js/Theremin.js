function Theremin(audioContext) {

	// TODO make more things not use this.
	var oscillatorNode = audioContext.createOscillator();
	oscillatorNode.start(0);

	var gainNode = audioContext.createGain();
	var playing = false;
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


	this.setPitchBend = function(v) {
		this.pitchBend = v;
		frequency = this.pitchBase + this.pitchBend * this.pitchRange;
		oscillatorNode.frequency.value = frequency;
		this.frequency = frequency;
	};

	this.setVolume = function(v) {
		this.volume = this.maxVolume * v;
		gainNode.gain.value = this.volume;
	};
	
	this.connect = function(output) {
		gainNode.connect(output);
	};



	return this;
}

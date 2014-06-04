function Theremin() {
	var position = 0, frequency,
		inverseSamplingRate,
		TWO_PI = Math.PI * 2.0;
	
	this.samplingRate = 44100;
	inverseSamplingRate = 1.0 / this.samplingRate;
	this.pitchBase = 50;
	this.pitchBend = 0;
	this.pitchRange = 2000;
	this.volume = 0.5;
	this.maxVolume = 0.5;
	this.frequency = this.pitchBase;

	frequency = this.pitchBase;

	this.getBuffer = function(numSamples) {
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
	}

	this.setPitchBend = function(v) {
		this.pitchBend = v;
		this.frequency = this.pitchBase + this.pitchBend * this.pitchRange;
		frequency = this.frequency;
	}

	return this;
}

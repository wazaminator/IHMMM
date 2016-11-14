ihmApp.config(function($provide) {
	$provide.decorator('ColorPickerOptions', function($delegate) {
		var options = angular.copy($delegate);
		options.required = true;
		options.round = false;
		options.hue = true;
		options.alpha = false;
		options.swatch = true;
		options.reset.show = true;
		options.reset.label = 'Annul.';
		options.close.show = true;
		options.close.label = 'Ok';
		options.format = 'hex';
		return options;
	});
});
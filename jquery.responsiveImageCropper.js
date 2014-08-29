
(function(jQuery){
	var ResponsiveImageCropper = function() {};
	ResponsiveImageCropper.prototype = {

		/**
		 * target img element
		 */
		targetElements: undefined,

		/**
		 * options.
		 */
		options: undefined,

		/**
		 * run
		 */
		run: function(targetElements){
			var _this = this;
			this.targetElements = new Array();
			targetElements.each(function(index){
				_this.targetElements.push($(this));
			});

			this.onResizeCallback();
			$(window).resize(function(event){
				_this.onResizeCallback();
			});
		},

		/**
		 * On resize callback function.
		 */
		onResizeCallback: function(){
			var _this = this;
			jQuery.each(this.targetElements, function(index){
				var imgElement = jQuery(this);
				var outside = imgElement.parent();
				imgElement.data('crop-image-outside', outside);
				_this.desideImageWidth(imgElement);
			});
		},

		/**
		 * Deside image width.
		 */
		desideImageWidth: function(imgElement){
			var outside = imgElement.data('crop-image-outside');
			imgElement.width(outside.width());
		},

		/**
		 * set options.
		 */
		setOptions: function(options){
			this.options = options;
		}
	};
	
	/**
	 * Main stream
	 */
	jQuery.fn.responsiveImageCropper = function(options){
		var options = jQuery.extend(jQuery.fn.responsiveImageCropper.defaults, options);
		// set using objects.
		var targetElements = jQuery(this);
		
		// Event start
		cropper = new ResponsiveImageCropper();
		cropper.setOptions(options);
		cropper.run(targetElements);
		
		return this;
	};
	
	/**
	 * default options.
	 * @property screenFilterImage string put on top-screen image using `repeat-x left bottom`.
	 */
	jQuery.fn.responsiveImageCropper.defaults = {

	};
})(jQuery);
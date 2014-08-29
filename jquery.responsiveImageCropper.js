
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
				var imgElement = $(this);
				imgElement.css({
					display: "none",
				})

				var preload = new Image();

				preload.onload = function(){
					imgElement.css({
						position: "absolute",
						display: "block",
						padding: "padding"
					});
					_this.targetElements.push(imgElement);
					_this.croppingImageElement(imgElement);
				}
				preload.src = imgElement.attr('src');
			});

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
				var imgElement = this;
				_this.croppingImageElement(imgElement);
			});
		},

		/**
		 * crop image
		 */
		croppingImageElement: function(imgElement){
			var outside, inner, outer;

			if (imgElement.data('crop-image-wrapped')){
				outside = imgElement.data('crop-image-outside');
				outer = imgElement.data('crop-image-outer');
				inner = imgElement.data('crop-image-inner');

			}else{
				outside = imgElement.parent();
				outer = jQuery("<div>");
				inner = jQuery("<div>");
				outer.css({
					overflow: "hidden",
					margin: imgElement.css("margin"),
					padding: imgElement.css("padding")
				});

				inner.css({
					position: "relative",
					overflow: "hidden"
				});

				// append elements.
				imgElement.after(outer);
				outer.append(inner);
				inner.append(imgElement);

				// set datas.
				imgElement.data('crop-image-outside', outside);
				imgElement.data('crop-image-outer', outer);
				imgElement.data('crop-image-inner', inner);
				imgElement.data('crop-image-wrapped', true);
			}

			this.desideImageSizes(imgElement);
		},

		/**
		 * Deside image width.
		 */
		desideImageSizes: function(imgElement){
			var outside = imgElement.data('crop-image-outside');
			var inner = imgElement.data('crop-image-inner');
			var ratio = imgElement.data('crop-image-ratio')

			if (!ratio){
				ratio = 1;
			}

			var height = outside.width() * ratio;
			inner.height(height);

			imgElement.width(outside.width());
			imgElement.height('auto');
			imgElement.css({
				position: "absolute",
				left: 0,
				top: - (imgElement.height() - outside.height()) /2
			});

			if ( height > imgElement.height() ){
				imgElement.width('auto');
				imgElement.height(height);
				imgElement.css({
					position: "absolute",
					left: - (imgElement.width() - outside.width()) /2,
					top: 0
				});
			}
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
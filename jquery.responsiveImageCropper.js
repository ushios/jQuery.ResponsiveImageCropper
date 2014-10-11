
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
					display: "none"
				})

				var preload = new Image();

				preload.onload = function(){
					imgElement.css({
						position: "absolute"
					});
					_this.targetElements.push(imgElement);
					_this.croppingImageElement(imgElement);
					imgElement.css({
						display: "block"
					});
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
			var inner, outer;

			if (imgElement.data('crop-image-wrapped')){
				outer = imgElement.data('crop-image-outer');
				inner = imgElement.data('crop-image-inner');

			}else{
				outer = jQuery("<div>");
				inner = jQuery("<div>");
				outer.css({
					overflow: "hidden",
					margin: imgElement.css("margin"),
					padding: imgElement.css("padding")
				});

				imgElement.css({
					margin: 0,
					padding: 0
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
			var outer = imgElement.data('crop-image-outer');
			var inner = imgElement.data('crop-image-inner');
			var ratio = imgElement.data('crop-image-ratio')

			if (!ratio){
				ratio = 1;
			}

			var height = outer.width() * ratio;
			inner.height(height);

			imgElement.width(outer.width());
			imgElement.height('auto');
			imgElement.css({
				position: "absolute",
				left: 0,
				top: - (imgElement.height() - outer.height()) /2
			});

			if ( height > imgElement.height() ){
				imgElement.width('auto');
				imgElement.height(height);
				imgElement.css({
					position: "absolute",
					left: - (imgElement.width() - outer.width()) /2,
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
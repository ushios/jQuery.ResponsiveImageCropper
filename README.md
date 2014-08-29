jQuery.ResponsiveImageCropper
===========================

Image will be cropped. jQuery plugin page is [here](http://plugins.jquery.com/responsiveimagecropper/)


Usage
------

##### html
    <img class="crop" src="http://placekitten.com/2500/1200" data-crop-image-ratio="0.5" />

##### javascript

    <script type="text/javascript">
    $(function(){
        $("img.crop").responsiveImageCropper();
    });
    </script>


Options
--------

N/A

Data attribtues
---------------

### data-crop-image-ratio

When `data-crop-image-ratio="1"` the cropped image will be square. `data-crop-image-ratio="0.5"` the cropped image height will be '50px' when width is '100px'

---

Special thanks
===============
I love [Storehouse](https://www.storehouse.co/) and [placekitten](http://placekitten.com/)!

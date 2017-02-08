# hexo-tag-figure
[![npm version](https://badge.fury.io/js/hexo-tag-figure.svg)](https://badge.fury.io/js/hexo-tag-figure)

Embed `<figure>` wrapped images on your blog posts with this [Hexo](https://hexo.io/) tag plugin.

## Installation
Run the following command in the root directory of your hexo instance:
``` sh
npm install hexo-tag-figure --save
```

## Usage
Syntax:
```
{% figure [class names] /path/to/image [width] [height] [title text [alt text]] %}
```
Arguments:
 - `class names`: add CSS class selectors to `<figure>` (Optional)
 - `/path/to/image`: can be url `http://example.com/uploads/example.png` or path `/uploads/example.png`
 - `width`: specify the width of the image (Optional)
 - `height`: specify the height of the image (Optional)
 - `title text`: specify the title **and the `figcaption`** of the image (Optional)
 - `alt text`: specify the alt text of the image (Optional)

**Note:** `alt text` must be inserted within `title text`.
```
# correct
{% figure /uploads/example.png "This is title. 'This is alt'" %}
# wrong
{% figure /uploads/example.png "This is title." "This is alt" %}
```

## Example
```
{% figure left https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png "This is Google's logo" %}
```
will be:
``` html
<figure class="left">
  <img src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png" title="This is Google's logo">
  <figcaption>This is Google's logo</figcaption>
</figure>
```
And
```
{% figure right /uploads/2016/googlelogo.png 50% 200 %}
```
will be:
``` html
<figure class="right">
  <img src="/uploads/2016/googlelogo.png" width="50%" height="200">
</figure>
```

## License
MIT

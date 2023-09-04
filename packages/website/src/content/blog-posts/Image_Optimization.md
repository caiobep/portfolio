---
id: "caa6e74c-1333-4591-8b8d-8c405f866597"
date: "2021-09-28T21:12:00.000Z"
title: "Image Optimization"
summary: undefined
readTime: undefined
tagIds: ["ffcd889d-91ab-49a0-9ff6-e7192fced192"]
tags: [{"id":"ffcd889d-91ab-49a0-9ff6-e7192fced192","name":"Blog","icon":"🌐"}]
--- 
 
Today in the web, you might be tempted to use a image without too much customization or optimization. This might be ok for good browsers with good internet access but for the majority of the cases is less than ideal. The problem is that image optimization is tiresome. Fortunately _Next.js_ includes automatic Image Optimization by default.


### Unoptimized Image


With regular _html_ you might do something like:


```html
<img src="/images/profile.jpg" alt="Your Name" />
```


However, this means you have to manually handle: 

- Ensuring your image is responsive on different screen sizes
- Optimizing your images with a third-party tool or library
- Only loading images when they enter the viewport

And more. Instead, _Next.js_ provides an `image` component out of the box to handle this for you.


### Image Component and Image Optimization


`next/image` is an extension of the HTML `<img>` element, evolved for the modern web.


Next.js also has support for Image Optimization by default. This allows for resizing, optimizing, and serving images in modern formats like [WebP](https://www.notion.so/d77d214fb413467d94caac73ceea8bc7) when the browser supports it. This avoids shipping large images to devices with smaller viewports. It also allows Next.js to automatically adopt future image formats and serve them to browsers that support those formats.


Automatic image Optimization works with any image source. Even if the image is hosted by an external data source, like CMS, it can still be optimized.


### Using the image Component


Instead of optimizing images at build time, _Next.js_ optimizes images on-demmand, as users request them. Unlike static site generators and static-only solutions, your build times aren't increased, whether shipping 10 images or 10 million images.


Images are lazy loaded by default. That means your page speed isn't penalized for images outside the viewport. Images load as they are scrolled into viewport.


Images are always rendered in such a way as to avoid [_Cumulative Layout Shift (CLS)_](https://www.notion.so/8500de7dd121456f80da3aabd544d6dd)_, a_ _**Core Web Vital**_ that Google is going to use in search (see [Evaluating page experience for a better web](https://www.notion.so/0cb6d695587346d0bb86b784ca670e60))


Here's an example using `next/image` to display our profile picture. The `height` and `width` props should be the desired rendering sizem with an aspect ration identical to the source image.


To learn more about Automatic Image Optimization, check out the [documentation](https://nextjs.org/docs/basic-features/image-optimization).


To learn more about the `Image` component, check out the [API reference for ](https://nextjs.org/docs/api-reference/next/image)[`next/image`](https://nextjs.org/docs/api-reference/next/image).


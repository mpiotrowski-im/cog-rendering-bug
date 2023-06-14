# cog-rendering-bug

Sample application which demonstrates a bug in rendering 
COG (GeoTIFF) rasters in certain situations.

The problem is that one of sample files is not rendered depending on the
order of the layers. In one order it is rendered correctly and in reverse order
the layer is not visible. See main.js lines 9 ad 10.

## How to check example

Clone code than in the code directory run:

```shell
npm install
```

Then run
```shell
npm run start
```
and browse: http://localhost:5173/

Change order of displayed layers in lines 9 and 10.
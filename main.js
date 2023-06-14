import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import WebGLTileLayer from "ol/layer/WebGLTile"
import GeoTIFF from 'ol/source/GeoTIFF';

let cogs;
cogs = ["l.tif", "r.tif"]; // this order does not work
// cogs = cogs.reverse(); //this order works (reverse order)
const rasterLayers = [];
for (let i = 0; i < cogs.length; i++) {
    const raster = new GeoTIFF({
        sources: [
            {
                url: 'http://localhost:5173/assets/' + cogs[i],
            }
        ],
        normalize: false,
    });

    const rasterLayer = new WebGLTileLayer({
        source: raster,
        style: {
            variables: {
                minValue: 0,
                maxValue: 75
            },
            color: [
                'interpolate',
                ['linear'],
                ['band', 1],
                ['var', 'minValue'],
                ['color', 0, 0, 0, ['match', ['band', 2], 255, 1, 0]],
                ['var', 'maxValue'],
                ['color', 255, 0, 0, ['match', ['band', 2], 255, 1, 0]],
            ]
        }
    });

    rasterLayers[i] = rasterLayer;
}

const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM()
        }),
        ...rasterLayers
    ],
    view: new View({
        center: [2000000, 7250000],
        zoom: 7
    })
});

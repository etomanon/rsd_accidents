import { store } from "src/index";
import { resolutionSet, extentSet } from "src/actions/index";
import Overlay from 'ol/Overlay.js';
import { getCenter } from "ol/extent";

const TYPE_CZ = {
    bus_stop: "Autobusová zastávka",
    corridor: "Vnitřek budovy",
    cycleway: "Cyklostezka",
    living_street: "Obytná zóna",
    motorway: "Dálnice",
    motorway_link: "Dálnice sjezd/nájezd",
    platform: "Zastávka veřejné dopravy",
    primary: "Silnice I. třídy",
    primary_link: "Silnice I. třídy nájezd/sjezd",
    raceway: "Závodní okruh",
    residential: "Obslužná komunikace v bytové zástavbě",
    secondary: "Silnice II. třídy",
    secondary_link: "Silnice II. třídy nájezd/sjezd",
    service: "Přístupová silnice k objektu",
    tertiary: "Silnice III. třídy",
    tertiary_link: "Silnice III. třídy nájezd/sjezd",
    traffic_island: "Přechod pro chodce",
    trunk: "Rychlostní komunikace",
    trunk_link: "Rychlostní komunikace nájezd/sjezd",
    unclassified: "Neklasifikováno",
    yes: "Neklasifikováno"
  }

export default new class Events {
    init = (map, state) => {
        this.resolution = 0;
        this.points = -1;
        map.on('moveend', this.onMoveEnd);
        map.on('click', this.onClick);
        map.on('pointermove', this.onPointerMove);

        this.markerEl = document.createElement('div');
        this.marker = new Overlay({
            position: undefined,
            positioning: 'bottom-center',
            autoPan: true,
            element: this.markerEl,
            stopEvent: false,
            offset: [0, -10],
            className: "background-primary p-10 text-white arrow-down"
        });
        this.markerEl.style.width = "190px";
        map.addOverlay(this.marker);
    }

    update = (newState) => {
        this.points = newState.hour;
    }
    onMoveEnd = (e) => {
        const map = e.map;
        const view = map.getView();
        const resolution = view.getResolution();
        const extent = view.calculateExtent();
        if (resolution !== this.resolution) {
            this.resolution = resolution;
            store.dispatch(resolutionSet(resolution));
        }
        store.dispatch(extentSet(extent));
    }

    onClick = (e) => {
        this.marker.setPosition(undefined);
        const map = e.map;
        const features = map.getFeaturesAtPixel(e.pixel);
        if (!features) return;
        const feature = features[0];
        if(feature.get("testing")) return;
        const properties = feature.getProperties();
        const type = feature.getGeometry().getType();
        if (type === "Polygon") {
            this.markerEl.innerHTML = `
            <div class="container-column align-center">
                <div class='mb-10 bold'>Počet nehod</div>
                <div class="">${properties["points"]}</div>
            </div>
            `;
        }
        else {
            const point = this.points === -1 ? "total" : this.points;
            this.markerEl.innerHTML = `
        <div class="container-column align-center">
            <div class='mb-5 bold'>Počet nehod</div>
            <div class="mb-10">${properties["points_" + point]}</div>
            <div class='mb-5 bold'>Typ</div>
            <div class="text-center">${TYPE_CZ[properties.highway]}</div>
        </div>
        `;
        }
        const pos = getCenter(feature.getGeometry().getExtent());
        this.marker.setPosition(pos);
    }

    onPointerMove = (e) => {
        const map = e.map;
        const target = map.getTarget();
        const features = map.getFeaturesAtPixel(e.pixel);
        if (!features || features[0].get("testing")) {
            if (target.classList.contains("pointer")) target.classList.remove("pointer");
            return;
        }
        target.classList.add("pointer")
    }
}();
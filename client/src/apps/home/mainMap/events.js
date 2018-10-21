import { store } from "src/index";
import { resolutionSet } from "src/actions/index";
import Overlay from 'ol/Overlay.js';
import { getCenter } from "ol/extent";

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
        map.addOverlay(this.marker);
    }

    update = (newState) => {
        this.points = newState.hour;
    }
    onMoveEnd = (e) => {
        const map = e.map;
        const resolution = map.getView().getResolution();
        if (resolution !== this.resolution) {
            this.resolution = resolution;
            store.dispatch(resolutionSet(resolution));
        }
    }

    onClick = (e) => {
        this.marker.setPosition(undefined);
        const map = e.map;
        const features = map.getFeaturesAtPixel(e.pixel);
        if (!features) return;
        const feature = features[0];
        const properties = feature.getProperties();
        const point = this.points === -1 ? "total" : this.points;
        this.markerEl.innerHTML = `
        <div class="container-column align-center">
            <div class='mb-10 bold'>Počet nehod</div>
            <div>${properties["points_" + point]}</div>
        </div>
        `;
        const pos = getCenter(feature.getGeometry().getExtent());
        this.marker.setPosition(pos);
    }

    onPointerMove = (e) => {
        const map = e.map;
        const target = map.getTarget();
        const features = map.getFeaturesAtPixel(e.pixel);
        if (!features) {
            if(target.classList.contains("pointer")) target.classList.remove("pointer");
            return;
        }
        target.classList.add("pointer")
    }
}();
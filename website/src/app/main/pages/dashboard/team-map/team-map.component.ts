import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { TeamService } from 'app/_services';
import { forEach } from 'lodash';
import { Team } from '../../../../_models';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'team-map',
    templateUrl: './team-map.component.html',
    styleUrls: ['./team-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TeamMapComponent implements AfterViewInit, OnChanges {

    map: mapboxgl.Map;
    style = `https://tile.jawg.io/62c2ff54-d305-4495-b14d-36439142e6ed.json?access-token=${environment.accessToken}`;
    lat = 48.85;
    lng =  2.35;

    markers: any;

    @Input() resize;

    @ViewChild('mapElement') mapElement: ElementRef;

    constructor(private teamService: TeamService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.resize && changes.resize.currentValue === true && this.map){
            this.mapResize();
            this.updateLocations();
        }
    }

    ngAfterViewInit() {
        this.buildMap();
    }

    buildMap() {
        this.map = new mapboxgl.Map({
            container: this.mapElement.nativeElement,
            style: this.style,
            zoom: 10,
            center: [this.lng, this.lat]
        });

        this.map
            .addControl(new mapboxgl.NavigationControl())
            .addControl(new mapboxgl.AttributionControl({
                compact: false,
                customAttribution: "<a href='https://jawg.io' target='_blank'>© Jawg</a> &bullet; <a href='https://www.openstreetmap.org' target='_blank'>© OpenStreetMap</a>"
            }));
    }

    mapResize() {
        this.map.resize();
    }

    updateLocations() {
        const locations = this.teamService.getTeamsLocation();
        console.log('LOC', locations);
        forEach(locations, (team: Team) => {

            const popup = new mapboxgl.Popup({closeOnClick: false, offset: [0, -40]})
                .setLngLat([team.secretLocation.lng, team.secretLocation.lat])
                .setText(team.name);
            new mapboxgl.Marker()
                .setLngLat([team.secretLocation.lng, team.secretLocation.lat])
                .setPopup(popup)
                .addTo(this.map)
                .togglePopup();
        });
    }

}

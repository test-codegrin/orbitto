import markerImage from "/public/img/icons/map-marker-2.webp";
import { locationUrl, locationName, officeAddress } from "@/libs/contactInfo";

function mplace() {
  var LocsA = [
    {
      lat: 22.811989,
      lon: 70.82362,
      title: locationName,
      html: [
        '<div class="ltn__map-item">',
        '<h3 class="ltn__location-name">' + locationName + "</h3>",
        '<h5 class="ltn__location-single-info"><i class="fas fa-map-marked-alt"></i>' +
          officeAddress +
          "</h5>",
        '<h4 class="ltn__location-single-info"><i class="fas fa-phone-volume"></i>+91 99047 27348</h4>',
        '<div class="btn-wrapper">',
        '<a href="/contact" class="btn btn-transparent btn-border btn-effect-4"><i class="fas fa-location-arrow"></i> Get An Appointment</a>',
        '<a href="' +
          locationUrl +
          '" target="_blank" rel="noopener noreferrer" class="btn btn-transparent btn-border btn-effect-3"><i class="fas fa-globe"></i> View Location</a>',
        "</div>",
        "</div>",
      ].join(""),
      icon: markerImage,
      animation: google.maps.Animation.BOUNCE,
    },
  ];
  new Maplace({
    locations: LocsA,
    controls_on_map: true,
    map_options: {
      zoom: 13,
      scrollwheel: false,
      stopover: true,
    },
    stroke_options: {
      strokeColor: "#f10",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#f10",
      fillOpacity: 0.4,
    },
  }).Load();
}

export default mplace;

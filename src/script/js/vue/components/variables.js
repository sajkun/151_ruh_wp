var vue_select_components = [];
var select_imitation;
var select_imitation_icon;
var input_field;
var datepicker_field;
var wait_block;
var animation_mixin;
var single_lead_popup;
var single_lead;
var perfomance;
var debug_vue;
var exist_popup;

var editing_object = -1;


var icons_selects = {
  'clinics': '<svg class="icon svg-icon-clinics"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-clinics"></use> </svg>',

  'treatments': '<svg class="icon svg-icon-tooth"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-tooth"></use> </svg>',

  'campaigns': '<svg class="icon svg-icon-campaign"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-campaign"></use> </svg>',

  'sources': '<svg class="icon svg-icon-sourses"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-sourses"></use> </svg>',

  'team': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'dentists': '<svg class="icon svg-icon-team"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-team"></use> </svg>',

  'human': '<svg class="icon svg-icon-human"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-human"></use> </svg>',

  'card': '<svg class="icon svg-icon-card"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-icon-card"></use> </svg>',

  'currency': '<span class="currency-in-select">£</span>',

  'sortby': '<span class="icon-sortby"> <svg xmlns:dc="http://purl.org/dc/elements/1.1/"xmlns:cc="http://creativecommons.org/ns#"xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"xmlns:svg="http://www.w3.org/2000/svg"xmlns="http://www.w3.org/2000/svg"xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"width="105.73048mm"height="60.448288mm"viewBox="0 0 374.63554 214.18685"id="svg2"version="1.1"inkscape:version="0.91 r13725"sodipodi:docname="desc.svg"> <defs id="defs4" /> <sodipodi:namedview id="base"pagecolor="#ffffff"bordercolor="#666666"borderopacity="1.0"inkscape:pageopacity="0.0"inkscape:pageshadow="2"inkscape:zoom="0.35"inkscape:cx="533.25919"inkscape:cy="533.92856"inkscape:document-units="px"inkscape:current-layer="layer1"showgrid="false"fit-margin-top="0"fit-margin-left="0"fit-margin-right="0"fit-margin-bottom="0"inkscape:window-width="1920"inkscape:window-height="976"inkscape:window-x="-8"inkscape:window-y="1072"inkscape:window-maximized="1" /> <metadata id="metadata7"> <rdf:RDF> <cc:Work rdf:about=""> <dc:format>image/svg+xml</dc:format> <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" /> <dc:title></dc:title> </cc:Work> </rdf:RDF> </metadata> <g inkscape:label="Layer 1"inkscape:groupmode="layer"id="layer1"transform="translate(672.54491,-854.96105)"> <path style="fill:#838993"d="m -553.75621,1065.0846 c -7.99146,-7.3236 -6.87414,-19.1169 2.34368,-24.7373 3.83487,-2.3383 6.73931,-2.4401 69.62681,-2.4401 63.62166,0 65.75131,0.077 69.76273,2.5227 8.72665,5.3205 9.74037,16.9649 2.13868,24.5666 l -4.15141,4.1514 -67.64336,0 -67.64335,0 -4.43378,-4.0633 z"id="path4155"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -599.26031,978.37748 c -4.88353,-2.6376 -7.56658,-8.71232 -7.05942,-15.98332 0.24135,-3.46003 1.21848,-7.06332 2.33486,-8.61003 4.51521,-6.25572 0.74969,-6.06481 119.62458,-6.06481 105.75005,0 111.35628,0.11175 114.63782,2.28409 3.74051,2.47623 7.15104,9.03755 7.15104,13.7575 0,4.43576 -2.86871,11.02393 -5.91003,13.57271 -2.55732,2.14316 -8.54166,2.275 -115.10261,2.53566 -94.99093,0.23238 -112.91182,10e-4 -115.67624,-1.4918 z"id="path4151"inkscape:connector-curvature="0" /> <path style="fill:#838993"d="m -665.69569,883.60895 c -7.01294,-5.51638 -8.83062,-13.77749 -4.56921,-20.76644 5.15136,-8.4485 -8.3984,-7.87319 185.42869,-7.87319 l 175.50221,0 4.24736,2.85325 c 4.99679,3.3567 8.22065,11.0967 6.86752,16.48795 -0.49088,1.95589 -2.77187,5.4355 -5.06884,7.73248 l -4.17633,4.17632 -177.45643,0 -177.45642,0 -3.31855,-2.61037 z"id="path4147"inkscape:connector-curvature="0" /> </g> </svg> </span>',
};
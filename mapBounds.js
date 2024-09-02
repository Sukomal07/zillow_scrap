const mapBounds = [
    {
        state: "Tennessee",
        bounds: {
            west: -90.310298,
            east: -81.6469,
            south: 34.982972,
            north: 36.678118
        }
    },
    {
        state: "Texas",
        bounds: {
            west: -106.645646,
            east: -93.508292,
            south: 25.837377,
            north: 36.500704
        }
    },
    {
        state: "Utah",
        bounds: {
            west: -114.052963,
            east: -109.041058,
            south: 36.997968,
            north: 42.001567
        }
    },
    {
        state: "Vermont",
        bounds: {
            west: -73.43774,
            east: -71.465741,
            south: 42.726933,
            north: 45.016659
        }
    },
    {
        state: "Washington",
        bounds: {
            west: -124.848974,
            east: -116.916512,
            south: 45.543541,
            north: 49.002494
        }
    },
    {
        state: "West Virginia",
        bounds: {
            west: -82.644739,
            east: -77.719519,
            south: 37.201483,
            north: 40.638801
        }
    },
    {
        state: "Wisconsin",
        bounds: {
            west: -92.888114,
            east: -86.249548,
            south: 42.491983,
            north: 47.309827
        }
    },
    {
        state: "Wyoming",
        bounds: {
            west: -111.056888,
            east: -104.05216,
            south: 40.994746,
            north: 45.005904
        }
    },
    {
        state: "Alabama",
        bounds: {
            west: -88.473227,
            east: -84.888246,
            south: 30.137521,
            north: 35.008028
        }
    },
    {
        state: "Virginia",
        bounds: {
            west: -83.675394,
            east: -75.231642,
            south: 36.540738,
            north: 39.466012
        }
    },
    {
        state: "Alaska",
        bounds: {
            west: 172.463,
            east: -129.994,
            south: 51.216389,
            north: 71.538800
        }
    },
    {
        state: "Arizona",
        bounds: {
            west: -114.818269,
            east: -109.045223,
            south: 31.332177,
            north: 37.004261
        }
    },
    {
        state: "Arkansas",
        bounds: {
            west: -94.617919,
            east: -89.644395,
            south: 33.004106,
            north: 36.499600
        }
    },
    {
        state: "California",
        bounds: {
            west: -124.409591,
            east: -114.131211,
            south: 32.534156,
            north: 42.009518
        }
    },
    {
        state: "Colorado",
        bounds: {
            west: -109.045223,
            east: -102.041524,
            south: 36.993076,
            north: 41.003444
        }
    },
    {
        state: "Connecticut",
        bounds: {
            west: -73.727775,
            east: -71.786994,
            south: 40.950943,
            north: 42.050587
        }
    },
    {
        state: "Delaware",
        bounds: {
            west: -75.788658,
            east: -75.048939,
            south: 38.451013,
            north: 39.839007
        }
    },
    {
        state: "Florida",
        bounds: {
            west: -87.634938,
            east: -80.031362,
            south: 24.396308,
            north: 31.000968
        }
    },
    {
        state: "Georgia",
        bounds: {
            west: -85.605165,
            east: -80.839729,
            south: 30.357851,
            north: 35.000659
        }
    },
    {
        state: "Hawaii",
        bounds: {
            west: -178.334698,
            east: -154.806773,
            south: 18.910361,
            north: 28.402123
        }
    },
    {
        state: "Idaho",
        bounds: {
            west: -117.243027,
            east: -111.043564,
            south: 42.000709,
            north: 49.001146
        }
    },
    {
        state: "Illinois",
        bounds: {
            west: -91.513079,
            east: -87.494756,
            south: 36.970298,
            north: 42.508481
        }
    },
    {
        state: "Indiana",
        bounds: {
            west: -88.09776,
            east: -84.784579,
            south: 37.771742,
            north: 41.760592
        }
    },
    {
        state: "Iowa",
        bounds: {
            west: -96.639485,
            east: -90.140061,
            south: 40.375501,
            north: 43.501196
        }
    },
    {
        state: "Kansas",
        bounds: {
            west: -102.051744,
            east: -94.588414,
            south: 36.993076,
            north: 40.003162
        }
    },
    {
        state: "Kentucky",
        bounds: {
            west: -89.571509,
            east: -81.964971,
            south: 36.497129,
            north: 39.147458
        }
    },
    {
        state: "Louisiana",
        bounds: {
            west: -94.043147,
            east: -88.817017,
            south: 28.921031,
            north: 33.019457
        }
    },
    {
        state: "Maine",
        bounds: {
            west: -71.083923,
            east: -66.949895,
            south: 42.977764,
            north: 47.459686
        }
    },
    {
        state: "Maryland",
        bounds: {
            west: -79.487651,
            east: -75.048939,
            south: 37.911717,
            north: 39.723043
        }
    },
    {
        state: "Massachusetts",
        bounds: {
            west: -73.508142,
            east: -69.928393,
            south: 41.237964,
            north: 42.886778
        }
    },
    {
        state: "Michigan",
        bounds: {
            west: -90.418136,
            east: -82.122971,
            south: 41.696118,
            north: 48.2388
        }
    },
    {
        state: "Minnesota",
        bounds: {
            west: -97.239209,
            east: -89.491739,
            south: 43.499356,
            north: 49.384358
        }
    },
    {
        state: "Mississippi",
        bounds: {
            west: -91.655009,
            east: -88.097888,
            south: 30.173943,
            north: 34.996052
        }
    },
    {
        state: "Missouri",
        bounds: {
            west: -95.774704,
            east: -89.098843,
            south: 35.995683,
            north: 40.61364
        }
    },
    {
        state: "Montana",
        bounds: {
            west: -116.050003,
            east: -104.039138,
            south: 44.358221,
            north: 49.00139
        }
    },
    {
        state: "Nebraska",
        bounds: {
            west: -104.053514,
            east: -95.30829,
            south: 39.999998,
            north: 43.001708
        }
    },
    {
        state: "Nevada",
        bounds: {
            west: -120.005746,
            east: -114.039648,
            south: 35.001857,
            north: 42.002207
        }
    },
    {
        state: "New Hampshire",
        bounds: {
            west: -72.557247,
            east: -70.610621,
            south: 42.697042,
            north: 45.305476
        }
    },
    {
        state: "New Jersey",
        bounds: {
            west: -75.559614,
            east: -73.893979,
            south: 38.928519,
            north: 41.357423
        }
    },
    {
        state: "New Mexico",
        bounds: {
            west: -109.045223,
            east: -103.001964,
            south: 31.332301,
            north: 37.000232
        }
    },
    {
        state: "New York",
        bounds: {
            west: -79.76259,
            east: -71.856214,
            south: 40.495992,
            north: 45.01585
        }
    },
    {
        state: "North Carolina",
        bounds: {
            west: -84.321869,
            east: -75.460621,
            south: 33.842316,
            north: 36.588117
        }
    },
    {
        state: "North Dakota",
        bounds: {
            west: -104.0489,
            east: -96.554507,
            south: 45.935054,
            north: 49.000574
        }
    },
    {
        state: "Ohio",
        bounds: {
            west: -84.820159,
            east: -80.518598,
            south: 38.403202,
            north: 41.977523
        }
    },
    {
        state: "Oklahoma",
        bounds: {
            west: -103.002565,
            east: -94.430662,
            south: 33.615833,
            north: 37.002206
        }
    },
    {
        state: "Oregon",
        bounds: {
            west: -124.566244,
            east: -116.463262,
            south: 41.991794,
            north: 46.292035
        }
    },
    {
        state: "Pennsylvania",
        bounds: {
            west: -80.519891,
            east: -74.689516,
            south: 39.7198,
            north: 42.26986
        }
    },
    {
        state: "Rhode Island",
        bounds: {
            west: -71.862772,
            east: -71.12057,
            south: 41.146339,
            north: 42.018798
        }
    },
    {
        state: "South Carolina",
        bounds: {
            west: -83.35391,
            east: -78.54203,
            south: 32.033455,
            north: 35.215402
        }
    },
    {
        state: "South Dakota",
        bounds: {
            west: -104.057698,
            east: -96.436589,
            south: 42.479635,
            north: 45.94545
        }
    }
];

module.exports = mapBounds;

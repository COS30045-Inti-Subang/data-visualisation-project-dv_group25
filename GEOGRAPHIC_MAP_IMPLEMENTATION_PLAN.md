# Geographic Map Implementation Plan
**Project:** South Australia Road Safety Data Visualization  
**Feature:** Interactive Geographic Map with GeoJSON Boundaries  
**Date:** November 8, 2025

---

## Current Status: Phase 1 Complete ✅

### Quick Fix Implemented (DONE)
- [x] Made SVG responsive using viewBox and container dimensions
- [x] Added padding to coordinate bounds for better visualization
- [x] Set max-width to 1300px and max-height to 700px
- [x] Added gold border frame around map area
- [x] Improved grid opacity (reduced to 8%)
- [x] Enhanced container styling with box-shadow
- [x] Maintained all interactive features (zoom/pan/tooltips)

**Result:** Map now fits properly in container and looks more polished!

---

## Phase 2: Full Geographic Implementation with GeoJSON

### Objective
Transform the current coordinate scatter plot into a proper geographic map showing South Australia boundaries with crash markers overlaid on actual geography.

### Data Sources Required

#### 1. Geographic Boundary Data
**South Australia GeoJSON** (PRIMARY)
- **Source Options:**
  - Australian Bureau of Statistics: https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs-edition-3/jul2021-jun2026/access-and-downloads/digital-boundary-files
  - data.gov.au: https://data.gov.au/
  - Natural Earth Data: https://www.naturalearthdata.com/
  - OpenStreetMap via Overpass API
  
- **Required Features:**
  - South Australia state boundary (polygon)
  - Optional: LGA (Local Government Area) boundaries
  - Optional: Major highways/roads
  - Format: GeoJSON or TopoJSON

**File to create:** `data/south-australia.geojson`

#### 2. Crash Data (ALREADY HAVE)
- `data/2020-2024_DATA_SA_Crash(filtered).csv` (15,471 rows)
  - Columns: ACCLOC_X, ACCLOC_Y, Total Cas, Total Fats, crash details
  - Coordinate system: GDA94 MGA Zone 54 (meters)

#### 3. Casualty Data (ALREADY HAVE)
- `data/2020-2024_DATA_SA_Casualty(filtered).csv`
  - Can be used for enhanced tooltips (demographics, injury details)

#### 4. Australian Road Deaths Database (MENTIONED)
- `data/Australian Road Deaths Database September 2025 (2).xlsx`
  - May contain additional context or validation data
  - Need to assess structure and integration points

---

## Technical Implementation Steps

### Step 1: Obtain South Australia GeoJSON
**Priority:** HIGH  
**Estimated Time:** 1-2 hours (research + processing)

**Actions:**
1. Download SA boundary from ABS or data.gov.au
2. If SHP format, convert to GeoJSON using:
   - QGIS (free GIS software)
   - ogr2ogr command-line tool
   - Online converter: https://mapshaper.org/
3. Simplify geometry if file too large (use mapshaper)
4. Save as `data/south-australia.geojson`

**Fallback:** If no GeoJSON available, create simplified polygon manually using known SA coordinates

---

### Step 2: Coordinate Conversion (MGA Zone 54 → Lat/Long)
**Priority:** HIGH  
**Estimated Time:** 2-3 hours

**Current Issue:** 
- Crash data uses GDA94 MGA Zone 54 (meters): ACCLOC_X, ACCLOC_Y
- GeoJSON uses WGS84 (latitude/longitude in degrees)
- Need conversion between coordinate systems

**Solution Options:**

#### Option A: Use Proj4js Library (RECOMMENDED)
```javascript
// Add to index.html
<script src="https://cdnjs.cloudflare.com/ajax/libs/proj4js/2.9.0/proj4.js"></script>

// In visualizations.js
// Define MGA Zone 54 projection
proj4.defs("EPSG:28354", "+proj=utm +zone=54 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

// Convert coordinates
const [longitude, latitude] = proj4("EPSG:28354", "EPSG:4326", [ACCLOC_X, ACCLOC_Y]);
```

#### Option B: Approximate Conversion (FASTER, LESS ACCURATE)
Use D3's projection.invert() to map coordinates
- Faster implementation
- Less accurate but acceptable for visualization

---

### Step 3: Implement D3 Geo Projection
**Priority:** HIGH  
**Estimated Time:** 3-4 hours

**Code Structure:**

```javascript
async function createGeographicMap() {
  try {
    // 1. Load GeoJSON boundary
    const geoData = await d3.json("./data/south-australia.geojson");
    
    // 2. Load crash data
    const crashData = await d3.csv("./data/2020-2024_DATA_SA_Crash(filtered).csv");
    
    // 3. Get container dimensions
    const container = document.querySelector("#map-container");
    const width = Math.min(container.offsetWidth, 1200);
    const height = width / 1.6;
    
    // 4. Create projection
    const projection = d3.geoMercator()
      .fitSize([width, height], geoData);
    
    // 5. Create path generator
    const path = d3.geoPath().projection(projection);
    
    // 6. Create SVG
    const svg = d3.create("svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", [0, 0, width, height])
      .attr("preserveAspectRatio", "xMidYMid meet");
    
    // 7. Draw SA boundary
    svg.append("path")
      .datum(geoData)
      .attr("d", path)
      .attr("fill", "var(--smoky-black-1)")
      .attr("stroke", "var(--gold-crayola)")
      .attr("stroke-width", 2)
      .attr("opacity", 0.9);
    
    // 8. Convert crash coordinates and plot markers
    crashData.forEach(d => {
      // Convert MGA to lat/long using proj4
      const [lon, lat] = proj4("EPSG:28354", "EPSG:4326", 
        [parseFloat(d.ACCLOC_X), parseFloat(d.ACCLOC_Y)]
      );
      
      // Project to screen coordinates
      const [x, y] = projection([lon, lat]);
      
      // Plot marker at (x, y)
      // ... marker code ...
    });
    
    // 9. Add zoom/pan
    const zoom = d3.zoom()
      .scaleExtent([1, 20]) // Can zoom more with proper geography
      .on("zoom", zoomed);
    
    svg.call(zoom);
    
  } catch (error) {
    console.error("Error creating geographic map:", error);
    // Fallback to current coordinate map
    createMap(); // Original function
  }
}
```

---

### Step 4: Enhanced Features
**Priority:** MEDIUM  
**Estimated Time:** 4-5 hours

**Add Reference Points:**
```javascript
const majorCities = [
  { name: "Adelaide", lat: -34.9285, lon: 138.6007 },
  { name: "Mount Gambier", lat: -37.8288, lon: 140.7831 },
  { name: "Port Augusta", lat: -32.4927, lon: 137.7656 },
  { name: "Whyalla", lat: -33.0333, lon: 137.5667 },
  { name: "Murray Bridge", lat: -35.1194, lon: 139.2744 }
];

// Plot city markers
svg.selectAll(".city")
  .data(majorCities)
  .join("g")
  .attr("class", "city")
  .attr("transform", d => {
    const [x, y] = projection([d.lon, d.lat]);
    return `translate(${x},${y})`;
  })
  .each(function(d) {
    const g = d3.select(this);
    // Add star icon
    g.append("circle")
      .attr("r", 5)
      .attr("fill", "var(--gold-crayola)")
      .attr("stroke", "var(--white)")
      .attr("stroke-width", 2);
    // Add label
    g.append("text")
      .attr("dy", -10)
      .attr("text-anchor", "middle")
      .attr("fill", "var(--white)")
      .attr("font-size", "12px")
      .text(d.name);
  });
```

**Add LGA Boundaries (Optional):**
- Show local government areas as internal borders
- Enable filtering by LGA
- Highlight LGA on hover

**Heatmap Layer (Advanced):**
- Add density heatmap showing crash hotspots
- Use d3.contourDensity()
- Toggle between markers and heatmap

---

### Step 5: Integrate Additional Datasets
**Priority:** LOW  
**Estimated Time:** 2-3 hours

**Casualty Data Integration:**
- Link crashes to casualty details via REPORT_ID
- Show casualty demographics in tooltip
- Filter by age group, seatbelt usage

**Australian Road Deaths Database:**
- Cross-reference with national data
- Show SA comparison to other states
- Add trend indicators

---

## File Structure (Final)

```
grilli/
├── index.html
├── assets/
│   ├── js/
│   │   ├── script.js
│   │   └── visualizations.js          # Updated with geographic map
│   └── ...
├── data/
│   ├── south-australia.geojson        # NEW - SA boundary
│   ├── lga-boundaries.geojson         # NEW - Optional LGA borders
│   ├── 2020-2024_DATA_SA_Crash(filtered).csv
│   ├── 2020-2024_DATA_SA_Casualty(filtered).csv
│   └── Australian Road Deaths Database September 2025 (2).xlsx
└── GEOGRAPHIC_MAP_IMPLEMENTATION_PLAN.md  # This file
```

---

## Implementation Timeline

### Week 1: Data Preparation
- [ ] Day 1-2: Source and download SA GeoJSON
- [ ] Day 3: Convert/simplify geometry if needed
- [ ] Day 4: Test GeoJSON loading in D3
- [ ] Day 5: Set up Proj4js for coordinate conversion

### Week 2: Core Implementation
- [ ] Day 1-2: Implement D3 geoMercator projection
- [ ] Day 3: Draw SA boundary on map
- [ ] Day 4: Convert crash coordinates to lat/long
- [ ] Day 5: Plot crash markers on geographic map

### Week 3: Enhancement & Polish
- [ ] Day 1: Add major cities and labels
- [ ] Day 2: Implement zoom/pan with better controls
- [ ] Day 3: Add LGA boundaries (optional)
- [ ] Day 4: Integrate casualty data for tooltips
- [ ] Day 5: Testing and refinement

---

## Risk Mitigation

### Risk 1: GeoJSON Not Available
**Mitigation:** Create simplified SA boundary manually using known coordinates
```javascript
const simplifiedSA = {
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [[
      [138.0, -26.0], // Northwest
      [141.0, -26.0], // Northeast  
      [141.0, -38.0], // Southeast
      [138.0, -38.0], // Southwest
      [138.0, -26.0]  // Close polygon
    ]]
  }
};
```

### Risk 2: Coordinate Conversion Fails
**Mitigation:** Use current coordinate system with geographic reference overlay
- Keep MGA coordinates but add city markers for context
- Show coordinate grid with labels

### Risk 3: Performance Issues
**Mitigation:**
- Limit crash markers to 2,000 (already done)
- Simplify GeoJSON geometry
- Use marker clustering for dense areas
- Implement progressive loading

---

## Testing Checklist

- [ ] GeoJSON loads without errors
- [ ] SA boundary displays correctly
- [ ] Coordinate conversion accurate (test known locations)
- [ ] Crash markers appear in correct geographic positions
- [ ] Adelaide crashes appear near Adelaide city marker
- [ ] Zoom/pan works smoothly
- [ ] Tooltips display correctly
- [ ] Legend accurate
- [ ] Responsive on mobile devices
- [ ] Fallback to coordinate map if GeoJSON fails

---

## Success Criteria

**Minimum Viable Product:**
1. SA boundary visible on map
2. Crash markers correctly positioned geographically
3. Interactive zoom/pan functional
4. Major cities labeled for reference
5. All current features maintained (tooltips, legend, filters)

**Full Implementation:**
1. All MVP criteria met
2. LGA boundaries shown
3. Multiple datasets integrated
4. Heatmap layer available
5. Filter by region/LGA
6. Export map functionality

---

## Resources & References

**D3 Geo Documentation:**
- https://d3js.org/d3-geo
- https://d3js.org/d3-geo-projection

**Proj4js Documentation:**
- https://github.com/proj4js/proj4js
- http://proj4js.org/

**GeoJSON Sources:**
- Australian Bureau of Statistics: https://www.abs.gov.au/
- data.gov.au: https://data.gov.au/
- Natural Earth: https://www.naturalearthdata.com/

**Coordinate Systems:**
- GDA94 MGA Zone 54 (EPSG:28354) - Meters
- WGS84 (EPSG:4326) - Degrees

**Tools:**
- QGIS: https://qgis.org/ (GIS software)
- Mapshaper: https://mapshaper.org/ (simplify geometry)
- geojson.io: http://geojson.io/ (view/edit GeoJSON)

---

## Next Steps (Immediate Actions)

1. **Test current quick fix** - Refresh browser and verify map fits properly
2. **Research GeoJSON sources** - Find suitable SA boundary file
3. **Download Proj4js** - Add library to project
4. **Create test branch** - Implement geographic map on separate branch
5. **Review datasets** - Analyze Australian Road Deaths Database structure

---

**Status:** Phase 1 Complete ✅ | Ready for Phase 2 Implementation  
**Updated:** November 8, 2025  
**Maintainer:** Jacob Jayen Pillai (Student ID: 105986053)

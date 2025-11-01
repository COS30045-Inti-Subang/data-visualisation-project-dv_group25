# AI Coding Agent Instructions

## Project Overview

Academic D3.js data visualization project for **COS30045** (Swinburne University) focusing on Australian road safety enforcement data from BITRE. Deliverables include:

- Interactive website with **≥2 charts + 1 map visualization** (all D3.js/SVG)
- Mandatory features: filtering, animation, tooltips, keyboard navigation
- Accessibility compliance (ARIA labels, semantic HTML)
- Deployment to Swinburne Mercury server

**Data source**: BITRE road safety enforcement statistics (2008-2024) - processed via KNIME workflows.

**Current Status** (as of Oct 31, 2025 - Week 10):
- ✅ HTML structure with semantic elements and BEM CSS completed
- ✅ 5 CSV datasets loaded into `data/` directory
- ✅ Architecture documentation in `js/script.js` (JSDoc typedefs)
- ⚠️ **NO CHARTS IMPLEMENTED YET** - `src/` directory does not exist
- 🎯 **Stand-up 1 due tomorrow** (Nov 1) - need basic chart implementation

## Architecture Pattern

### Reusable D3 Chart Contract (`js/script.js`)

All visualizations follow a **factory pattern** returning renderer functions:

```javascript
// Chart factory signature (documented in script.js):
const chartFactory = (options: ChartOptions) => 
  (selection: Selection, data: any[]) => void & { update: (data: any[]) => void }

// Expected usage:
const chart = barChart({ xKey: 'year', yKey: 'count' });
svg.call(chart, initialData);  // Initial render
chart.update(newData);          // Reactive update
```

**Key principles** (enforced in code reviews):

1. **Data-driven**: No hard-coded values; all encodings derive from `data` + `options`
2. **SVG-only**: No Canvas/WebGL (per assignment requirements)
3. **Accessibility-first**: Every chart MUST include `<title>`, `<desc>`, and ARIA attributes
4. **Reactive updates**: Use `selection.join()` for efficient DOM updates

### Observable State Management

UI state (filters, selections) uses **observable pattern** (not implemented yet):

- Store utilities to be created in `./src/state/store.js`
- Controls (`#control-year`, `#control-state`) drive chart updates via subscriptions
- See `js/script.js` Observable typedef for expected API

**Implementation example** (customize as needed):
```javascript
// src/state/store.js
/**
 * Creates a simple observable store for reactive state management
 * @template T
 * @param {T} initialValue - Initial state value
 * @returns {Observable<T>}
 */
export const createStore = (initialValue) => {
  let value = initialValue;
  const subscribers = new Set();
  
  return {
    get: () => value,
    set: (newValue) => { 
      value = newValue; 
      subscribers.forEach(fn => fn(value)); 
    },
    subscribe: (fn) => { 
      subscribers.add(fn);
      fn(value); // Emit current value immediately
      return () => subscribers.delete(fn); // Unsubscribe function
    }
  };
};

// Usage in src/app.js:
// const yearStore = createStore(2024);
// const stateStore = createStore('All');
// 
// yearStore.subscribe(year => {
//   const filteredData = data.filter(d => d.year === year);
//   chart.update(filteredData);
// });
```

### Project Structure (Actual State - Week 10)

```
index.html          ✅ Semantic HTML5 with BEM classes, ARIA landmarks, empty <select> controls
css/style.css       ✅ CSS custom properties for dark theme (--color-bg, --primary-color, etc.)
js/script.js        ✅ JSDoc architecture documentation ONLY (no implementation code)
data/               ✅ 5 CSV files from BITRE (see detailed schemas below)
  ├─ police_enforcement_2024_fines (12) (1).csv           (12,181 rows)
  ├─ police_enforcement_2024_positive_breath_tests (5).csv (1,328 rows)
  ├─ police_enforcement_2024_positive_drug_tests (8).csv
  ├─ Mobile_Distraction_-_Fixed_and_Transportable_camera_locations.csv (112 rows)
  └─ nra.csv                                               (4,951 rows)
src/                ❌ DOES NOT EXIST - must be created
  app.js            ❌ NOT IMPLEMENTED - entry point needed
  state/store.js    ❌ NOT IMPLEMENTED - observable pattern needed
  charts/           ❌ NO CHARTS YET
    barChart.js     
    lineChart.js    
    mapChart.js     
```

**Critical Discovery**: `index.html` loads `js/script.js` as a module, but that file contains ONLY documentation. The `import 'js/script.js';` statement at the bottom will fail when creating actual implementations. You must:

1. Change import to `import './src/app.js';` once app.js exists
2. Keep `js/script.js` as reference documentation only
3. All working code goes in `src/` directory

**Immediate Next Steps (Stand-up 1 deadline tomorrow)**:

1. Create `src/` directory structure
2. Implement `src/app.js` with D3 CSV loading (CDN import pattern)
3. Build ONE basic chart (recommend: line chart - breath tests 2008-2024)
4. Wire chart to `#overview-root` div in HTML

## Suggested Visualizations (Based on Available Data)

### Chart 1: Time Series Line Chart

**Dataset**: `police_enforcement_2024_positive_breath_tests (5).csv`

- **X-axis**: YEAR (2008-2024)
- **Y-axis**: COUNT (positive breath tests)
- **Color encoding**: JURISDICTION (state lines)
- **Interactivity**: Hover tooltips, state filter dropdown, animated transitions
- **Story**: "How have drink driving rates changed across states over 16 years?"

### Chart 2: Stacked/Grouped Bar Chart

**Dataset**: `police_enforcement_2024_fines (12) (1).csv`

- **X-axis**: AGE_GROUP (0-16, 17-25, 26-39, 40-64, 65+)
- **Y-axis**: FINES (count)
- **Color encoding**: METRIC (speed_fines, mobile_phone_use, seatbelts, unlicensed)
- **Interactivity**: Toggle between stacked/grouped, jurisdiction filter, animated bars
- **Story**: "Which age groups receive most fines and for what offenses?"

### Map Visualization: Point/Choropleth Map

**Dataset**: `Mobile_Distraction_-_Fixed_and_Transportable_camera_locations.csv`

- **Projection**: `d3.geoMercator()` centered on ACT ([149.1, -35.3])
- **Marks**: Circle symbols at lat/lon with radius encoding site count
- **Interactivity**: Hover tooltips (Site Name, Suburb, Direction), zoom/pan
- **Optional overlay**: Combine with `nra.csv` rest area locations for context
- **Story**: "Where are mobile distraction cameras deployed across Canberra?"

**Assignment compliance**: 2 charts (line + bar) + 1 map = ✓ 3 visualizations minimum

## Development Workflows

### No Build System

Pure ES6 modules loaded via `<script type="module">` - no webpack/vite/npm.

**D3.js loading strategies**:

1. **Primary (CDN)**: For online development and Mercury deployment
```javascript
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';
```

2. **Fallback (Offline)**: Download D3 and vendor it locally
```powershell
# PowerShell: Download once for offline work
Invoke-WebRequest -Uri "https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js" -OutFile "js/d3.v7.min.js"
```
Then use local import:
```javascript
import * as d3 from './js/d3.v7.min.js';
```

3. **Mercury deployment**: Upload entire project via FTP to `mercury.swin.edu.au/~<student_id>/cos30045/`
   - Ensure file permissions are set correctly (644 for files, 755 for directories)
   - Test in browser: `https://mercury.swin.edu.au/~<student_id>/cos30045/index.html`
   - CDN imports work fine on Mercury (has internet access)

Use D3 v7+ modern APIs throughout (see D3 Version section below).

### Data Processing & Available Datasets

**CRITICAL: All CSV columns import as STRINGS by default in D3.** You MUST convert numeric fields using the type coercion pattern shown below.

**Current datasets in `data/` directory:**

1. **`police_enforcement_2024_fines (12) (1).csv`** (12,181 rows)

   - **Schema**: `YEAR, START_DATE, END_DATE, JURISDICTION, LOCATION, AGE_GROUP, METRIC, DETECTION_METHOD, FINES, ARRESTS, CHARGES`
   - **Numeric fields**: YEAR, FINES, ARRESTS, CHARGES (require `+d.FIELD` conversion)
   - Granular 2024 monthly data by state/region/age group
   - **AGE_GROUP values**: Check actual file for categories (likely: `0-16`, `17-25`, `26-39`, `40-64`, `65+`)
   - **METRIC values**: `speed_fines`, `mobile_phone_use`, `non_wearing_seatbelts`, `unlicensed_driving`
   - **Use case**: Bar chart showing fines by age group, grouped by metric type

2. **`police_enforcement_2024_positive_breath_tests (5).csv`** (1,328 rows)

   - **Schema**: `YEAR, START_DATE, END_DATE, JURISDICTION, LOCATION, AGE_GROUP, METRIC, DETECTION_METHOD, COUNT, FINES, ARRESTS, CHARGES`
   - **Numeric fields**: YEAR, COUNT, FINES, ARRESTS, CHARGES
   - **Actual data structure** (verified from file):
     - Time range: 2008-2024 (17 years of historical data)
     - Aggregated annually by jurisdiction (8 jurisdictions × 17 years = 136 base rows + variants)
     - LOCATION: "All regions" (no geographic breakdown in this file)
     - AGE_GROUP: "All ages" (no age breakdown in this file - use fines dataset for that)
     - COUNT column: actual positive test counts (e.g., 1887 for ACT in 2008)
   - **Use case**: **RECOMMENDED FOR FIRST CHART** - line chart showing trends over time by state
   - **D3 loading example**:
     ```javascript
     const data = await d3.csv('data/police_enforcement_2024_positive_breath_tests (5).csv', d => ({
       year: +d.YEAR,                    // Convert to number
       jurisdiction: d.JURISDICTION,     // Keep as string
       count: +d.COUNT,                  // Convert to number
       location: d.LOCATION,
       ageGroup: d.AGE_GROUP
     }));
     ```

3. **`police_enforcement_2024_positive_drug_tests (8).csv`**

   - Similar structure to breath tests dataset
   - Use for multi-metric comparisons or secondary analysis

4. **`Mobile_Distraction_-_Fixed_and_Transportable_camera_locations.csv`** (112 rows)

   - **Schema**: `Site Name, Suburb, Latitude, Longitude, Direction of travel, Site Type, Location Code`
   - **Numeric fields**: Latitude, Longitude (require `+d.Latitude` conversion)
   - Geographic coordinates for **map visualization** (ACT camera locations)
   - **Use case**: Point map with `d3.geoMercator()` projection
   - **ACT-specific projection** (all data is Canberra region):
     ```javascript
     const projection = d3.geoMercator()
       .center([149.13, -35.28])  // Canberra city center
       .scale(80000)               // Zoom level for ACT region
       .translate([width / 2, height / 2]);
     ```

5. **`nra.csv`** (4,951 rows - National Rest Areas)

   - **Schema**: Includes `state, latitude, longitude, name, road_name, locality`
   - **Numeric fields**: latitude, longitude
   - National dataset (not just ACT)
   - Alternative geographic dataset for choropleth or point maps (optional - large dataset)

**Filename handling quirk**:
- Files have spaces and parentheses: `police_enforcement_2024_fines (12) (1).csv`
- Use exact paths in D3: `d3.csv('data/police_enforcement_2024_fines (12) (1).csv', ...)`
- Do NOT rename files - breaks traceability to KNIME workflows

**KNIME Workflow Pattern:**

1. Download CSV from BITRE website
2. Clean/transform in **KNIME** (column selection, filtering old records, handling missing values, aggregations)
3. Export processed CSV to `data/` directory with descriptive names
4. Import in `src/app.js` using `await d3.csv('data/filename.csv')` with type coercion:
   ```javascript
   const data = await d3.csv('data/police_enforcement_2024_fines (12) (1).csv', d => ({
     year: +d.YEAR,
     jurisdiction: d.JURISDICTION,
     ageGroup: d.AGE_GROUP,
     metric: d.METRIC,
     fines: +d.FINES,
     arrests: +d.ARRESTS
   }));
   ```

**KNIME Node Patterns** (expected workflow structure):
```
CSV Reader → Column Filter → Row Filter → Missing Value → Aggregation → CSV Writer
```

**Common KNIME operations**:
- **Column Filter**: Select relevant columns (YEAR, JURISDICTION, FINES, etc.) - remove unnecessary metadata
- **Row Filter**: 
  - Filter out pre-2020 data: `YEAR >= 2020`
  - Remove "All regions" aggregates if doing state-specific analysis
  - Filter by jurisdiction: `JURISDICTION = "NSW"` for testing
- **Missing Value**: Handle empty cells (replace with 0 or remove row)
- **GroupBy/Aggregation**: Sum fines by month, aggregate by age group
- **String Manipulation**: Clean jurisdiction names, standardize metric names

**Filename handling**:
- Datasets have spaces/parentheses: `police_enforcement_2024_fines (12) (1).csv`
- **Option 1**: Use exact paths in D3 with URL encoding if needed
- **Option 2**: Rename in KNIME CSV Writer node to: `police_enforcement_fines_2024.csv`
- **Recommended**: Keep original names for traceability; handle in code with string literals

**Example transformations**:
- **Monthly aggregation**: GroupBy [YEAR, JURISDICTION, METRIC] → Sum [FINES]
- **Age group totals**: GroupBy [AGE_GROUP, METRIC] → Sum [FINES] (across all states/months)
- **Trend analysis**: Filter to single metric (e.g., "speed_fines") → sort by YEAR

### Testing/Preview

- Open `index.html` directly in browser (file://) or use VS Code Live Server
- Mercury deployment: FTP upload to `mercury.swin.edu.au/~username/cos30045/`

## Project-Specific Conventions

### BEM CSS Naming

Strictly enforced in `style.css` and `index.html`:

```css
.chart-section              /* Block */
.chart-section__title       /* Element */
.chart-container__root      /* Element */
```

### CSS Custom Properties

Theme colors defined in `:root` (`style.css`):

- `--color-bg`, `--color-text`, `--color-muted`
- `--primary-color`, `--accent-color` (for D3 color scales)
- Reference these in D3 code: `getComputedStyle(document.documentElement).getPropertyValue('--primary-color')`

### Accessibility Requirements

**Non-negotiable** (per assignment rubric):

1. Semantic HTML: `<main>`, `<section>`, `<figure>`, `<figcaption>`
2. Every visualization needs:
   - Unique `id` on container
   - `aria-labelledby` pointing to heading
   - `aria-describedby` pointing to description
   - SVG `<title>` and `<desc>` for screen readers
3. Keyboard navigation: All interactive elements (bars, paths, map regions) must be keyboard-accessible
4. Focus indicators: Use `:focus` styles (see `.controls__select` in `style.css`)

**Implementation Examples:**

**Keyboard Navigation** for interactive chart elements:
```javascript
// Make chart elements keyboard-accessible
svg.selectAll('.bar')
  .attr('tabindex', 0)  // Make focusable
  .attr('role', 'button')
  .attr('aria-label', d => `${d.category}: ${d.value} fines`)
  .on('keydown', function(event, d) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      showTooltip(d);  // Same action as click/hover
    }
  });
```

**Screen Reader Announcements** for dynamic updates:
```javascript
// Announce data changes to screen readers
function announceUpdate(message) {
  const announcement = d3.select('#sr-announcement');
  if (announcement.empty()) {
    d3.select('body')
      .append('div')
      .attr('id', 'sr-announcement')
      .attr('role', 'status')
      .attr('aria-live', 'polite')
      .attr('aria-atomic', 'true')
      .classed('visually-hidden', true);
  }
  d3.select('#sr-announcement').text(message);
}

// Usage after data update:
chart.update(newData);
announceUpdate(`Chart updated: Showing ${newData.length} data points for ${selectedYear}`);
```

**Focus Management** for chart interactions:
```javascript
// Trap focus within modal tooltips
function showDetailModal(data) {
  const modal = d3.select('#detail-modal');
  modal.style('display', 'block');
  
  // Focus first interactive element
  modal.select('button').node().focus();
  
  // Trap focus within modal
  modal.on('keydown', function(event) {
    if (event.key === 'Escape') {
      closeModal();
      // Return focus to triggering element
      d3.select(`[data-id="${data.id}"]`).node().focus();
    }
  });
}
```

**SVG Accessibility Pattern**:
```javascript
// Every chart SVG must include title and description
const svg = d3.select(container)
  .append('svg')
  .attr('role', 'img')
  .attr('aria-labelledby', 'chart-title chart-desc')
  .attr('width', width)
  .attr('height', height);

svg.append('title')
  .attr('id', 'chart-title')
  .text('Road Safety Fines by Age Group');

svg.append('desc')
  .attr('id', 'chart-desc')
  .text('Bar chart showing distribution of traffic fines across age groups. Use tab to navigate bars, enter to view details.');
```

### D3 Version & Import Pattern

Targeting **D3 v7+** loaded from CDN - use modern APIs:

- **Import**: `import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';`
- `selection.join()` instead of enter/update/exit pattern
- `d3.csv()` returns Promises (use async/await with type coercion)
- Color schemes via `d3-scale-chromatic` (e.g., `d3.schemeTableau10`)
- Map projections: `d3.geoMercator()` for Australian coordinates

## Critical Constraints

### What NOT to Do

- **Never use Canvas or WebGL** (assignment requires SVG)
- **Don't install npm packages** (no package.json; pure browser modules)
- **Avoid inline styles** in HTML (use CSS variables)
- **No hardcoded data** in JS (must load from `data/` directory)
- **Don't skip ARIA attributes** (automatic grade deduction)

### Assignment-Specific Rules

- Minimum **3 visualizations**: 2 charts + 1 map (currently 0 implemented)
- **All** visualizations must have filtering OR animation OR tooltips
- Charts must use **real BITRE data** (not placeholder/mock data)
- Code must be submitted to **GitHub Classroom** (team repository)
- Individual students work solo if removed from team (different rubric)

## Key Files to Reference

### `js/script.js` (Architecture Guide)

**IMPORTANT**: This file is DOCUMENTATION ONLY - contains NO executable code.

Read this file FIRST - contains:

- JSDoc typedefs for all patterns (`ChartOptions`, `ChartFactory`, `Observable`)
- Reusable chart contract explanation with example usage
- TODOs outlining implementation roadmap
- Performance best practices (minimize DOM churn, use transitions)

**Do NOT add implementation code to this file** - it serves as the contract/specification that `src/` modules must follow.

### `index.html` (Semantic Structure)

**Accessibility model** - every section follows this pattern:

```html
<section id="viz-overview" class="chart-section" aria-labelledby="viz-overview-title">
  <h2 id="viz-overview-title" class="chart-section__title">Overview</h2>
  <figure class="chart-container" role="group" 
          aria-labelledby="overview-figure-title" 
          aria-describedby="overview-figure-desc">
    <figcaption id="overview-figure-title" class="chart-container__caption">
      Enforcement Trends
    </figcaption>
    <p id="overview-figure-desc" class="visually-hidden">
      Interactive chart showing trends over time. Use keyboard to navigate.
    </p>
    <div id="overview-root" class="chart-container__root" data-chart="overview"></div>
  </figure>
</section>
```

**Key discoveries**:
- Chart containers have unique IDs: `#overview-root`, `#map-root`
- Empty `<select>` controls: `#control-year`, `#control-state` (need population from data)
- Comments explain structural decisions: "Document structure: Use semantic regions..."
- Data attributes for targeting: `data-chart="overview"`, `data-chart="map"`
- All ARIA labels pre-configured - just need to populate with actual visualizations

**Module loading pattern** (bottom of file):
```html
<script type="module">
  // Currently imports js/script.js (documentation only)
  // MUST CHANGE TO: import './src/app.js'; when implementing
  import 'js/script.js';
</script>
```

### `css/style.css` (Theming System)

**CSS Custom Properties** (use in D3 color scales):

```css
:root {
  --color-bg: #0f172a;           /* slate-900 - dark background */
  --color-text: #e2e8f0;         /* slate-200 - light text */
  --color-muted: #94a3b8;        /* slate-400 - secondary text */
  --primary-color: #4e79a7;      /* Tableau blue - primary accent */
  --accent-color: #f28e2b;       /* Tableau orange - secondary accent */
  --success-color: #59a14f;      /* Tableau green */
  --danger-color: #e15759;       /* Tableau red */
}
```

**Access from JavaScript**:
```javascript
const primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color').trim();
```

**BEM naming strict enforcement**:
- `.chart-section` (Block)
- `.chart-section__title` (Element)
- `.chart-container__root` (Element)
- `.controls__select` (Element)

**Utility classes**:
- `.visually-hidden` - for screen reader only text (used in `aria-describedby`)

**Chart container sizing**:
- `.chart-container__root { height: 420px; }` - predefined height
- Width is 100% (responsive)
- D3 charts should read container dimensions: `container.node().getBoundingClientRect()`

## Common Pitfalls

1. **Forgetting chart.update() method**: Factory must return object with `update` property for reactivity
2. **Missing margin convention**: D3 charts need `margin` → `width`/`height` → inner dimensions calculation
3. **Hardcoded axis domains**: Use `d3.extent(data, d => d.value)` instead of `[0, 100]`
4. **Breaking BEM naming**: New elements must follow `block__element` pattern
5. **Skipping ESLint-style docs**: All functions need JSDoc with `@param` and `@returns`
6. **CSV type coercion**: Always convert numeric strings in CSV (`+d.FINES`, `+d.YEAR`) - D3 imports as strings by default
7. **Map projection bounds**: Australian coordinates need proper `geoMercator()` centering - use `.center([133, -28])` and `.scale()`
8. **File paths**: Datasets have spaces/parentheses in names - use exact paths or rename in KNIME workflow
9. **Module import confusion**: `js/script.js` is documentation only - actual code goes in `src/app.js` (must update HTML import)
10. **Container dimensions**: Chart containers have fixed height (420px) - read from DOM: `container.node().getBoundingClientRect()`
11. **Empty select controls**: `#control-year` and `#control-state` in HTML need population from data - not pre-filled
12. **Accessibility requirement**: ALL chart SVGs must include `<title>`, `<desc>`, and proper ARIA attributes before submission

## Academic Context

This is a **team assignment** (2-3 students) with peer evaluation. Code will be:

- Presented in **stand-up meetings** (Weeks 10, 11, 12) - must explain your own contributions
- Compared against previous stand-up submissions (academic integrity checks)
- Evaluated on progression/continuity (sudden large changes flagged)

**Critical Timeline** (discovered from assignment details):
- **Stand-up 1**: Nov 1, 2025 (tomorrow!) - requires 6-min video + basic chart implementation
- **Stand-up 2**: Week 11 (next week) - enhanced charts with scales/axes/interactivity
- **Stand-up 3**: Week 12 - full implementation with accessibility
- **Final submission**: Nov 15, 2025 (Week 13) - complete website + design book + KNIME workflow

**Stand-up 1 Requirements** (for tomorrow):
- Powerpoint presentation (5 min max)
- Draft of project design book (introduction, data analysis)
- Link to GitHub classroom repository
- KNIME workflow file (*.knwf with data included)
- 6-minute video presentation (2 min per team member)
- **Must show**: Data collection/analysis, KNIME processing, GitHub team setup

**GenAI usage**: Allowed for structure/planning, but excessive commenting or generic code patterns are penalized. Write code in a personal voice with project-specific examples.

**IMPORTANT**: "Excessive commenting of code, or heavy reliance on comments during stand-ups will be deemed use of GenAI" - avoid reading comments, explain in your own words.

### Code Commenting Style

**Minimal but meaningful** - avoid AI-generated generic comments:

**❌ Bad (generic/excessive)**:
```javascript
// This function creates a bar chart
function createBarChart(data) {
  // Loop through the data
  data.forEach(d => {
    // Create a bar for each data point
    svg.append('rect')
      // Set the x position
      .attr('x', d => xScale(d.category))
      // Set the y position
      .attr('y', d => yScale(d.value));
  });
}
```

**✅ Good (contextual/purposeful)**:
```javascript
/**
 * Bar chart showing fines by age group with keyboard navigation
 * @param {Object} options - Chart configuration
 */
function createBarChart(options) {
  // Filter to 2024 data only - earlier years lack age group breakdown
  const filtered = data.filter(d => d.year >= 2024);
  
  svg.selectAll('.bar')
    .data(filtered)
    .join('rect')
    .attr('class', 'bar')
    .attr('tabindex', 0)  // Keyboard navigation per accessibility rubric
    .attr('x', d => xScale(d.ageGroup))
    .attr('y', d => yScale(d.fines));
}
```

**Guidelines**:
- Use JSDoc for function contracts (parameters, return types)
- Explain **why**, not **what** (code shows what)
- Document data quirks, edge cases, assignment-specific requirements
- Avoid reading comments during stand-ups (demonstrates lack of understanding)

### Progressive Development Pattern

**Implement basic version first, then enhance** to demonstrate continuous progress:

**Week 10 Stand-up** (Basic implementation):
```javascript
// Basic line chart - static data, no interactions
export const lineChart = (options) => {
  return (selection, data) => {
    const svg = selection.append('svg')
      .attr('width', 800)
      .attr('height', 400);
    
    const line = d3.line()
      .x(d => d.year * 50)
      .y(d => 400 - d.count);
    
    svg.append('path')
      .datum(data)
      .attr('d', line)
      .attr('stroke', 'steelblue');
  };
};
```

**Week 11 Stand-up** (Add scales and axes):
```javascript
// Enhanced with proper scales, axes, margins
export const lineChart = (options) => {
  const { width = 800, height = 400, margin = {top: 20, right: 20, bottom: 40, left: 60} } = options;
  
  return (selection, data) => {
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleLinear()
      .domain(d3.extent(data, d => d.year))
      .range([0, innerWidth]);
    
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.count)])
      .range([innerHeight, 0]);
    
    // ... rest of implementation with axes
  };
};
```

**Week 12 Stand-up** (Add interactivity and accessibility):
```javascript
// Full implementation with tooltips, animations, keyboard nav
export const lineChart = (options) => {
  // ... previous code ...
  
  // Add hover tooltips
  const tooltip = selection.append('div')
    .attr('class', 'tooltip')
    .attr('role', 'tooltip')
    .style('opacity', 0);
  
  svg.selectAll('.data-point')
    .data(data)
    .join('circle')
    .attr('class', 'data-point')
    .attr('tabindex', 0)  // NEW: keyboard accessibility
    .on('mouseenter', showTooltip)
    .on('keydown', (event, d) => {
      if (event.key === 'Enter') showTooltip(event, d);
    });
  
  // NEW: Chart update method for filtering
  const update = (newData) => {
    // ... animated transition logic
  };
  
  return Object.assign((selection, data) => { /* render */ }, { update });
};
```

### Solo Developer Workflow (To-Do List Style)

**Since working individually**, maintain a to-do list to demonstrate progression:

**Create `TODO.md` in project root**:
```markdown
# Project To-Do List

## Week 10 (Stand-up 1) - Due Nov 1
- [x] Set up GitHub repository
- [x] Create basic HTML structure with semantic elements
- [x] Import BITRE datasets (5 CSV files)
- [x] Document data schemas in comments
- [ ] Implement basic line chart (breath tests over time)
- [ ] Add CSS styling with BEM convention

## Week 11 (Stand-up 2)
- [ ] Enhance line chart with proper D3 scales
- [ ] Add axes with labels
- [ ] Implement bar chart (fines by age group)
- [ ] Create observable store for filter state
- [ ] Wire up year/state dropdowns

## Week 12 (Stand-up 3)
- [ ] Add map visualization (camera locations)
- [ ] Implement tooltips for all charts
- [ ] Add keyboard navigation (tabindex, event handlers)
- [ ] Create screen reader announcements
- [ ] Add SVG titles and descriptions
- [ ] Test on Mercury server
```

**Update after each work session** - shows incremental progress for academic integrity verification.

**Alternative: Git commit messages** as progress documentation:
```bash
# Good commit messages show progression
git commit -m "feat: Add basic line chart structure (Week 10 milestone)"
git commit -m "fix: Convert YEAR to number - D3 was treating as string"
git commit -m "feat: Implement xScale/yScale with d3.extent for dynamic domains"
git commit -m "docs: Add JSDoc to lineChart factory explaining options"
git commit -m "a11y: Add tabindex and keyboard handlers to data points"
```

**During stand-ups**: Reference specific commits/to-do items to demonstrate understanding:
- "I implemented the line chart using D3's margin convention because..."
- "I had issues with data type coercion, fixed by adding `+d.YEAR` in the CSV parser..."
- "Next week I'm adding the observable pattern for reactive filtering..."

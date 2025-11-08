# Grilli Project - AI Coding Agent Instructions

## Project Overview

This is a **data visualization project** for COS30045 Data Visualisation at Swinburne University, repurposing the Grilli restaurant template's layout and styling for interactive road safety analytics.

**Current Status:** Building interactive visualizations using South Australia crash and casualty data (2020-2024)

### Project Transformation
- **Original**: Grilli restaurant landing page (codewithsadee template)
- **Now**: Road safety data visualization website with D3.js + Observable Plot
- **Approach**: Keep dark + gold aesthetic, replace content with data viz, maintain all animations

## Architecture & Components

### Data Visualization Website (Current Implementation)
- **Tech Stack**: D3.js v7 + Observable Plot v0.6 + vanilla HTML/CSS/JS
- **No build system** - all scripts loaded via CDN, CSV files loaded directly
- **Key files:**
  - `index.html` - Main page with integrated visualizations
  - `assets/css/style.css` - Original 2143-line CSS preserved (dark + gold theme)
  - `assets/js/script.js` - Original interactions (hero slider, navbar, parallax)
  - `assets/js/visualizations.js` - NEW: All D3/Plot chart code
  
### Visualizations Implemented

#### Chart 1: Seasonal Crash Patterns (Multi-series Line Chart)
- **Location**: `#line-chart` section
- **Data**: `data/2020-2024_DATA_SA_Crash(filtered).csv`
- **Question**: "Is there a seasonal pattern to accidents?"
- **Visualization**: 
  - X-Axis: Month (Jan-Dec)
  - Y-Axis: Average casualties per crash
  - Series: 3 lines for "Rear End", "Hit Fixed Object", "Right Angle" crash types
  - Colors: Gold (hsl(38, 61%, 73%)), Silver, Orange-gold (matching site theme)
- **Interactivity**: Hover tooltips showing crash type, month, and avg casualties
- **Implementation**: Observable Plot with D3 data processing

#### Chart 2: Safety Equipment Analysis (Planned)
- **Data**: `data/2020-2024_DATA_SA_Casualty.csv` (to be filtered)
- **Question**: "Does wearing a seatbelt reduce injury severity?"
- **Type**: Grouped or stacked bar chart

#### Chart 3: Geographic Distribution (Planned)
- **Data**: Crash data with ACCLOC_X, ACCLOC_Y coordinates
- **Type**: Interactive map with severity indicators

### Dataset Structure (In Use)

### CSS Architecture
```css
/* Uses CSS custom properties extensively in :root */
--gold-crayola: hsl(38, 61%, 73%);
--fontFamily-forum: 'Forum', cursive;
--fontSize-display-1: calc(1.3rem + 6.7vw); /* Fluid typography */
```
- **Typography:** Forum (headings) + DM Sans (body) from Google Fonts
- **Color scheme:** Dark theme with gold accents (fine dining aesthetic)
- **Responsive:** Fluid calculations with viewport units, no media query breakpoints visible in snippet
- **BEM-like naming:** `.section-title`, `.card-banner`, `.hover-underline`

### JavaScript Patterns
```javascript
// Helper function pattern used throughout
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
```
- **Data attributes for selectors:** `[data-navbar]`, `[data-hero-slider-item]`, `[data-parallax-item]`
- **No framework/library** - pure DOM manipulation
- **Features:** Preloader, mobile navbar toggle, auto-sliding hero, parallax on mousemove, sticky header
- **State management:** Class toggling (`.active`, `.hide`, `.loaded`)

### HTML Structure
- **Semantic sections:** `<header>`, `<main>`, `<article>`, `<section>`, `<footer>`
- **Accessibility attributes:** `aria-label`, `aria-hidden`, `role` attributes present
- **Icon system:** Ionicons v5.5.2 (loaded via CDN, used as `<ion-icon name="...">`)
- **Image optimization:** Preload hints for hero images, `loading="lazy"` throughout

## Data Visualization Requirements

### Project Context (from code_citations/)
- **Assignment:** Team project due Week 13 (45% of grade)
- **Tech stack required:** D3.js for charts, KNIME for data processing, Mercury server hosting
- **Documentation:** Must maintain design process book (PDF) tracking data processing decisions
- **Academic integrity:** Heavy use of GitHub Copilot disclosed in CODE_CITATIONS.md

### Dataset Structure
Key files in `/data`:
- `2020-2024_DATA_SA_Crash.csv` (63,241 rows, 34 columns) - Primary crash data with lat/long
- `2020-2024_DATA_SA_Casualty.csv` (23,894 rows) - Victim demographics and injury data
- Geographic columns: `ACCLOC_X`, `ACCLOC_Y`, `LGA Name`, `Suburb`, `Postcode`
- Time columns: `Year`, `Month`, `Day`, `Time`, `DayNight`
- Severity: `Total Fats`, `Total SI`, `Total MI`, `Total Cas`
- Factors: `Crash Type`, `Weather Cond`, `DUI Involved`, `Area Speed`

### Expected Visualizations
1. **Time series line chart** - Crash trends 2020-2024
2. **Bar/stacked chart** - Crash types, severity, demographics
3. **Map visualization** - Geographic distribution in South Australia
4. **Interactivity:** Filtering, tooltips, zoom, animations (required by rubric)

## Development Workflow

### Restaurant Site Changes
- **No build step:** Edit files directly, refresh browser
- **CSS changes:** Modify custom properties in `:root` for theme adjustments
- **JS changes:** Test across all interactive features (slider, navbar, parallax)
- **Images:** Store in `assets/images/`, use relative paths

### Data Viz Development
- **Data processing:** KNIME workflows (`.knwf` files) - NOT Python/Pandas
- **D3.js integration:** Will need to add D3 CDN to HTML, create separate viz sections
- **Hosting:** Mercury server (Swinburne infrastructure) - special deploy requirements likely exist
- **Version control:** GitHub Classroom team setup required

### Testing Checklist
- [ ] Mobile navbar toggle works
- [ ] Hero slider auto-advances every 7 seconds
- [ ] Parallax effect on mouse move (desktop)
- [ ] Header hides on scroll down, shows on scroll up
- [ ] All section anchor links navigate correctly
- [ ] Preloader animation completes

## Common Gotchas

1. **Dual project nature:** Don't assume this is purely a restaurant site or purely a data viz project
2. **No module system:** All JS is global scope - watch for naming conflicts when adding D3
3. **Data attribute selectors:** Always use `[data-*]` attributes, not classes, for JS hooks
4. **Academic context:** Changes to visualization code may need documentation in process book
5. **Ionicons version:** Locked to 5.5.2 - check compatibility before upgrading
6. **CSS specificity:** Heavy use of utility classes - new styles may need `!important` or higher specificity

## Integration Points

### Adding D3 Visualizations
```html
<!-- Add to <head> after existing scripts -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- Create new section in <main> -->
<section class="section visualization" aria-label="data visualization">
  <div class="container">
    <div id="chart-container"></div>
  </div>
</section>
```

### Linking Data Files
```javascript
// Data files served from /data directory
d3.csv("./data/2020-2024_DATA_SA_Crash.csv").then(data => {
  // Process and visualize
});
```

## External Dependencies

- **Google Fonts:** DM Sans (400, 700), Forum - preconnected
- **Ionicons:** v5.5.2 (ESM and fallback) - icon system
- **D3.js:** v7 (to be added) - data visualization library
- **No build tools:** No npm, webpack, or bundler in current setup

## File Structure Context
```
grilli/
├── index.html                    # Main restaurant landing page
├── assets/
│   ├── css/style.css            # 2143 lines, CSS variables-based
│   ├── js/script.js             # Vanilla JS interactions
│   └── images/                  # Restaurant photos, icons, shapes
├── data/                        # Road safety CSV datasets (23K-63K rows)
├── code_citations/              # Academic documentation & rubrics
│   ├── CODE_CITATIONS.md        # GitHub Copilot usage disclosure
│   ├── Assignment_details.md    # Project requirements
│   └── ROAD_SAFETY_DATASET_GUIDE.md  # Data dictionary
├── style-guide.md              # CSS variables reference
└── README.md                   # Original template README + improvement TODOs
```

## When Making Changes

1. **Restaurant template edits:** Maintain luxury aesthetic (dark + gold), ensure mobile responsiveness
2. **Adding D3 visualizations:** Create new sections, don't disrupt existing restaurant layout
3. **Data processing:** Use KNIME, not Python - export processed CSV for D3 consumption
4. **Academic work:** Document design decisions for process book submission
5. **Git commits:** Both restaurant work and academic project share same repo - use clear commit messages

## Questions to Ask User

Before implementing data visualizations:
- Which road safety story are you telling? (time trends, geographic patterns, demographic analysis)
- Should visualizations be separate pages or integrated into restaurant site?
- Are KNIME workflows already created, or starting from raw CSV?
- Mercury server deployment process and credentials?

# South Australia Road Safety Data Visualization

# South Australia Road Safety Data Visualization

**Evidence-Based Safety Analysis Through Interactive Data Visualization**

**Evidence-Based Safety Analysis Through Interactive Data Visualization**

An interactive data visualization website analyzing South Australia road crash and casualty data (2020-2024). Built on the Grilli restaurant template, repurposed for COS30045 Data Visualisation project at Swinburne University of Technology.

An interactive data visualization website analyzing South Australia road crash and casualty data (2020-2024). Built on the Grilli restaurant template, repurposed for COS30045 Data Visualisation project.

**[View Local Demo](http://127.0.0.1:5500/index.html)**

**[View Local Demo](http://127.0.0.1:5500/index.html)**

---

---

## Table of Contents

## Table of Contents

- [Project Overview](#project-overview)
- [Implementation Status](#implementation-status)- [Project Overview](#project-overview)
- [Technical Architecture](#technical-architecture)- [Implementation Status](#implementation-status)
- [Development Documentation](#development-documentation)- [Technical Architecture](#technical-architecture)
- [Dataset Information](#dataset-information)- [Development Documentation](#development-documentation)
- [Getting Started](#getting-started)- [Dataset Information](#dataset-information)
- [Project Structure](#project-structure)- [Getting Started](#getting-started)
- [Academic Requirements](#academic-requirements)- [Project Structure](#project-structure)
- [Contact](#contact)- [Contact](#contact)

---

## Project Overview## Project Overview

![Desktop Demo](./assets/images/Gemini_Generated_Image_7y2ex97y2ex97y2e.png "Desktop Demo")![Desktop Demo](./assets/images/Gemini_Generated_Image_wnee0ywnee0ywnee.png "Desktop Demo")
Gemini Created Images

This project transformed the original Grilli restaurant template from codewithsadee into an interactive data visualization platform for analyzing road safety data from Australia. However, the project maintains the original dark and gold aesthetic while replacing all content with data-driven insights and interactive charts to visualize the data effectively and efficiently with tooltips, on-hover animations, easy-to-view layouts, and more. Other than that, this project transforms the original Grilli restaurant template into an interactive data visualization platform for analyzing road safety data from Australia. The project maintains the original dark and gold aesthetic while replacing all content with data-driven insights and interactive charts.

### Academic Context### Prerequisites

- **Course:** COS30045 Data Visualisation### Academic Context
- **Institution:** Swinburne University of Technology
- **Dataset:** Australia Road Crash and Casualty Data (2020-2024)- **Course:** COS30045 Data Visualisation
- **Data Source:** [data.sa.gov.au](https://data.sa.gov.au)- **Institution:** Swinburne University of Technology
- **Records Analyzed:** 63,241+ crash records, 23,894+ casualty records- **Dataset:** Australia Road Crash and Casualty Data (2020-2024)
- **Data Source:** [data.sa.gov.au](https://data.sa.gov.au)

### Tech Stack- **Records Analyzed:** 63,241+ crash records, 23,894+ casualty records

- **Frontend:** HTML5, CSS3, Vanilla JavaScript### Tech Stack
- **Visualization:** D3.js v7 + Observable Plot v0.6
- **Data Processing:** KNIME workflows- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Development:** Live Server Extension (VS Code)- **Visualization:** D3.js v7 + Observable Plot v0.6
- **Design System:** CSS Custom Properties (dark theme + gold accents)- **Data Processing:** KNIME workflows
- **Version Control:** Git & GitHub- **Development:** Live Server Extension (VS Code)
- **Design System:** CSS Custom Properties (dark theme + gold accents)

---- **Version Control:** Git & GitHub

## Implementation Status---

### Chart 1: Seasonal Crash Patterns (Line Chart) - COMPLETE## Implementation Status

**Location:** `#line-chart` section  ### Completed Features

**Data Source:** `data/2020-2024_DATA_SA_Crash(filtered).csv` (15,471 rows)

**Research Question:** *"Is there a seasonal pattern to accidents?"*## Recommended Improvements

**Visualization Details:**#### 1. Chart 1: Seasonal Crash Patterns (Multi-series Line Chart)

- **X-Axis:** Months (January - December)
- **Y-Axis:** Average casualties per crash### 1. Performance Optimizations
- **Series:** 3 crash types compared (Rear End, Hit Fixed Object, Right Angle)
- **Colors:** Gold (primary theme), Silver, Orange-gold**Location:** `#line-chart` section in `index.html`

**Interactive Features:**- [ ] Implement responsive images using `srcset` and `sizes` attributes

- Year range filter (2020-2024 dropdowns)
- Crash type toggle checkboxes**Data Source:** `data/2020-2024_DATA_SA_Crash(filtered).csv` (15,471 rows)- [ ] Add image compression and WebP format support
- Reset filters button
- Enhanced tooltips with dark background and gold border- [ ] Implement critical CSS loading
- Real-time chart updates
- Validation to prevent empty chart state**Research Question:** *"Is there a seasonal pattern to accidents?"*- [ ] Set up CDN for assets

**Technical Implementation:**- [ ] Implement proper caching strategies

- D3.js `d3.rollup()` for data aggregation
- Observable Plot for rendering**Visualization Details:**- [ ] Optimize JavaScript bundle size
- Event-driven filter system
- Responsive design matching site theme- **X-Axis:** Months (January - December)- [ ] Add service worker for offline support
- **Y-Axis:** Average casualties per crash- [ ] Implement progressive web app (PWA) features

---- **Series:** 3 crash types compared

### Chart 2: Safety Equipment Analysis (Bar Chart) - COMPLETE  - Rear End (Gold: `hsl(38, 61%, 73%)`)### 2. SEO Improvements

- Hit Fixed Object (Silver: `hsl(0, 0%, 65%)`)

**Location:** `#bar-chart` section    - Right Angle (Orange-gold: `hsl(30, 61%, 60%)`)- [ ] Add comprehensive meta tags including Open Graph tags

**Data Source:** `data/2020-2024_DATA_SA_Casualty.csv` (23,894 rows)

**Research Question:** *"Does wearing a seatbelt reduce injury severity?"*- [ ] Implement structured data (Schema.org) for restaurant information

**Visualization Details:****Interactive Features:**- [ ] Add alt text to all images

- **X-Axis:** Injury severity types (Fatal, Admitted to Hospital, Treated at Hospital, By Private)
- **Y-Axis:** Number of casualties- ✅ **Year Range Filter:** Dropdown selectors for start year (2020-2024) and end year- [ ] Create sitemap.xml
- **Comparison:** Side-by-side bars for "Fitted & Worn" vs "Not Fitted/Not Worn"- ✅ **Crash Type Toggles:** Checkboxes to show/hide each crash type independently- [ ] Add robots.txt file
- **Colors:** Green (safe) vs Red (dangerous)- ✅ **Reset Filters Button:** One-click reset to default view (all years, all types)- [ ] Implement canonical URLs
- ✅ **Enhanced Tooltips:** Custom-styled tooltips with dark background and gold border- [ ] Add meta descriptions for all pages

**Interactive Features:**- ✅ **Real-time Updates:** Chart dynamically updates based on filter selections- [ ] Implement breadcrumb navigation

- Hover tooltips showing detailed counts- ✅ **Validation:** Prevents empty chart state (requires at least one crash type selected)
- Statistical summary panel with:

  - Total casualties by seatbelt status### 3. Accessibility Enhancements
  - Fatal rates comparison
  - Risk multiplier calculation**Key Insights:** Identifies seasonal patterns in different crash types, revealing whether specific collision types spike during certain months due to weather conditions, holiday travel, or other seasonal factors.
- Grouped bar visualization for easy comparison

- [ ] Add ARIA labels to interactive elements

**Key Insights:**

- Displays significantly higher fatality rates when seatbelts not worn**Code Implementation:**- [ ] Ensure proper heading hierarchy
- Calculates risk increase multiplier (e.g., 3.5x higher fatal rate)
- Clear visual evidence of seatbelt effectiveness- Data processing using D3.js `d3.rollup()` for aggregation- [ ] Add skip navigation for screen readers
- Observable Plot for rendering with custom styling- [ ] Improve color contrast ratios

**Technical Implementation:**- Event-driven filter system with validation- [ ] Add keyboard navigation support

- D3.js data filtering and categorization- Responsive design matching site theme- [ ] Implement focus management
- Observable Plot grouped bar chart
- Custom color scheme for safety messaging- [ ] Add screen reader announcements
- Statistical calculations displayed dynamically

---- [ ] Ensure proper form labels and descriptions

---

#### 2. Content Transformation### 4. User Experience

### Chart 3: Geographic Distribution (Map) - COMPLETE

**HTML Structure:**- [ ] Add form validation for the reservation form

**Location:** `#map` section

**Data Source:** Crash data with `ACCLOC_X`, `ACCLOC_Y` coordinates (2,000 crashes displayed)  - [X] Updated page title and meta tags for SEO (`Road Safety Data Visualization`)- [ ] Implement loading states for form submission

**Research Question:** *"Where do most crashes occur in South Australia?"*- [X] Replaced hero slider content with 3 data visualization slides- [ ] Add success/error messages for form submissions

**Visualization Details:**  - "Crashes Occurred in the Wild"- [ ] Add cookie consent banner

- **Technology:** Pure D3.js SVG rendering with zoom behavior  - "Understanding Seasonal Patterns"- [ ] Implement mobile-friendly navigation menu
- **Map Type:** Scatter plot with coordinate system (GDA94 / MGA zone 54)  - "Every Data Point Tells a Story"- [ ] Add search functionality
- **Markers:** Circle markers sized by casualty count (3-15px radius)- [X] Updated navigation menu structure:- [ ] Implement infinite scroll for menu items
- **Color Coding by Severity:**

  - Red: Fatal crashes (1+ fatalities)  - Home → Seasonal Trends → Safety Analysis → Geographic View → About- [ ] Add user preferences storage
  - Orange: Serious injury crashes (1+ serious injuries)- [X] Modified top bar information:
  - Gold: Minor injury crashes (theme color)
  - Silver: Property damage only  - Location: Swinburne University, Melbourne, Australia### 5. Modern Features
  - Time period: Dataset 2020-2024

**Interactive Features:**  - Data source link to data.sa.gov.au- [ ] Add dark mode toggle

- **Zoom & Pan:** `d3.zoom()` with 1x-10x scale range  - Contact: student@swin.edu.au- [ ] Implement smooth scrolling
- **Click Tooltips:** Display crash details including:- [ ] Add animations for better user engagement

  - Crash type
  - Location (suburb/area)**Technical Updates:**- [ ] Add virtual tour feature
  - Total casualties, fatalities, injuries
  - Weather conditions- [X] Added D3.js v7 via CDN (`https://cdn.jsdelivr.net/npm/d3@7`)- [ ] Implement menu filter/search functionality
  - DUI involvement- [X] Added Observable Plot v0.6 via CDN (`https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6`)- [ ] Add online ordering system
- **Background Grid:** Coordinate reference system at 10% opacity- [X] Created `assets/js/visualizations.js` (dedicated visualization code)- [ ] Implement table reservation system
- **Legend:** 4 severity categories with color indicators- [X] Fixed preload image warnings by updating paths to actual hero slider images- [ ] Add customer loyalty program
- **Usage Instructions:** On-screen guide for interaction- [X] Maintained all original animations:

**Technical Implementation:**  - Hero slider auto-advance (7-second intervals)### 6. Technical Improvements

- D3.js SVG creation and manipulation  - Navbar mobile toggle
- Linear scales for x/y coordinate mapping  - Parallax effects on mouse move- [ ] Consider migrating to Next.js or React
- Square root scale for marker sizing  - Header show/hide on scroll- [ ] Implement proper error handling
- Zoom behavior with transform handling  - Preloader animation- [ ] Add comprehensive documentation
- Event listeners for click interactions- [ ] Set up proper build and deployment pipeline
- Data limited to 2,000 crashes for performance
- Filter for valid coordinates (non-zero ACCLOC_X/Y)**Design Consistency:**- [ ] Implement proper testing suite

**Performance Optimizations:**- [X] Preserved dark + gold aesthetic throughout- [ ] Add code quality tools (ESLint, Prettier)

- Limited to 2,000 markers (from 15,471 available)- [X] Maintained responsive design for all devices- [ ] Implement CI/CD pipeline
- Efficient SVG rendering- [X] Kept original CSS structure (2,143 lines, CSS variables)- [ ] Add automated testing
- Smooth zoom transitions- [X] All interactive elements functional with new content

---### 7. Content and Design

### Content Transformation - COMPLETE---

**HTML Structure Updates:**- [ ] Add more interactive elements

- Updated page title and meta tags (`Road Safety Data Visualization`)
- Replaced hero slider content with 3 data visualization slides### 🚧 In Progress- [ ] Implement photo gallery
- Updated navigation: Home → Seasonal Trends → Safety Analysis → Geographic View → About
- Modified top bar information (Swinburne University, Dataset 2020-2024, data.sa.gov.au)- [ ] Add customer reviews section
- Replaced restaurant sections with data-focused content:

  - Data Methodology section (replaced Reservation form)#### Chart 2: Safety Equipment Effectiveness (Bar Chart)- [ ] Implement blog section
  - Analysis Capabilities section (replaced Features)
  - Key Safety Insights section (replaced About section)- **Section ID:** `#bar-chart`- [ ] Add social media integration
  - Key Findings cards (replaced Event section)- **Data Source:** `data/2020-2024_DATA_SA_Casualty.csv` (23,894 rows, to be filtered)- [ ] Implement newsletter subscription
- Updated footer with university/project information and data source links- **Research Question:** *"Does wearing a seatbelt reduce injury severity?"*- [ ] Add chef profiles section
- Updated testimonial section with data insights quote- **Planned Features:**- [ ] Implement menu categories

**Sections Removed:**  - Grouped/stacked bar chart comparing seatbelt usage vs injury extent

- Special Dish section  - Categories: Fatal, Admitted to Hospital, Treated at Hospital, By Private### 8. Security
- Menu section  - Demographic breakdown options (age groups, gender)
- Reservation form section  - Casualty type analysis (Driver, Passenger, Pedestrian, Rider)- [ ] Implement proper form validation
- Features section (restaurant amenities)  - Interactive filtering by casualty type- [ ] Add CSRF protection
- Event section (restaurant events)

- [ ] Implement proper input sanitization

**Technical Updates:**

- Added D3.js v7 via CDN (`https://cdn.jsdelivr.net/npm/d3@7`)#### Chart 3: Geographic Crash Distribution (Map)- [ ] Add security headers
- Added Observable Plot v0.6 via CDN
- Created `assets/js/visualizations.js` (792 lines)- **Section ID:** `#map`- [ ] Implement rate limiting
- Fixed preload image warnings- **Data Source:** Crash data with `ACCLOC_X`, `ACCLOC_Y` coordinates- [ ] Add SSL certificate
- Maintained all original animations (hero slider, navbar, parallax, header scroll)- **Research Question:** *"Where do most crashes occur in South Australia?"*- [ ] Implement proper authentication
- **Planned Features:**- [ ] Add security monitoring

**Design Consistency:**

- Preserved dark + gold aesthetic throughout  - Interactive map with zoom/pan functionality
- Maintained responsive design for all devices  - Color-coded markers by severity:### 9. Analytics and Monitoring
- Kept original CSS structure (2,143 lines)
- All interactive elements functional with new content    - Red: Fatalities

  - Orange: Serious injuries- [ ] Add Google Analytics

---    - Yellow: Minor injuries- [ ] Implement error tracking

- Click markers to show crash details- [ ] Add performance monitoring

## Technical Architecture  - Cluster markers for dense areas- [ ] Set up user behavior tracking

- Filter by crash type, time period, severity- [ ] Implement A/B testing capability

### File Structure

- [ ] Add heatmap tracking

```

grilli/---- [ ] Implement conversion tracking

├── index.html                          # Main page with all visualizations

├── assets/- [ ] Add custom event tracking

│   ├── css/

│   │   └── style.css                   # Original 2143-line CSS (preserved)## 📁 Project Structure

│   ├── js/

│   │   ├── script.js                   # Original interactions### 10. Mobile Optimization

│   │   └── visualizations.js           # All D3/Plot chart code (792 lines)

│   └── images/                         # Hero slider images, shapes, icons```

├── data/

│   ├── 2020-2024_DATA_SA_Crash(filtered).csv       # 15,471 rowsgrilli/- [ ] Ensure all interactive elements are touch-friendly

│   ├── 2020-2024_DATA_SA_Crash.csv                 # 63,241 rows (original)

│   └── 2020-2024_DATA_SA_Casualty.csv              # 23,894 rows├── index.html                          # Main page with all visualizations- [ ] Optimize images for mobile devices

├── code_citations/

│   ├── CODE_CITATIONS.md               # GitHub Copilot usage disclosure├── assets/- [ ] Implement proper viewport settings

│   ├── Assignment_details.md           # Project requirements

│   └── ROAD_SAFETY_DATASET_GUIDE.md    # Data dictionary│   ├── css/- [ ] Add mobile-specific features

├── .github/

│   └── copilot-instructions.md         # AI agent development guidelines│   │   └── style.css                   # Original 2143-line CSS (preserved)- [ ] Optimize loading times for mobile

└── README.md                           # Project documentation

```│   ├── js/- [ ] Implement mobile-first design



### Libraries & Dependencies│   │   ├── script.js                   # Original interactions (hero slider, navbar, parallax)- [ ] Add mobile app-like features



**Visualization Libraries:**│   │   └── visualizations.js           # NEW: D3/Plot chart code (Chart 1 complete)- [ ] Optimize touch targets

- D3.js v7 - Core data manipulation and Chart 3 (map) rendering

- Observable Plot v0.6 - Charts 1 & 2 rendering│   └── images/                         # Hero slider images, shapes, icons



**Original Template Dependencies:**├── data/## Implementation Priority

- Google Fonts: DM Sans (400, 700), Forum

- Ionicons v5.5.2 - Icon system│   ├── 2020-2024_DATA_SA_Crash(filtered).csv       # 15,471 rows (KNIME filtered)

- No build tools - pure CDN loading

│   ├── 2020-2024_DATA_SA_Crash.csv                 # 63,241 rows (original)1. High Priority (Immediate)

### Design System

│   ├── 2020-2024_DATA_SA_Casualty.csv              # 23,894 rows (to be filtered)

**Color Palette:**

```css│   └── [other datasets]   - Performance optimizations

--gold-crayola: hsl(38, 61%, 73%);      /* Primary accent */

--quick-silver: hsl(0, 0%, 65%);        /* Secondary text */├── code_citations/   - SEO improvements

--smoky-black-1: hsl(40, 12%, 5%);      /* Primary background */

--eerie-black-1: hsl(210, 4%, 9%);      /* Chart backgrounds */│   ├── CODE_CITATIONS.md               # GitHub Copilot usage disclosure   - Accessibility enhancements

--white: hsl(0, 0%, 100%);              /* Primary text */

```│   ├── Assignment_details.md           # Project requirements & rubrics   - Basic security measures



**Typography:**│   └── ROAD_SAFETY_DATASET_GUIDE.md    # Data dictionary2. Medium Priority (Next Phase)

- Headings: Forum (elegant serif)

- Body: DM Sans (clean sans-serif)├── .github/

- Fluid typography using `calc()` with viewport units

│   └── copilot-instructions.md         # AI agent development guidelines   - User experience improvements

---

├── style-guide.md                      # CSS variables reference   - Modern features

## Development Documentation

└── README.md                           # This file   - Content and design updates

### Errors Encountered & Solutions

```   - Mobile optimization

#### Error 1: Preload Image Warning

**Problem:** Console warnings for preload links pointing to non-existent hero images  3. Long-term Goals

**Location:** `index.html` lines 43-45  

**Error Message:** "Failed to load resource: net::ERR_FILE_NOT_FOUND"  ---

**Solution:** Updated preload `<link>` tags to point to actual hero slider images:

```html   - Technical improvements

<link rel="preload" as="image" href="./assets/images/hero-slider-1.jpg">

<link rel="preload" as="image" href="./assets/images/hero-slider-2.jpg">## 🚀 Getting Started   - Advanced features

<link rel="preload" as="image" href="./assets/images/hero-slider-3.jpg">

```   - Analytics implementation

**Status:** RESOLVED

### Prerequisites   - Comprehensive testing

---



#### Error 2: Empty Chart State in Line Chart

**Problem:** Chart would become empty if all crash types were unchecked  Before you begin, ensure you have met the following requirements:### Contact

**Location:** `visualizations.js` updateLineChart() function  

**Impact:** Poor user experience, confusing blank chart  

**Solution:** Implemented validation to require at least one crash type selected:

```javascript* **Git** - [Download Git](https://git-scm.com/downloads)If you want to contact with me you can reach me at [Twitter](https://www.twitter.com/codewithsadee).

const hasAtLeastOneType = crashTypes.some(type => 

  document.getElementById(`crash-type-${type.replace(/\s+/g, '-')}`).checked* **VS Code** - [Download VS Code](https://code.visualstudio.com/)

);

if (!hasAtLeastOneType) {* **Live Server Extension** - Install from VS Code Extensions marketplace### License

  alert("Please select at least one crash type to display.");

  return;

}

```### Run Locally[MIT](https://choosealicense.com/licenses/mit/)

**Status:** RESOLVED



---

1. **Clone the repository:**References

#### Error 3: Bar Chart Initial Design Confusion

**Problem:** Original grouped bar chart grouped by seatbelt status, making injury severity comparison difficult  

**Location:** `visualizations.js` renderBarChart() function  

**User Feedback:** "Can you make it stand by each other with fitted and not fitted base on the type?"  ```bashhttps://i.abcnewsfe.com/a/0af2a2f0-3e59-408a-b777-20b4fe81c121/texas-crash-01-ht-jt-231108_1699476775880_hpMain_16x9.jpg?w=992

**Solution:** Restructured chart to group by injury severity with side-by-side bars for fitted vs not fitted:

- Changed x-axis from seatbelt status to injury severitygit clone https://github.com/codewithsadee/grilli.git

- Implemented side-by-side comparison for each injury type

- Updated color scheme: Green (safe) vs Red (dangerous)cd grillihttps://assets.nst.com.my/images/articles/060625nstcrash01_1749175662.jpg

- Filtered to show only "Worn" vs "Not Worn" for clearer comparison

**Status:** RESOLVED```



---https://t4.ftcdn.net/jpg/01/77/70/23/360_F_177702320_r7v3wfRlbJNL56JBZvB2UkKpGO55xO0f.jpg



#### Error 4: Map Placement User Experience2. **Open in VS Code:**

**Problem:** Initial plan to place map at bottom of page would require annoying scrolling  

**User Feedback:** "Don't put it at the bottom which is annoying to scroll down and see the map"  https://www.roadandtrack.com/news/a65315930/porsche-911-gt3-rs-bmw-m2-collide-in-fiery-crash-nurburgring-nordschleife/

**Solution:** Positioned map section between Bar Chart and Key Insights sections:

- Added `#map` section after `#bar-chart` (line ~412 in index.html)```bash

- Prominent placement in middle of page for easy access

- Updated navigation menu to include map linkcode .https://hips.hearstapps.com/hmg-prod/images/gt3-rs-686be24e5443a.jpg?crop=1.00xw:0.768xh;0,0.0376xh&resize=640:*

**Status:** RESOLVED

```

---

Porsche accident video address:

#### Error 5: Map Technology Decision

**Problem:** Choice between Leaflet.js (easier) vs D3.js (more control)  3. **Start Live Server:**

**Decision Process:**

- Leaflet.js: Simpler implementation, built-in map tiles   - Right-click on `index.html`https://packaged-media.redd.it/fyx871fyfbbf1/pb/m2-res_1272p.mp4?m=DASHPlaylist.mpd&v=1&e=1762527600&s=c217157bcc718056374ac152ee52071e6856202a
- D3.js: Full control, matches existing stack, custom styling   - Select "Open with Live Server"

**User Decision:** "We'll go with D3.js geo (more control, matches existing stack)"     - Or click "Go Live" button in VS Code status bar

**Implementation:** Pure D3.js SVG approach with:4. **View in Browser:**

- Custom zoom/pan behavior
- Click-based tooltips   - Navigate to `http://127.0.0.1:5500/index.html`
- Color-coded severity markers   - Chart 1 will load automatically
- Coordinate system visualization

**Status:** IMPLEMENTED### Development Workflow

---1. **Data Processing:**

#### Error 6: Map Performance with Large Dataset   - Use KNIME to filter/transform CSV files

**Problem:** 15,471 crash records could cause performance issues in browser     - Export processed data to `/data` folder

**Location:** `visualizations.js` createMap() function     - Update file paths in `visualizations.js`

**Solution:** Limited to 2,000 crashes for optimal performance:2. **Adding New Visualizations:**

```javascript

const mapData = validData.slice(0, 2000).map(d => ({ ... }));   - Add chart function to `assets/js/visualizations.js`

```   - Create HTML section in `index.html` with unique ID

**Future Enhancement:** Implement marker clustering or progressive loading     - Call chart function in window load event

**Status:** RESOLVED   - Test with Live Server

3. **Testing:**

---

   - Check browser console for data loading logs

### Development Workflow   - Test all interactive filters

   - Verify responsive design on mobile

**Data Processing:**   - Ensure animations work correctly

1. Use KNIME to filter/transform CSV files

2. Export processed data to `/data` folder---

3. Update file paths in `visualizations.js`

## 🎨 Design System

**Adding Visualizations:**

1. Add chart function to `assets/js/visualizations.js`### Color Palette (CSS Variables)

2. Create HTML section in `index.html` with unique ID

3. Call chart function in window load event```css

4. Test with Live Server--gold-crayola: hsl(38, 61%, 73%);      /* Primary accent, used for filters, tooltips */

--quick-silver: hsla(0, 0%, 65%, 1);    /* Secondary lines, text */

**Testing Checklist:**--smoky-black-1: hsla(40, 12%, 5%, 1);  /* Primary background */

- Check browser console for data loading logs--eerie-black-1: hsla(210, 4%, 9%, 1);  /* Chart backgrounds */

- Test all interactive filters--white: hsla(0, 0%, 100%, 1);          /* Primary text */

- Verify responsive design on mobile```

- Ensure animations work correctly

- Validate tooltip interactions### Typography

- Check zoom/pan functionality (map)

- **Headings:** Forum (Google Fonts) - Elegant serif for titles

---- **Body:** DM Sans (Google Fonts) - Clean sans-serif for readability

- **Fluid Typography:** Using `calc()` with viewport units for responsiveness

## Dataset Information

### Interactive Elements

### Primary Datasets

- **Hover Effects:** Gold accent on hover, smooth transitions

**1. Crash Data** (`2020-2024_DATA_SA_Crash(filtered).csv`)- **Focus States:** Gold outline for keyboard navigation

- **Rows:** 15,471 (filtered in KNIME from 63,241 original)- **Tooltips:** Dark background with gold border, 2px stroke

- **Key Columns:**- **Buttons:** Gold background with hover lift effect

  - Temporal: `Year`, `Month`, `Day`, `Time`, `DayNight`

  - Classification: `Crash Type` (Rear End, Hit Fixed Object, Right Angle, etc.)---

  - Severity: `Total Fats`, `Total SI`, `Total MI`, `Total Cas`

  - Geographic: `ACCLOC_X`, `ACCLOC_Y`, `LGA Name`, `Suburb`, `Postcode`## 📊 Dataset Information

  - Conditions: `Weather Cond`, `Road Surface`, `Area Speed`

  - Factors: `DUI Involved`, `Drugs Involved`### Primary Datasets



**2. Casualty Data** (`2020-2024_DATA_SA_Casualty.csv`)1. **Crash Data** (`2020-2024_DATA_SA_Crash(filtered).csv`)

- **Rows:** 23,894

- **Key Columns:**   - **Rows:** 15,471 (filtered in KNIME)

  - Link: `REPORT_ID` (connects to crash data)   - **Key Columns:**

  - Demographics: `Casualty Type`, `Sex`, `AGE`     - `Year`, `Month`, `Day`, `Time`, `DayNight`

  - Injury: `Injury Extent` (Fatal, Admitted to Hospital, Treated at Hospital, By Private)     - `Crash Type` (Rear End, Hit Fixed Object, Right Angle, etc.)

  - Safety: `Seat Belt`, `Helmet`, `Position In Veh`     - `Total Fats`, `Total SI`, `Total MI`, `Total Cas`

     - `ACCLOC_X`, `ACCLOC_Y` (coordinates for mapping)

**Data Processing:**     - `LGA Name`, `Suburb`, `Postcode`

- **Tool:** KNIME Analytics Platform     - `Weather Cond`, `Road Surface`, `Area Speed`

- **Workflow:** Filtering, cleaning, column selection     - `DUI Involved`, `Drugs Involved`

- **Output Format:** CSV files for D3.js consumption2. **Casualty Data** (`2020-2024_DATA_SA_Casualty.csv`)

- **Coordinate System:** GDA94 / MGA zone 54 (South Australian standard)

   - **Rows:** 23,894

---   - **Key Columns:**

     - `REPORT_ID` (links to crash data)

## Getting Started     - `Casualty Type` (Driver, Passenger, Pedestrian, Rider)

     - `Sex`, `AGE`

### Prerequisites     - `Injury Extent` (Fatal, Admitted to Hospital, etc.)

     - `Seat Belt`, `Helmet`

- **Git** - [Download Git](https://git-scm.com/downloads)     - `Position In Veh`

- **VS Code** - [Download VS Code](https://code.visualstudio.com/)

- **Live Server Extension** - Install from VS Code Extensions marketplace### Data Processing



### Run Locally- **Tool:** KNIME Analytics Platform

- **Workflow:** Filtering, cleaning, column selection

1. **Clone the repository:**- **Output Format:** CSV files for D3.js consumption

```bash- **Documentation:** All processing steps documented in process book

git clone https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25.git

cd data-visualisation-project-dv_group25---

```

## 🎯 Learning Objectives Met

2. **Open in VS Code:**

```bash###

code .

```- [X] Multi-series line chart implementation

- [X] Interactive filtering and data transformation

3. **Start Live Server:**- [X] Custom tooltip design and styling

   - Right-click on `index.html`- [X] Real-time chart updates based on user input

   - Select "Open with Live Server"- [X] Color theory application (thematic consistency)

   - Or click "Go Live" button in VS Code status bar

### Technical Skills

4. **View in Browser:**

   - Navigate to `http://127.0.0.1:5500/index.html`- [X] D3.js data loading and processing (`d3.csv`, `d3.rollup`)

   - All charts will load automatically- [X] Observable Plot chart configuration

- [X] Event-driven programming in vanilla JavaScript

---- [X] DOM manipulation and dynamic content generation

- [X] Responsive design integration

## Academic Requirements

### Design Skills

### Assignment Deliverables Status

- [X] Maintaining design system consistency

- [x] **Website hosted on local development server** - Live Server implemented- [X] UI/UX for filter controls

- [x] **Minimum 2 charts + 1 map visualization** - All 3 complete- [X] Accessibility considerations (ARIA labels, semantic HTML)

- [x] **Interactive features** - Filtering, tooltips, zoom/pan implemented- [X] Visual hierarchy and layout

- [x] **GitHub repository with version control** - Active repository

- [x] **GitHub Copilot usage disclosed** - Documented in `CODE_CITATIONS.md`---

- [ ] **Design process book (PDF)** - In progress

- [ ] **KNIME workflow file (.knwf)** - To be finalized## 📝 Assignment Requirements



### Learning Objectives Achieved### Deliverables



**Data Visualization Skills:**- [X] Website hosted on local development server (Live Server)

- Multi-series line chart implementation- [ ] Minimum 2 charts + 1 map visualization (1/3 complete)

- Grouped bar chart with statistical analysis- [X] Interactive features (filtering, tooltips)

- Interactive geographic map with zoom/pan- [ ] Design process book (PDF) documenting decisions

- Custom tooltip design and styling- [ ] KNIME workflow file (.knwf) with team name

- Color theory application for data communication- [X] GitHub repository with version control



**Technical Skills:**### Academic Integrity

- D3.js data loading and processing (`d3.csv`, `d3.rollup`, `d3.zoom`)

- Observable Plot chart configuration- [X] GitHub Copilot usage fully disclosed in `CODE_CITATIONS.md`

- Event-driven programming in vanilla JavaScript- [X] All external libraries properly attributed

- DOM manipulation and dynamic content generation- [X] Original implementation decisions documented

- Responsive design integration- [X] Progress tracked through incremental commits



**Design Skills:**---

- Maintaining design system consistency

- UI/UX for filter controls## 🔄 Version History

- Accessibility considerations (ARIA labels, semantic HTML)

- Visual hierarchy and layout### Current Version: v0.3.0 (Chart 1 Complete)

- Professional color schemes for data communication

**Added:**

---

- Multi-series line chart with seasonal crash patterns

## Future Enhancements- Interactive year range filter (2020-2024)

- Crash type toggle checkboxes

### Potential Improvements- Reset filters button

- Enhanced tooltips with custom styling

**Chart Enhancements:**- Real-time chart updates

- Add marker clustering for map overlapping crashes

- Implement brush & link (selecting in one chart filters others)**Changed:**

- Add export functionality (PNG, SVG, CSV) for all charts

- Loading animations during data fetch- Page title and meta tags to data visualization theme

- Smooth transitions on data updates- Hero slider content (3 slides)

- Navigation menu structure

**Data Analysis:**- Top bar information

- Time-of-day analysis (morning rush, evening rush patterns)- Preload image paths (fixed console warnings)

- Weather correlation analysis

- Age group demographic breakdown**Technical:**

- DUI involvement patterns by time/location

- Added D3.js v7 and Observable Plot v0.6

**Technical:**- Created `visualizations.js` for chart code

- Implement progressive loading for large datasets- Implemented event-driven filter system

- Add data caching for improved performance- Maintained all original animations

- Cross-browser testing and optimization

- Mobile responsiveness improvements### Previous Versions



---**v0.2.0** - Project setup and data preparation



## Contact- Added datasets to `/data` folder

- Created KNIME workflows for filtering

**Project Maintainer:** Jacob Jayen Pillai (Student ID: 105986053)  - Set up project structure

**Course Instructor:** COS30045 Teaching Staff  

**Institution:** Swinburne University of Technology**v0.1.0** - Initial template fork



For questions or feedback:- Forked original Grilli restaurant template

- Email: student@swin.edu.au- Created GitHub repository

- GitHub Repository: [dv_group25](https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25)- Established development environment



------



## License## 🚀 Next Steps



This project is licensed under the MIT License - see original template for details.### Immediate Priorities



**Academic Use:** This is an educational project for COS30045 Data Visualisation unit.1. **Complete Chart 2** - Safety Equipment Bar Chart



---   - Filter casualty data in KNIME

   - Implement grouped bar chart

## Resources & References   - Add demographic filtering

2. **Complete Chart 3** - Geographic Map

### Documentation

- [D3.js Documentation](https://d3js.org/)   - Choose mapping library (Leaflet.js or D3 geo)

- [Observable Plot Documentation](https://observablehq.com/plot/)   - Implement coordinate plotting

- [South Australia Data Portal](https://data.sa.gov.au)   - Add marker clustering

3. **Polish & Refine**

### Original Template

- **Template:** Grilli Restaurant Website   - Replace remaining restaurant sections with insights

- **Author:** codewithsadee   - Add data summary statistics

- **Source:** [GitHub Repository](https://github.com/codewithsadee/grilli)   - Implement brush & link between charts (advanced)

- **License:** MIT

### Future Enhancements

### Image References

The hero slider images used in this project are sourced from news articles and stock photography related to road safety and traffic accidents, used for educational purposes only.- [ ] Add export functionality (PNG, SVG, CSV)

- [ ] Implement data table view

---- [ ] Add comparison mode (year-over-year)

- [ ] Create insights section with key findings

<div align="center">- [ ] Add loading animations for data fetching

- [ ] Implement dark mode toggle (currently always dark)

**Built with D3.js, Observable Plot, and the Grilli template**

---

*Analyzing road safety data to make South Australia's roads safer*

## 📚 Resources & References

</div>

### Documentation

- [D3.js Documentation](https://d3js.org/)
- [Observable Plot Documentation](https://observablehq.com/plot/)
- [South Australia Data Portal](https://data.sa.gov.au)

### Original Template

- **Template:** Grilli Restaurant Website
- **Author:** codewithsadee
- **Source:** [GitHub Repository](https://github.com/codewithsadee/grilli)
- **License:** MIT

### Image References

https://i.abcnewsfe.com/a/0af2a2f0-3e59-408a-b777-20b4fe81c121/texas-crash-01-ht-jt-231108_1699476775880_hpMain_16x9.jpg?w=992

https://assets.nst.com.my/images/articles/060625nstcrash01_1749175662.jpg

https://t4.ftcdn.net/jpg/01/77/70/23/360_F_177702320_r7v3wfRlbJNL56JBZvB2UkKpGO55xO0f.jpg

https://www.roadandtrack.com/news/a65315930/porsche-911-gt3-rs-bmw-m2-collide-in-fiery-crash-nurburgring-nordschleife/

https://hips.hearstapps.com/hmg-prod/images/gt3-rs-686be24e5443a.jpg?crop=1.00xw:0.768xh;0,0.0376xh&resize=640:*

Porsche accident video address:

https://packaged-media.redd.it/fyx871fyfbbf1/pb/m2-res_1272p.mp4?m=DASHPlaylist.mpd&v=1&e=1762527600&s=c217157bcc718056374ac152ee52071e6856202a

---

## 👥 Contact

**Project Maintainer:** Jacob Jayen Pillai (Student ID: 105986053)

**Course Instructor:** COS30045 Teaching Staff

**Institution:** Swinburne University of Technology

For questions or feedback:

- Email: student@swin.edu.au
- GitHub: [Repository Issues](https://github.com/codewithsadee/grilli/issues)

---

## 📄 License

This project is licensed under the MIT License - see original template for details.

**Academic Use:** This is an educational project for COS30045 Data Visualisation unit.

---

<div align="center">

  **Built with 💛 using D3.js, Observable Plot, and the Grilli template**

  *Analyzing road safety data to make South Australia's roads safer*

</div>
=======
* Powerpoint file of report (no template provided) - ppt file
* Draft of Project Design Book (progress report) - pdf file
* Link to team GitHub classroom (Team) - On comment section during submission


=======
* Powerpoint file of report (no template provided) - ppt file
* Draft of Project Design Book (progress report) - pdf file
* Link to team GitHub classroom (Team) - On comment section during submission

  https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25

* URL Link to your 6 minutes video  - On comment section during submission
* KNIME file (*.knwf)

  * file name includes team name
  * data is included in your saved workflow (CSV writer node prepare this)

>>>>>>> 28649a89f02779ff6db9ee099e393425942e059b
>>>>>>>
>>>>>>
>>>>>
>>>>
>>>
>>
```

# Further Considerations


Marker clustering performance - With 19,473 crash records, consider adding Leaflet.markercluster plugin (CDN: unpkg.com/leaflet.markercluster@1.5.3) to prevent rendering slowdown? Current code limits to 2,000 markers.

Multiple basemap options - Should we add layer control with Street/Dark/Satellite tile options like the alcohol-drug-map.js reference implementation? Or keep single OpenStreetMap layer for simplicity?

Filter controls - Add year range sliders, crash type checkboxes, or severity toggles to dynamically filter visible markers? Could reuse similar UI pattern from Chart 1's filter controls.

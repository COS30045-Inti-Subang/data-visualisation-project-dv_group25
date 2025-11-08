<div align="center"><div align="center">

  ![GitHub repo size](https://img.shields.io/github/repo-size/codewithsadee/grilli)  ![GitHub repo size](https://img.shields.io/github/repo-size/codewithsadee/grilli)

  ![GitHub stars](https://img.shields.io/github/stars/codewithsadee/grilli?style=social)  ![GitHub stars](https://img.shields.io/github/stars/codewithsadee/grilli?style=social)

  ![GitHub forks](https://img.shields.io/github/forks/codewithsadee/grilli?style=social)  ![GitHub forks](https://img.shields.io/github/forks/codewithsadee/grilli?style=social)

  [![Twitter Follow](https://img.shields.io/twitter/follow/codewithsadee_?style=social)](https://twitter.com/intent/follow?screen_name=codewithsadee_)[![Twitter Follow](https://img.shields.io/twitter/follow/codewithsadee_?style=social)](https://twitter.com/intent/follow?screen_name=codewithsadee_)

  [![YouTube Video Views](https://img.shields.io/youtube/views/CjVGp5kGHxA?style=social)](https://youtu.be/CjVGp5kGHxA)  [![YouTube Video Views](https://img.shields.io/youtube/views/CjVGp5kGHxA?style=social)](https://youtu.be/CjVGp5kGHxA)

  `<br /><br />`

  `<br />`  `<br />`

<h2 align="center">Road Safety Data Visualization</h2><h2 align="center">Grilli - Restaurant Website</h2>

  Interactive data visualization website analyzing South Australia road crash and casualty data (2020-2024). `<br />`  Grilli is a fully responsive restaurant website, `<br />`Responsive for all devices, build using HTML, CSS, and JavaScript.

  Built on the Grilli restaurant template, repurposed for COS30045 Data Visualisation project at Swinburne University.

  `<a href="https://codewithsadee.github.io/grilli/"><strong>`➥ Live Demo `</strong></a>`

  `<a href="http://127.0.0.1:5500/index.html"><strong>`➥ Local Demo`</strong></a>`

</div>

</div>

<br />

<br />

### Demo Screeshots

## 📊 Project Overview

![Grilli Desktop Demo](./readme-images/desktop.png "Desktop Demo")

This project transforms the original Grilli restaurant template into an interactive data visualization platform for analyzing road safety data from South Australia. The project maintains the original dark and gold aesthetic while replacing all content with data-driven insights and interactive charts.

### Prerequisites

**Academic Context:**

- **Course:** COS30045 Data VisualisationBefore you begin, ensure you have met the following requirements:
- **Institution:** Swinburne University of Technology
- **Dataset:** South Australia Road Crash and Casualty Data (2020-2024)* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.
- **Data Source:** [data.sa.gov.au](https://data.sa.gov.au)
- **Records Analyzed:** 63,241+ crash records### Run Locally

### 🛠️ Tech StackTo run **Grilli** locally, run this command on your git bash:

- **Frontend:** HTML5, CSS3, Vanilla JavaScriptLinux and macOS:
- **Visualization:** D3.js v7 + Observable Plot v0.6
- **Data Processing:** KNIME workflows```bash
- **Development:** Live Server Extension (VS Code)sudo git clone https://github.com/codewithsadee/grilli.git
- **Design System:** CSS Custom Properties (dark theme + gold accents)```
- **Version Control:** Git & GitHub

Windows:

---

```bash

## ✅ Current Implementation Statusgit clone https://github.com/codewithsadee/grilli.git

```

### Completed Features

## Recommended Improvements

#### 1. Chart 1: Seasonal Crash Patterns (Multi-series Line Chart)

### 1. Performance Optimizations

**Location:** `#line-chart` section in `index.html`

- [ ] Implement responsive images using `srcset` and `sizes` attributes

**Data Source:** `data/2020-2024_DATA_SA_Crash(filtered).csv` (15,471 rows)- [ ] Add image compression and WebP format support

- [ ] Implement critical CSS loading

**Research Question:** *"Is there a seasonal pattern to accidents?"*- [ ] Set up CDN for assets

- [ ] Implement proper caching strategies

**Visualization Details:**- [ ] Optimize JavaScript bundle size

- **X-Axis:** Months (January - December)- [ ] Add service worker for offline support
- **Y-Axis:** Average casualties per crash- [ ] Implement progressive web app (PWA) features
- **Series:** 3 crash types compared

  - Rear End (Gold: `hsl(38, 61%, 73%)`)### 2. SEO Improvements
  - Hit Fixed Object (Silver: `hsl(0, 0%, 65%)`)
  - Right Angle (Orange-gold: `hsl(30, 61%, 60%)`)- [ ] Add comprehensive meta tags including Open Graph tags

- [ ] Implement structured data (Schema.org) for restaurant information

**Interactive Features:**- [ ] Add alt text to all images

- ✅ **Year Range Filter:** Dropdown selectors for start year (2020-2024) and end year- [ ] Create sitemap.xml
- ✅ **Crash Type Toggles:** Checkboxes to show/hide each crash type independently- [ ] Add robots.txt file
- ✅ **Reset Filters Button:** One-click reset to default view (all years, all types)- [ ] Implement canonical URLs
- ✅ **Enhanced Tooltips:** Custom-styled tooltips with dark background and gold border- [ ] Add meta descriptions for all pages
- ✅ **Real-time Updates:** Chart dynamically updates based on filter selections- [ ] Implement breadcrumb navigation
- ✅ **Validation:** Prevents empty chart state (requires at least one crash type selected)

### 3. Accessibility Enhancements

**Key Insights:** Identifies seasonal patterns in different crash types, revealing whether specific collision types spike during certain months due to weather conditions, holiday travel, or other seasonal factors.

- [ ] Add ARIA labels to interactive elements

**Code Implementation:**- [ ] Ensure proper heading hierarchy

- Data processing using D3.js `d3.rollup()` for aggregation- [ ] Add skip navigation for screen readers
- Observable Plot for rendering with custom styling- [ ] Improve color contrast ratios
- Event-driven filter system with validation- [ ] Add keyboard navigation support
- Responsive design matching site theme- [ ] Implement focus management

- [ ] Add screen reader announcements

---- [ ] Ensure proper form labels and descriptions

#### 2. Content Transformation### 4. User Experience

**HTML Structure:**- [ ] Add form validation for the reservation form

- [X] Updated page title and meta tags for SEO (`Road Safety Data Visualization`)- [ ] Implement loading states for form submission
- [X] Replaced hero slider content with 3 data visualization slides- [ ] Add success/error messages for form submissions

  - "Crashes Occurred in the Wild"- [ ] Add cookie consent banner
  - "Understanding Seasonal Patterns"- [ ] Implement mobile-friendly navigation menu
  - "Every Data Point Tells a Story"- [ ] Add search functionality
- [X] Updated navigation menu structure:- [ ] Implement infinite scroll for menu items

  - Home → Seasonal Trends → Safety Analysis → Geographic View → About- [ ] Add user preferences storage
- [X] Modified top bar information:

  - Location: Swinburne University, Melbourne, Australia### 5. Modern Features
  - Time period: Dataset 2020-2024
  - Data source link to data.sa.gov.au- [ ] Add dark mode toggle
  - Contact: student@swin.edu.au- [ ] Implement smooth scrolling
- [ ] Add animations for better user engagement

**Technical Updates:**- [ ] Add virtual tour feature

- [X] Added D3.js v7 via CDN (`https://cdn.jsdelivr.net/npm/d3@7`)- [ ] Implement menu filter/search functionality
- [X] Added Observable Plot v0.6 via CDN (`https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6`)- [ ] Add online ordering system
- [X] Created `assets/js/visualizations.js` (dedicated visualization code)- [ ] Implement table reservation system
- [X] Fixed preload image warnings by updating paths to actual hero slider images- [ ] Add customer loyalty program
- [X] Maintained all original animations:

  - Hero slider auto-advance (7-second intervals)### 6. Technical Improvements
  - Navbar mobile toggle
  - Parallax effects on mouse move- [ ] Consider migrating to Next.js or React
  - Header show/hide on scroll- [ ] Implement proper error handling
  - Preloader animation- [ ] Add comprehensive documentation
- [ ] Set up proper build and deployment pipeline

**Design Consistency:**- [ ] Implement proper testing suite

- [X] Preserved dark + gold aesthetic throughout- [ ] Add code quality tools (ESLint, Prettier)
- [X] Maintained responsive design for all devices- [ ] Implement CI/CD pipeline
- [X] Kept original CSS structure (2,143 lines, CSS variables)- [ ] Add automated testing
- [X] All interactive elements functional with new content

### 7. Content and Design

---

- [ ] Add more interactive elements

### 🚧 In Progress- [ ] Implement photo gallery

- [ ] Add customer reviews section

#### Chart 2: Safety Equipment Effectiveness (Bar Chart)- [ ] Implement blog section

- **Section ID:** `#bar-chart`- [ ] Add social media integration
- **Data Source:** `data/2020-2024_DATA_SA_Casualty.csv` (23,894 rows, to be filtered)- [ ] Implement newsletter subscription
- **Research Question:** *"Does wearing a seatbelt reduce injury severity?"*- [ ] Add chef profiles section
- **Planned Features:**- [ ] Implement menu categories

  - Grouped/stacked bar chart comparing seatbelt usage vs injury extent
  - Categories: Fatal, Admitted to Hospital, Treated at Hospital, By Private### 8. Security
  - Demographic breakdown options (age groups, gender)
  - Casualty type analysis (Driver, Passenger, Pedestrian, Rider)- [ ] Implement proper form validation
  - Interactive filtering by casualty type- [ ] Add CSRF protection

- [ ] Implement proper input sanitization

#### Chart 3: Geographic Crash Distribution (Map)- [ ] Add security headers

- **Section ID:** `#map`- [ ] Implement rate limiting
- **Data Source:** Crash data with `ACCLOC_X`, `ACCLOC_Y` coordinates- [ ] Add SSL certificate
- **Research Question:** *"Where do most crashes occur in South Australia?"*- [ ] Implement proper authentication
- **Planned Features:**- [ ] Add security monitoring

  - Interactive map with zoom/pan functionality
  - Color-coded markers by severity:### 9. Analytics and Monitoring

    - Red: Fatalities
    - Orange: Serious injuries- [ ] Add Google Analytics
    - Yellow: Minor injuries- [ ] Implement error tracking
  - Click markers to show crash details- [ ] Add performance monitoring
  - Cluster markers for dense areas- [ ] Set up user behavior tracking
  - Filter by crash type, time period, severity- [ ] Implement A/B testing capability

- [ ] Add heatmap tracking

---- [ ] Implement conversion tracking

- [ ] Add custom event tracking

## 📁 Project Structure

### 10. Mobile Optimization

```

grilli/- [ ] Ensure all interactive elements are touch-friendly

├── index.html                          # Main page with all visualizations- [ ] Optimize images for mobile devices

├── assets/- [ ] Implement proper viewport settings

│   ├── css/- [ ] Add mobile-specific features

│   │   └── style.css                   # Original 2143-line CSS (preserved)- [ ] Optimize loading times for mobile

│   ├── js/- [ ] Implement mobile-first design

│   │   ├── script.js                   # Original interactions (hero slider, navbar, parallax)- [ ] Add mobile app-like features

│   │   └── visualizations.js           # NEW: D3/Plot chart code (Chart 1 complete)- [ ] Optimize touch targets

│   └── images/                         # Hero slider images, shapes, icons

├── data/## Implementation Priority

│   ├── 2020-2024_DATA_SA_Crash(filtered).csv       # 15,471 rows (KNIME filtered)

│   ├── 2020-2024_DATA_SA_Crash.csv                 # 63,241 rows (original)1. High Priority (Immediate)

│   ├── 2020-2024_DATA_SA_Casualty.csv              # 23,894 rows (to be filtered)

│   └── [other datasets]   - Performance optimizations

├── code_citations/   - SEO improvements

│   ├── CODE_CITATIONS.md               # GitHub Copilot usage disclosure   - Accessibility enhancements

│   ├── Assignment_details.md           # Project requirements & rubrics   - Basic security measures

│   └── ROAD_SAFETY_DATASET_GUIDE.md    # Data dictionary2. Medium Priority (Next Phase)

├── .github/

│   └── copilot-instructions.md         # AI agent development guidelines   - User experience improvements

├── style-guide.md                      # CSS variables reference   - Modern features

└── README.md                           # This file   - Content and design updates

```   - Mobile optimization

3. Long-term Goals

---

   - Technical improvements

## 🚀 Getting Started   - Advanced features

   - Analytics implementation

### Prerequisites   - Comprehensive testing



Before you begin, ensure you have met the following requirements:### Contact



* **Git** - [Download Git](https://git-scm.com/downloads)If you want to contact with me you can reach me at [Twitter](https://www.twitter.com/codewithsadee).

* **VS Code** - [Download VS Code](https://code.visualstudio.com/)

* **Live Server Extension** - Install from VS Code Extensions marketplace### License



### Run Locally[MIT](https://choosealicense.com/licenses/mit/)



1. **Clone the repository:**References



```bashhttps://i.abcnewsfe.com/a/0af2a2f0-3e59-408a-b777-20b4fe81c121/texas-crash-01-ht-jt-231108_1699476775880_hpMain_16x9.jpg?w=992

git clone https://github.com/codewithsadee/grilli.git

cd grillihttps://assets.nst.com.my/images/articles/060625nstcrash01_1749175662.jpg

```

https://t4.ftcdn.net/jpg/01/77/70/23/360_F_177702320_r7v3wfRlbJNL56JBZvB2UkKpGO55xO0f.jpg

2. **Open in VS Code:**

https://www.roadandtrack.com/news/a65315930/porsche-911-gt3-rs-bmw-m2-collide-in-fiery-crash-nurburgring-nordschleife/

```bash

code .https://hips.hearstapps.com/hmg-prod/images/gt3-rs-686be24e5443a.jpg?crop=1.00xw:0.768xh;0,0.0376xh&resize=640:*

```

Porsche accident video address:

3. **Start Live Server:**

   - Right-click on `index.html`https://packaged-media.redd.it/fyx871fyfbbf1/pb/m2-res_1272p.mp4?m=DASHPlaylist.mpd&v=1&e=1762527600&s=c217157bcc718056374ac152ee52071e6856202a
   - Select "Open with Live Server"
   - Or click "Go Live" button in VS Code status bar
4. **View in Browser:**

   - Navigate to `http://127.0.0.1:5500/index.html`
   - Chart 1 will load automatically

### Development Workflow

1. **Data Processing:**

   - Use KNIME to filter/transform CSV files
   - Export processed data to `/data` folder
   - Update file paths in `visualizations.js`
2. **Adding New Visualizations:**

   - Add chart function to `assets/js/visualizations.js`
   - Create HTML section in `index.html` with unique ID
   - Call chart function in window load event
   - Test with Live Server
3. **Testing:**

   - Check browser console for data loading logs
   - Test all interactive filters
   - Verify responsive design on mobile
   - Ensure animations work correctly

---

## 🎨 Design System

### Color Palette (CSS Variables)

```css
--gold-crayola: hsl(38, 61%, 73%);      /* Primary accent, used for filters, tooltips */
--quick-silver: hsla(0, 0%, 65%, 1);    /* Secondary lines, text */
--smoky-black-1: hsla(40, 12%, 5%, 1);  /* Primary background */
--eerie-black-1: hsla(210, 4%, 9%, 1);  /* Chart backgrounds */
--white: hsla(0, 0%, 100%, 1);          /* Primary text */
```

### Typography

- **Headings:** Forum (Google Fonts) - Elegant serif for titles
- **Body:** DM Sans (Google Fonts) - Clean sans-serif for readability
- **Fluid Typography:** Using `calc()` with viewport units for responsiveness

### Interactive Elements

- **Hover Effects:** Gold accent on hover, smooth transitions
- **Focus States:** Gold outline for keyboard navigation
- **Tooltips:** Dark background with gold border, 2px stroke
- **Buttons:** Gold background with hover lift effect

---

## 📊 Dataset Information

### Primary Datasets

1. **Crash Data** (`2020-2024_DATA_SA_Crash(filtered).csv`)

   - **Rows:** 15,471 (filtered in KNIME)
   - **Key Columns:**
     - `Year`, `Month`, `Day`, `Time`, `DayNight`
     - `Crash Type` (Rear End, Hit Fixed Object, Right Angle, etc.)
     - `Total Fats`, `Total SI`, `Total MI`, `Total Cas`
     - `ACCLOC_X`, `ACCLOC_Y` (coordinates for mapping)
     - `LGA Name`, `Suburb`, `Postcode`
     - `Weather Cond`, `Road Surface`, `Area Speed`
     - `DUI Involved`, `Drugs Involved`
2. **Casualty Data** (`2020-2024_DATA_SA_Casualty.csv`)

   - **Rows:** 23,894
   - **Key Columns:**
     - `REPORT_ID` (links to crash data)
     - `Casualty Type` (Driver, Passenger, Pedestrian, Rider)
     - `Sex`, `AGE`
     - `Injury Extent` (Fatal, Admitted to Hospital, etc.)
     - `Seat Belt`, `Helmet`
     - `Position In Veh`

### Data Processing

- **Tool:** KNIME Analytics Platform
- **Workflow:** Filtering, cleaning, column selection
- **Output Format:** CSV files for D3.js consumption
- **Documentation:** All processing steps documented in process book

---

## 🎯 Learning Objectives Met

### Data Visualization Skills

- [X] Multi-series line chart implementation
- [X] Interactive filtering and data transformation
- [X] Custom tooltip design and styling
- [X] Real-time chart updates based on user input
- [X] Color theory application (thematic consistency)

### Technical Skills

- [X] D3.js data loading and processing (`d3.csv`, `d3.rollup`)
- [X] Observable Plot chart configuration
- [X] Event-driven programming in vanilla JavaScript
- [X] DOM manipulation and dynamic content generation
- [X] Responsive design integration

### Design Skills

- [X] Maintaining design system consistency
- [X] UI/UX for filter controls
- [X] Accessibility considerations (ARIA labels, semantic HTML)
- [X] Visual hierarchy and layout

---

## 📝 Assignment Requirements

### Deliverables

- [X] Website hosted on local development server (Live Server)
- [ ] Minimum 2 charts + 1 map visualization (1/3 complete)
- [X] Interactive features (filtering, tooltips)
- [ ] Design process book (PDF) documenting decisions
- [ ] KNIME workflow file (.knwf) with team name
- [X] GitHub repository with version control

### Academic Integrity

- [X] GitHub Copilot usage fully disclosed in `CODE_CITATIONS.md`
- [X] All external libraries properly attributed
- [X] Original implementation decisions documented
- [X] Progress tracked through incremental commits

---

## 🔄 Version History

### Current Version: v0.3.0 (Chart 1 Complete)

**Added:**

- Multi-series line chart with seasonal crash patterns
- Interactive year range filter (2020-2024)
- Crash type toggle checkboxes
- Reset filters button
- Enhanced tooltips with custom styling
- Real-time chart updates

**Changed:**

- Page title and meta tags to data visualization theme
- Hero slider content (3 slides)
- Navigation menu structure
- Top bar information
- Preload image paths (fixed console warnings)

**Technical:**

- Added D3.js v7 and Observable Plot v0.6
- Created `visualizations.js` for chart code
- Implemented event-driven filter system
- Maintained all original animations

### Previous Versions

**v0.2.0** - Project setup and data preparation

- Added datasets to `/data` folder
- Created KNIME workflows for filtering
- Set up project structure

**v0.1.0** - Initial template fork

- Forked original Grilli restaurant template
- Created GitHub repository
- Established development environment

---

## 🚀 Next Steps

### Immediate Priorities

1. **Complete Chart 2** - Safety Equipment Bar Chart

   - Filter casualty data in KNIME
   - Implement grouped bar chart
   - Add demographic filtering
2. **Complete Chart 3** - Geographic Map

   - Choose mapping library (Leaflet.js or D3 geo)
   - Implement coordinate plotting
   - Add marker clustering
3. **Polish & Refine**

   - Replace remaining restaurant sections with insights
   - Add data summary statistics
   - Implement brush & link between charts (advanced)

### Future Enhancements

- [ ] Add export functionality (PNG, SVG, CSV)
- [ ] Implement data table view
- [ ] Add comparison mode (year-over-year)
- [ ] Create insights section with key findings
- [ ] Add loading animations for data fetching
- [ ] Implement dark mode toggle (currently always dark)

---

## 📚 Resources & References

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

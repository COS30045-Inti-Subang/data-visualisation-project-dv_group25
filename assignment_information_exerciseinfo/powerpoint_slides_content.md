# PowerPoint Slide Content - Stand-up 1
## Jacob - Data Visualization Project (Solo)

---

## Slide 1: Title Slide

**Title (Large, centered):**
Australian Road Safety Enforcement
Data Visualization Project

**Subtitle:**
Stand-up 1 Progress Report

**Student Info (bottom):**
Jacob [Your Last Name]
Student ID: [Your ID]
Section: [Your Section]
Date: November 1, 2025

**Note:** Working individually

**Visual suggestion:** 
- Background: Dark blue gradient (matches your website theme)
- Add BITRE logo (if available) or road safety icon
- Keep it clean and professional

---

## Slide 2: Project Overview

**Title:** Project Scope

**Content (bullet points):**

📊 **Data Source**
• South Australian Government Data Portal (data.sa.gov.au)
• Road crash data (2020-2024) - 63,241 crash records
• 34 attributes including severity, location, and contributing factors

🎯 **Objective**
• Create interactive visualizations to explore crash patterns
• Implement filtering, animations, and tooltips
• Ensure full accessibility (ARIA, keyboard navigation)

💻 **Technology Stack**
• D3.js v7 (SVG visualizations)
• KNIME (data processing)
• GitHub (version control)
• Mercury server (hosting)

**Visual suggestion:**
- 3-column layout with icons
- Use your CSS color scheme (--primary-color: #4e79a7)

---

## Slide 3: Dataset Overview

**Title:** SA Road Crash Data Summary

**Content (key metrics):**

📊 **Dataset Characteristics:**
• **Records:** 63,241 crash records (2020-2024)
• **Columns:** 34 attributes → cleaned to 18 essential
• **Time Range:** 5 years of comprehensive data
• **Geographic:** Full SA coverage with coordinates

🔑 **Key Attributes:**
| Category | Attributes | Purpose |
|----------|-----------|---------|
| **Severity** | Fatal, Serious Injury, Minor | **Time series** - trends |
| **Location** | X/Y coordinates (GDA94) | **Map** - geographic patterns |
| **Factors** | DUI, Distraction, Speed | **Bar chart** - causation |
| **Temporal** | Year, Month, Day, Hour | Temporal analysis |
| **Environmental** | Weather, Road Surface | Contextual insights |

**Data Quality:**
✓ Minimal missing values (<1%)
✓ Unique crash identifiers (REPORT_ID)
✓ Ready for visualization after KNIME processing

**Visual suggestion:**
- Use table format for clarity
- Highlight the three main datasets (bold)
- Add checkmark icons for key findings

---

## Slide 4: Data Analysis Insights

**Title:** Key Data Patterns Discovered

**Content (visual + bullets):**

**Crash Severity Trends (2020-2024):**
• 63,241 total crashes across 5 years
• Minor injuries (CSEF_SEVERITY=3): ~70% of crashes
• Serious injuries (CSEF_SEVERITY=2): ~28% of crashes
• Fatal crashes (CSEF_SEVERITY=1): <2% but highest priority
• Perfect for multi-line time series chart

**Contributing Factors:**
• DUI involvement: Present in ~15% of crashes
• Distraction: Present in ~8% of crashes
• Speed-related: Present in ~25% of crashes
• Factor combinations correlate with severity levels
• Ideal for grouped bar chart visualization

**Geographic Distribution:**
• Full SA coverage with precise coordinates (ACCLOC_X, ACCLOC_Y)
• High density in Adelaide metropolitan area
• Rural crash patterns differ from urban areas
• Suitable for D3 geoMercator projection with clustering

**Visual suggestion:**
- Small preview charts (hand-drawn sketches or simple Excel charts)
- Or just icons representing each visualization type
- Color-code by visualization type

---

## Slide 5: KNIME Workflow

**Title:** Data Processing Pipeline

**Content (visual workflow diagram):**

```
[CSV Reader] → [Column Filter] → [CSV Writer] → [Table View]
```

**Processing Steps:**
1. **Import** - Read SA crash CSV (63,241 rows, 34 columns)
2. **Filter Columns** - Keep 18 essential columns (severity, location, factors, temporal)
3. **Export** - Save processed data with embedded CSVs
4. **Validate** - Preview cleaned dataset structure

**Result:**
✓ 47% noise reduction (34 → 18 columns)
✓ All 63,241 crash records maintained
✓ Focused dataset ready for visualization
✓ Workflow saved with embedded data

**Visual suggestion:**
- Simple flowchart with arrows
- Use different colors for each step type (Input/Process/Output)
- Or screenshot of your actual KNIME workflow (zoomed and cropped)

---

## Slide 6: Technical Architecture

**Title:** Implementation Foundation

**HTML Structure:**
```html
<section aria-labelledby="title">
  <figure role="group">
    <div id="chart-root"></div>
  </figure>
</section>
```
✓ Semantic HTML with ARIA labels
✓ BEM CSS naming convention
✓ Accessibility-first design

**CSS Theming:**
• Dark theme (slate-900 background)
• Tableau color scheme
• CSS custom properties (--primary-color, etc.)

**D3 Architecture:**
• Factory pattern for reusable charts
• Observable pattern for state management
• selection.join() for reactive updates

**Visual suggestion:**
- 3 boxes showing HTML/CSS/JS structure
- Small code snippets (keep readable)
- Icons for each technology

---

## Slide 7: GitHub Repository

**Title:** Version Control & Documentation

**Repository:** github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25

**Current Structure:**
```
├── index.html (Semantic structure)
├── css/style.css (BEM conventions)
├── js/script.js (Architecture docs)
├── data/ (5 processed datasets)
└── .github/copilot-instructions.md (AI guidance)
```

**Documentation:**
• JSDoc typedefs for all patterns
• Architecture decisions explained
• Accessibility requirements documented
• Progressive development roadmap

**Commits:** [X] commits showing iterative progress

**Visual suggestion:**
- Screenshot of GitHub repository
- Or simple folder tree structure
- GitHub logo/icon

---

## Slide 8: Planned Visualizations

**Title:** Three Interactive Visualizations

**Visualization 1: Time Series Chart**
📈 **Crash Trends (2020-2024) by Severity**
• Multi-line chart (Fatal, Serious Injury, Minor)
• X-axis: Year | Y-axis: Crash Count
• Interactions: Hover tooltips, severity filter, year range slider
• Story: "How have crash patterns changed over 5 years?"

**Visualization 2: Bar Chart**
📊 **Contributing Factors by Severity**
• Grouped bar chart (DUI, Distraction, Speed)
• X-axis: Severity Level | Y-axis: Percentage
• Interactions: Toggle factors, animated transitions
• Story: "What factors correlate with fatal vs. minor crashes?"

**Visualization 3: Geographic Heatmap**
🗺️ **SA Crash Density Map**
• Point map with geoMercator projection + clustering
• 63,241 crash locations plotted by coordinates
• Interactions: Zoom, pan, cluster expand, hover details
• Story: "Where are South Australia's high-risk zones?"

**Visual suggestion:**
- 3 panels with mockup sketches
- Or find similar chart examples (properly cited)
- Icons for chart types

---

## Slide 9: Development Timeline

**Title:** Stand-up Milestones

**Week 10 (Stand-up 1) - ✅ COMPLETED**
✓ Data collection from BITRE
✓ KNIME workflow for data processing
✓ GitHub repository setup
✓ HTML/CSS architecture
✓ Documentation and typedefs

**Week 11 (Stand-up 2) - IN PROGRESS**
⏳ Implement line chart (breath tests)
⏳ Add D3 scales and axes
⏳ Create observable store for filters
⏳ Wire year/state dropdown controls

**Week 12 (Stand-up 3) - PLANNED**
⏹ Implement bar chart (fines)
⏹ Create map visualization
⏹ Add full accessibility (keyboard nav)
⏹ Implement tooltips and animations

**Week 13 (Final Submission) - Nov 15**
⏹ Deploy to Mercury server
⏹ Complete design book
⏹ Final testing and refinements

**Visual suggestion:**
- Timeline with checkboxes
- Color-code: green (done), yellow (in progress), gray (planned)
- Progress bar at bottom

---

## Slide 10: Challenges & Solutions

**Title:** Obstacles & Learning

**Technical Challenges:**

🔧 **Challenge:** D3's data binding pattern (enter/update/exit)
💡 **Solution:** Using modern selection.join() method (D3 v7)

🔧 **Challenge:** CSV data imports as strings, not numbers
💡 **Solution:** Type coercion in d3.csv() parser: `+d.YEAR`, `+d.COUNT`

🔧 **Challenge:** Understanding KNIME's node-based workflow
💡 **Solution:** Start simple (CSV Reader → Filter → Writer), then expand

🔧 **Challenge:** Accessibility requirements (ARIA, keyboard nav)
💡 **Solution:** Research W3C guidelines, implement from start

**Working Solo:**
✓ Complete ownership and understanding
✓ No coordination overhead
✓ Direct learning of full pipeline
⚠️ More time investment required
⚠️ No peer review (mitigated with documentation)

**Visual suggestion:**
- Problem/solution format with icons
- Orange for challenges, green for solutions
- Or simple two-column table

---

## Slide 11: Next Steps (Week 11)

**Title:** Immediate Next Steps

**This Weekend (Nov 1-3):**
□ Implement basic line chart structure
□ Load breath test data with D3.csv()
□ Apply margin convention and scales
□ Add X and Y axes with labels

**Next Week (Nov 4-8):**
□ Create observable store for filter state
□ Wire dropdown controls to chart updates
□ Add animated transitions
□ Implement hover tooltips

**Deliverables for Stand-up 2:**
✓ Working line chart with real data
✓ Basic interactivity (filtering)
✓ Proper D3 scales and axes
✓ Updated documentation

**Visual suggestion:**
- Checkboxes for to-do items
- Calendar view showing days
- Arrow pointing to Stand-up 2

---

## Slide 12: Questions?

**Title (centered, large):**
Questions?

**Contact Info:**
Jacob [Last Name]
Student ID: [Your ID]
Section: [Your Section]

**Repository:**
github.com/COS30045-Inti-Subang/
data-visualisation-project-dv_group25

**Resources Submitted:**
✓ This presentation
✓ Video demonstration (2-3 min)
✓ KNIME workflow (.knwf with data)
✓ Draft design book
✓ GitHub repository link

**Visual suggestion:**
- Clean, minimal design
- Your contact info
- QR code linking to GitHub (optional)
- Thank you message

---

## Design Guidelines

### Color Scheme (Match Your Website):
- **Primary:** #4e79a7 (Tableau blue)
- **Accent:** #f28e2b (Tableau orange)
- **Background:** #0f172a (dark slate)
- **Text:** #e2e8f0 (light slate)

### Fonts:
- **Headings:** Segoe UI Bold or Arial Bold
- **Body:** Segoe UI Regular or Arial
- **Code:** Consolas or Courier New

### Layout:
- Keep text minimal (6x6 rule: max 6 bullets, 6 words each)
- Use visuals where possible (icons, charts, diagrams)
- Maintain consistent header/footer
- Add slide numbers

### Professional Tips:
- No animations (distracting in recorded video)
- High contrast for readability
- Large fonts (min 24pt for body, 36pt for headings)
- Consistent alignment and spacing

---

## Minimal Version (If Time-Constrained)

Use just these 5 slides:

1. **Title Slide** - Your info
2. **Datasets** - Table showing 5 datasets
3. **KNIME Workflow** - Flowchart or screenshot
4. **Visualizations Planned** - 3 chart types
5. **Next Steps** - Timeline for Week 11

---

## How to Create in PowerPoint

### Quick Setup (10 minutes):

1. **Open PowerPoint** → Blank Presentation
2. **Design Tab** → Choose dark theme or:
   - Right-click background → Format Background
   - Solid Fill → Color: #0f172a (dark blue)
3. **Duplicate slide** for each section above
4. **Copy-paste** the content from this document
5. **Add visuals:**
   - Insert → Icons (search: chart, map, data)
   - Insert → Shapes (for workflow diagram)
   - Insert → Table (for datasets)
6. **Save as:** jacob_standup1_presentation.pptx

### Alternative: Use Templates
- Download a professional template (search: "technology presentation template")
- Modify colors to match your website theme
- Replace content with above slides

---

## Export Options

### For Video Recording:
- Keep PowerPoint open in Slideshow mode
- Record with screen capture while advancing slides
- Or just keep slides visible while you talk over them

### For Submission:
- Save as: **jacob_standup1_presentation.pptx**
- Also export PDF version (backup)
- Ensure file size < 10MB

---

## Usage in Video

### Approach 1: Show slides at beginning
- 10 seconds intro slide
- Then switch to screen share (BITRE, data folder, KNIME)

### Approach 2: Use slides as backdrop
- Keep slide visible in corner while you screen share
- Good for structure/reference

### Approach 3: Slides at end
- Screen share first (data, KNIME)
- Show slides for "next steps" section
- Good for timeline/roadmap

**Recommended:** Approach 1 (intro slide) + Approach 3 (closing slides)

---

That's it! You now have content for a complete 12-slide presentation. Pick the slides most relevant to your demo and adjust as needed. Good luck! 🎯✨

# Data Visualization Project - Australian Road Safety

**Student:** Jacob  
**Course:** COS30045 - Data Visualization  
**Semester:** 2025 S1  
**Status:** Solo Developer  

## Project Overview

Interactive D3.js visualizations exploring BITRE (Bureau of Infrastructure and Transport Research Economics) road safety enforcement data from 2008-2024.

## Planned Visualizations

1. **Line Chart** - Positive breath test trends across 8 Australian jurisdictions (2008-2024)
2. **Bar Chart** - Traffic fines by age group and violation type (speed, mobile phone, seatbelts, unlicensed)
3. **Interactive Map** - ACT mobile distraction camera locations with geographic context

## Technology Stack

- **Visualization:** D3.js v7 (SVG-based, no Canvas/WebGL)
- **Data Processing:** KNIME Analytics Platform
- **Frontend:** Vanilla JavaScript (ES6 modules), Semantic HTML5, CSS (BEM conventions)
- **Hosting:** Swinburne Mercury server
- **Version Control:** GitHub Classroom

## Data Sources

All data from BITRE (Australian Government - Creative Commons license):

| Dataset | Rows | Time Range | Purpose |
|---------|------|------------|---------|
| Positive Breath Tests | 1,328 | 2008-2024 | Line chart - trends over time |
| Police Fines | 12,181 | 2023-2024 | Bar chart - demographic patterns |
| Positive Drug Tests | 1,000+ | 2008-2024 | Comparison analysis |
| Camera Locations (ACT) | 112 | Current | Map visualization |
| National Rest Areas | 4,951 | Current | Geographic context |

## Project Status

### ✅ Stand-up 1 (Week 10) - Completed
- Data collection and analysis from BITRE
- KNIME workflow for data processing (6-node pipeline)
- GitHub repository setup with semantic HTML structure
- CSS theming with BEM naming conventions
- Architecture documentation (JSDoc typedefs, design patterns)
- AI coding agent instructions (.github/copilot-instructions.md)

### ⏳ Stand-up 2 (Week 11) - In Progress
- Implement first line chart (breath tests)
- Add D3 scales and axes
- Create observable store for state management
- Wire filter controls (year/jurisdiction dropdowns)

### ⏹ Stand-up 3 (Week 12) - Planned
- Implement bar chart (fines by demographics)
- Create map visualization (geoMercator projection)
- Full accessibility implementation (ARIA, keyboard navigation)
- Tooltips and animated transitions

### ⏹ Final Submission (Week 13) - Nov 15, 2025
- Deploy to Mercury server
- Complete design book documentation
- Final testing and refinements
- Individual reflection (1,500-2,500 words)

## Repository Structure

```
├── index.html              # Semantic HTML5 with ARIA landmarks
├── css/
│   └── style.css           # BEM conventions, CSS custom properties
├── js/
│   └── script.js           # JSDoc architecture documentation
├── data/                   # 5 processed CSV datasets from BITRE
├── src/                    # TO BE CREATED - D3 chart implementations
├── .github/
│   └── copilot-instructions.md  # AI coding agent guidance
└── README.md               # This file
```

## Key Features

### Accessibility-First Design
- Semantic HTML (`<main>`, `<section>`, `<figure>`)
- ARIA labels on all interactive elements
- Keyboard navigation (tabindex, focus management)
- Screen reader announcements for dynamic updates
- SVG `<title>` and `<desc>` for chart context

### Data Processing (KNIME)
- 6-node workflow: CSV Reader → Column Filter → Row Filter → Missing Value → Sorter → CSV Writer
- 94% data reduction (1,328 → 80 rows) for focused visualization
- Embedded data in workflow file for reproducibility

## Working Solo

This project is being developed independently. While the assignment is designed for teams of 2-3 students, I'm working solo and have adjusted the scope accordingly.

## Contact

**Student:** Jacob  
**Repository:** https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25

---

**Last Updated:** October 31, 2025  
**Next Milestone:** Stand-up 2 (Week 11) - Chart implementation

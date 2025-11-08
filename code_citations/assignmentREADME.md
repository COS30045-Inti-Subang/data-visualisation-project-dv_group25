# Assignment README - Road Safety Visualization Project

**Project:** Australian Road Safety Data Visualization
**Course:** COS30045 - Data Visualization
**Student:** Jacob Jayen Pillai (105986053)
**Institution:** Swinburne University of Technology
**Start Date:** Oct 27, 2025

---

## Project Overview

This document tracks the implementation of the Road Safety Analysis visualization component, which integrates with the existing Exercise 4 codebase. The project uses South Australia crash data (2020-2024) from BITRE to create interactive time series visualizations.

### Key Technologies

- **D3.js v7**: Core visualization library
- **Bootstrap 5.3.3**: CSS framework
- **Vanilla JavaScript**: ES6 modules, no build tools
- **CSV Data**: Raw government data from data.gov.au

---

## Error Log & Resolution History

### Error #1: CSS Theme Variables Affecting Exercise 4 Text Visibility

**Date:** November 4, 2025
**Time:** Implementation Phase - Step 2 (theme-toggle.css creation)
**Severity:** HIGH - Broke existing functionality

#### Problem Description

When implementing the theme toggle CSS (`css/theme-toggle.css`) for the Road Safety section, global CSS custom properties were applied to the `body` element:

```css
/* PROBLEMATIC CODE */
body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    transition: background-color var(--transition-speed) ease,
                color var(--transition-speed) ease;
}
```

This caused Exercise 4 sections to inherit the dark theme variables, making text difficult to read against colored backgrounds (e.g., orange/blue gradient boxes with now-white text).

#### Root Cause Analysis

1. **Global Scope Issue**: CSS custom properties declared in `:root` applied globally
2. **Body-Level Styling**: Applying theme colors to `body` affected ALL child elements
3. **Cascade Inheritance**: Exercise 4 sections inherited `color: var(--text-primary)` (white text)
4. **Low Contrast**: White text on light-colored Exercise 4 backgrounds = unreadable

#### Impact

- ❌ Exercise 4.0-4.7 text became difficult/impossible to read
- ❌ Colored highlight boxes (orange, blue gradients) now had white text
- ❌ User experience severely degraded for existing content
- ✅ Road Safety section worked correctly (dark background + white text = good contrast)

#### Solution Implemented

**Approach:** Scope all theme variables to ONLY the Road Safety section using CSS selector specificity.

**Changed Elements:**

1. **Removed body styling** - No longer applies theme to entire page
2. **Added section-level scoping** - Applied theme to `#road-safety-analysis` container
3. **Prefixed all selectors** - Changed `.filter-card` to `#road-safety-analysis .filter-card`
4. **Isolated theme toggle** - Theme button still global, but effects are scoped

**Fixed CSS Structure:**

```css
/* SOLUTION: Scope to Road Safety section only */
#road-safety-analysis {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    padding: 30px;
    border-radius: 12px;
    transition: background-color var(--transition-speed) ease,
                color var(--transition-speed) ease;
}

/* All child selectors scoped */
#road-safety-analysis .filter-card { ... }
#road-safety-analysis .stat-card { ... }
#road-safety-analysis .chart-container { ... }
#road-safety-analysis .btn-primary { ... }
/* etc. */
```

#### Lessons Learned

1. ✅ **Always scope new CSS** to specific sections when integrating with existing codebases
2. ✅ **Test immediately** after adding global styles (body, :root, html selectors)
3. ✅ **Use specific IDs** for scoping instead of generic class names
4. ✅ **Preserve existing functionality** - New features should not break old features
5. ✅ **Document assumptions** - Exercise 4 styling must remain untouched (academic integrity)

#### Prevention Strategy

- Use **BEM naming conventions** with project-specific prefixes (e.g., `.rs-filter-card` for "Road Safety")
- Create **isolated stylesheets** with explicit scoping comments
- Implement **CSS modules** or scoped styles in future projects
- Always test **integration points** between old and new code

#### Files Modified

- `css/theme-toggle.css` - Added `#road-safety-analysis` prefix to all selectors
- Changed ~30 CSS selectors from global to scoped

#### Verification Steps

1. ✅ Refresh page and verify Exercise 4 text is readable
2. ✅ Check colored boxes have proper text contrast
3. ✅ Navigate to Road Safety section and verify theme works
4. ✅ Test theme toggle button (when implemented)

---

## Implementation Progress

### Phase 1: HTML Structure ✅ COMPLETE

- [X] Added "🚗 Road Safety Analysis" navigation link
- [X] Created `#road-safety-analysis` section with filters
- [X] Added year range sliders (2020-2024)
- [X] Added severity checkboxes (Fatal, Serious, Minor)
- [X] Created statistics display card
- [X] Created chart container
- [X] Added insights section
- [X] Linked `css/theme-toggle.css` stylesheet
- [X] Linked `js/road-safety.js` script module

### Phase 2: CSS Styling ✅ COMPLETE (with fixes)

- [X] Created `css/theme-toggle.css` with light/dark mode variables
- [X] Defined dark mode defaults (matches Exercise 4 theme)
- [X] Defined light mode overrides
- [X] Styled filter cards, stat cards, chart container
- [X] Created theme toggle button styles
- [X] Added responsive design breakpoints
- [X] **FIXED:** Scoped all styles to `#road-safety-analysis` only

### Phase 3: JavaScript Implementation ⏳ PENDING

- [ ] Create `js/road-safety.js` file
- [ ] Implement data loading with type coercion
- [ ] Implement severity classification function
- [ ] Create time series chart with D3.js
- [ ] Add filter event listeners
- [ ] Update statistics on filter changes
- [ ] Initialize theme toggle button

---

## Data Files

### Primary Dataset

- **File:** `data/2020-2024_DATA_SA_Crash.csv`
- **Records:** 63,241 crashes
- **Columns:** 34 (REPORT_ID, Year, Month, Total_Cas, Total_Fats, Total_SI, Total_MI, Crash Type, Weather Cond, DUI_Involved, ACCLOC_X, ACCLOC_Y, etc.)
- **Source:** BITRE - Bureau of Infrastructure and Transport Research Economics
- **Status:** RAW data (KNIME cleaning workflow in progress)

### Secondary Dataset

- **File:** `data/2020-2024_DATA_SA_Casualty.csv`
- **Records:** 23,894 casualties
- **Usage:** Future demographic analysis (Stand-up 3)

---

## Development Environment

### Local Server

```powershell
# Live Server (VS Code extension) - Port 5503
# Or: npx serve . -p 5503
```

### Testing URL

```
http://127.0.0.13503/index.html#road-safety-analysis
```

### Browser Console Commands

```javascript
// Verify D3 loaded
console.log("D3 version:", d3.version);

// Check section exists
console.log("Section found:", document.getElementById('road-safety-analysis'));

// Test navigation
showSection('road-safety-analysis', null);
```

---

## Git Commit Strategy

Following academic integrity requirements, each phase should be committed separately to show progression:

```bash
git add index.html
git commit -m "feat: Add Road Safety navigation and section structure"

git add css/theme-toggle.css
git commit -m "feat: Add theme toggle CSS with light/dark mode support"

git add css/theme-toggle.css
git commit -m "fix: Scope theme CSS to Road Safety section only (preserve Exercise 4)"

git add js/road-safety.js
git commit -m "feat: Implement Road Safety data loading and chart rendering"
```

---

## Stand-up Submission Timeline

### Stand-up 2 (Due: November 8, 2025)

**Goal:** ONE polished time series line chart with advanced filtering

- [X] HTML structure with filter controls
- [X] CSS theme system (light/dark mode)
- [ ] D3.js time series chart (fatal/serious/minor lines)
- [ ] Year range filtering (2020-2024)
- [ ] Severity multi-select filtering
- [ ] Statistics display (total, fatal, serious, minor counts)
- [ ] Theme toggle button functionality

### Stand-up 3 (Week 12)

**Goal:** Add map visualization and bar chart

- [ ] Interactive map showing crash hotspots (ACCLOC_X, ACCLOC_Y coordinates)
- [ ] Grouped bar chart for crash types
- [ ] Enhanced filtering options
- [ ] Demographic analysis integration

---

## References & Resources

### Observable D3 Gallery (Boilerplate Code)

- Multi-line chart: https://observablehq.com/@d3/multi-line-chart
- Area chart with missing data: https://observablehq.com/@d3/area-with-missing-data
- Zoomable area chart: https://observablehq.com/@d3/zoomable-area-chart

### Documentation

- D3.js API Reference: https://d3js.org/
- Bootstrap 5.3 Docs: https://getbootstrap.com/docs/5.3/
- BITRE Data Portal: https://data.gov.au/

---

## Notes & Decisions

### Why Two-Page System?

- **home.html:** Portfolio/showcase (landing page, about section)
- **index.html:** Learning exercises + assignment visualizations
- **Reason:** Preserve academic progression (Exercise 4 → Road Safety)

### Why No Build Tools?

- **Constraint:** Mercury server deployment requires pure HTML/CSS/JS
- **Benefit:** Simpler deployment, no npm dependencies
- **Trade-off:** No TypeScript, no module bundling

### Why Raw Data?

- **Status:** KNIME cleaning workflow still in progress
- **Approach:** Load raw CSV, handle missing values in JavaScript
- **Validation:** Type coercion with `+operator`, default values with `|| 0`

---

## Contact & Acknowledgments

**Student:** Jacob Jayen Pillai
**Student ID:** 105986053
**Email:** [Student email]
**University:** Swinburne University of Technology

**AI Assistance:** This project uses GitHub Copilot for code generation, debugging, and documentation. All AI-generated code has been reviewed, tested, and modified by the student.

---

*Last Updated: November 4, 2025 - Error #1 documented and resolved*

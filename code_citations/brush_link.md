# Brushing & Linking Implementation Specification

> **Feature**: Interactive Histogram Brush with Scatterplot Linking  
> **Complexity**: Tier 2 - Advanced D3 Feature  
> **Estimated Time**: 4-5 hours  
> **Type**: Practice/Enhancement (Post-Submission)  
> **Branch**: `feature/brushing-linking` (separate from main)

---

## 📋 Table of Contents

1. [Feature Overview](#feature-overview)
2. [User Experience Flow](#user-experience-flow)
3. [Technical Architecture](#technical-architecture)
4. [Implementation Phases](#implementation-phases)
5. [Code Examples](#code-examples)
6. [Testing Checklist](#testing-checklist)
7. [Rollback Plan](#rollback-plan)

---

## 🎯 Feature Overview

### What We're Building

**Interactive Brushing & Linking between Histogram and Scatterplot**

- User can **drag a brush** (rectangular selection) on the histogram to select an energy range
- Scatterplot **automatically filters** to show only TVs in that energy range
- **Toggle button** allows users to enable/disable brushing mode
- **Clear button** resets the brush and shows all data
- Smooth transitions and visual feedback throughout

### Visual Mockup (Text Diagram)

```
┌─────────────────────────────────────────────────────────────┐
│  TV Energy Consumption Distribution                         │
├─────────────────────────────────────────────────────────────┤
│  [All] [LCD] [LED] [OLED]    [🔗 Enable Brushing]          │
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │    ▓▓▓▓                                                │ │
│  │  ▓▓▓▓▓▓▓▓                                              │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓                                            │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                          │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ┌──────────┐                         │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ BRUSHED  │  ← User drags here      │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  AREA    │                         │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  └──────────┘                         │ │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓                                    │ │
│  └────────────────────────────────────────────────────────┘ │
│                    [Clear Brush]                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
              (Filters scatterplot below)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Energy Consumption vs Star Rating                          │
├─────────────────────────────────────────────────────────────┤
│  ┌────────────────────────────────────────────────────────┐ │
│  │  ●●●   ← Only shows circles in brushed energy range   │ │
│  │    ●●●●                                                │ │
│  │  ●●●●●   (Circles outside range are dimmed/hidden)    │ │
│  │    ●●                                                  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎭 User Experience Flow

### Scenario 1: First-Time User (Brushing Disabled by Default)

1. User navigates to Televisions page
2. Sees histogram and scatterplot as normal
3. Notices new **"🔗 Enable Brushing"** toggle button above histogram
4. Clicks toggle → Button changes to **"🔗 Brushing Active"** (green highlight)
5. Histogram now shows a faint gray overlay indicating brush is ready
6. User drags mouse on histogram → Brush selection appears (gray rectangle)
7. Scatterplot instantly filters to show only TVs in selected energy range
8. User releases mouse → Brush stays in place
9. User can drag brush handles to adjust range
10. Clicks **"Clear Brush"** button → Resets to show all data
11. Clicks toggle again → Disables brushing, returns to normal state

### Scenario 2: Experienced User (Quick Exploration)

1. Enables brushing with toggle
2. Quickly drags brush across different histogram regions
3. Watches scatterplot update in real-time
4. Finds interesting pattern (e.g., "Low energy TVs have higher star ratings")
5. Adjusts brush to precise range
6. Uses tooltip on scatterplot to inspect specific models
7. Clears brush to reset

### Scenario 3: Compatibility with Existing Filters

1. User selects "LED" filter → Histogram shows only LED TVs
2. Enables brushing
3. Brushes a range on the LED-filtered histogram
4. Scatterplot shows only LED TVs **AND** within brushed energy range
5. **Both filters work together** (technology filter + energy range filter)

---

## 🏗️ Technical Architecture

### Data Flow Diagram

```
┌──────────────────────────────────────────────────────────────┐
│                     User Interaction                         │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│  1. User drags brush on histogram                            │
│     d3.brushX() captures mouse events                        │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│  2. handleBrushEnd(event) function triggers                  │
│     - Gets brush selection: event.selection                  │
│     - Converts pixels to data: xScale.invert()               │
│     - Results in energy range [minW, maxW]                   │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│  3. filterScatterplotByEnergy(min, max)                      │
│     - Loops through all scatterplot circles                  │
│     - Checks: d.energyConsumption >= min && <= max           │
│     - Updates opacity and size with transitions              │
└────────────────────────┬─────────────────────────────────────┘
                         ↓
┌──────────────────────────────────────────────────────────────┐
│  4. Visual Updates (400ms transitions)                       │
│     - Highlighted circles: opacity 0.7, radius 5             │
│     - Dimmed circles: opacity 0.1, radius 2                  │
│     - Statistics panel updates to show brushed count         │
└──────────────────────────────────────────────────────────────┘
```

### Global State Management

```javascript
// New global variables needed
let brushEnabled = false;           // Toggle state
let currentBrushRange = null;       // [minEnergy, maxEnergy]
let brush = null;                   // D3 brush behavior object
let brushGroup = null;              // SVG group element for brush
```

### Function Dependencies

```
populateFilters()
    └── createBrushToggle()  ← NEW
            └── toggleBrushMode()  ← NEW

drawHistogram()
    └── initializeBrush()  ← NEW
            └── handleBrushEnd()  ← NEW
                    └── filterScatterplotByEnergy()  ← NEW

clearBrush()  ← NEW
    └── resetScatterplotFilter()  ← NEW
```

---

## 🔧 Implementation Phases

### Phase 1: Setup & UI Elements (45 min)

#### 1.1 Create Toggle Button (15 min)
**File**: `index.html`
**Location**: Above filter buttons in histogram section

```html
<!-- Add after line 137 (filter buttons div) -->
<div style="text-align: center; margin: 1rem 0;">
    <button id="brush-toggle-btn" onclick="toggleBrushMode()" style="
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
        transition: all 0.3s ease;
    " onmouseover="this.style.transform='translateY(-2px)';" 
       onmouseout="this.style.transform='translateY(0)';">
        <span id="brush-icon">🔗</span>
        <span id="brush-label">Enable Brushing</span>
    </button>
    
    <button id="clear-brush-btn" onclick="clearBrush()" style="
        display: none;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
        margin-left: 10px;
    ">
        <span>✖</span> Clear Brush
    </button>
</div>
```

#### 1.2 Add CSS Styles (10 min)
**File**: `css/visualization.css`

```css
/* Brush styling */
.brush .overlay {
    fill: transparent;
    pointer-events: all;
    cursor: crosshair;
}

.brush .selection {
    fill: rgba(99, 102, 241, 0.2);
    stroke: #4f46e5;
    stroke-width: 2px;
    stroke-dasharray: 5,5;
    fill-opacity: 0.3;
}

.brush .handle {
    fill: #4f46e5;
    fill-opacity: 0.8;
}

/* Active brush mode indicator */
#brush-toggle-btn.active {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
}

/* Disabled state when brushing not supported */
#brush-toggle-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 0.6;
}

/* Scatterplot circles - brushed vs non-brushed */
.scatterplot circle.brushed {
    stroke: #4f46e5;
    stroke-width: 1.5px;
}

.scatterplot circle.dimmed {
    opacity: 0.1 !important;
    pointer-events: none;
}
```

#### 1.3 Update Shared Constants (10 min)
**File**: `js/shared-constants.js`

```javascript
// Add at the end of file
// ========================================
// TIER 2 FEATURE: BRUSHING & LINKING
// ========================================

// Brush configuration
const BRUSH_CONFIG = {
    enabled: false,              // Default state
    minSelection: 20,            // Minimum brush width in pixels
    transitionDuration: 400,     // Animation speed
    dimmedOpacity: 0.1,         // Opacity for non-brushed circles
    highlightOpacity: 0.7,      // Opacity for brushed circles
    dimmedRadius: 2,            // Radius for non-brushed circles
    highlightRadius: 5          // Radius for brushed circles
};

// Export for use in other modules
window.BRUSH_CONFIG = BRUSH_CONFIG;
```

#### 1.4 Create Brush Module File (10 min)
**File**: `js/brushing.js` (NEW)

```javascript
// ========================================
// TIER 2 FEATURE: BRUSHING & LINKING MODULE
// ========================================
// This file handles the brush interaction on histogram
// and coordinates filtering with the scatterplot

// Global state
let brushEnabled = false;
let currentBrushRange = null;
let brush = null;
let brushGroup = null;

/**
 * Toggle brush mode on/off
 */
function toggleBrushMode() {
    brushEnabled = !brushEnabled;
    
    const toggleBtn = document.getElementById('brush-toggle-btn');
    const toggleLabel = document.getElementById('brush-label');
    const clearBtn = document.getElementById('clear-brush-btn');
    
    if (brushEnabled) {
        // Enable brush mode
        toggleBtn.classList.add('active');
        toggleLabel.textContent = 'Brushing Active';
        clearBtn.style.display = 'inline-block';
        
        // Initialize brush if not already done
        if (!brush) {
            initializeBrush();
        }
        
        // Show brush overlay
        if (brushGroup) {
            brushGroup.style('display', 'block');
        }
    } else {
        // Disable brush mode
        toggleBtn.classList.remove('active');
        toggleLabel.textContent = 'Enable Brushing';
        
        // Hide brush overlay
        if (brushGroup) {
            brushGroup.style('display', 'none');
        }
        
        // Clear any active brush selection
        clearBrush();
    }
}

/**
 * Initialize D3 brush behavior on histogram
 */
function initializeBrush() {
    // Create brush behavior
    brush = d3.brushX()
        .extent([[0, 0], [INNER_WIDTH, INNER_HEIGHT]])
        .on('end', handleBrushEnd);
    
    // Add brush group to histogram's innerChart
    brushGroup = innerChart.append('g')
        .attr('class', 'brush')
        .style('display', brushEnabled ? 'block' : 'none')
        .call(brush);
}

/**
 * Handle brush selection end event
 * @param {Object} event - D3 brush event
 */
function handleBrushEnd(event) {
    if (!brushEnabled) return;
    
    const selection = event.selection;
    
    if (selection) {
        // Convert pixel coordinates to data values
        const [x0Pixel, x1Pixel] = selection;
        const minEnergy = Math.round(xScale.invert(x0Pixel));
        const maxEnergy = Math.round(xScale.invert(x1Pixel));
        
        // Store current range
        currentBrushRange = [minEnergy, maxEnergy];
        
        // Filter scatterplot
        filterScatterplotByEnergy(minEnergy, maxEnergy);
        
        // Update statistics to show brushed data count
        updateBrushedStats(minEnergy, maxEnergy);
        
        // Show clear button
        const clearBtn = document.getElementById('clear-brush-btn');
        if (clearBtn) {
            clearBtn.style.display = 'inline-block';
        }
    } else {
        // Brush cleared - reset scatterplot
        clearBrush();
    }
}

/**
 * Filter scatterplot circles based on energy range
 * @param {number} minEnergy - Minimum energy value
 * @param {number} maxEnergy - Maximum energy value
 */
function filterScatterplotByEnergy(minEnergy, maxEnergy) {
    const scatterplotSvg = d3.select('#scatterplot svg');
    
    scatterplotSvg.selectAll('circle')
        .transition()
        .duration(BRUSH_CONFIG.transitionDuration)
        .attr('opacity', d => {
            const inRange = d.energyConsumption >= minEnergy && 
                          d.energyConsumption <= maxEnergy;
            return inRange ? BRUSH_CONFIG.highlightOpacity : BRUSH_CONFIG.dimmedOpacity;
        })
        .attr('r', d => {
            const inRange = d.energyConsumption >= minEnergy && 
                          d.energyConsumption <= maxEnergy;
            return inRange ? BRUSH_CONFIG.highlightRadius : BRUSH_CONFIG.dimmedRadius;
        })
        .attr('class', d => {
            const inRange = d.energyConsumption >= minEnergy && 
                          d.energyConsumption <= maxEnergy;
            return inRange ? 'brushed' : 'dimmed';
        });
}

/**
 * Clear brush selection and reset scatterplot
 */
function clearBrush() {
    // Clear brush visually
    if (brush && brushGroup) {
        brushGroup.call(brush.move, null);
    }
    
    // Reset state
    currentBrushRange = null;
    
    // Reset scatterplot to show all circles
    resetScatterplotFilter();
    
    // Hide clear button
    const clearBtn = document.getElementById('clear-brush-btn');
    if (clearBtn) {
        clearBtn.style.display = 'none';
    }
}

/**
 * Reset scatterplot to show all circles normally
 */
function resetScatterplotFilter() {
    const scatterplotSvg = d3.select('#scatterplot svg');
    
    scatterplotSvg.selectAll('circle')
        .transition()
        .duration(BRUSH_CONFIG.transitionDuration)
        .attr('opacity', 0.7)
        .attr('r', 5)
        .attr('class', '');
}

/**
 * Update statistics panel to show count of brushed data
 * @param {number} minEnergy - Minimum energy value
 * @param {number} maxEnergy - Maximum energy value
 */
function updateBrushedStats(minEnergy, maxEnergy) {
    // Get currently displayed data (respecting existing filters)
    const currentData = window.currentFilteredData || [];
    
    // Filter by brush range
    const brushedData = currentData.filter(d => 
        d.energyConsumption >= minEnergy && 
        d.energyConsumption <= maxEnergy
    );
    
    // Update statistics panel with brushed data
    if (typeof updateSummaryStats === 'function') {
        updateSummaryStats(brushedData);
    }
    
    // Add brush range indicator
    const statsPanel = document.getElementById('histogram-stats');
    if (statsPanel) {
        let rangeIndicator = statsPanel.querySelector('.brush-range-indicator');
        
        if (!rangeIndicator) {
            rangeIndicator = document.createElement('div');
            rangeIndicator.className = 'brush-range-indicator';
            rangeIndicator.style.cssText = `
                background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                margin-top: 1rem;
                text-align: center;
                font-weight: 600;
                font-size: 0.9rem;
            `;
            statsPanel.appendChild(rangeIndicator);
        }
        
        rangeIndicator.textContent = `🔗 Brushed Range: ${minEnergy}W - ${maxEnergy}W (${brushedData.length} TVs)`;
    }
}

// Export functions to global scope
window.toggleBrushMode = toggleBrushMode;
window.clearBrush = clearBrush;
window.initializeBrush = initializeBrush;
```

---

### Phase 2: Core Brush Functionality (1.5 hours)

#### 2.1 Integrate Brush into Histogram (30 min)
**File**: `js/histogram.js`

**Add at the end of `drawHistogram()` function:**

```javascript
    // Histogram complete - ready for interaction
    // Show export buttons now that chart is rendered
    if (typeof showExportButtons === 'function') {
        showExportButtons();
    }
    
    // TIER 2 FEATURE: Initialize brush if needed
    // Check if brushing module is loaded
    if (typeof initializeBrush === 'function' && !brush) {
        // Brush will be initialized when user enables it via toggle
        // We just need to ensure innerChart is available globally
        window.histogramInnerChart = innerChart;
        window.histogramXScale = xScale;
    }
}
```

#### 2.2 Store Filtered Data for Brushing (20 min)
**File**: `js/interaction.js`

**Modify `updateHistogram()` function to store current filtered data:**

```javascript
function updateHistogram(data, filterIds) {
    // ... existing code ...
    
    let filteredData;
    if (filterIds === 'all') {
        filteredData = data; // Show all data
    } else {
        // Filter to only include specified technologies
        filteredData = data.filter(d => filterIds.includes(d.screenTech));
    }
    
    // TIER 2 FEATURE: Store filtered data globally for brush to access
    window.currentFilteredData = filteredData;
    
    // ... rest of existing code ...
}
```

#### 2.3 Make Brush Aware of Filter Changes (20 min)
**File**: `js/brushing.js`

**Add function to reset brush when filters change:**

```javascript
/**
 * Reset brush when histogram filters change
 * Called from updateHistogram() and showEmptyChartMessage()
 */
function resetBrushOnFilterChange() {
    if (brushEnabled && currentBrushRange) {
        // Clear the brush but keep brushing mode enabled
        if (brush && brushGroup) {
            brushGroup.call(brush.move, null);
        }
        currentBrushRange = null;
        resetScatterplotFilter();
        
        // Remove range indicator
        const rangeIndicator = document.querySelector('.brush-range-indicator');
        if (rangeIndicator) {
            rangeIndicator.remove();
        }
    }
}

window.resetBrushOnFilterChange = resetBrushOnFilterChange;
```

**Call this from `js/interaction.js` at end of `updateHistogram()`:**

```javascript
    // ... existing code at end of updateHistogram() ...
    
    // TIER 2 FEATURE: Reset brush when filters change
    if (typeof resetBrushOnFilterChange === 'function') {
        resetBrushOnFilterChange();
    }
    
    // Histogram updated successfully
}
```

#### 2.4 Add Script Loading (20 min)
**File**: `index.html`

**Add brushing.js to script loading order (after interaction.js):**

```html
    <!-- JavaScript -->
    <script src="js/shared-constants.js"></script>
    <script src="js/scripts.js"></script>
    <script src="js/export-charts.js"></script>
    <script src="js/histogram.js"></script>
    <script src="js/scatterplot.js"></script>
    <script src="js/interaction.js"></script>
    <script src="js/brushing.js"></script>  <!-- NEW -->
    <script src="js/load-data.js"></script>
</body>
</html>
```

---

### Phase 3: Polish & Testing (1.5 hours)

#### 3.1 Add Keyboard Shortcuts (20 min)
**File**: `js/brushing.js`

**Add keyboard support:**

```javascript
/**
 * Initialize keyboard shortcuts for brushing
 */
function initializeBrushKeyboardShortcuts() {
    document.addEventListener('keydown', (event) => {
        // Ctrl+B or Cmd+B to toggle brushing
        if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
            event.preventDefault();
            toggleBrushMode();
        }
        
        // Escape to clear brush
        if (event.key === 'Escape' && currentBrushRange) {
            clearBrush();
        }
    });
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBrushKeyboardShortcuts);
} else {
    initializeBrushKeyboardShortcuts();
}
```

#### 3.2 Add Brush Extent Labels (30 min)
**File**: `js/brushing.js`

**Show energy values at brush edges:**

```javascript
function handleBrushEnd(event) {
    if (!brushEnabled) return;
    
    const selection = event.selection;
    
    if (selection) {
        const [x0Pixel, x1Pixel] = selection;
        const minEnergy = Math.round(xScale.invert(x0Pixel));
        const maxEnergy = Math.round(xScale.invert(x1Pixel));
        
        // Store current range
        currentBrushRange = [minEnergy, maxEnergy];
        
        // Add labels to brush handles
        updateBrushLabels(x0Pixel, x1Pixel, minEnergy, maxEnergy);
        
        // ... rest of existing code ...
    }
}

/**
 * Add labels showing energy values at brush edges
 */
function updateBrushLabels(x0, x1, minE, maxE) {
    // Remove existing labels
    brushGroup.selectAll('.brush-label').remove();
    
    // Left label
    brushGroup.append('text')
        .attr('class', 'brush-label')
        .attr('x', x0)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#4f46e5')
        .text(`${minE}W`);
    
    // Right label
    brushGroup.append('text')
        .attr('class', 'brush-label')
        .attr('x', x1)
        .attr('y', -10)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .style('font-weight', '600')
        .style('fill', '#4f46e5')
        .text(`${maxE}W`);
}
```

#### 3.3 Improve Visual Feedback (40 min)
**File**: `js/brushing.js`

**Add smooth entrance/exit animations:**

```javascript
function filterScatterplotByEnergy(minEnergy, maxEnergy) {
    const scatterplotSvg = d3.select('#scatterplot svg');
    const circles = scatterplotSvg.selectAll('circle');
    
    // Count how many will be highlighted
    let highlightCount = 0;
    circles.each(d => {
        if (d.energyConsumption >= minEnergy && d.energyConsumption <= maxEnergy) {
            highlightCount++;
        }
    });
    
    // Staggered animation for visual appeal
    circles.each(function(d, i) {
        const inRange = d.energyConsumption >= minEnergy && 
                       d.energyConsumption <= maxEnergy;
        
        d3.select(this)
            .transition()
            .duration(BRUSH_CONFIG.transitionDuration)
            .delay(i * 2) // Stagger by 2ms per circle
            .attr('opacity', inRange ? BRUSH_CONFIG.highlightOpacity : BRUSH_CONFIG.dimmedOpacity)
            .attr('r', inRange ? BRUSH_CONFIG.highlightRadius : BRUSH_CONFIG.dimmedRadius)
            .attr('class', inRange ? 'brushed' : 'dimmed');
    });
    
    // Log for debugging
    console.log(`Brush: ${highlightCount} of ${circles.size()} TVs in range ${minEnergy}-${maxEnergy}W`);
}
```

---

## 📝 Code Examples

### Complete Example: Brush Toggle Button HTML

```html
<!-- Place after filter buttons in histogram section -->
<div id="brush-controls" style="text-align: center; margin: 1.5rem 0; padding: 1rem; background: #f9fafb; border-radius: 12px;">
    <div style="margin-bottom: 0.5rem; color: #6b7280; font-size: 0.9rem; font-weight: 600;">
        🔗 ADVANCED FEATURE: Brushing & Linking
    </div>
    <p style="margin: 0 0 1rem 0; color: #9ca3af; font-size: 0.85rem; line-height: 1.4;">
        Enable brushing to select an energy range on the histogram and see filtered results in the scatterplot below
    </p>
    
    <button id="brush-toggle-btn" onclick="toggleBrushMode()">
        <span id="brush-icon">🔗</span>
        <span id="brush-label">Enable Brushing</span>
    </button>
    
    <button id="clear-brush-btn" onclick="clearBrush()" style="display: none;">
        <span>✖</span> Clear Brush
    </button>
    
    <div id="brush-hint" style="margin-top: 0.8rem; font-size: 0.8rem; color: #6b7280; display: none;">
        💡 Tip: Drag on the histogram to select an energy range. Press <kbd>Esc</kbd> to clear.
    </div>
</div>
```

### Complete Example: CSS Styling

```css
/* Brush Controls Container */
#brush-controls {
    background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    border: 2px dashed #d1d5db;
    transition: all 0.3s ease;
}

#brush-controls:hover {
    border-color: #6366f1;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.1);
}

/* Toggle Button States */
#brush-toggle-btn {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    transition: all 0.3s ease;
}

#brush-toggle-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

#brush-toggle-btn.active {
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3);
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3); }
    50% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.2); }
}

/* Clear Button */
#clear-brush-btn {
    background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
    margin-left: 10px;
    transition: all 0.3s ease;
}

#clear-brush-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
}

/* Keyboard Hint */
kbd {
    background: #f3f4f6;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 2px 6px;
    font-family: monospace;
    font-size: 0.85em;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Brush SVG Elements */
.brush .overlay {
    fill: transparent;
    pointer-events: all;
    cursor: crosshair;
}

.brush .selection {
    fill: rgba(99, 102, 241, 0.15);
    stroke: #4f46e5;
    stroke-width: 2px;
    stroke-dasharray: 5, 5;
    animation: dash 20s linear infinite;
}

@keyframes dash {
    to { stroke-dashoffset: -100; }
}

.brush .handle {
    fill: #4f46e5;
    fill-opacity: 0.8;
    cursor: ew-resize;
}

/* Scatterplot Circle States */
.scatterplot circle.brushed {
    stroke: #4f46e5;
    stroke-width: 2px;
    filter: drop-shadow(0 0 3px rgba(99, 102, 241, 0.6));
}

.scatterplot circle.dimmed {
    opacity: 0.08 !important;
    pointer-events: none;
    stroke: none;
}

/* Brush Range Indicator */
.brush-range-indicator {
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    margin-top: 1rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.95rem;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
    animation: slideIn 0.4s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

---

## ✅ Testing Checklist

### Functional Tests

- [ ] **Toggle On**: Click "Enable Brushing" → Button changes to green "Brushing Active"
- [ ] **Brush Creation**: Drag on histogram → Gray brush rectangle appears
- [ ] **Scatterplot Filter**: Release brush → Scatterplot shows only TVs in range
- [ ] **Brush Adjustment**: Drag brush handles → Scatterplot updates in real-time
- [ ] **Clear Brush**: Click "Clear Brush" → All circles return to normal
- [ ] **Toggle Off**: Click "Brushing Active" → Returns to normal mode
- [ ] **Statistics Update**: Brush range shows correct count in stats panel
- [ ] **Keyboard Shortcut**: Ctrl+B toggles brushing mode
- [ ] **Escape Key**: Esc clears active brush
- [ ] **Filter Compatibility**: Technology filter + brush works together
- [ ] **Empty State**: Brush disabled when "No filters selected" message shown

### Edge Cases

- [ ] **Tiny Brush**: Very small brush selection still works
- [ ] **Full Range Brush**: Brush entire histogram → All circles highlighted
- [ ] **Brush Outside Data**: Brush beyond histogram range → No circles highlighted
- [ ] **Rapid Toggle**: Quickly enable/disable brushing → No errors
- [ ] **Brush During Transition**: Brush while histogram animating → No conflicts
- [ ] **Multiple Filters**: Select LCD, brush range, change to LED → Brush clears appropriately
- [ ] **Clear While Disabled**: Clear brush when brushing disabled → No errors

### Visual Tests

- [ ] **Smooth Transitions**: All animations are smooth (400ms)
- [ ] **Brush Styling**: Dashed border, semi-transparent fill
- [ ] **Handle Visibility**: Brush handles clearly visible and draggable
- [ ] **Label Positioning**: Energy labels above brush handles, readable
- [ ] **Circle Highlighting**: Brushed circles clearly distinguished from dimmed
- [ ] **Button States**: Active state clearly different from inactive
- [ ] **Responsive**: Works at different screen sizes

### Performance Tests

- [ ] **3,703 Circles**: Brush update completes in <1 second
- [ ] **No Lag**: Dragging brush feels responsive
- [ ] **Memory**: No memory leaks after 10+ brush operations
- [ ] **Console**: No errors in browser console

---

## 🔄 Rollback Plan

### If Feature Breaks Something

**Quick Rollback (5 min):**

1. Comment out brush script in `index.html`:
```html
<!-- <script src="js/brushing.js"></script> -->
```

2. Remove brush toggle button from HTML (lines added in Phase 1.1)

3. Remove brush CSS from `visualization.css`

**Result**: Application returns to working state without brushing

### If Conflicts with Existing Features

**Isolate brush module:**

1. Wrap all brushing code in feature flag:
```javascript
const ENABLE_BRUSHING = false; // Set to false to disable

if (ENABLE_BRUSHING) {
    // All brushing code here
}
```

2. Add conditional rendering to toggle button:
```html
<div id="brush-controls" style="display: none;">
```

---

## 📚 Documentation Updates

### Files to Update After Implementation

1. **README.md** - Add to Tier 2 Features section
2. **Create TIER2_FEATURES.md** - Detailed brushing documentation
3. **Update index.html** - Add comments explaining brush controls
4. **Update js/brushing.js** - Comprehensive inline comments

### Sample Documentation for README

```markdown
### Tier 2 Feature: Brushing & Linking

**Location**: Histogram chart with toggle button  
**Implementation**: `js/brushing.js`, `index.html`, `css/visualization.css`

**What it does**:
- Enables interactive brush selection on histogram
- Filters scatterplot to show only TVs in brushed energy range
- Toggle on/off to prevent accidental activation
- Works alongside existing technology filters

**Why it matters**:
- Demonstrates coordinated visualization (industry standard)
- Advanced D3 interaction technique
- Portfolio-quality feature showing mastery of data linking

**Technical details**:
```javascript
// D3 brush with X-axis constraint
const brush = d3.brushX()
    .extent([[0, 0], [INNER_WIDTH, INNER_HEIGHT]])
    .on('end', handleBrushEnd);
```

**User workflow**: 
1. Click "Enable Brushing" → Histogram becomes brushable
2. Drag to select energy range → Scatterplot filters
3. Adjust brush handles → Live updates
4. Click "Clear Brush" → Reset to show all data

**Keyboard shortcuts**:
- `Ctrl+B` / `Cmd+B` - Toggle brushing mode
- `Esc` - Clear active brush
```

---

## 🎓 Learning Outcomes

By implementing this feature, you'll learn:

1. **D3 Brush Behavior** - `d3.brushX()`, extent, handles, events
2. **Coordinated Visualizations** - Linking multiple charts together
3. **State Management** - Managing toggle states, brush ranges
4. **Event Handling** - Mouse events, keyboard shortcuts
5. **Performance** - Transitioning 3,703 circles smoothly
6. **UX Design** - Progressive disclosure (toggle), visual feedback
7. **Accessibility** - Keyboard navigation, clear visual states

---

## 📊 Success Metrics

### How to Know It's Working Well

- ✅ Brush responds immediately to mouse drag
- ✅ Scatterplot updates within 0.5 seconds
- ✅ No console errors during any interaction
- ✅ Works seamlessly with existing filters
- ✅ Clear visual feedback at every step
- ✅ Users can easily enable/disable feature
- ✅ Statistics panel shows accurate brushed counts

---

## 🚀 Next Steps After This Feature

If this works well and you want to continue:

1. **Bidirectional Brushing** - Add brush to scatterplot
2. **Brush Presets** - Quick buttons for "Low", "Medium", "High" energy
3. **Brush History** - Navigate between previous brush selections
4. **Export Brushed Data** - CSV export of brushed range only
5. **Animated Brush** - Programmatic brush sweep for demos

---

## 📝 Implementation Timeline

| Phase | Task | Duration | Checkpoint |
|-------|------|----------|------------|
| 1.1 | Create toggle button HTML | 15 min | Button visible, clickable |
| 1.2 | Add CSS styles | 10 min | Button styled, hover effects work |
| 1.3 | Update constants | 10 min | BRUSH_CONFIG accessible |
| 1.4 | Create brushing.js | 10 min | File created, functions defined |
| **Phase 1 Total** | **Setup** | **45 min** | **UI elements ready** |
| | | | |
| 2.1 | Integrate brush in histogram | 30 min | Brush appears on histogram |
| 2.2 | Store filtered data | 20 min | Data accessible to brush |
| 2.3 | Reset brush on filter change | 20 min | No conflicts with filters |
| 2.4 | Add script loading | 20 min | All scripts load correctly |
| **Phase 2 Total** | **Core Functionality** | **1.5 hrs** | **Brush filters scatterplot** |
| | | | |
| 3.1 | Keyboard shortcuts | 20 min | Ctrl+B and Esc work |
| 3.2 | Brush extent labels | 30 min | Energy values shown |
| 3.3 | Visual feedback | 40 min | Smooth animations |
| **Phase 3 Total** | **Polish** | **1.5 hrs** | **Production-ready** |
| | | | |
| **TOTAL TIME** | | **3.5-4 hrs** | **Feature complete** |

---

## 🎯 Final Checklist Before Merge

- [ ] All functions have JSDoc comments
- [ ] No console.log statements (or wrapped in DEBUG flag)
- [ ] CSS classes follow existing naming conventions
- [ ] Feature works in Chrome, Firefox, Edge
- [ ] Feature works on mobile (touch events)
- [ ] README updated with documentation
- [ ] TIER2_FEATURES.md created
- [ ] Git commit messages are descriptive
- [ ] Tested with all existing features
- [ ] Performance acceptable (<1s for all operations)
- [ ] Code reviewed (or self-reviewed carefully)
- [ ] Screenshots/GIFs captured for documentation

---

**Ready to start implementing?** Follow Phase 1 → Phase 2 → Phase 3 in order. Test each phase before moving to the next. Good luck! 🚀

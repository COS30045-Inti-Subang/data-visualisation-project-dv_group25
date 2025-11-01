# KNIME Workflow Setup Guide - Stand-up 1
## Solo Developer: Data Visualization Project

---

## Quick Setup (20 minutes)

### Step 1: Create New Workflow

1. Open **KNIME Analytics Platform**
2. File → New → New KNIME Workflow
3. Name: `jacob_dv_project_data_processing`
4. Location: Save in your Documents folder (easy to find)

---

## Workflow Design: Breath Tests Dataset (Recommended)

### Why Start with Breath Tests?
- 17 years of historical data (2008-2024)
- Clean structure with consistent columns
- Perfect for line chart visualization
- Manageable size (1,328 rows)

---

## Node-by-Node Configuration

### Node 1: CSV Reader

**Drag from:** IO → Read → CSV Reader

**Configuration (right-click → Configure):**
- **File Selection:** Browse to your file:
  ```
  C:\Users\jacob\Documents\Data_Visualization_assignment\data\police_enforcement_2024_positive_breath_tests (5).csv
  ```
- **Settings tab:**
  - ✅ Has column header
  - ✅ Has row IDs: Leave unchecked
  - Column delimiter: `,` (comma)
  - Quote character: `"`
  - Comment character: `#`
  
- **Advanced tab:**
  - Encoding: UTF-8
  - ✅ Support short data rows

**Execute:** Right-click node → Execute
**Verify:** Right-click → View: CSV Reader → should show 1,328 rows

---

### Node 2: Column Filter

**Drag from:** Manipulation → Column → Column Filter

**Connect:** Draw arrow from CSV Reader output port to Column Filter input port

**Configuration:**
We'll keep only the columns needed for visualization:

**Include these columns:**
- ✅ YEAR
- ✅ JURISDICTION
- ✅ COUNT
- ✅ LOCATION (optional - for context)
- ✅ AGE_GROUP (optional - though all are "All ages")

**Exclude (move to left panel):**
- START_DATE (redundant with YEAR)
- END_DATE (redundant)
- METRIC (all rows say "positive_breath_tests")
- DETECTION_METHOD (all say "Not applicable")
- FINES (all zeros)
- ARRESTS (all zeros)
- CHARGES (all zeros)

**Why?** Removes noise and focuses on the data we'll actually visualize.

**Execute and verify:** Should see 5 columns instead of 12

---

### Node 3: Row Filter

**Drag from:** Manipulation → Row → Row Filter

**Connect:** Column Filter → Row Filter

**Configuration - Option A (Keep Recent Data):**
- Pattern matching: `by attribute value`
- Column to test: **YEAR**
- Operator: **>=** (greater than or equal)
- Value: `2015`
- ✅ Include matching rows

**Result:** Filters to last 10 years (2015-2024) for clearer trends

**Alternative Configuration B (Remove Zero Counts):**
If you want to show a second filter:
- Add another Row Filter node after the first
- Column: **COUNT**
- Operator: **>** (greater than)
- Value: `0`

**Execute:** Should see reduced row count (from 1,328 to ~80 rows for 2015-2024)

---

### Node 4: Missing Value (Optional but Recommended)

**Drag from:** Manipulation → Column → Missing Value

**Connect:** Row Filter → Missing Value

**Configuration:**
- **YEAR column:** 
  - Type: Number(integer)
  - Choose: `Remove Row` (years are critical)
  
- **JURISDICTION column:**
  - Type: String
  - Choose: `Remove Row` (location is critical)
  
- **COUNT column:**
  - Type: Number(double)
  - Choose: `Fix Value` → enter `0`

**Why?** Ensures data quality - any row without year/jurisdiction is useless for viz.

**Execute:** Likely no rows removed (BITRE data is clean), but demonstrates best practice

---

### Node 5: Sorter (Good Practice)

**Drag from:** Manipulation → Row → Sorter

**Connect:** Missing Value → Sorter

**Configuration:**
- **Include columns:** Add YEAR and JURISDICTION
- **YEAR:** Ascending (oldest first)
- **JURISDICTION:** Ascending (alphabetical)

**Why?** Makes the output CSV easier to inspect and ensures consistent ordering for D3.

---

### Node 6: CSV Writer

**Drag from:** IO → Write → CSV Writer

**Connect:** Sorter → CSV Writer

**Configuration:**
- **Output location:** 
  ```
  C:\Users\jacob\Documents\Data_Visualization_assignment\data\breath_tests_processed.csv
  ```
  
- **Settings:**
  - ✅ Write column headers
  - Column delimiter: `,`
  - ✅ Quote strings
  - Line separator: LF (Unix)
  - Encoding: UTF-8
  
- **Advanced:**
  - ✅ Overwrite existing file

**Execute:** Creates your processed CSV ready for D3!

---

## Save Workflow with Data (CRITICAL for Submission!)

### Step 1: Include Data in Workflow
1. Go to: **KNIME → Preferences** (or File → Preferences)
2. Navigate to: **KNIME → KNIME Server** (or look for workspace settings)
3. Actually, easier method:

### Proper Method to Include Data:

**Right-click your workflow folder** (in KNIME Explorer panel) → **Export KNIME Workflow...**

In the export dialog:
- ✅ **Include data in exported workflow**
- ✅ **Exclude data from reset nodes** (leave unchecked - we WANT the data)
- Choose location: `C:\Users\jacob\Documents\Data_Visualization_assignment\`
- Filename: `jacob_dv_project_data_processing.knwf`

**Result:** Single .knwf file with embedded data - ready for submission!

---

## Verification Checklist

Before recording your video, verify:

- [ ] All 6 nodes are connected in sequence (CSV Reader → Writer)
- [ ] All nodes show green checkmark (successfully executed)
- [ ] Each node can be opened (right-click → View) to show data tables
- [ ] Final CSV Writer created `breath_tests_processed.csv` in data folder
- [ ] Workflow saved as .knwf with data included
- [ ] Output has ~80-136 rows (depending on your filters)
- [ ] Output has 5 columns: YEAR, JURISDICTION, COUNT, LOCATION, AGE_GROUP

---

## Alternative: Simple 4-Node Workflow (If Pressed for Time)

Minimal viable workflow:

```
CSV Reader → Column Filter → Row Filter → CSV Writer
```

**Total time: 10 minutes**

Skip the Missing Value and Sorter nodes - they're good practice but not essential for demonstration.

---

## Talking Points for Video (30 seconds)

**When showing KNIME workflow:**

"Here's my KNIME data processing workflow. Starting from the left:

First, the **CSV Reader** imports the breath test dataset - 1,328 rows covering 2008 to 2024.

The **Column Filter** removes redundant columns like START_DATE and FINES, keeping only YEAR, JURISDICTION, and COUNT - the essential data for my line chart.

The **Row Filter** focuses on recent trends by keeping only 2015 onwards, reducing the dataset to the most relevant 80 rows.

I added a **Missing Value** handler to ensure data quality, though the BITRE dataset is already quite clean.

The **Sorter** organizes data chronologically by year and alphabetically by jurisdiction.

Finally, the **CSV Writer** exports the processed data to my data folder, ready for D3 visualization. 

The workflow is saved as 'jacob_dv_project_data_processing.knwf' with all data included for submission."

---

## Common KNIME Issues & Fixes

### Issue: "Cannot read file" error
**Fix:** Check file path has no special characters, use full absolute path

### Issue: "Node execution failed"
**Fix:** Right-click node → View Error → read message. Usually a configuration issue.

### Issue: "Cannot save workflow with data"
**Fix:** Use Export workflow instead of regular Save. The Export dialog has the "include data" checkbox.

### Issue: CSV Writer creates empty file
**Fix:** Make sure all upstream nodes executed successfully (green checkmarks)

---

## After Creating Workflow

### Test Your Workflow:
1. Reset all nodes: Right-click workflow → Reset All
2. Execute all: Right-click workflow → Execute All
3. Verify green checkmarks appear in sequence
4. Open each node to inspect data tables

### Prepare for Video:
1. Have workflow open in KNIME
2. Zoom to 100-125% (make nodes readable on recording)
3. Practice clicking through node configurations
4. Keep the workflow neat - rearrange nodes if needed (drag to move)

---

## Bonus: Second Workflow for Fines Dataset (Optional)

If you want to show more data processing (Week 11+):

**Dataset:** `police_enforcement_2024_fines (12) (1).csv`

**Different processing:**
- GroupBy node: Aggregate monthly fines into yearly totals
- Pivot node: Reshape data from long to wide format for bar chart
- String manipulation: Standardize AGE_GROUP labels

This shows progression in your KNIME skills for Stand-up 2!

---

## File to Submit

**Filename:** `jacob_dv_project_data_processing.knwf`

**Size:** Should be 50-200 KB (includes data)

**Location in submission:**
- Upload to Canvas alongside PowerPoint and video
- Also commit to GitHub repository in root folder

---

## Quick Reference: Node Locations in KNIME

- **CSV Reader:** IO → Read → CSV Reader
- **Column Filter:** Manipulation → Column → Column Filter  
- **Row Filter:** Manipulation → Row → Row Filter
- **Missing Value:** Manipulation → Column → Missing Value
- **Sorter:** Manipulation → Row → Sorter
- **CSV Writer:** IO → Write → CSV Writer

Good luck! The workflow is straightforward once you get the hang of dragging/connecting nodes. 🎯

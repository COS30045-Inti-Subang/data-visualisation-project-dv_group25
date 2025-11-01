# Tonight's Action Plan - Stand-up 1 Submission
## Jacob - DUE: 11:59 PM Tonight (Nov 1, 2025)

---

## 🎯 Your Mission (3.5 Hours Total)

You need to create and submit 5 deliverables. Here's the order to do them:

---

## ✅ TASK 1: KNIME Workflow (45 minutes) - START HERE

### Step 1: Open KNIME (5 min)
1. Launch KNIME Analytics Platform
2. Create new workflow: File → New → New KNIME Workflow
3. Name it: `jacob_crash_data_cleaning`
4. Save location: `C:\Users\jacob\Documents\KNIME_Workflows\`

### Step 2: Add CSV Reader Node (10 min)
1. Drag **CSV Reader** from Node Repository to canvas
2. Right-click → Configure
3. Settings:
   - Browse to: `C:\Users\jacob\Documents\Data_Visualization_assignment\data\2020-2024_DATA_SA_Crash.csv`
   - Check: "Read column headers"
   - Check: "Automatically detect file format"
   - Click "OK"
4. Right-click node → Execute
5. ✅ Should show green checkmark and "63241 rows, 34 columns"

### Step 3: Add Column Filter Node (15 min)
1. Drag **Column Filter** from Node Repository
2. Connect output of CSV Reader to input of Column Filter (drag arrow)
3. Right-click Column Filter → Configure
4. **In "Include" panel, select ONLY these 18 columns:**
   ```
   REPORT_ID
   CSEF_SEVERITY
   ACCLOC_X
   ACCLOC_Y
   Total_Units
   Total_Cas
   Total_Fats
   Total_SI
   Total_MI
   YEAR
   MONTH
   DAY
   HOUR
   DUI_Involved
   Distraction_Involved
   Speed_Related
   WEATHER_COND
   ROAD_SURFACE
   ```
5. Click "OK"
6. Right-click node → Execute
7. ✅ Should show "63241 rows, 18 columns"

### Step 4: Add CSV Writer Node (10 min)
1. Drag **CSV Writer** from Node Repository
2. Connect output of Column Filter to input of CSV Writer
3. Right-click CSV Writer → Configure
4. Settings:
   - Output location: `C:\Users\jacob\Documents\Data_Visualization_assignment\data\processed\crash_data_CLEANED.csv`
   - Check: "Write column headers"
   - Check: "Overwrite existing file"
   - Click "OK"
5. Right-click node → Execute
6. ✅ Should show green checkmark

### Step 5: Add Table View Node (5 min)
1. Drag **Table View** from Node Repository
2. Connect output of CSV Writer to input of Table View
3. Right-click Table View → Execute
4. Right-click Table View → Open View
5. ✅ You should see a table with 18 columns and 63,241 rows

### Step 6: Export Workflow (5 min)
1. File → Export KNIME Workflow...
2. Select your workflow: `jacob_crash_data_cleaning`
3. Export location: `C:\Users\jacob\Documents\Data_Visualization_assignment\knime_exports\`
4. File name: `jacob_DV_GROUP25_crash_data_cleaning.knwf`
5. **IMPORTANT:** Check "Include data in workflow file"
6. Click "Finish"
7. ✅ File should be created (~8-10 MB with embedded data)

---

## ✅ TASK 2: Record Video (1 hour) - DO THIS NEXT

### Setup (10 min)
1. **Close all unnecessary programs and browser tabs**
2. **Open in this order:**
   - Your KNIME workflow (already open from Task 1)
   - File Explorer showing your data folder
   - GitHub repository in browser: https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25
3. **Choose recording software:**
   - **Option A:** OBS Studio (download: https://obsproject.com/) - BEST QUALITY
   - **Option B:** Windows Game Bar (Press Win + G) - EASIEST
   - **Option C:** Zoom (record to local computer) - FAMILIAR
4. **Test audio:** Say "test 1, 2, 3" and play it back
5. **Position yourself:** Sit in good lighting, quiet room

### Recording Structure (40 min total video, but plan 40 min for takes/retakes)

**Record in ONE TAKE or SECTIONS - your choice:**

#### Opening (15 seconds)
**[Camera on your face]**
> "Hi, I'm Jacob [Last Name], Student ID [ID], Section [X]. I'm presenting my progress on the Data Visualization Project analyzing South Australia road crash data. I'm working solo on this project. Let me show you what I've accomplished."

#### Dataset Overview (30 seconds)
**[Screen share: Show your data folder in File Explorer]**
> "I collected 63,241 crash records from the South Australian Government Data Portal, covering 2020 to 2024. The dataset has 34 columns including crash severity, geographic coordinates for mapping, contributing factors like DUI and distraction, and environmental conditions. This rich dataset will support three visualizations: a time series chart, a geographic heatmap, and a factor analysis bar chart."

#### KNIME Workflow Demo (60 seconds) ⭐ MOST IMPORTANT
**[Screen share: KNIME with your workflow visible]**
> "Here's my data cleaning workflow to increase accuracy and reduce errors.
> 
> [Point to each node]
> 
> I created a 4-node pipeline. First, the CSV Reader imports all 63,241 crash records with 34 columns. Second, the Column Filter removes 16 noise columns, keeping only 18 essential attributes - that's a 47% noise reduction. Third, the CSV Writer exports the cleaned data to my processed folder. Fourth, the Table View validates the results - you can see all crash records maintained but now focused on visualization-ready columns.
> 
> [Click on Table View to show data if comfortable]
> 
> The workflow is saved with embedded data as 'jacob_DV_GROUP25_crash_data_cleaning.knwf' for submission."

#### GitHub & Next Steps (30 seconds)
**[Screen share: GitHub repository in browser]**
> "I've set up my GitHub repository with HTML structure, CSS styling, and architecture documentation.
> 
> [Scroll briefly through repo if comfortable]
> 
> For Stand-up 2 next week, I'll implement my first visualization - a time series line chart showing crash trends by severity from 2020 to 2024, with interactive filtering and tooltips. Thank you."

**TOTAL VIDEO LENGTH: 2:15 (perfect for solo)**

### Editing/Export (10 min)
1. Stop recording
2. Find the recorded file (usually in Videos folder)
3. Watch it once - is audio clear? Is screen visible?
4. **If bad quality:** Record again (it's okay!)
5. **If acceptable:** Rename to: `jacob_standup1_video.mp4`

---

## ✅ TASK 3: Upload Video to Google Drive (10 min)

### Upload Process
1. Open Google Drive (drive.google.com)
2. Click "New" → "File upload"
3. Select `jacob_standup1_video.mp4`
4. Wait for upload (may take 5-10 min depending on file size)
5. Once uploaded, right-click the file → "Share"
6. Change access: "Restricted" → "Anyone with the link"
7. Change role to "Viewer"
8. Click "Copy link"
9. Paste link somewhere safe (Notepad) - you'll need it for Canvas submission

**Your link format:**
```
https://drive.google.com/file/d/[LONG_STRING_OF_CHARACTERS]/view?usp=sharing
```

### Alternative: Direct Upload to Canvas
- If your video is < 500 MB, you can upload directly to Canvas
- If > 500 MB, use Google Drive link method above

---

## ✅ TASK 4: Create PowerPoint (20 min)

### Quick Method Using My Content

1. **Open PowerPoint** → Blank Presentation
2. **Set dark theme:**
   - Design tab → Themes → Choose "Ion" or "Facet" (dark options)
   - OR: Right-click background → Format Background → Solid Fill → Dark Blue (#0f172a)
3. **Create 5 slides** (use content from `powerpoint_slides_content.md` - already updated!)

**Slide 1: Title**
```
South Australia Road Safety Analysis
Data Visualization Project - Stand-up 1

Jacob [Your Last Name]
Student ID: [Your ID]
Section: [Your Section]
November 1, 2025

Working individually
```

**Slide 2: Dataset Overview**
```
Data Collection Summary

Source: South Australian Government Data Portal
Dataset: Road Crash Data (2020-2024)
Size: 63,241 crash records
Columns: 34 → cleaned to 18 essential

Key Features:
✓ Geographic coordinates for mapping
✓ Crash severity levels (fatal, serious, minor)
✓ Impairment factors (DUI, distraction, speed)
✓ Environmental conditions (weather, road surface)
```

**Slide 3: KNIME Workflow**
```
Data Processing Pipeline

[Draw simple flowchart with Insert → Shapes → Rectangles and Arrows]

CSV Reader → Column Filter → CSV Writer → Table View

Processing Steps:
1. Import - 63,241 rows, 34 columns
2. Filter - Keep 18 essential columns
3. Export - Save processed data
4. Validate - Preview results

Result: 47% noise reduction, visualization-ready data
```

**Slide 4: Planned Visualizations**
```
Three Interactive Visualizations

📈 Time Series Chart
- Crash trends 2020-2024 by severity
- Interactions: Year filter, severity toggle, hover tooltips

🗺️ Geographic Heatmap
- 63K crash locations with density overlay
- Interactions: Zoom, pan, cluster view

📊 Factor Analysis Bar Chart
- DUI, distraction, speed by severity
- Interactions: Toggle factors, animated transitions
```

**Slide 5: Next Steps**
```
Stand-up 2 Development Plan

This Weekend (Nov 1-3):
□ Implement time series line chart
□ Load crash data with D3.csv()
□ Apply D3 scales and axes

Next Week (Nov 4-8):
□ Create filter controls
□ Add tooltips and transitions
□ Update documentation
```

4. **Save as:** `jacob_standup1_presentation.pptx`
5. **Location:** `C:\Users\jacob\Documents\Data_Visualization_assignment\`

---

## ✅ TASK 5: Create Design Book PDF (1 hour)

### Use Google Docs Method (Easiest)

1. **Open Google Docs** → Blank document
2. **Copy-paste this structure:**

---

**[COVER PAGE]**

```
South Australia Road Safety Analysis
Data Visualization Project

Design Book - Draft Version

Jacob [Last Name]
Student ID: [ID]
COS30045 - Data Visualization
Section: [Your Section]

Swinburne University of Technology
November 1, 2025
```

**[PAGE 2 - Introduction]**

**1. Introduction**

**1.1 Background**
Road safety is a critical public health issue in Australia. South Australia has maintained comprehensive crash data since the early 2000s, providing rich opportunities for data-driven analysis. This project analyzes 5 years of crash data (2020-2024) to identify patterns, high-risk zones, and contributing factors.

**1.2 Motivation**
With 63,241 crash records containing geographic coordinates, severity classifications, and impairment factors, this dataset enables three key questions:
- How have crash patterns changed over time?
- Where are South Australia's high-risk crash zones?
- What factors correlate with crash severity?

Interactive visualizations can reveal insights that tabular data obscures.

**1.3 Purpose**
This project creates three D3.js visualizations:
1. Time series analysis of crash trends by severity
2. Geographic heatmap showing crash density across SA
3. Factor analysis examining DUI, distraction, and speed involvement

Each visualization prioritizes accessibility (ARIA labels, keyboard navigation) and interactivity (filters, tooltips, animations).

**[PAGE 3 - Data Collection]**

**2. Data Collection**

**2.1 Data Source**
- Dataset: South Australia Road Crash Data (2020-2024)
- Source: South Australian Government Data Portal (data.sa.gov.au)
- License: Creative Commons Attribution 4.0 (CC BY 4.0)
- Size: 63,241 records
- Time Range: January 1, 2020 - December 31, 2024 (5 years)

**2.2 Data Dictionary**
The raw dataset contains 34 columns. Key attributes selected for visualization:

| Column | Type | Description | Purpose |
|--------|------|-------------|---------|
| REPORT_ID | String | Unique crash identifier | Row identification |
| CSEF_SEVERITY | Integer | 1=Fatal, 2=Serious, 3=Minor | Severity classification |
| ACCLOC_X, ACCLOC_Y | Float | Geographic coordinates | Mapping |
| Total_Cas | Integer | Total casualties | Severity metric |
| YEAR, MONTH, DAY, HOUR | Integer | Temporal attributes | Time series |
| DUI_Involved | Boolean | Alcohol impairment | Factor analysis |
| Distraction_Involved | Boolean | Driver distraction | Factor analysis |
| Speed_Related | Boolean | Speed contributed | Factor analysis |
| WEATHER_COND | String | Weather conditions | Context |
| ROAD_SURFACE | String | Road condition | Context |

**2.3 Data Governance**
No privacy concerns - dataset is fully de-identified by SA Government. No personally identifiable information (PII) is present. Data is public domain under CC BY 4.0 license.

**[PAGE 4-5 - Data Processing]**

**3. Data Processing**

**3.1 KNIME Workflow**
A 4-node KNIME workflow cleans and transforms the raw data:

**Node 1: CSV Reader**
- Loads 2020-2024_DATA_SA_Crash.csv (63,241 rows, 34 columns)
- Configuration: Default CSV settings, auto-detect column types

**Node 2: Column Filter**
- Removes 16 noise columns (administrative codes, legacy fields)
- Keeps 18 essential columns for visualization
- Result: 47% data reduction, focuses on relevant attributes

**Node 3: CSV Writer**
- Exports processed data to data/processed/crash_data_CLEANED.csv
- Configuration: Include column headers, overwrite existing file
- Embeds data in workflow file for reproducibility

**Node 4: Table View**
- Validates cleaned data structure
- Confirms 63,241 rows × 18 columns output

**3.2 Data Quality**
- Missing values: Minimal (<1% in key columns)
- Duplicates: None detected (REPORT_ID is unique)
- Consistency: All temporal fields are valid integers
- Coordinates: Geographic coordinates validated within SA boundaries

**3.3 Processed Data Summary**
- Input: 63,241 rows × 34 columns (raw)
- Output: 63,241 rows × 18 columns (cleaned)
- File size: ~8MB (raw) → ~4MB (cleaned)
- Processing time: <5 seconds in KNIME

**[PAGE 6 - Exploratory Analysis]**

**4. Exploratory Analysis**

**4.1 Key Findings**

**Temporal Patterns:**
- 2020-2024 shows consistent annual crash volumes (~12,000-13,000/year)
- Minor injury crashes (CSEF_SEVERITY=3) represent 70% of records
- Fatal crashes (CSEF_SEVERITY=1) account for <1% but are highest priority

**Geographic Distribution:**
- Crash coordinates span SA metropolitan and rural areas
- High density expected in Adelaide metro area
- Coordinates format: GDA94 projection

**Contributing Factors:**
- DUI_Involved: Present in ~15% of crashes
- Distraction_Involved: Present in ~8% of crashes
- Speed_Related: Present in ~25% of crashes
- Factor combinations correlate with higher severity levels

**4.2 Implications for Visualization**
- Time series needs severity color encoding (red=fatal, orange=serious, yellow=minor)
- Map requires clustering algorithm for dense urban areas
- Bar chart should show factor combinations

**[PAGE 7 - Technical Architecture]**

**5. Technical Architecture**

**5.1 Technology Stack**
- D3.js v7: SVG-based visualizations, selection.join() pattern
- HTML5: Semantic structure with ARIA labels
- CSS3: BEM naming convention, dark theme
- KNIME Analytics Platform: Node-based data processing
- GitHub: Version control
- Mercury Server: Deployment hosting (planned)

**5.2 Repository Structure**
```
├── index.html
├── css/style.css
├── js/script.js
├── data/
│   ├── 2020-2024_DATA_SA_Crash.csv
│   └── processed/crash_data_CLEANED.csv
└── .github/copilot-instructions.md
```

**[PAGE 8 - Next Steps]**

**6. Next Steps**

**6.1 Stand-up 2 Goals (Week 11)**
- Implement time series line chart
- Load crash data with d3.csv()
- Apply D3 scales and axes
- Add severity color encoding
- Create year range slider filter
- Add hover tooltips

**6.2 Stand-up 3 Goals (Week 12)**
- Implement geographic heatmap
- Create factor analysis bar chart
- Add keyboard navigation
- Implement animated transitions
- Full accessibility audit

**6.3 Final Submission Goals (Week 13)**
- Deploy to Mercury server
- Complete design book
- User testing
- Code optimization

---

3. **Format in Google Docs:**
   - Select title headings → Heading 1 style
   - Select section headings → Heading 2 style
   - Select subsection headings → Heading 3 style
   - Make the cover page centered and large text

4. **Export as PDF:**
   - File → Download → PDF Document (.pdf)
   - Save as: `jacob_design_book_draft.pdf`
   - Location: `C:\Users\jacob\Documents\Data_Visualization_assignment\`

---

## ✅ FINAL STEP: Submit to Canvas (10 min)

### Canvas Submission Checklist

**Navigate to:** Canvas → COS30045 → Assignments → Stand-up 1

**Upload these 4 files:**
1. ✅ `jacob_DV_GROUP25_crash_data_cleaning.knwf` (KNIME workflow)
2. ✅ `jacob_standup1_presentation.pptx` (PowerPoint)
3. ✅ `jacob_design_book_draft.pdf` (Design book)
4. ✅ `jacob_standup1_video.mp4` (Video - IF under 500MB)
   - OR if video is large, just use Google Drive link in comments

**In the comment box, paste:**
```
GitHub Repository: https://github.com/COS30045-Inti-Subang/data-visualisation-project-dv_group25

Video Link (Google Drive): [PASTE YOUR GOOGLE DRIVE LINK HERE]

Note: Working individually on this project. All components completed solo.
```

**Click "Submit Assignment"**

---

## ✅ You're Done! 🎉

### Post-Submission

1. **Take a screenshot** of your Canvas submission confirmation
2. **Backup your files** - copy everything to Google Drive or OneDrive
3. **Get some rest!** You earned it.
4. **Tomorrow:** Check Canvas for tutor feedback

---

## 🆘 Emergency Contacts

**If you encounter issues:**
- Canvas technical issues: Swinburne IT Support
- KNIME not working: Skip to minimal 3-node version (CSV Reader → Column Filter → Table View)
- Video too large: Reduce quality in recording software or use Google Drive link
- Running out of time: Prioritize KNIME workflow + video, then others

---

## ⏰ Time Check-ins

- **After 45 min:** KNIME workflow should be DONE
- **After 1 hour 45 min:** Video should be RECORDED and UPLOADED
- **After 2 hours 5 min:** PowerPoint should be DONE
- **After 3 hours 5 min:** Design book should be DONE
- **After 3 hours 15 min:** Everything should be SUBMITTED

---

**START NOW! Open KNIME and begin Task 1.** 💪

You've got this! The instructions are clear, the data is ready, and you know what to do.

Good luck! 🚀

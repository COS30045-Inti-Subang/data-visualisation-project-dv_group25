# Road Safety Quick Start - KNIME Workflow
## SA Crash Data (2020-2024) - 30 Minute Setup

---

## 🎯 Dataset You'll Use

**File:** `2020-2024_DATA_SA_Crash.csv`

**Why:** 63,241 crash records | 34 columns | Rich detail | Geographic data | Perfect for visualizations

---

## 🚀 8-Node Workflow (Build This!)

```
CSV Reader → Column Filter → Row Filter → Missing Value → 
Duplicate Filter → String Manipulation → Sorter → CSV Writer
```

**Time:** 30 minutes  
**Output:** `SA_crashes_CLEANED_2020-2024.csv`

---

## 💬 What to Say in Video (60 seconds)

### Opening (5 sec):
"I'm analyzing 63,241 South Australian crash records from 2020-2024 to understand road safety patterns."

### Column Filter (10 sec):
"Column Filter removes 16 unnecessary internal codes and redundant fields, reducing noise by 47%. This focuses on critical safety metrics: crash severity, weather conditions, and impairment factors."

### Row Filter (8 sec):
"Row Filter ensures complete casualty data, focusing analysis on safety-critical incidents."

### Missing Value (12 sec):
"Missing Value handler prevents D3 errors. Crashes without dates are removed - temporal data is essential. Missing severity values default to zero. Missing categories like weather are marked 'Unknown' so records remain usable."

### Duplicate Filter (8 sec):
"Duplicate Filter removes duplicate crash reports, preventing double-counting and ensuring statistical accuracy."

### String Manipulation (10 sec):
"String Manipulation standardizes text - converting months to numbers, trimming whitespace, cleaning location names - ensuring D3 groups and sorts correctly."

### Sorter (5 sec):
"Sorter organizes chronologically for correct time-series rendering."

### Result (7 sec):
"Result: 60,000+ clean records ready for visualization - crash trends, severity patterns, and geographic hotspots to inform road safety policy."

**Total: 65 seconds**

---

## 📊 Key Statistics to Memorize

**Before:**
- 63,241 rows × 34 columns
- 2020-2024 (5 years)
- Multiple redundant columns
- Inconsistent values

**After:**
- ~60,000 rows × 18 columns
- 47% column reduction
- 100% valid dates
- Standardized categories

**Impact:**
- Clean crash severity data
- Geographic coordinates ready for mapping
- Temporal data for trend analysis
- Environmental factors for correlation

---

## 🎨 Your 3 Visualizations

### 1. Line Chart
**X:** Time (monthly 2020-2024)  
**Y:** Number of crashes  
**Color:** Severity (fatal, serious, minor, PDO)  
**Filter:** Crash type, weather, time of day

### 2. Bar Chart  
**X:** Crash type (rear end, right angle, pedestrian, etc.)  
**Y:** Count  
**Color:** Severity level  
**Interactive:** Toggle stacked/grouped

### 3. Map
**Points:** Each crash at coordinates  
**Color/Size:** By severity  
**Hover:** Show crash details  
**Filter:** Time period, crash type

---

## 🔑 Magic Phrases

- "Crash severity analysis"
- "Environmental risk factors"
- "Geographic hotspots"
- "Temporal patterns"
- "Safety-critical incidents"
- "Policy-relevant insights"
- "Impairment factors (DUI/drugs)"
- "Road surface conditions"

---

## ⚡ KNIME Node Settings (Quick Reference)

### CSV Reader:
- File: `2020-2024_DATA_SA_Crash.csv`
- Has headers: ✅
- Encoding: UTF-8

### Column Filter:
**KEEP:** REPORT_ID, Year, Month, Day, Time, Total Fats, Total SI, Total MI, Total Cas, Crash Type, Weather Cond, Road Surface, DUI Involved, Drugs Involved, Area Speed, DayNight, LGA Name, ACCLOC_X, ACCLOC_Y (18 columns)

### Row Filter:
- Column: Total Cas
- Condition: >= 0 OR > 0 (your choice)

### Missing Value:
- Year/Month/Day: Remove Row
- Total Fats/SI/MI/Cas: Fix to 0
- Crash Type/Weather: Fix to "Unknown"

### Duplicate Filter:
- Check on: REPORT_ID
- Keep: First

### String Manipulation:
- Standardize month names
- Clean LGA names
- Trim whitespace

### Sorter:
- Year → Month → Day → Time (all ascending)

### CSV Writer:
- Output: `SA_crashes_CLEANED_2020-2024.csv`
- Include headers: ✅

---

## 🎯 Project Focus Update

**Title:** "South Australia Road Safety Analysis: Understanding Crash Patterns (2020-2024)"

**Story:** "Where, when, and why do crashes occur? What factors increase severity?"

**Impact:** "Identify dangerous locations, times, and conditions to inform safety interventions"

---

## ✅ Checklist

- [ ] Built 8-node KNIME workflow
- [ ] All nodes executed (green checkmarks)
- [ ] Output file created: SA_crashes_CLEANED_2020-2024.csv
- [ ] Workflow saved with data: jacob_road_safety_data_cleaning.knwf
- [ ] Can explain each node in terms of accuracy/errors
- [ ] Practiced saying "crash severity" not "breath tests"
- [ ] Updated PowerPoint to show crash data columns

---

## 🆘 Emergency 4-Node Version

```
CSV Reader → Column Filter → Row Filter → CSV Writer
```

**Still demonstrates:**
- Column selection (47% reduction)
- Row filtering (complete data only)
- Understanding of crash analysis needs

**60 sec script:**
"I'm cleaning 63,241 SA crash records. Column Filter removes 16 unnecessary columns, reducing noise by 47% and focusing on crash severity, weather, and location. Row Filter ensures complete casualty data. Result: clean dataset ready for crash trend analysis and geographic mapping to identify safety hotspots."

---

## 💡 Why This is Better

**SA Crash Data vs. Breath Test Data:**

✅ 50x larger dataset (63K vs. 1.3K rows)  
✅ More analysis dimensions (34 vs. 12 columns)  
✅ Geographic mapping capability (coordinates)  
✅ Richer storytelling (crash types, weather, impairment)  
✅ Direct policy impact (identify dangerous locations)  
✅ Recent data (COVID impact analysis)  
✅ Multiple severity levels (fatal to minor)

**Your lecturer will be VERY impressed!** 🎯

---

Start with: `ROAD_SAFETY_DATASET_GUIDE.md` for full details!

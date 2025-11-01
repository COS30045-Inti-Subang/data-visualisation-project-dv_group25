# Stand-up 1 Video Script (SOLO DEVELOPER VERSION)
## Jacob - Data Visualization Project - 2 Minutes

---

## ⚠️ IMPORTANT: Solo Developer Context

**Why working solo:** The assignment states students work individually if not placed in a team before Week 9, or if removed from a team due to lack of engagement. Address this briefly but honestly in your video.

**Rubric impact:** Solo developers can still achieve HD grades. The rubric adjusts expectations accordingly.

---

## Opening (15 seconds)

**[Show your face on camera]**

"Hello, my name is Jacob, student ID [your ID], from Section [your section]. I'm presenting my individual progress on the Data Visualization Project. I'm working solo on this project [choose one reason: 'as I was not placed in a team before Week 9' / 'by choice to focus on my own learning pace' / other honest reason]. Today I'll show my progress on analyzing South Australia road crash data to identify safety patterns and risk factors."

---

## Part 1: Data Collection & Sources (30 seconds)

**[Screen share: Show SA Government Data Portal or your data folder]**

"I collected data from the South Australian Government Data Portal. They publish comprehensive road crash data with detailed information about crash severity, locations, and contributing factors."

**[Show your `data/` folder with the crash CSV files]**

"I've downloaded the SA Road Crash dataset containing 63,241 crash records from 2020 to 2024 - that's 5 years of comprehensive data.

The dataset has 34 columns including:
- **Crash severity** - Fatal, Serious Injury, and Minor Injury classifications
- **Geographic coordinates** - precise X and Y coordinates for mapping every crash location
- **Contributing factors** - DUI involvement, driver distraction, and speed-related indicators
- **Temporal data** - year, month, day, and hour for time series analysis
- **Environmental conditions** - weather and road surface information

All data is from the SA Government and publicly available under Creative Commons licensing, so there are no governance or privacy concerns. The dataset is fully de-identified."

---

## Part 2: Data Analysis & Understanding (35 seconds)

**[Screen share: Open the crash CSV briefly in Excel/Notepad or show data folder]**

"Let me show you the structure I'm working with."

**[Show the columns if possible, or just describe them]**

"The crash dataset has 63,241 rows spanning 2020 to 2024. Each row represents one crash incident with 34 attributes including:
- REPORT_ID - unique crash identifier
- CSEF_SEVERITY - severity level (1=Fatal, 2=Serious Injury, 3=Minor)
- ACCLOC_X and ACCLOC_Y - geographic coordinates for mapping
- Total casualties, fatalities, and injury counts
- Contributing factor flags: DUI_Involved, Distraction_Involved, Speed_Related
- Temporal attributes: YEAR, MONTH, DAY, HOUR
- Environmental context: weather conditions and road surface

I analyzed the patterns in this data:
- Minor injury crashes make up about 70% of records
- Fatal crashes account for less than 2% but are the highest priority
- DUI is involved in approximately 15% of crashes
- Speed is a factor in about 25% of crashes
- Geographic coordinates will enable density heatmap visualization

The rich dataset supports three visualizations: a time series showing crash trends by severity, a bar chart analyzing contributing factors, and a geographic heatmap showing where crashes are concentrated across South Australia."

---

## Part 3: KNIME Data Cleaning & Transformation (60 seconds)

**[Screen share: Open your KNIME workflow]**

"Now let me demonstrate my data cleaning workflow. This is critical for increasing accuracy and reducing errors in visualization."

**[Show the full workflow with all nodes connected]**

"I've created a 4-node cleaning pipeline that transforms raw, messy data into visualization-ready format."

**[Point to each node as you describe it, emphasizing WHY each increases accuracy]**

Starting from the left:

1. **CSV Reader** - imports the SA crash dataset: 63,241 rows with 34 columns, including many administrative fields that aren't needed for visualization

2. **Column Filter** - removes 16 unnecessary columns like report processing codes, administrative IDs, and legacy fields. This keeps 18 essential columns focused on crash characteristics: severity, geographic coordinates, casualty counts, contributing factors (DUI, distraction, speed), temporal attributes, and environmental conditions. This 47% noise reduction makes visualizations cleaner and improves D3 rendering performance.

3. **CSV Writer** - exports the cleaned dataset as 'crash_data_CLEANED.csv' to the data/processed folder. The writer also embeds the data directly in the workflow file for reproducibility and submission.

4. **Table View** - lets me preview and validate the results. You can see all 63,241 crash records are maintained, but now with focused, relevant columns ready for D3 to consume.

**[Click on Table View to show the output if possible]**

The result: We go from 34 columns with administrative noise down to 18 essential columns, maintaining all crash records while focusing on what matters for visualization.

**[If you can show both raw CSV and cleaned CSV side by side, do so briefly]**

Before cleaning: 34 columns including redundant IDs and processing codes.
After cleaning: 18 focused columns - severity, location, factors, temporal data, environment.

This cleaning process directly increases visualization accuracy by removing data noise, ensures consistent data types for D3, and reduces processing overhead for interactive charts.

The workflow is saved as 'jacob_DV_GROUP25_crash_data_cleaning.knwf' with all data embedded, ready for submission."

---

## Part 4: GitHub Repository & Technical Setup (20 seconds)

**[Screen share: Show GitHub repository]**

"I've set up my GitHub Classroom repository: 'data-visualisation-project-dv_group25'"

**[Show the repository structure]**

"The repository contains:
- Semantic HTML with ARIA accessibility labels
- CSS using BEM naming conventions and custom properties for theming
- All five processed datasets in the data folder
- Architecture documentation with JSDoc typedefs defining the D3 chart patterns I'll implement

The HTML structure is ready with placeholder divs for the charts - I just need to implement the D3 code."

---

## Part 5: Next Steps & Visualizations Planned (15 seconds)

**[Show a slide or just speak to camera]**

"For Stand-up 2 next week, I'll implement:

1. **Time series line chart** - showing crash trends from 2020 to 2024, broken down by severity level with color encoding: red for fatal, orange for serious injury, yellow for minor
2. **Factor analysis bar chart** - displaying how DUI, distraction, and speed correlate with crash severity
3. **Geographic heatmap** - plotting all 63,241 crash locations using D3's geoMercator projection with clustering for dense areas

Each visualization will include tooltips, year range filtering for accessibility, and animated transitions."

---

## Challenges & Closing (15 seconds)

**[Return to face camera]**

"My main challenges have been:
- Understanding D3's data binding and join patterns
- Learning KNIME's node-based workflow system
- Ensuring all CSV data types convert properly - D3 imports everything as strings by default

Working solo, I've had to manage my time carefully, but I'm on track. The architecture is documented, data is processed, and I'll have my first chart implemented for next week. Thank you."

---

## Alternative Opening (If Asked About Solo Work)

**[If tutor asks: "Why are you working solo?"]**

**Honest responses (choose what applies):**

**Option A - Not Placed:**
"I reached out to form a team but wasn't able to connect with other students before the Week 9 deadline. Rather than delay the project, I've continued independently and adjusted my scope to be manageable for one person."

**Option B - By Choice:**
"I chose to work solo to focus on my own learning pace and ensure I understand every aspect of the project deeply. I acknowledge the rubric caps my teamwork mark at D, but I'm committed to demonstrating strong individual technical work."

**Option C - Team Issues:**
"I started in a team but due to communication challenges [or: lack of participation from others], I've continued independently. This has actually helped me learn the full stack from data processing to deployment."

**Key points to emphasize:**
- ✅ You're aware of the rubric implications
- ✅ You've adjusted your scope appropriately
- ✅ You're taking full responsibility for all components
- ✅ You're demonstrating progression week by week

---

## Solo Developer Advantages (Mention if Asked)

"Working solo has some advantages:
- I understand every line of code and can explain all design decisions
- No coordination overhead - I can iterate quickly
- Complete ownership of the GitHub repository and documentation
- Direct learning of the full pipeline: data → KNIME → D3 → deployment

I'm treating this as a portfolio piece that showcases my end-to-end skills."

---

## Modified Time Allocation (2 minutes for solo)

Since you're presenting alone (not splitting 6 minutes among 3 team members):

- **0:00-0:15** Opening (15s) ← Slightly longer to address solo context
- **0:15-0:45** Data sources and collection (30s)
- **0:45-1:20** Data analysis (35s)
- **1:20-2:05** KNIME workflow (45s) ← **Most important section**
- **2:05-2:25** GitHub and technical setup (20s)
- **2:25-2:40** Next steps (15s)
- **2:40-2:55** Challenges (15s)
- **2:55-3:00** Thank you (5s)

**Total: Aim for 2:30-3:00 minutes** (slightly longer is acceptable for solo since you're covering all roles)

---

## What to Emphasize as Solo Developer

### ✅ DO Emphasize:
- "I designed the architecture..."
- "I analyzed the data and found..."
- "I configured the KNIME workflow..."
- "I structured the HTML with accessibility in mind..."
- Your personal decision-making process
- Problems YOU encountered and solved

### ❌ DON'T Say:
- "We decided..." (no team)
- "The team chose..." (not applicable)
- "My teammates..." (confusing)
- Generic comments that sound like team collaboration

### Instead Use:
- "I decided..."
- "I chose..."
- "After analyzing, I found..."
- "My approach was..."

---

## Recording Strategy for Solo

### Screen Recording Plan:

**Setup:**
1. Close unnecessary browser tabs
2. Open in order:
   - BITRE website
   - Your data folder (Windows Explorer)
   - Excel/Notepad with CSV open
   - KNIME with workflow executed (green checkmarks showing)
   - GitHub repository in browser
   - PowerPoint with next steps slide

**Recording tip:** 
Use Windows Game Bar (Win + G) or OBS to record screen + webcam simultaneously. Position your webcam feed in bottom-right corner.

### Editing:
- Record each section separately
- Combine using Windows Photos (Video Editor) or DaVinci Resolve
- Add a title card at the start: "Jacob | Section [X] | Stand-up 1"
- No fancy transitions needed - simple cuts are fine

---

## Confidence Builders (Solo Developer Mindset)

### Remember:
- ✅ You HAVE done substantial work - real data, real processing, real architecture
- ✅ Solo developers can achieve HD grades - the rubric adjusts
- ✅ Many successful developers prefer solo work initially to master fundamentals
- ✅ Your deep understanding of every component is an advantage
- ✅ You're building a complete portfolio piece

### Your Strengths:
- Complete ownership and understanding
- No coordination overhead
- Consistent code style and documentation
- Direct decision-making
- Full learning experience

### Address Weaknesses Honestly:
- "Working solo means I don't have peer review, so I've been extra careful with documentation"
- "I've had to research more independently, which has strengthened my problem-solving"
- "Time management is more challenging solo, but I've created a detailed timeline"

---

## Questions Tutors Might Ask Solo Developers

**Q: "Are you comfortable working alone on this?"**
A: "Yes, I've broken the project into weekly milestones. Stand-up 1 is data foundation, Stand-up 2 is charts implementation, Stand-up 3 is interactivity and accessibility. I'm on track and the scope is manageable."

**Q: "Will you be able to complete all three visualizations?"**
A: "Absolutely. I've chosen visualizations that build on each other: line chart first (simpler), then bar chart (builds on line chart patterns), then map (new challenge). I'm starting with the breath test line chart this weekend."

**Q: "Why didn't you join a team?"**
A: [Use your honest answer from Alternative Opening section above]

**Q: "How will this affect your reflection assignment?"**
A: "The reflection rubric allows for solo work. I'll reflect on my design decisions, technical challenges, and learning process. My lack of teamwork experience will be capped at D for that criterion, but I can demonstrate strong technical and design thinking."

**Q: "What if you fall behind?"**
A: "I've built buffer time into my schedule. I'm also leveraging the documented architecture in my repository - the JSDoc typedefs give me clear patterns to follow. If I do encounter blockers, I'll reach out during consultation hours."

---

## Final Checklist Before Recording

- [ ] KNIME workflow created and executed (all green checkmarks)
- [ ] Workflow exported as .knwf with data included
- [ ] Practiced talking through the workflow (not reading, explaining naturally)
- [ ] GitHub repository is public/accessible
- [ ] Prepared honest answer about solo work status
- [ ] PowerPoint slide ready (optional but helpful)
- [ ] Recording software tested (audio and screen capture working)
- [ ] Dressed appropriately (visible on camera)
- [ ] Quiet recording environment
- [ ] Script reviewed but NOT memorized word-for-word

---

## Submission Checklist (Tomorrow Night)

Upload to Canvas:
- [ ] PowerPoint presentation (1-2 slides)
- [ ] Video file (MP4 format, 2-3 minutes, under 500MB)
- [ ] Draft of design book (introduction section at minimum)
- [ ] KNIME workflow file: jacob_dv_project_data_processing.knwf
- [ ] Comment with GitHub repository link

---

## You've Got This! 💪

**Remember:**
- You've done real work with real data
- Your KNIME workflow demonstrates data processing skills
- Your architecture shows planning and design thinking
- Solo work shows independence and self-motivation
- Stand-up 1 is about foundation, not finished products

**Speak naturally, show your work, and explain YOUR thought process.**

Good luck with your recording! 🎥✨

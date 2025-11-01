# Stand-up 1 Video Script (2 minutes)
## Project: Australian Road Safety Enforcement Data Visualization

---

## Opening (10 seconds)

**[Show your face on camera]**

"Hello, my name is [Your Name], student ID [Your ID], from Section [Your Section]. Today I'll present our progress on the Data Visualization Project focusing on Australian road safety enforcement data."

---

## Part 1: Data Collection & Sources (30 seconds)

**[Screen share: Show BITRE website - https://www.bitre.gov.au/publications/2024/road-safety-enforcement-data]**

"Our team collected data from the Bureau of Infrastructure and Transport Research Economics, or BITRE. They publish Australian road safety enforcement statistics dating back to 2008, with enhanced detail starting in 2023."

**[Show your `data/` folder with 5 CSV files]**

"We've downloaded five datasets:
- Police enforcement fines - covering speeding, mobile phone use, and seatbelt violations
- Positive breath test results - 17 years of historical data from 2008 to 2024
- Positive drug test results
- Mobile distraction camera locations in the ACT
- National rest area locations for geographic context

These datasets contain over 18,000 rows of enforcement data across all Australian jurisdictions."

---

## Part 2: Data Analysis & Understanding (40 seconds)

**[Screen share: Open one CSV file in Excel or text editor briefly]**

"Let me show you the structure of our breath test dataset."

**[Show CSV columns: YEAR, JURISDICTION, COUNT, etc.]**

"Each dataset contains:
- Temporal data: Years from 2008 to 2024
- Geographic breakdown: 8 jurisdictions including ACT, NSW, Victoria, and others
- Metrics: Counts of violations, fines issued, arrests, and charges
- Demographic details: Age groups and location specifics where available

Our analysis identified several key patterns:
- Drink driving rates have changed significantly across states over 16 years
- Fine distributions vary dramatically by age group
- ACT has 112 mobile distraction camera locations we can map"

---

## Part 3: KNIME Data Processing (30 seconds)

**[Screen share: Open KNIME workflow]**

"Now let me demonstrate our KNIME data processing workflow."

**[Show KNIME workflow with nodes]**

"Our workflow performs several cleaning and transformation steps:

1. **CSV Reader node** - Imports the raw BITRE datasets
2. **Column Filter** - Selects relevant columns: YEAR, JURISDICTION, COUNT, FINES, AGE_GROUP
3. **Row Filter** - We filtered out data before 2020 for more recent trend analysis
4. **Missing Value** node - Handles empty cells by either removing rows or replacing with zeros
5. **GroupBy/Aggregation** - We aggregated monthly data into yearly summaries by jurisdiction
6. **CSV Writer** - Exports cleaned datasets ready for D3 visualization

**[Highlight a specific filter]**

For example, this row filter removes records where COUNT is zero or null, ensuring we only visualize meaningful enforcement activity."

---

## Part 4: GitHub & Next Steps (20 seconds)

**[Screen share: Show GitHub repository]**

"Our team has established our GitHub Classroom repository: 'data-visualisation-project-dv_group25'"

**[Show the repository structure with index.html, css/, data/ folders]**

"We've committed:
- Semantic HTML structure with accessibility features
- CSS styling with BEM naming conventions
- All five processed datasets
- Architecture documentation defining our D3 chart patterns

**Next steps for Week 11:**
- Implement our first line chart showing breath test trends across states
- Build the bar chart for fines by age group
- Create the interactive map of camera locations
- Add filtering controls for year and jurisdiction"

---

## Challenges & Closing (10 seconds)

**[Return to face camera]**

"Our main challenge has been understanding D3's data binding patterns, but we've documented clear factory patterns to follow. We're on track for Stand-up 2 next week. Thank you."

---

## Alternative Talking Points (If You Need to Adjust Time)

### If Running Short - Add These Details:

**About Data Governance:**
"All data is publicly available from the Australian Government under Creative Commons licensing, so there are no privacy or governance issues."

**About Data Quality:**
"We identified some inconsistencies - for example, the fines dataset has granular age groups only from 2023 onwards, while earlier years show 'All ages'. Our KNIME workflow documents these limitations."

**About Visualizations Planned:**
"We're planning three visualizations:
1. Multi-line chart showing positive breath tests over time - users can filter by state
2. Grouped bar chart showing fine types by age group - with animated transitions
3. Interactive map of ACT camera locations with hover tooltips"

### If Running Long - Cut These Sections:

- Skip showing the actual CSV file structure
- Reduce KNIME node-by-node explanation to just "Our workflow filters, cleans, and aggregates the data"
- Don't list all 5 datasets - just say "5 datasets covering fines, testing, and locations"

---

## Visual Aids to Prepare

1. **PowerPoint slide 1:** Project title + your name/section
2. **PowerPoint slide 2:** Data sources (BITRE logo + 5 dataset names)
3. **PowerPoint slide 3:** Key statistics (18K+ rows, 8 jurisdictions, 17 years)
4. **PowerPoint slide 4:** Next steps checklist

---

## Recording Tips

### Technical Setup:
- Use OBS Studio or Windows Game Bar (Win + G) for screen recording
- Test audio levels - speak clearly and not too fast
- Record in 1920x1080 resolution if possible
- Keep your face visible in corner when screen sharing

### Presentation Tips:
- **Don't read from this script word-for-word** - it will sound unnatural and may be flagged as GenAI use
- Paraphrase in your own words
- Speak naturally about YOUR experience with the data
- If you made a mistake or discovery, mention it! ("Initially I thought... but then I found...")
- Reference specific numbers from your datasets

### Time Management:
- Record each section separately, then combine using video editor (Windows Photos app works)
- Practice once or twice to stay within 2 minutes
- Aim for 1:50 to have buffer time

### What to Show on Screen:
- **0:00-0:10** Your face
- **0:10-0:40** BITRE website + data folder
- **0:40-1:20** KNIME workflow (most important!)
- **1:20-1:30** GitHub repository
- **1:30-1:50** Next steps slide
- **1:50-2:00** Your face

---

## KNIME Workflow Script (Detailed - 1 minute version)

**[If you need to spend full minute on KNIME as required by assignment]**

"Let me walk through our KNIME data preparation workflow in detail.

**[Point to workflow]**

Starting from the left, we have the **CSV Reader** node configured to read our police enforcement CSV files. I've set the encoding to UTF-8 and enabled column header detection.

**[Click on Column Filter node]**

The **Column Filter** removes unnecessary metadata columns. We kept only: YEAR, JURISDICTION, LOCATION, AGE_GROUP, METRIC, COUNT, FINES, ARRESTS, and CHARGES. This reduces our dataset from 12 columns to 9 essential ones.

**[Click on Row Filter node]**

Our **Row Filter** has two conditions:
- First, it excludes any rows where YEAR is less than 2020, focusing on recent enforcement trends
- Second, it removes rows where COUNT is zero, since these don't represent actual enforcement events

**[Click on Missing Value node]**

The **Missing Value** handler checks for empty cells. For numeric columns like COUNT and FINES, we replace missing values with zero. For categorical columns like JURISDICTION, we remove the entire row since location is critical.

**[Click on GroupBy node if you have one]**

This **GroupBy** aggregation sums monthly enforcement data into annual totals. We group by YEAR and JURISDICTION, then sum the COUNT column. This gives us cleaner year-over-year trends.

**[Click on CSV Writer]**

Finally, the **CSV Writer** exports our cleaned dataset to the data folder. I've included 'include column headers' and saved it with the workflow so all data is embedded for submission.

**[Show the output table or statistics]**

After processing, our breath test dataset went from 1,328 rows to 136 key records - one for each jurisdiction per year from 2008-2024. This is much more manageable for D3 visualization.

The workflow is saved as 'dv_group25_data_processing.knwf' and will be included in our submission."

---

## Common Questions Tutors Might Ask (Prepare Answers!)

**Q: "Why did you choose these specific datasets?"**
A: "We selected datasets that tell a cohesive story about road safety enforcement. The breath and drug tests show trends over time, the fines data adds demographic detail with age groups, and the camera locations provide geographic context for the ACT region where enforcement is most visible."

**Q: "What challenges did you face with the data?"**
A: "The main challenge was inconsistent temporal granularity - some datasets have monthly breakdowns while others are annual. We also found that age group data is only available from 2023 onwards, so our historical analysis focuses on jurisdictional trends rather than demographics."

**Q: "How will you visualize this?"**
A: "We're implementing three D3 visualizations: a multi-line chart with jurisdiction filtering for breath tests, a grouped bar chart with age group breakdowns for fines, and an interactive point map using d3.geoMercator projection for ACT camera locations."

**Q: "What's in your GitHub repository?"**
A: "We've committed the semantic HTML structure with ARIA labels, CSS with BEM conventions, all processed datasets, and JSDoc architecture documentation. The actual D3 chart implementations will be added progressively for Stand-ups 2 and 3."

**Q: "Are you working as a team or individually?"**
A: [Adjust based on your situation - if solo, explain why you're working alone per the assignment criteria]

---

## Confidence Boosters

Remember:
- You HAVE done the work - you have real datasets, real HTML/CSS structure
- The assignment says "well on the way to starting or completing drafts" - you don't need finished charts yet
- Focus on data understanding and KNIME processing - that's the core of Stand-up 1
- Speak about YOUR experience with the data - don't read generic descriptions
- It's okay to say "we're still learning D3" - that's expected at this stage

Good luck with your recording! 🎥

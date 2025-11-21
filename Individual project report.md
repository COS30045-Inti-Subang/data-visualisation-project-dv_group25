Data Visualization Project Reflection (individual)

 Table of Contents

 [Understanding and Application of Data
 Visualisation Concepts. 1](#_Toc213844624)

 [Data Handling, Programming and Technical Problem Solving. 1](#_Toc213844625)

 [Teamwork and Peer Assessment1](#_Toc213844626)

 [Use of GenAI tools. 1](#_Toc213844627)

 [Written Communication. 2](#_Toc213844628)

 [Referencing. 2](#_Toc213844629)

# [U]()nderstanding and Application of Data

Visualisation Concepts

For this project, I selected **D3.js v7** and **Observable Plot** as the primary visualization libraries due to their flexibility in handling custom data structures compared to high-level wrappers like Chart.js. My design philosophy centered on **Shneiderman’s Visual Information Seeking Mantra**: "Overview first, zoom and filter, then details-on-demand."

I implemented this by creating a **Seasonal Crash Patterns Line Chart** that provides an initial overview of trends. To support the "filter" aspect, I engineered interactive controls allowing users to toggle specific crash types (e.g., "Rear End", "Hit Fixed Object") and filter by year range (2020-2024). This interactivity transforms static data into an exploratory tool.

For the **Geographic Map**, I utilized **pre-attentive attributes**, specifically color hue, to immediately signal severity. By mapping "Fatal" crashes to a high-intensity Red (`hsl(0, 70%, 50%)`) and "Minor Injuries" to the theme's Gold (`hsl(38, 61%, 73%)`), users can instantly distinguish high-risk areas without reading individual tooltips. The decision to use a dark-themed map (matching the "Grilli" aesthetic) required careful contrast management to ensure these data points remained visible against the dark background.

The **Safety Equipment Bar Chart** was iteratively improved from a simple grouped chart to a side-by-side comparison of "Fitted & Worn" vs. "Not Fitted/Not Worn." This specific design choice highlights the *relative risk*, making the safety impact of seatbelts visually explicit rather than just showing raw counts.

# [Data Handling, Programming and Technical Problem Solving]()

**Data Handling & Processing**
The primary challenge was the sheer volume of the raw dataset (`2020-2024_DATA_SA_Crash.csv`), which contained over **63,000 records**. Loading this directly into the browser caused significant performance latency. I utilized **KNIME Analytics Platform** to construct a preprocessing workflow that filtered for relevant columns (e.g., `ACCLOC_X`, `ACCLOC_Y`, `Total Cas`) and removed incomplete records. This reduced the file size to a manageable **3.5MB** (`filtered.csv`), ensuring fast load times without sacrificing analytical depth.

**Technical Implementation & Problem Solving**
A significant technical hurdle was the **Geographic Map performance**. Initially, rendering all 15,000+ filtered points as SVG elements caused the browser to freeze during zoom operations. I solved this by implementing a data cap in the JavaScript logic:
```javascript
const mapData = validData.slice(0, 2000).map(...)
```
This trade-off preserved the visual density distribution while maintaining a smooth 60fps frame rate during **D3 zoom and pan** interactions.

Another challenge was integrating D3.js into a **Vanilla JavaScript** environment without a build system (Webpack/Vite). Unlike modern React-based D3 examples, I had to manually manage the DOM lifecycle. This led to a bug where updating the Line Chart filters would append new charts below the old ones instead of replacing them. I resolved this by implementing a clear-before-render pattern:
```javascript
document.getElementById("chart-area").innerHTML = "";
```
This ensured that the visualization state remained consistent with the user's selected filters.

# [Teamwork and Peer Assessment]()

As this was an individual project, I was responsible for the full stack of development, from data processing to frontend implementation. I utilized **Git** for version control, maintaining a clear commit history to track the evolution of the visualizations.

I adopted the **Grilli** restaurant template as a base, which presented a unique challenge: adapting a "luxury dining" CSS framework for data visualization. I had to reverse-engineer the existing **CSS Custom Properties** (e.g., `--gold-crayola`, `--eerie-black-1`) to ensure my D3 charts felt native to the site. This required strict discipline in code organization, separating my visualization logic (`visualizations.js`) from the template's core scripts (`script.js`) to prevent namespace collisions.

# [Use of GenAI tools]()

I utilized **GitHub Copilot** and **Gemini** as productivity accelerators, specifically for **syntax generation** and **debugging**.

*   **Syntax Generation:** D3.js has a verbose syntax, particularly for defining axes and scales. I used Copilot to generate the boilerplate code for the `d3.scaleLinear()` and `d3.axisBottom()` functions, which saved significant development time.
*   **Debugging:** When the map projection failed to render correctly, I used Gemini to analyze the error. It correctly identified that I was attempting to use raw coordinates without a proper D3 projection, guiding me to implement `d3.geoMercator()` (though I ultimately used a Cartesian scatterplot approach for the specific coordinate data).

**Critical Reflection:**
While AI was powerful for generating code snippets, it lacked the context of my specific design system. For example, AI-generated tooltips often used default browser styles (white background, black text). I had to manually refactor this code to apply the project's specific `var(--eerie-black-1)` and `var(--gold-crayola)` variables to maintain visual consistency. This reinforced that AI is a tool for implementation, not for high-level design decisions.

# [Written Communication]()

The

**References**

1.  **Data Source:** Government of South Australia. (2024). *Road Crash Data*. Data.SA. https://data.sa.gov.au/data/dataset/road-crash-data
2.  **Visualization Library:** Bostock, M. (2024). *D3.js: Data-Driven Documents*. https://d3js.org/
3.  **Visualization Library:** Observable. (2024). *Observable Plot*. https://observablehq.com/plot/
4.  **Template:** codewithsadee. (2022). *Grilli - Restaurant Website Template*. GitHub. https://github.com/codewithsadee/grilli

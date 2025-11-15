'use strict';

/**
 * DATA VISUALIZATIONS
 * 
 * This file contains all D3.js and Observable Plot visualizations
 * for the Road Safety Data Analysis project
 */

// ============================================
// CHART 1: SEASONAL CRASH PATTERNS (LINE CHART)
// ============================================

// Global variables for filtering
let globalChartData = [];
let globalRawData = [];
const targetCrashTypes = ["Rear End", "Hit Fixed Object", "Right Angle"];

async function createLineChart() {
  try {
    // Load the crash data
    const data = await d3.csv("./data/2020-2024_DATA_SA_Crash(filtered).csv");
    globalRawData = data;
    
    console.log("Data loaded:", data.length, "rows");
    console.log("Sample row:", data[0]);
    
    // Create filter controls
    createFilterControls();
    
    // Initial render with all data
    updateLineChart();
    
  } catch (error) {
    console.error("Error creating line chart:", error);
    const container = document.querySelector("#line-chart-container");
    container.innerHTML = `<p class="body-2" style="color: hsl(0, 70%, 60%);">Error loading visualization: ${error.message}</p>`;
  }
}

function createFilterControls() {
  const container = document.querySelector("#line-chart-container");
  
  // Create controls HTML
  const controlsHTML = `
    <div style="background: var(--eerie-black-1); padding: 20px; border-radius: 12px; margin-bottom: 30px;">
      <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center; justify-content: center;">
        
        <!-- Year Range Filter -->
        <div style="flex: 1; min-width: 200px;">
          <label for="year-start" style="display: block; color: var(--gold-crayola); font-family: var(--fontFamily-forum); font-size: 1.4rem; margin-bottom: 10px;">
            Year Range
          </label>
          <div style="display: flex; gap: 10px; align-items: center;">
            <select id="year-start" style="flex: 1; padding: 8px 12px; background: var(--smoky-black-2); color: var(--white); border: 1px solid var(--gold-crayola); border-radius: 8px; font-size: 1.2rem;">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
            <span style="color: var(--quick-silver);">to</span>
            <select id="year-end" style="flex: 1; padding: 8px 12px; background: var(--smoky-black-2); color: var(--white); border: 1px solid var(--gold-crayola); border-radius: 8px; font-size: 1.2rem;">
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024" selected>2024</option>
            </select>
          </div>
        </div>
        
        <!-- Crash Type Toggles -->
        <div style="flex: 2; min-width: 300px;">
          <div style="display: block; color: var(--gold-crayola); font-family: var(--fontFamily-forum); font-size: 1.4rem; margin-bottom: 10px;">
            Crash Types
          </div>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <label for="toggle-rear-end" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
              <input type="checkbox" id="toggle-rear-end" checked style="width: 18px; height: 18px; accent-color: hsl(38, 61%, 73%);">
              <span style="color: hsl(38, 61%, 73%);">● Rear End</span>
            </label>
            <label for="toggle-hit-object" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
              <input type="checkbox" id="toggle-hit-object" checked style="width: 18px; height: 18px; accent-color: hsl(0, 0%, 65%);">
              <span style="color: hsl(0, 0%, 65%);">● Hit Fixed Object</span>
            </label>
            <label for="toggle-right-angle" style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
              <input type="checkbox" id="toggle-right-angle" checked style="width: 18px; height: 18px; accent-color: hsl(30, 61%, 60%);">
              <span style="color: hsl(30, 61%, 60%);">● Right Angle</span>
            </label>
          </div>
        </div>
        
        <!-- Reset Button -->
        <div>
          <button id="reset-filters" style="padding: 10px 20px; background: var(--gold-crayola); color: var(--eerie-black-1); border: none; border-radius: 8px; font-size: 1.2rem; font-weight: 700; cursor: pointer; transition: all 0.3s;">
            Reset Filters
          </button>
        </div>
        
      </div>
    </div>
    
    <!-- Chart will be inserted here -->
    <div id="chart-area"></div>
  `;
  
  container.innerHTML = controlsHTML;
  
  // Add event listeners
  document.getElementById("year-start").addEventListener("change", updateLineChart);
  document.getElementById("year-end").addEventListener("change", updateLineChart);
  document.getElementById("toggle-rear-end").addEventListener("change", updateLineChart);
  document.getElementById("toggle-hit-object").addEventListener("change", updateLineChart);
  document.getElementById("toggle-right-angle").addEventListener("change", updateLineChart);
  
  document.getElementById("reset-filters").addEventListener("click", () => {
    document.getElementById("year-start").value = "2020";
    document.getElementById("year-end").value = "2024";
    document.getElementById("toggle-rear-end").checked = true;
    document.getElementById("toggle-hit-object").checked = true;
    document.getElementById("toggle-right-angle").checked = true;
    updateLineChart();
  });
  
  // Add hover effect to reset button
  const resetBtn = document.getElementById("reset-filters");
  resetBtn.addEventListener("mouseenter", () => {
    resetBtn.style.background = "hsl(38, 61%, 80%)";
    resetBtn.style.transform = "translateY(-2px)";
  });
  resetBtn.addEventListener("mouseleave", () => {
    resetBtn.style.background = "var(--gold-crayola)";
    resetBtn.style.transform = "translateY(0)";
  });
}

function updateLineChart() {
  // Get filter values
  const yearStart = parseInt(document.getElementById("year-start").value);
  const yearEnd = parseInt(document.getElementById("year-end").value);
  const showRearEnd = document.getElementById("toggle-rear-end").checked;
  const showHitObject = document.getElementById("toggle-hit-object").checked;
  const showRightAngle = document.getElementById("toggle-right-angle").checked;
  
  // Build active crash types array
  const activeCrashTypes = [];
  if (showRearEnd) activeCrashTypes.push("Rear End");
  if (showHitObject) activeCrashTypes.push("Hit Fixed Object");
  if (showRightAngle) activeCrashTypes.push("Right Angle");
  
  // Check if at least one crash type is selected
  if (activeCrashTypes.length === 0) {
    document.getElementById("chart-area").innerHTML = `
      <p class="body-2" style="color: hsl(0, 70%, 60%); text-align: center; padding: 50px;">
        Please select at least one crash type to display.
      </p>
    `;
    return;
  }
  
  // Filter data by year range and crash types
  const filteredData = globalRawData.filter(d => {
    const year = parseInt(d.Year);
    return year >= yearStart && 
           year <= yearEnd && 
           activeCrashTypes.includes(d["Crash Type"]);
  });
  
  console.log(`Filtered data: ${filteredData.length} rows (Years: ${yearStart}-${yearEnd}, Types: ${activeCrashTypes.length})`);
  
  // Process data: group by Month and Crash Type
  const monthOrder = {
    "January": 0, "February": 1, "March": 2, "April": 3, "May": 4, "June": 5,
    "July": 6, "August": 7, "September": 8, "October": 9, "November": 10, "December": 11
  };
  
  const processedData = d3.rollup(
    filteredData,
    v => d3.mean(v, d => +d["Total Cas"] || 0),
    d => d.Month,
    d => d["Crash Type"]
  );
  
  // Convert to flat array
  const chartData = [];
  processedData.forEach((crashTypes, month) => {
    crashTypes.forEach((avgCas, crashType) => {
      chartData.push({
        month: month,
        crashType: crashType,
        avgCasualties: avgCas
      });
    });
  });
  
  chartData.sort((a, b) => monthOrder[a.month] - monthOrder[b.month]);
  globalChartData = chartData;
  
  // Color scale
  const colorScale = {
    "Rear End": "hsl(38, 61%, 73%)",
    "Hit Fixed Object": "hsl(0, 0%, 65%)",
    "Right Angle": "hsl(30, 61%, 60%)"
  };
  
  // Create the plot with zoom
  const plot = Plot.plot({
    width: 1100,
    height: 500,
    marginTop: 40,
    marginRight: 150,
    marginBottom: 60,
    marginLeft: 70,
    
    style: {
      background: "transparent",
      color: "hsl(0, 0%, 65%)",
      fontSize: "14px"
    },
    
    x: {
      label: "Month →",
      tickRotate: -45,
      grid: true,
      domain: Object.keys(monthOrder).sort((a, b) => monthOrder[a] - monthOrder[b])
    },
    
    y: {
      label: "↑ Average Casualties per Crash",
      grid: true
    },
    
    color: {
      legend: true,
      domain: activeCrashTypes,
      range: activeCrashTypes.map(type => colorScale[type])
    },
    
    marks: [
      // Lines with enhanced styling
      Plot.line(chartData, {
        x: "month",
        y: "avgCasualties",
        stroke: "crashType",
        strokeWidth: 3,
        curve: "catmull-rom"
      }),
      
      // Points with custom tooltips
      Plot.dot(chartData, {
        x: "month",
        y: "avgCasualties",
        fill: "crashType",
        r: 6,
        stroke: "var(--eerie-black-1)",
        strokeWidth: 2,
        channels: {
          "Crash Type": "crashType",
          "Month": "month",
          "Avg Casualties": d => d.avgCasualties.toFixed(2)
        },
        tip: {
          fill: "var(--eerie-black-1)",
          stroke: "var(--gold-crayola)",
          strokeWidth: 2,
          fontSize: "13px",
          format: {
            "Crash Type": true,
            "Month": true,
            "Avg Casualties": true,
            x: false,
            y: false
          }
        }
      }),
      
      // Grid baseline
      Plot.ruleY([0], { stroke: "var(--white-alpha-20)", strokeWidth: 1 })
    ]
  });
  
  // Insert plot
  const chartArea = document.getElementById("chart-area");
  chartArea.innerHTML = "";
  chartArea.appendChild(plot);
  
  // Add zoom instructions
  const instructions = document.createElement("p");
  instructions.style.cssText = "text-align: center; color: var(--quick-silver); font-size: 1.1rem; margin-top: 15px; font-style: italic;";
  instructions.textContent = "💡 Tip: Hover over data points to see detailed information";
  chartArea.appendChild(instructions);
  
  console.log("Line chart updated successfully!");
}

// ============================================
// CHART 2: SAFETY EQUIPMENT ANALYSIS (BAR CHART)
// ============================================

async function createBarChart() {
  try {
    // Load the casualty data
    const data = await d3.csv("./data/2020-2024_DATA_SA_Casualty.csv");
    
    console.log("Casualty data loaded:", data.length, "rows");
    console.log("Sample casualty row:", data[0]);
    
    // Filter for relevant data: only casualties with seatbelt info
    const filteredData = data.filter(d => {
      const seatbelt = d["Seat Belt"];
      const injury = d["Injury Extent"];
      
      // Include only rows with seatbelt data (drivers and passengers)
      return seatbelt && injury && 
             (seatbelt.includes("Fitted") || seatbelt.includes("Child Restraint"));
    });
    
    console.log("Filtered casualty data:", filteredData.length, "rows");
    
    // Categorize seatbelt usage
    const categorizedData = filteredData.map(d => {
      const seatbelt = d["Seat Belt"];
      let category = "Unknown";
      
      if (seatbelt.includes("Worn") || seatbelt.includes("Child Restraint - Worn")) {
        category = "Worn";
      } else if (seatbelt.includes("Not Worn")) {
        category = "Not Worn";
      } else if (seatbelt.includes("Unknown")) {
        category = "Unknown";
      } else if (seatbelt.includes("Not Fitted")) {
        category = "Not Fitted";
      }
      
      return {
        seatbeltCategory: category,
        injuryExtent: d["Injury Extent"],
        casualtyType: d["Casualty Type"]
      };
    });
    
    // Count by seatbelt category and injury extent
    const grouped = d3.rollup(
      categorizedData,
      v => v.length,
      d => d.seatbeltCategory,
      d => d.injuryExtent
    );
    
    // Convert to flat array
    const chartData = [];
    grouped.forEach((injuries, seatbelt) => {
      injuries.forEach((count, injury) => {
        chartData.push({
          seatbelt: seatbelt,
          injury: injury,
          count: count
        });
      });
    });
    
    console.log("Grouped data for bar chart:", chartData);
    
    // Filter for main injury categories
    const mainInjuries = ["Fatal", "Admitted to Hospital", "Treated at Hospital", "By Private"];
    const finalData = chartData.filter(d => mainInjuries.includes(d.injury));
    
    // Order seatbelt categories
    const seatbeltOrder = ["Worn", "Not Worn", "Unknown", "Not Fitted"];
    finalData.sort((a, b) => {
      const orderA = seatbeltOrder.indexOf(a.seatbelt);
      const orderB = seatbeltOrder.indexOf(b.seatbelt);
      return orderA - orderB;
    });
    
    // Create the bar chart
    renderBarChart(finalData);
    
  } catch (error) {
    console.error("Error creating bar chart:", error);
    const container = document.querySelector("#bar-chart-container");
    container.innerHTML = `<p class="body-2" style="color: hsl(0, 70%, 60%);">Error loading visualization: ${error.message}</p>`;
  }
}

function renderBarChart(data) {
  const container = document.querySelector("#bar-chart-container");
  
  // Filter to only show "Worn" vs "Not Worn" for clearer comparison
  const comparisonData = data.filter(d => 
    d.seatbelt === "Worn" || d.seatbelt === "Not Worn"
  );
  
  // Rename for better labels
  const formattedData = comparisonData.map(d => ({
    ...d,
    seatbeltStatus: d.seatbelt === "Worn" ? "Fitted & Worn" : "Not Fitted/Not Worn"
  }));
  
  // Create the grouped bar chart (grouped by injury type)
  const plot = Plot.plot({
    width: 1100,
    height: 550,
    marginTop: 40,
    marginRight: 150,
    marginBottom: 80,
    marginLeft: 90,
    
    style: {
      background: "transparent",
      color: "hsl(0, 0%, 65%)",
      fontSize: "14px"
    },
    
    x: {
      label: "Injury Severity →",
      tickRotate: -15,
      padding: 0.3
    },
    
    y: {
      label: "↑ Number of Casualties",
      grid: true
    },
    
    color: {
      legend: true,
      domain: ["Fitted & Worn", "Not Fitted/Not Worn"],
      range: ["hsl(120, 50%, 50%)", "hsl(0, 70%, 55%)"], // Green vs Red
      label: "Seatbelt Status"
    },
    
    marks: [
      // Grouped bars - now grouped by injury type with seatbelt status side-by-side
      Plot.barY(formattedData, {
        x: "injury",
        y: "count",
        fill: "seatbeltStatus",
        channels: {
          "Injury Severity": "injury",
          "Seatbelt Status": "seatbeltStatus",
          "Casualties": "count"
        },
        tip: {
          fill: "var(--eerie-black-1)",
          stroke: "var(--gold-crayola)",
          strokeWidth: 2,
          fontSize: "13px",
          format: {
            "Injury Severity": true,
            "Seatbelt Status": true,
            "Casualties": true,
            x: false,
            y: false
          }
        }
      }),
      
      // Grid baseline
      Plot.ruleY([0], { stroke: "var(--white-alpha-20)", strokeWidth: 1 })
    ]
  });
  
  // Insert plot
  container.innerHTML = "";
  container.appendChild(plot);
  
  // Add summary statistics
  const totalWorn = data.filter(d => d.seatbelt === "Worn").reduce((sum, d) => sum + d.count, 0);
  const totalNotWorn = data.filter(d => d.seatbelt === "Not Worn").reduce((sum, d) => sum + d.count, 0);
  const fatalWorn = data.find(d => d.seatbelt === "Worn" && d.injury === "Fatal")?.count || 0;
  const fatalNotWorn = data.find(d => d.seatbelt === "Not Worn" && d.injury === "Fatal")?.count || 0;
  
  const fatalRateWorn = ((fatalWorn / totalWorn) * 100).toFixed(2);
  const fatalRateNotWorn = ((fatalNotWorn / totalNotWorn) * 100).toFixed(2);
  
  const summary = document.createElement("div");
  summary.style.cssText = "margin-top: 30px; padding: 20px; background: var(--eerie-black-1); border-radius: 12px; border: 1px solid var(--gold-crayola);";
  summary.innerHTML = `
    <p class="body-1" style="color: var(--gold-crayola); margin-bottom: 15px; font-weight: 700;">📊 Statistical Summary</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; color: var(--white);">
      <div>
        <p class="body-2"><strong>Total casualties (seatbelt worn):</strong> ${totalWorn.toLocaleString()}</p>
        <p class="body-2"><strong>Fatal rate (worn):</strong> ${fatalRateWorn}%</p>
      </div>
      <div>
        <p class="body-2"><strong>Total casualties (not worn):</strong> ${totalNotWorn.toLocaleString()}</p>
        <p class="body-2"><strong>Fatal rate (not worn):</strong> ${fatalRateNotWorn}%</p>
      </div>
      <div>
        <p class="body-2" style="color: hsl(0, 70%, 60%);"><strong>Risk increase without seatbelt:</strong> ${(fatalRateNotWorn / fatalRateWorn).toFixed(1)}x higher</p>
      </div>
    </div>
  `;
  container.appendChild(summary);
  
  // Add interpretation note
  const note = document.createElement("p");
  note.style.cssText = "text-align: center; color: var(--quick-silver); font-size: 1.1rem; margin-top: 15px; font-style: italic;";
  note.textContent = "💡 Tip: Hover over bars to see detailed casualty counts by injury severity";
  container.appendChild(note);
  
  console.log("Bar chart rendered successfully!");
}

// ============================================
// CHART 3: GEOGRAPHIC DISTRIBUTION (MAP)
// ============================================

async function createMap() {
  try {
    // Load the crash data
    const data = await d3.csv("./data/2020-2024_DATA_SA_Crash(filtered).csv");
    
    console.log("Map data loaded:", data.length, "rows");
    
    // Filter for crashes with valid coordinates
    const validData = data.filter(d => {
      const x = parseFloat(d.ACCLOC_X);
      const y = parseFloat(d.ACCLOC_Y);
      return !isNaN(x) && !isNaN(y) && x !== 0 && y !== 0;
    });
    
    console.log("Valid crash locations:", validData.length);
    
    // Limit to first 2000 crashes for performance
    const mapData = validData.slice(0, 2000).map(d => ({
      x: parseFloat(d.ACCLOC_X),
      y: parseFloat(d.ACCLOC_Y),
      casualties: parseInt(d["Total Cas"]) || 0,
      fatalities: parseInt(d["Total Fats"]) || 0,
      seriousInjuries: parseInt(d["Total SI"]) || 0,
      minorInjuries: parseInt(d["Total MI"]) || 0,
      crashType: d["Crash Type"],
      suburb: d.Suburb || "Unknown",
      date: `${d.Day}/${d.Month}/${d.Year}`,
      time: d.Time || "Unknown",
      speed: d["Area Speed"] || "Unknown",
      weather: d["Weather Cond"] || "Unknown",
      dui: d["DUI Involved"] || "No"
    }));
    
    // Determine severity category
    mapData.forEach(d => {
      if (d.fatalities > 0) {
        d.severity = "Fatal";
        d.severityColor = "hsl(0, 70%, 50%)"; // Red
      } else if (d.seriousInjuries > 0) {
        d.severity = "Serious Injury";
        d.severityColor = "hsl(30, 80%, 55%)"; // Orange
      } else if (d.minorInjuries > 0) {
        d.severity = "Minor Injury";
        d.severityColor = "hsl(38, 61%, 73%)"; // Gold
      } else {
        d.severity = "Property Damage";
        d.severityColor = "hsl(0, 0%, 65%)"; // Silver
      }
    });
    
    console.log("Map data processed:", mapData.length, "crashes");
    
    // Render the map
    renderMap(mapData);
    
  } catch (error) {
    console.error("Error creating map:", error);
    const container = document.querySelector("#map-container");
    container.innerHTML = `<p class="body-2" style="color: hsl(0, 70%, 60%);">Error loading map: ${error.message}</p>`;
  }
}

function renderMap(data) {
  const container = document.querySelector("#map-container");
  
  // Calculate bounds for South Australia
  const xExtent = d3.extent(data, d => d.x);
  const yExtent = d3.extent(data, d => d.y);
  
  console.log("X extent:", xExtent);
  console.log("Y extent:", yExtent);
  
  // Get container dimensions - make map responsive
  const containerWidth = container.offsetWidth || 1200;
  const aspectRatio = 1.6; // Width/Height ratio for South Australia
  const width = Math.min(containerWidth, 1200);
  const height = width / aspectRatio;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  
  // Add padding to bounds for better visualization
  const xPadding = (xExtent[1] - xExtent[0]) * 0.05;
  const yPadding = (yExtent[1] - yExtent[0]) * 0.05;
  
  // Create SVG with responsive viewBox
  const svg = d3.create("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width, height])
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("background", "var(--eerie-black-1)")
    .style("border-radius", "12px")
    .style("max-height", "700px")
    .style("display", "block")
    .style("margin", "0 auto");
  
  // Create scales with padding
  const xScale = d3.scaleLinear()
    .domain([xExtent[0] - xPadding, xExtent[1] + xPadding])
    .range([margin.left, width - margin.right]);
  
  const yScale = d3.scaleLinear()
    .domain([yExtent[0] - yPadding, yExtent[1] + yPadding])
    .range([height - margin.bottom, margin.top]);
  
  // Create radius scale for marker size
  const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.casualties)])
    .range([3, 15]);
  
  // Create zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([1, 10])
    .on("zoom", zoomed);
  
  svg.call(zoom);
  
  // Add border frame
  svg.append("rect")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", width - margin.left - margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("fill", "none")
    .attr("stroke", "var(--gold-crayola)")
    .attr("stroke-width", 2)
    .attr("opacity", 0.3);
  
  // Create main group for zoomable content
  const g = svg.append("g");
  
  // Add background grid
  const gridGroup = g.append("g")
    .attr("class", "grid")
    .attr("opacity", 0.08);
  
  // Vertical grid lines
  gridGroup.selectAll(".grid-line-v")
    .data(d3.range(xExtent[0], xExtent[1], (xExtent[1] - xExtent[0]) / 20))
    .join("line")
    .attr("class", "grid-line-v")
    .attr("x1", d => xScale(d))
    .attr("x2", d => xScale(d))
    .attr("y1", margin.top)
    .attr("y2", height - margin.bottom)
    .attr("stroke", "var(--white)")
    .attr("stroke-width", 0.5);
  
  // Horizontal grid lines
  gridGroup.selectAll(".grid-line-h")
    .data(d3.range(yExtent[0], yExtent[1], (yExtent[1] - yExtent[0]) / 20))
    .join("line")
    .attr("class", "grid-line-h")
    .attr("x1", margin.left)
    .attr("x2", width - margin.right)
    .attr("y1", d => yScale(d))
    .attr("y2", d => yScale(d))
    .attr("stroke", "var(--white)")
    .attr("stroke-width", 0.5);
  
  // Create markers group
  const markersGroup = g.append("g")
    .attr("class", "markers");
  
  // Add crash markers
  const markers = markersGroup.selectAll("circle")
    .data(data)
    .join("circle")
    .attr("cx", d => xScale(d.x))
    .attr("cy", d => yScale(d.y))
    .attr("r", d => radiusScale(d.casualties))
    .attr("fill", d => d.severityColor)
    .attr("opacity", 0.7)
    .attr("stroke", "var(--eerie-black-1)")
    .attr("stroke-width", 1)
    .style("cursor", "pointer")
    .on("mouseover", function() {
      d3.select(this)
        .attr("opacity", 1)
        .attr("stroke", "var(--gold-crayola)")
        .attr("stroke-width", 2);
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("opacity", 0.7)
        .attr("stroke", "var(--eerie-black-1)")
        .attr("stroke-width", 1);
    })
    .on("click", function(event, d) {
      showTooltip(event, d);
    });
  
  // Zoom function
  function zoomed(event) {
    g.attr("transform", event.transform);
  }
  
  // Tooltip function
  function showTooltip(event, d) {
    // Remove existing tooltip
    d3.selectAll(".crash-tooltip").remove();
    
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "crash-tooltip")
      .style("position", "absolute")
      .style("background", "var(--eerie-black-1)")
      .style("color", "var(--white)")
      .style("padding", "15px")
      .style("border-radius", "8px")
      .style("border", "2px solid var(--gold-crayola)")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("z-index", "10000")
      .style("max-width", "300px")
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY + 15) + "px")
      .html(`
        <div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--gold-crayola);">
          <strong style="color: var(--gold-crayola); font-size: 14px;">${d.crashType}</strong>
        </div>
        <div style="line-height: 1.6;">
          <strong>Location:</strong> ${d.suburb}<br>
          <strong>Date/Time:</strong> ${d.date} at ${d.time}<br>
          <strong>Severity:</strong> <span style="color: ${d.severityColor};">${d.severity}</span><br>
          <strong>Casualties:</strong> ${d.casualties} (${d.fatalities} fatal, ${d.seriousInjuries} serious)<br>
          <strong>Speed Limit:</strong> ${d.speed} km/h<br>
          <strong>Weather:</strong> ${d.weather}<br>
          <strong>DUI Involved:</strong> ${d.dui}
        </div>
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--quick-silver); font-size: 11px; color: var(--quick-silver); text-align: center;">
          Click anywhere to close
        </div>
      `);
    
    // Close tooltip on click anywhere
    d3.select("body").on("click.tooltip", function() {
      d3.selectAll(".crash-tooltip").remove();
      d3.select("body").on("click.tooltip", null);
    });
  }
  
  // Clear container and add SVG
  container.innerHTML = "";
  container.appendChild(svg.node());
  
  // Add legend
  const legend = document.createElement("div");
  legend.style.cssText = "margin-top: 30px; padding: 20px; background: var(--eerie-black-1); border-radius: 12px; border: 1px solid var(--gold-crayola);";
  legend.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center; justify-content: center;">
      <div>
        <p class="body-1" style="color: var(--gold-crayola); margin-bottom: 15px; font-weight: 700;">🗺️ Map Legend</p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(0, 70%, 50%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Fatal</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(30, 80%, 55%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Serious Injury</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(38, 61%, 73%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Minor Injury</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(0, 0%, 65%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Property Damage</span>
          </div>
        </div>
      </div>
      <div style="border-left: 1px solid var(--quick-silver); padding-left: 30px;">
        <p class="body-2" style="color: var(--white); margin-bottom: 8px;"><strong>Total Crashes Shown:</strong> ${data.length.toLocaleString()}</p>
        <p class="body-2" style="color: var(--white);"><strong>Geographic Coverage:</strong> South Australia</p>
      </div>
    </div>
  `;
  container.appendChild(legend);
  
  // Add usage instructions
  const instructions = document.createElement("p");
  instructions.style.cssText = "text-align: center; color: var(--quick-silver); font-size: 1.1rem; margin-top: 15px; font-style: italic;";
  instructions.textContent = "💡 Tip: Scroll to zoom, click and drag to pan, click markers for crash details";
  container.appendChild(instructions);
  
  console.log("Map rendered successfully!");
}

// ============================================
// GEOGRAPHIC MAP WITH LEAFLET.JS (PROPER IMPLEMENTATION)
// ============================================

async function createGeographicMap() {
  try {
    console.log("Creating geographic map with GeoJSON...");
    
    // Check if proj4 library is loaded
    if (typeof proj4 === 'undefined') {
      console.error("Proj4js library not loaded. Falling back to coordinate map...");
      createMap();
      return;
    }
    
    // Define coordinate system projections
    // MGA Zone 54 (GDA94) - used in crash data
    proj4.defs("EPSG:28354", "+proj=utm +zone=54 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
    
    // Load GeoJSON boundary and crash data in parallel
    const [geoData, crashData] = await Promise.all([
      d3.json("./data/south-australia.geojson"),
      d3.csv("./data/2020-2024_DATA_SA_Crash(filtered).csv")
    ]);
    
    console.log("GeoJSON loaded:", geoData);
    console.log("Crash data loaded:", crashData.length, "rows");
    
    // Filter and convert crash coordinates
    const validCrashes = crashData
      .filter(d => {
        const x = parseFloat(d.ACCLOC_X);
        const y = parseFloat(d.ACCLOC_Y);
        return !isNaN(x) && !isNaN(y) && x !== 0 && y !== 0;
      })
      .slice(0, 2000) // Limit to 2000 for performance
      .map(d => {
        const mgaX = parseFloat(d.ACCLOC_X);
        const mgaY = parseFloat(d.ACCLOC_Y);
        
        // Convert MGA Zone 54 to WGS84 (lat/long)
        let longitude, latitude;
        try {
          [longitude, latitude] = proj4("EPSG:28354", "EPSG:4326", [mgaX, mgaY]);
        } catch (error) {
          console.warn("Coordinate conversion failed for:", mgaX, mgaY);
          return null;
        }
        
        return {
          longitude,
          latitude,
          casualties: parseInt(d["Total Cas"]) || 0,
          fatalities: parseInt(d["Total Fats"]) || 0,
          seriousInjuries: parseInt(d["Total SI"]) || 0,
          minorInjuries: parseInt(d["Total MI"]) || 0,
          crashType: d["Crash Type"],
          suburb: d.Suburb || "Unknown",
          date: `${d.Day}/${d.Month}/${d.Year}`,
          time: d.Time || "Unknown",
          weather: d["Weather Cond"] || "Unknown",
          dui: d["DUI Involved"] || "No",
          severity: "",
          severityColor: ""
        };
      })
      .filter(d => d !== null);
    
    // Categorize by severity
    validCrashes.forEach(d => {
      if (d.fatalities > 0) {
        d.severity = "Fatal";
        d.severityColor = "hsl(0, 70%, 50%)";
      } else if (d.seriousInjuries > 0) {
        d.severity = "Serious Injury";
        d.severityColor = "hsl(30, 80%, 55%)";
      } else if (d.minorInjuries > 0) {
        d.severity = "Minor Injury";
        d.severityColor = "hsl(38, 61%, 73%)";
      } else {
        d.severity = "Property Damage";
        d.severityColor = "hsl(0, 0%, 65%)";
      }
    });
    
    console.log("Converted crashes:", validCrashes.length);
    
    // Debug: Check sample coordinates
    if (validCrashes.length > 0) {
      console.log("Sample crash coordinates:", {
        first: validCrashes[0],
        middle: validCrashes[Math.floor(validCrashes.length / 2)],
        last: validCrashes[validCrashes.length - 1]
      });
    }
    
    // Render the geographic map
    renderGeographicMap(geoData, validCrashes);
    
  } catch (error) {
    console.error("Error creating geographic map:", error);
    console.log("Falling back to coordinate map...");
    // Fallback to original coordinate map
    createMap();
  }
}

function renderGeographicMap(geoData, crashData) {
  const container = document.querySelector("#map-container");
  
  // Get container dimensions
  const containerWidth = container.offsetWidth || 1200;
  const width = Math.min(containerWidth, 1200);
  const height = width / 1.6;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };
  
  // Create SVG
  const svg = d3.create("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", [0, 0, width, height])
    .attr("preserveAspectRatio", "xMidYMid meet")
    .style("background", "var(--smoky-black-1)")
    .style("border-radius", "12px")
    .style("max-height", "700px")
    .style("display", "block")
    .style("margin", "0 auto");
  
  // Create projection (Mercator centered on South Australia)
  // Use fitExtent instead of fitSize to ensure proper padding
  const projection = d3.geoMercator()
    .fitExtent(
      [[margin.left, margin.top], [width - margin.right, height - margin.bottom]], 
      geoData
    );
  
  console.log("Projection center:", projection.center());
  console.log("Projection scale:", projection.scale());
  console.log("Projection translate:", projection.translate());
  
  // Create path generator
  const path = d3.geoPath().projection(projection);
  
  // Create main group for zoomable content
  const g = svg.append("g");
  
  // Draw South Australia boundary with visible styling
  g.append("path")
    .datum(geoData)
    .attr("d", path)
    .attr("fill", "rgba(40, 40, 40, 0.8)")  // Dark gray, visible
    .attr("stroke", "var(--gold-crayola)")
    .attr("stroke-width", 3)
    .attr("opacity", 1);
  
  // Add reference cities
  const majorCities = [
    { name: "Adelaide", lat: -34.9285, lon: 138.6007 },
    { name: "Mount Gambier", lat: -37.8288, lon: 140.7831 },
    { name: "Port Augusta", lat: -32.4927, lon: 137.7656 },
    { name: "Whyalla", lat: -33.0333, lon: 137.5667 },
    { name: "Murray Bridge", lat: -35.1194, lon: 139.2744 }
  ];
  
  const citiesGroup = g.append("g").attr("class", "cities");
  
  majorCities.forEach(city => {
    const [x, y] = projection([city.lon, city.lat]);
    
    if (x && y) {
      const cityGroup = citiesGroup.append("g")
        .attr("transform", `translate(${x},${y})`);
      
      // City marker
      cityGroup.append("circle")
        .attr("r", 4)
        .attr("fill", "var(--gold-crayola)")
        .attr("stroke", "var(--white)")
        .attr("stroke-width", 2);
      
      // City label
      cityGroup.append("text")
        .attr("dy", -10)
        .attr("text-anchor", "middle")
        .attr("fill", "var(--white)")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .text(city.name);
    }
  });
  
  // Create radius scale for marker size
  const radiusScale = d3.scaleSqrt()
    .domain([0, d3.max(crashData, d => d.casualties)])
    .range([3, 12]);
  
  // Create markers group
  const markersGroup = g.append("g").attr("class", "crash-markers");
  
  // Plot crash markers
  const markers = markersGroup.selectAll("circle")
    .data(crashData)
    .join("circle")
    .attr("cx", d => {
      const projected = projection([d.longitude, d.latitude]);
      return projected ? projected[0] : null;
    })
    .attr("cy", d => {
      const projected = projection([d.longitude, d.latitude]);
      return projected ? projected[1] : null;
    })
    .attr("r", d => radiusScale(d.casualties))
    .attr("fill", d => d.severityColor)
    .attr("opacity", 0.8)
    .attr("stroke", "rgba(255, 255, 255, 0.3)")
    .attr("stroke-width", 1)
    .style("cursor", "pointer");
  
  
  // Add event handlers to markers
  markers
    .on("mouseover", function() {
      d3.select(this)
        .attr("opacity", 1)
        .attr("stroke", "var(--gold-crayola)")
        .attr("stroke-width", 2);
    })
    .on("mouseout", function() {
      d3.select(this)
        .attr("opacity", 0.8)
        .attr("stroke", "rgba(255, 255, 255, 0.3)")
        .attr("stroke-width", 1);
    })
    .on("click", function(event, d) {
      showGeographicTooltip(event, d);
    });
  
  // Debug: Check how many markers were actually rendered
  console.log("Total markers rendered:", markers.size());
  console.log("Sample marker positions:", {
    first: crashData[0] ? {
      coords: [crashData[0].longitude, crashData[0].latitude],
      projected: projection([crashData[0].longitude, crashData[0].latitude])
    } : null
  });
  
  // Zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([1, 15])
    .on("zoom", (event) => {
      g.attr("transform", event.transform);
    });
  
  svg.call(zoom);
  
  // Tooltip function
  function showGeographicTooltip(event, d) {
    d3.selectAll(".crash-tooltip").remove();
    
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "crash-tooltip")
      .style("position", "absolute")
      .style("background", "var(--eerie-black-1)")
      .style("color", "var(--white)")
      .style("padding", "15px")
      .style("border-radius", "8px")
      .style("border", "2px solid var(--gold-crayola)")
      .style("font-size", "13px")
      .style("pointer-events", "none")
      .style("z-index", "10000")
      .style("max-width", "300px")
      .style("left", (event.pageX + 15) + "px")
      .style("top", (event.pageY + 15) + "px")
      .html(`
        <div style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid var(--gold-crayola);">
          <strong style="color: var(--gold-crayola); font-size: 14px;">${d.crashType}</strong>
        </div>
        <div style="line-height: 1.6;">
          <p><strong>Location:</strong> ${d.suburb}</p>
          <p><strong>Date:</strong> ${d.date} at ${d.time}</p>
          <p><strong>Severity:</strong> <span style="color: ${d.severityColor};">${d.severity}</span></p>
          <p><strong>Casualties:</strong> ${d.casualties} (${d.fatalities} fatal, ${d.seriousInjuries} serious)</p>
          <p><strong>Weather:</strong> ${d.weather}</p>
          <p><strong>DUI Involved:</strong> ${d.dui}</p>
        </div>
      `);
    
    d3.select("body").on("click.tooltip", function() {
      d3.selectAll(".crash-tooltip").remove();
      d3.select("body").on("click.tooltip", null);
    });
  }
  
  // Clear container and add SVG
  container.innerHTML = "";
  container.appendChild(svg.node());
  
  // Add legend
  const legend = document.createElement("div");
  legend.style.cssText = "margin-top: 30px; padding: 20px; background: var(--eerie-black-1); border-radius: 12px; border: 1px solid var(--gold-crayola);";
  legend.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 30px; align-items: center; justify-content: center;">
      <div>
        <p class="body-1" style="color: var(--gold-crayola); margin-bottom: 15px; font-weight: 700;">Map Legend</p>
        <div style="display: flex; gap: 20px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(0, 70%, 50%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Fatal</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(30, 80%, 55%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Serious Injury</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(38, 61%, 73%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Minor Injury</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="width: 20px; height: 20px; background: hsl(0, 0%, 65%); border-radius: 50%;"></div>
            <span class="body-2" style="color: var(--white);">Property Damage</span>
          </div>
        </div>
      </div>
      <div style="border-left: 1px solid var(--quick-silver); padding-left: 30px;">
        <p class="body-2" style="color: var(--white); margin-bottom: 8px;"><strong>Total Crashes:</strong> ${crashData.length.toLocaleString()}</p>
        <p class="body-2" style="color: var(--white);"><strong>Coverage:</strong> South Australia</p>
        <p class="body-2" style="color: var(--gold-crayola); margin-top: 8px;"><strong>✓ Geographic Map Active</strong></p>
      </div>
    </div>
  `;
  container.appendChild(legend);
  
  // Add usage instructions
  const instructions = document.createElement("p");
  instructions.style.cssText = "text-align: center; color: var(--quick-silver); font-size: 1.1rem; margin-top: 15px; font-style: italic;";
  instructions.textContent = "Tip: Scroll to zoom in/out, click and drag to pan, click markers for crash details";
  container.appendChild(instructions);
  
  console.log("Geographic map rendered successfully!");
}

// ============================================
// INITIALIZE VISUALIZATIONS ON PAGE LOAD
// ============================================

window.addEventListener("load", function() {
  console.log("Initializing visualizations...");
  
  // Create line chart
  createLineChart();
  
  // Create bar chart
  createBarChart();
  
  // Create Leaflet geographic map with delay to ensure DOM is ready
  setTimeout(() => {
    if (typeof L !== 'undefined' && typeof RoadSafetyMap !== 'undefined') {
      console.log("Leaflet version:", L.version);
      console.log("Map container found:", document.getElementById('map-container') !== null);
      
      const roadMap = new RoadSafetyMap();
      roadMap.initialize()
        .then(() => {
          console.log("All visualizations loaded successfully! ✅");
        })
        .catch(err => {
          console.error("Map initialization error:", err);
          console.error("Error stack:", err.stack);
        });
    } else {
      console.error("Leaflet loaded:", typeof L !== 'undefined');
      console.error("RoadSafetyMap loaded:", typeof RoadSafetyMap !== 'undefined');
    }
  }, 500);
});


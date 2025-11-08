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
          <label style="display: block; color: var(--gold-crayola); font-family: var(--fontFamily-forum); font-size: 1.4rem; margin-bottom: 10px;">
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
          <label style="display: block; color: var(--gold-crayola); font-family: var(--fontFamily-forum); font-size: 1.4rem; margin-bottom: 10px;">
            Crash Types
          </label>
          <div style="display: flex; gap: 15px; flex-wrap: wrap;">
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
              <input type="checkbox" id="toggle-rear-end" checked style="width: 18px; height: 18px; accent-color: hsl(38, 61%, 73%);">
              <span style="color: hsl(38, 61%, 73%);">● Rear End</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
              <input type="checkbox" id="toggle-hit-object" checked style="width: 18px; height: 18px; accent-color: hsl(0, 0%, 65%);">
              <span style="color: hsl(0, 0%, 65%);">● Hit Fixed Object</span>
            </label>
            <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--white); font-size: 1.2rem;">
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
  
  // Injury color scale (severity-based)
  const injuryColors = {
    "Fatal": "hsl(0, 70%, 50%)",              // Red - most severe
    "Admitted to Hospital": "hsl(30, 80%, 55%)", // Orange
    "Treated at Hospital": "hsl(38, 61%, 73%)",  // Gold (theme color)
    "By Private": "hsl(120, 40%, 50%)"        // Green - least severe
  };
  
  // Create the grouped bar chart
  const plot = Plot.plot({
    width: 1100,
    height: 550,
    marginTop: 40,
    marginRight: 40,
    marginBottom: 80,
    marginLeft: 90,
    
    style: {
      background: "transparent",
      color: "hsl(0, 0%, 65%)",
      fontSize: "14px"
    },
    
    x: {
      label: "Seatbelt Usage →",
      tickRotate: 0,
      padding: 0.2
    },
    
    y: {
      label: "↑ Number of Casualties",
      grid: true
    },
    
    color: {
      legend: true,
      domain: ["Fatal", "Admitted to Hospital", "Treated at Hospital", "By Private"],
      range: ["hsl(0, 70%, 50%)", "hsl(30, 80%, 55%)", "hsl(38, 61%, 73%)", "hsl(120, 40%, 50%)"],
      label: "Injury Severity"
    },
    
    marks: [
      // Grouped bars
      Plot.barY(data, {
        x: "seatbelt",
        y: "count",
        fill: "injury",
        channels: {
          "Seatbelt": "seatbelt",
          "Injury Severity": "injury",
          "Casualties": "count"
        },
        tip: {
          fill: "var(--eerie-black-1)",
          stroke: "var(--gold-crayola)",
          strokeWidth: 2,
          fontSize: "13px",
          format: {
            "Seatbelt": true,
            "Injury Severity": true,
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
// INITIALIZE VISUALIZATIONS ON PAGE LOAD
// ============================================

window.addEventListener("load", function() {
  console.log("Initializing visualizations...");
  
  // Create line chart
  createLineChart();
  
  // Create bar chart
  createBarChart();
  
  // Add more chart functions here as we build them
  // createMap();
});

"use strict";

(function () {
	const MONTHS = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	class RoadSafetyMap {
		constructor() {
			this.dataUrl = "./data/_1_crash_locations(2018-2025).csv";
			this.container = document.getElementById("map-container");
			this.mapElementId = "sa-leaflet-map";
			this.currentYear = "ALL";
			this.currentMonth = "ALL";
			this.map = null;
			this.heatLayer = null;
			this.markerLayer = null;
			this.crashPoints = [];
			this.filteredPoints = [];
			this.filteredStats = [];
			this.maxPoints = 20000; // keep the map performant

			this.yearSelect = null;
			this.monthSelect = null;
			this.filterLabel = null;
			this.statsEls = {
				total: null,
				fatal: null,
				average: null
			};
			this.hotspotList = null;
			this.summaryTrigger = null;
			this.summaryPanel = null;
			this.summaryPanelOpen = false;
			this.handleDocumentClick = this.handleDocumentClick.bind(this);
		}

		async initialize() {
			if (!this.container) {
				throw new Error("RoadSafetyMap: #map-container element is missing.");
			}

			if (typeof L === "undefined") {
				throw new Error("RoadSafetyMap: Leaflet is not loaded.");
			}

			if (typeof d3 === "undefined") {
				throw new Error("RoadSafetyMap: D3 is required for CSV parsing.");
			}

			this.renderLayout();
			await this.loadData();
			this.initMap();
			this.populateFilters();
			this.bindEvents();
			this.updateVisualization();
		}

		renderLayout() {
			this.container.innerHTML = `
				<div class="sa-map-wrapper">
					<div id="${this.mapElementId}" class="sa-leaflet-map" aria-label="Crash hotspot map"></div>

					<div class="map-overlay map-toolbar">
						<div class="map-toolbar-left">
							<button type="button" class="map-summary-trigger" id="map-summary-trigger" aria-expanded="false" aria-controls="map-summary-panel">
								<span class="map-summary-label">Totals & Hotspots</span>
								<span class="map-pill" id="map-filter-label">All Years • All Months</span>
							</button>
							<div class="map-summary-panel" id="map-summary-panel" role="status" aria-live="polite">
								<div class="map-summary-grid">
									<div class="map-summary-item">
										<span>Total Crashes</span>
										<strong id="stat-total-crashes">0</strong>
									</div>
									<div class="map-summary-item">
										<span>Fatal & Serious</span>
										<strong id="stat-severe-crashes">0</strong>
									</div>
									<div class="map-summary-item">
										<span>Avg Casualties</span>
										<strong id="stat-avg-casualties">0</strong>
									</div>
								</div>
								<div class="map-hotspot-mini">
									<p>Top Hotspots</p>
									<div id="map-hotspot-list"></div>
								</div>
							</div>
						</div>
						<div class="map-toolbar-controls">
							<div class="map-control-group">
								<label for="map-year-filter">Year</label>
								<select id="map-year-filter"></select>
							</div>
							<div class="map-control-group">
								<label for="map-month-filter">Month</label>
								<select id="map-month-filter"></select>
							</div>
						</div>
					</div>

					<div class="map-overlay map-legend">
						<h3 class="label-2">Heat Intensity</h3>
						<div class="sa-map-gradient"></div>
						<div class="legend-scale">
							<span>Lower Risk</span>
							<span>Higher Risk</span>
						</div>
						<p class="body-4" style="margin-top: 10px; color: var(--quick-silver);">
							Intensity weights fatalities (×3), serious injuries (×2) and minor injuries (×0.5).
						</p>
					</div>
				</div>
			`;

			this.yearSelect = this.container.querySelector("#map-year-filter");
			this.monthSelect = this.container.querySelector("#map-month-filter");
			this.filterLabel = this.container.querySelector("#map-filter-label");
			this.statsEls.total = this.container.querySelector("#stat-total-crashes");
			this.statsEls.fatal = this.container.querySelector("#stat-severe-crashes");
			this.statsEls.average = this.container.querySelector("#stat-avg-casualties");
			this.hotspotList = this.container.querySelector("#map-hotspot-list");
			this.summaryTrigger = this.container.querySelector("#map-summary-trigger");
			this.summaryPanel = this.container.querySelector("#map-summary-panel");
		}

		async loadData() {
			const rows = await d3.csv(this.dataUrl);

			const processed = [];
			for (const row of rows) {
				const latitude = parseFloat(row.Crash_Latitude);
				const longitude = parseFloat(row.Crash_Longitude);

				if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
					continue;
				}

				const fatalities = parseInt(row.Count_Casualty_Fatality, 10) || 0;
				const hospitalised = parseInt(row.Count_Casualty_Hospitalised, 10) || 0;
				const medicallyTreated = parseInt(row.Count_Casualty_MedicallyTreated, 10) || 0;
				const minorInjuries = parseInt(row.Count_Casualty_MinorInjury, 10) || 0;
				const serious = hospitalised + medicallyTreated;
				const casualties =
					parseInt(row.Count_Casualty_Total, 10) ||
					fatalities + hospitalised + medicallyTreated + minorInjuries;

				const severityColor = this.getSeverityColor(fatalities, serious, minorInjuries);
				const severityLabel = this.getSeverityLabel(fatalities, serious, minorInjuries);
				const intensity = Math.max(
					0.4,
					fatalities * 3 + hospitalised * 2 + medicallyTreated * 1.5 + minorInjuries * 0.6 + 0.5
				);

				processed.push({
					latitude,
					longitude,
					year: String(row.Crash_Year || "").trim(),
					month: this.normalizeMonth(row.Crash_Month),
					suburb: (row.Loc_Suburb || "Unknown").trim(),
					lga: (row.Loc_Local_Government_Area || row.Loc_ABS_Statistical_Area_3 || "Unknown").trim(),
					crashType: row.Crash_Nature || row.Crash_Type || "Unknown",
					date: `${row.Crash_Day_Of_Week || "Unknown"} ${row.Crash_Month || ""} ${row.Crash_Year || ""}`.trim(),
					time: this.formatHour(row.Crash_Hour),
					weather: row.Crash_Atmospheric_Condition || "Unknown",
					surface: row.Crash_Road_Surface_Condition || "Unknown",
					lighting: row.Crash_Lighting_Condition || "Unknown",
					road: row.Crash_Street || row.State_Road_Name || "Unknown road",
					region: row.Loc_Police_Region || row.Loc_Queensland_Transport_Region || "Unknown region",
					casualties,
					fatalities,
					serious,
					minor: minorInjuries,
					hospitalised,
					medicallyTreated,
					minorInjuries,
					severityColor,
					severityLabel,
					intensity
				});
			}

			processed.sort((a, b) => b.intensity - a.intensity);
			this.crashPoints = processed;

			if (this.crashPoints.length === 0) {
				throw new Error("RoadSafetyMap: No crash records with valid coordinates were found.");
			}
		}

		initMap() {
			this.map = L.map(this.mapElementId, {
				preferCanvas: true,
				minZoom: 5,
				maxZoom: 15
			}).setView([-30.5, 135.5], 5.6);

			const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
				maxZoom: 19,
				attribution: "© OpenStreetMap contributors"
			}).addTo(this.map);

			const dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
				attribution: "© OpenStreetMap, © CARTO"
			});

			const satellite = L.tileLayer(
				"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
				{ attribution: "Tiles © Esri" }
			);

			L.control.layers({ Street: street, Dark: dark, Satellite: satellite }, {}, {
				position: "bottomright"
			}).addTo(this.map);

			L.control.zoom({ position: "bottomleft" }).addTo(this.map);

			if (typeof L.heatLayer === "function") {
				this.heatLayer = L.heatLayer([], {
					radius: 28,
					blur: 22,
					maxZoom: 13,
					minOpacity: 0.35,
					gradient: {
						0.1: "#fef3c7",
						0.3: "#fbbf24",
						0.6: "#f97316",
						0.85: "#dc2626"
					}
				}).addTo(this.map);
			} else {
				console.warn("RoadSafetyMap: leaflet.heat is missing; showing markers only.");
			}
		}
// population filters for year and month
		populateFilters() {
			const years = Array.from(new Set(this.crashPoints.map((d) => d.year).filter(Boolean))).sort();

			this.yearSelect.innerHTML = "";
			this.yearSelect.appendChild(new Option("All Years", "ALL"));
			years.forEach((year) => this.yearSelect.appendChild(new Option(year, year)));

			this.monthSelect.innerHTML = "";
			this.monthSelect.appendChild(new Option("All Months", "ALL"));
			MONTHS.forEach((month) => this.monthSelect.appendChild(new Option(month, month)));
		}

		bindEvents() {
			this.yearSelect.addEventListener("change", (event) => {
				this.currentYear = event.target.value;
				this.updateVisualization();
			});

			this.monthSelect.addEventListener("change", (event) => {
				this.currentMonth = event.target.value;
				this.updateVisualization();
			});
// if the summary panel and trigger exist, bind the click event to toggle the panel
			if (this.summaryTrigger && this.summaryPanel) {
				this.summaryTrigger.addEventListener("click", (event) => {
					event.stopPropagation();
					this.toggleSummaryPanel();
				});
				document.addEventListener("click", this.handleDocumentClick);
			}
		}
// updateVisualization 
		updateVisualization() {
			const filtered = this.crashPoints.filter((point) => {
				const matchYear = this.currentYear === "ALL" || point.year === this.currentYear;
				const matchMonth = this.currentMonth === "ALL" || point.month === this.currentMonth;
				return matchYear && matchMonth;
			});

			if (filtered.length === 0) { // no data for the selected filters
				this.showEmptyState(); // show empty state when no data	
				return; // exit early if no data
			}

			this.filteredStats = filtered;
			this.filteredPoints = filtered.slice(0, this.maxPoints);

			this.updateHeatLayer(); // update heat layer with filtered points
			this.updateMarkers(); // update markers with filtered points
			this.updateStats(); // update statistics based on filtered points
			this.updateHotspots(); // update hotspot list based on filtered points
			this.updateFilterLabel(); // update filter label to reflect current selections
		}

		updateHeatLayer() {
			if (!this.heatLayer) {
				return;
			}

			const heatPoints = this.filteredPoints.map((point) => [point.latitude, point.longitude, point.intensity]);
			this.heatLayer.setLatLngs(heatPoints);
		}
// limit to first 400 points for markers
		updateMarkers() {
			if (this.markerLayer) {
					this.markerLayer.remove();
			}
// limit to first 400 points for markers within updateMarkers to improve performance
			const highlighted = this.filteredPoints.slice(0, 400);
			const markers = highlighted.map((point) => {
				const radius = Math.min(14, 4 + point.casualties * 0.6 + (point.fatalities > 0 ? 4 : 0));
				return L.circleMarker([point.latitude, point.longitude], {
					radius,
					weight: 1,
					color: "rgba(255,255,255,0.6)",
					fillColor: point.severityColor,
					fillOpacity: 0.9
				}).bindPopup(this.buildPopup(point));
			});

			this.markerLayer = L.layerGroup(markers).addTo(this.map);
		}
// update statistics based on filtered points
		updateStats() {
			const totals = this.filteredStats.reduce(
				(acc, point) => {
					acc.count += 1;
					acc.fatal += point.fatalities;
					acc.serious += point.serious;
					acc.casualties += point.casualties;
					return acc;
				},
				{ count: 0, fatal: 0, serious: 0, casualties: 0 }
			);
// count severe events with fatalities or serious injuries
			const severeEvents = this.filteredStats.filter((p) => p.fatalities > 0 || p.serious > 0).length;
			const avgCasualties = totals.count > 0 ? totals.casualties / totals.count : 0;

			this.statsEls.total.textContent = this.formatNumber(totals.count);
			this.statsEls.fatal.textContent = this.formatNumber(severeEvents);
			this.statsEls.average.textContent = avgCasualties.toFixed(2);
		}
// update hotspot list based on filtered points
		updateHotspots() {
			const ranking = this.buildHotspotRanking();
			this.hotspotList.innerHTML = "";
			if (ranking.length === 0) {
				this.hotspotList.innerHTML = `<p class="body-4" style="color: var(--quick-silver);">No hotspots for this filter.</p>`;
				return;
			}

			ranking.slice(0, 4).forEach((item, index) => {
				const button = document.createElement("button");
				button.type = "button";
				button.className = "hotspot-chip";
				button.innerHTML = `
					<span>${index + 1}. ${item.name}</span>
					<strong>${this.formatNumber(item.count)} • ${this.formatNumber(item.casualties)}</strong>
				`;
				button.addEventListener("click", () => {
					if (item.lat && item.lng) {
						this.map.flyTo([item.lat, item.lng], 12, { duration: 1.2 });
					}
					this.toggleSummaryPanel(false);
				});
				this.hotspotList.appendChild(button);
			});
		}

		updateFilterLabel() {
			const yearLabel = this.currentYear === "ALL" ? "All Years" : this.currentYear;
			const monthLabel = this.currentMonth === "ALL" ? "All Months" : this.currentMonth;
			this.filterLabel.textContent = `${yearLabel} • ${monthLabel}`;
		}

		showEmptyState() {
			if (this.heatLayer) {
				this.heatLayer.setLatLngs([]);
			}
			if (this.markerLayer) {
				this.markerLayer.remove();
				this.markerLayer = null;
			}

			this.filteredPoints = [];
			this.filteredStats = [];

			this.statsEls.total.textContent = "0";
			this.statsEls.fatal.textContent = "0";
			this.statsEls.average.textContent = "0";
			this.filterLabel.textContent = "No data for selected filters";
			this.hotspotList.innerHTML = `<p class="body-4" style="color: var(--quick-silver);">No records satisfy this filter.</p>`;
			this.toggleSummaryPanel(false);
		}

		toggleSummaryPanel(force) {
			if (!this.summaryPanel || !this.summaryTrigger) {
				return;
			}

			const shouldOpen = typeof force === "boolean" ? force : !this.summaryPanelOpen;
			this.summaryPanelOpen = shouldOpen;
			this.summaryPanel.classList.toggle("is-visible", shouldOpen);
			this.summaryTrigger.setAttribute("aria-expanded", String(shouldOpen));
		}

		handleDocumentClick(event) {
			if (!this.summaryPanel || !this.summaryTrigger) {
				return;
			}

			const clickedInsidePanel = this.summaryPanel.contains(event.target);
			const clickedTrigger = this.summaryTrigger.contains(event.target);
			if (!clickedInsidePanel && !clickedTrigger) {
				this.toggleSummaryPanel(false);
			}
		}

		buildPopup(point) {
			return `
				<div style="min-width: 220px;">
					<h3 style="margin: 0 0 6px; color: var(--gold-crayola); font-size: 1rem;">${point.suburb}</h3>
					<p style="margin: 0; font-size: 0.85rem; color: var(--quick-silver);">${point.road}</p>
					<p style="margin: 0; font-size: 0.85rem; color: var(--quick-silver);">${point.date} • ${point.time} • Region: ${point.region}</p>
					<hr style="margin: 10px 0; border-color: rgba(255,255,255,0.15);">
					<p style="margin: 4px 0;">Crash type: <strong>${point.crashType}</strong></p>
					<p style="margin: 4px 0;">Severity: <strong style="color:${point.severityColor}">${point.severityLabel}</strong></p>
					<p style="margin: 4px 0;">Casualties: ${this.formatNumber(point.casualties)} (Fatal ${point.fatalities}, Hosp ${point.hospitalised}, Med ${point.medicallyTreated}, Minor ${point.minorInjuries})</p>
					<p style="margin: 4px 0;">Surface: ${point.surface} • Weather: ${point.weather}</p>
					<p style="margin: 4px 0;">Lighting: ${point.lighting}</p>
				</div>
			`;
		}

		buildHotspotRanking() {
			const summary = new Map();
			const source = this.filteredStats.length ? this.filteredStats : this.filteredPoints;

			source.forEach((point) => {
				const key = point.suburb || point.lga || "Unknown";
				if (!summary.has(key)) {
					summary.set(key, {
						name: key,
						count: 0,
						casualties: 0,
						fatalities: 0,
						lat: point.latitude,
						lng: point.longitude
					});
				}

				const entry = summary.get(key);
				entry.count += 1;
				entry.casualties += point.casualties;
				entry.fatalities += point.fatalities;
			});

			return Array.from(summary.values())
				.sort((a, b) => {
					const scoreA = a.casualties + a.fatalities * 2;
					const scoreB = b.casualties + b.fatalities * 2;
					return scoreB - scoreA;
				})
				.slice(0, 6);
		}

		getSeverityColor(fatalities, serious, minor) {
			if (fatalities > 0) return "#ef4444";
			if (serious > 0) return "#f97316";
			if (minor > 0) return "#fbbf24";
			return "#9ca3af";
		}

		getSeverityLabel(fatalities, serious) {
			if (fatalities > 0) return "Fatal";
			if (serious > 0) return "Serious Injury";
			return "Minor / Property";
		}

		normalizeMonth(value) {
			const clean = (value || "").trim();
			if (!clean) {
				return "";
			}
			const formatted = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
			if (MONTHS.includes(formatted)) {
				return formatted;
			}
			const asNumber = parseInt(clean, 10);
			if (Number.isFinite(asNumber) && asNumber >= 1 && asNumber <= 12) {
				return MONTHS[asNumber - 1];
			}
			return clean;
		}

		formatHour(value) {
			const hour = parseInt(value, 10);
			if (!Number.isFinite(hour)) {
				return "Unknown";
			}
			const safeHour = Math.max(0, Math.min(23, hour));
			return `${String(safeHour).padStart(2, "0")}:00`;
		}

		formatNumber(value) {
			return new Intl.NumberFormat("en-AU").format(Math.round(value));
		}
	}

	window.RoadSafetyMap = RoadSafetyMap;
})();

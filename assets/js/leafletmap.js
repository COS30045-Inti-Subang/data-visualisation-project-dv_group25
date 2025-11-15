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
			this.dataUrl = "./data/2020-2024_DATA_SA_Crash(filtered).csv";
			this.container = document.getElementById("map-container");
			this.mapElementId = "sa-leaflet-map";
			this.currentYear = "ALL";
			this.currentMonth = "ALL";
			this.map = null;
			this.heatLayer = null;
			this.markerLayer = null;
			this.crashPoints = [];
			this.filteredPoints = [];
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

			if (typeof proj4 === "undefined") {
				throw new Error("RoadSafetyMap: proj4 is required for coordinate conversion.");
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

					<div class="map-overlay map-controls">
						<div class="map-control-group">
							<label for="map-year-filter">Year</label>
							<select id="map-year-filter"></select>
						</div>
						<div class="map-control-group">
							<label for="map-month-filter">Month</label>
							<select id="map-month-filter"></select>
						</div>
					</div>

					<div class="map-overlay map-stats" aria-live="polite">
						<div class="map-stat-card">
							<span>Total Crashes</span>
							<strong id="stat-total-crashes">0</strong>
						</div>
						<div class="map-stat-card">
							<span>Fatal & Serious</span>
							<strong id="stat-severe-crashes">0</strong>
						</div>
						<div class="map-stat-card">
							<span>Avg Casualties</span>
							<strong id="stat-avg-casualties">0</strong>
						</div>
					</div>

					<div class="map-overlay map-legend">
						<div class="map-pill" id="map-filter-label">All Years • All Months</div>
						<h3 class="label-2" style="margin-top: 12px;">Heat Intensity</h3>
						<div class="sa-map-gradient"></div>
						<div class="legend-scale">
							<span>Lower Risk</span>
							<span>Higher Risk</span>
						</div>
						<p class="body-4" style="margin-top: 10px; color: var(--quick-silver);">
							Intensity weights fatalities (×3), serious injuries (×2) and minor injuries (×0.5).
						</p>
					</div>

					<div class="map-overlay map-sidebar">
						<h3>Top Crash Hotspots</h3>
						<div id="map-hotspot-list"></div>
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
		}

		async loadData() {
			if (!proj4.defs("EPSG:28354")) {
				proj4.defs(
					"EPSG:28354",
					"+proj=utm +zone=54 +south +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs"
				);
			}

			const rows = await d3.csv(this.dataUrl);

			const processed = [];
			for (const row of rows) {
				const mgaX = parseFloat(row.ACCLOC_X);
				const mgaY = parseFloat(row.ACCLOC_Y);

				if (!Number.isFinite(mgaX) || !Number.isFinite(mgaY) || mgaX === 0 || mgaY === 0) {
					continue;
				}

				let longitude;
				let latitude;
				try {
					[longitude, latitude] = proj4("EPSG:28354", "EPSG:4326", [mgaX, mgaY]);
				} catch (error) {
					console.warn("RoadSafetyMap: Coordinate conversion failed", error);
					continue;
				}

				if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
					continue;
				}

				const fatalities = parseInt(row["Total Fats"], 10) || 0;
				const serious = parseInt(row["Total SI"], 10) || 0;
				const minor = parseInt(row["Total MI"], 10) || 0;
				const casualties = parseInt(row["Total Cas"], 10) || 0;

				const severityColor = this.getSeverityColor(fatalities, serious, minor);
				const severityLabel = this.getSeverityLabel(fatalities, serious, minor);
				const intensity = Math.max(0.4, fatalities * 3 + serious * 2 + Math.max(minor, 0) * 0.5 + 0.5);

				processed.push({
					latitude,
					longitude,
					year: String(row.Year || row["Year"] || "").trim(),
					month: this.normalizeMonth(row.Month),
					suburb: (row.Suburb || "Unknown").trim(),
					lga: (row["LGA Name"] || "Unknown").replace(/\.$/, "").trim(),
					crashType: row["Crash Type"] || "Unknown",
					date: `${row.Day || "Unknown"} ${row.Month || ""} ${row.Year || ""}`.trim(),
					time: row.Time || "Unknown",
					weather: row["Weather Cond"] || "Unknown",
					dui: row["DUI Involved"] === "Y" ? "Yes" : "No",
					casualties,
					fatalities,
					serious,
					minor,
					severityColor,
					severityLabel,
					intensity
				});
			}

			processed.sort((a, b) => b.intensity - a.intensity);
			this.crashPoints = processed.slice(0, this.maxPoints);

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
		}

		updateVisualization() {
			this.filteredPoints = this.crashPoints.filter((point) => {
				const matchYear = this.currentYear === "ALL" || point.year === this.currentYear;
				const matchMonth = this.currentMonth === "ALL" || point.month === this.currentMonth;
				return matchYear && matchMonth;
			});

			if (this.filteredPoints.length === 0) {
				this.showEmptyState();
				return;
			}

			this.updateHeatLayer();
			this.updateMarkers();
			this.updateStats();
			this.updateHotspots();
			this.updateFilterLabel();
		}

		updateHeatLayer() {
			if (!this.heatLayer) {
				return;
			}

			const heatPoints = this.filteredPoints.map((point) => [point.latitude, point.longitude, point.intensity]);
			this.heatLayer.setLatLngs(heatPoints);
		}

		updateMarkers() {
			if (this.markerLayer) {
					this.markerLayer.remove();
			}

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

		updateStats() {
			const totals = this.filteredPoints.reduce(
				(acc, point) => {
					acc.count += 1;
					acc.fatal += point.fatalities;
					acc.serious += point.serious;
					acc.casualties += point.casualties;
					return acc;
				},
				{ count: 0, fatal: 0, serious: 0, casualties: 0 }
			);

			const severeEvents = this.filteredPoints.filter((p) => p.fatalities > 0 || p.serious > 0).length;
			const avgCasualties = totals.count > 0 ? totals.casualties / totals.count : 0;

			this.statsEls.total.textContent = this.formatNumber(totals.count);
			this.statsEls.fatal.textContent = this.formatNumber(severeEvents);
			this.statsEls.average.textContent = avgCasualties.toFixed(2);
		}

		updateHotspots() {
			const ranking = this.buildHotspotRanking();
			this.hotspotList.innerHTML = "";

			ranking.forEach((item, index) => {
				const div = document.createElement("div");
				div.className = "hotspot-item";
				div.innerHTML = `
					<strong>${index + 1}. ${item.name}</strong>
					<span>${this.formatNumber(item.count)} crashes • ${this.formatNumber(item.casualties)} casualties</span>
				`;
				div.addEventListener("click", () => {
					if (item.lat && item.lng) {
						this.map.flyTo([item.lat, item.lng], 12, { duration: 1.2 });
					}
				});
				this.hotspotList.appendChild(div);
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

			this.statsEls.total.textContent = "0";
			this.statsEls.fatal.textContent = "0";
			this.statsEls.average.textContent = "0";
			this.filterLabel.textContent = "No data for selected filters";
			this.hotspotList.innerHTML = `<p class="body-4" style="color: var(--quick-silver);">No records satisfy this filter.</p>`;
		}

		buildPopup(point) {
			return `
				<div style="min-width: 220px;">
					<h3 style="margin: 0 0 6px; color: var(--gold-crayola); font-size: 1rem;">${point.suburb}</h3>
					<p style="margin: 0; font-size: 0.9rem; color: var(--quick-silver);">${point.date} • ${point.time}</p>
					<hr style="margin: 10px 0; border-color: rgba(255,255,255,0.15);">
					<p style="margin: 4px 0;">Crash type: <strong>${point.crashType}</strong></p>
					<p style="margin: 4px 0;">Severity: <strong style="color:${point.severityColor}">${point.severityLabel}</strong></p>
					<p style="margin: 4px 0;">Casualties: ${this.formatNumber(point.casualties)} (Fatal ${point.fatalities}, Serious ${point.serious})</p>
					<p style="margin: 4px 0;">Weather: ${point.weather}</p>
					<p style="margin: 4px 0;">DUI involved: ${point.dui}</p>
				</div>
			`;
		}

		buildHotspotRanking() {
			const summary = new Map();

			this.filteredPoints.forEach((point) => {
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
			const formatted = clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
			return MONTHS.includes(formatted) ? formatted : clean;
		}

		formatNumber(value) {
			return new Intl.NumberFormat("en-AU").format(Math.round(value));
		}
	}

	window.RoadSafetyMap = RoadSafetyMap;
})();

// Mathtec Dashboard Application Logic
class MathtecDashboard {
    constructor() {
        this.funnelData = {
            "origination": {
                "stages": ["Market Research", "Target Identification", "Initial Contact", "Qualified Lead", "LOI Signed", "DD Started", "Deal Closed"],
                "metrics": [2500, 1000, 400, 150, 75, 35, 12],
                "conversion_rates": [100, 40, 16, 6, 3, 1.4, 0.48],
                "kpis": {
                    "total_pipeline_value": "$2.5B",
                    "avg_deal_size": "$50M",
                    "time_to_close": "6.2 months",
                    "cost_per_lead": "$15K",
                    "win_rate": "12%"
                }
            },
            "talent": {
                "stages": ["Job Posting", "Applications", "Screening", "Interviews", "Offers", "Acceptances", "Successful Hires"],
                "metrics": [1000, 500, 200, 80, 25, 20, 18],
                "conversion_rates": [100, 50, 20, 8, 2.5, 2.0, 1.8],
                "kpis": {
                    "time_to_hire": "45 days",
                    "cost_per_hire": "$25K",
                    "offer_acceptance_rate": "80%",
                    "quality_of_hire": "4.2/5",
                    "first_year_retention": "85%"
                }
            },
            "game_selection": {
                "stages": ["Market Analysis", "Sector Research", "Company Discovery", "Initial Screening", "Deep Dive", "Investment Thesis", "Go/No-Go Decision"],
                "metrics": [500, 300, 150, 75, 30, 15, 8],
                "conversion_rates": [100, 60, 30, 15, 6, 3, 1.6],
                "kpis": {
                    "research_depth_score": "8.5/10",
                    "time_to_decision": "4.2 weeks",
                    "false_positive_rate": "5%",
                    "market_coverage": "95%",
                    "thesis_accuracy": "78%"
                }
            },
            "competitive_intelligence": {
                "stages": ["Data Collection", "Information Processing", "Analysis", "Insights Generation", "Actionable Intelligence", "Strategic Recommendations", "Implementation"],
                "metrics": [10000, 5000, 2000, 800, 400, 200, 120],
                "conversion_rates": [100, 50, 20, 8, 4, 2, 1.2],
                "kpis": {
                    "data_sources": "250+",
                    "intelligence_accuracy": "87%",
                    "time_to_insight": "24 hours",
                    "competitive_advantage": "15%",
                    "roi_on_intelligence": "4.2x"
                }
            },
            "sales": {
                "stages": ["Marketing Qualified Leads", "Sales Qualified Leads", "Demos", "Proposals", "Negotiations", "Contracts", "Closed Won"],
                "metrics": [800, 400, 200, 100, 50, 30, 25],
                "conversion_rates": [100, 50, 25, 12.5, 6.25, 3.75, 3.125],
                "kpis": {
                    "avg_deal_value": "$150K",
                    "sales_cycle_length": "3.5 months",
                    "win_rate": "25%",
                    "customer_ltv": "$500K",
                    "churn_rate": "8%"
                }
            },
            "operational_improvements": {
                "stages": ["Opportunity Identification", "Impact Assessment", "Feasibility Study", "Implementation Plan", "Pilot Program", "Full Rollout", "Results Validation"],
                "metrics": [200, 120, 80, 50, 30, 20, 15],
                "conversion_rates": [100, 60, 40, 25, 15, 10, 7.5],
                "kpis": {
                    "avg_cost_savings": "$2.5M",
                    "implementation_success": "75%",
                    "time_to_value": "4.5 months",
                    "roi_on_improvements": "6.8x",
                    "employee_satisfaction": "4.1/5"
                }
            }
        };

        this.currentFunnel = null;
        this.currentView = 'volume';
        this.chart = null;
        
        this.init();
    }

    init() {
        console.log('Initializing Mathtec Dashboard...');
        this.initializeClock();
        this.updateLastUpdated();
        this.setupInitialView();
        // Delay event listeners to ensure DOM is fully ready
        setTimeout(() => {
            this.initializeEventListeners();
        }, 100);
    }

    initializeClock() {
        const updateClock = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            const clockElement = document.getElementById('liveClock');
            if (clockElement) {
                clockElement.textContent = timeString;
            }
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    updateLastUpdated() {
        const lastUpdatedElement = document.getElementById('lastUpdated');
        if (lastUpdatedElement) {
            const lastUpdated = new Date('2025-06-27T16:19:00Z');
            const timeString = lastUpdated.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            lastUpdatedElement.textContent = timeString;
        }
    }

    initializeEventListeners() {
        console.log('Setting up event listeners...');
        
        // Funnel stage click handlers
        const funnelStages = document.querySelectorAll('.funnel-stage');
        console.log(`Found ${funnelStages.length} funnel stages`);
        
        funnelStages.forEach((stage, index) => {
            const funnelType = stage.dataset.funnel;
            console.log(`Setting up listener for funnel: ${funnelType}`);
            
            stage.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Clicked on funnel: ${funnelType}`);
                this.selectFunnel(funnelType);
            });
            
            // Also add click handler to the segment itself
            const segment = stage.querySelector('.funnel-segment');
            if (segment) {
                segment.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(`Clicked on segment: ${funnelType}`);
                    this.selectFunnel(funnelType);
                });
            }
        });

        // View control handlers
        const volumeBtn = document.getElementById('volumeView');
        const percentBtn = document.getElementById('percentView');
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Switching to volume view');
                this.switchView('volume');
            });
        }

        if (percentBtn) {
            percentBtn.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Switching to percentage view');
                this.switchView('percentage');
            });
        }

        // Refresh button
        const refreshBtn = document.getElementById('refreshData');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.refreshData();
            });
        }
    }

    setupInitialView() {
        const detailedTitle = document.getElementById('detailedTitle');
        const detailedContent = document.getElementById('detailedContent');
        
        if (detailedTitle) {
            detailedTitle.textContent = 'Select a funnel to view detailed metrics';
        }
        if (detailedContent) {
            detailedContent.style.opacity = '0.5';
        }
    }

    selectFunnel(funnelType) {
        console.log(`Selecting funnel: ${funnelType}`);
        
        // Remove active class from all segments
        document.querySelectorAll('.funnel-segment').forEach(segment => {
            segment.classList.remove('active');
        });

        // Add active class to selected segment
        const selectedStage = document.querySelector(`[data-funnel="${funnelType}"]`);
        if (selectedStage) {
            const segment = selectedStage.querySelector('.funnel-segment');
            if (segment) {
                segment.classList.add('active');
            }
        }

        this.currentFunnel = funnelType;
        console.log(`Current funnel set to: ${this.currentFunnel}`);
        this.updateDetailedView();
    }

    updateDetailedView() {
        if (!this.currentFunnel) {
            console.log('No current funnel selected');
            return;
        }

        console.log(`Updating detailed view for: ${this.currentFunnel}`);
        
        const funnelData = this.funnelData[this.currentFunnel];
        if (!funnelData) {
            console.error(`No data found for funnel: ${this.currentFunnel}`);
            return;
        }

        const detailedTitle = document.getElementById('detailedTitle');
        const detailedContent = document.getElementById('detailedContent');

        // Update title
        const funnelNames = {
            'origination': 'Origination Funnel',
            'talent': 'Talent Acquisition Funnel',
            'game_selection': 'Game Selection Funnel',
            'competitive_intelligence': 'Competitive Intelligence Funnel',
            'sales': 'Sales Funnel',
            'operational_improvements': 'Operational Improvements Funnel'
        };

        if (detailedTitle) {
            detailedTitle.textContent = funnelNames[this.currentFunnel] || 'Funnel Details';
        }
        
        if (detailedContent) {
            detailedContent.style.opacity = '1';
        }

        // Update chart and KPIs
        setTimeout(() => {
            this.updateChart();
            this.updateKPICards();
        }, 100);
    }

    updateChart() {
        if (!this.currentFunnel) {
            console.log('No current funnel for chart update');
            return;
        }

        const funnelData = this.funnelData[this.currentFunnel];
        if (!funnelData) {
            console.error(`No data found for chart update: ${this.currentFunnel}`);
            return;
        }

        const canvas = document.getElementById('detailedChart');
        if (!canvas) {
            console.error('Chart canvas not found');
            return;
        }

        const ctx = canvas.getContext('2d');

        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
            this.chart = null;
        }

        const data = this.currentView === 'volume' ? funnelData.metrics : funnelData.conversion_rates;
        const colors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C'];

        console.log(`Creating chart with ${data.length} data points`);

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: funnelData.stages,
                datasets: [{
                    label: this.currentView === 'volume' ? 'Volume' : 'Conversion Rate (%)',
                    data: data,
                    backgroundColor: colors.slice(0, data.length).map(color => color + '80'),
                    borderColor: colors.slice(0, data.length),
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#00d4ff',
                        bodyColor: '#ffffff',
                        borderColor: '#00d4ff',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.y;
                                if (context.chart.data.datasets[0].label.includes('Rate')) {
                                    return `${value.toFixed(2)}%`;
                                }
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0a8b8',
                            font: {
                                size: 11
                            },
                            maxRotation: 45
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            color: '#a0a8b8',
                            font: {
                                size: 11
                            },
                            callback: function(value) {
                                if (this.chart.data.datasets[0].label.includes('Rate')) {
                                    return value + '%';
                                }
                                return value.toLocaleString();
                            }
                        }
                    }
                },
                elements: {
                    bar: {
                        borderRadius: 8
                    }
                },
                animation: {
                    duration: 800,
                    easing: 'easeOutQuart'
                }
            }
        });

        console.log('Chart created successfully');
    }

    updateKPICards() {
        if (!this.currentFunnel) {
            console.log('No current funnel for KPI update');
            return;
        }

        const funnelData = this.funnelData[this.currentFunnel];
        if (!funnelData) {
            console.error(`No data found for KPI update: ${this.currentFunnel}`);
            return;
        }

        const kpiGrid = document.getElementById('kpiGrid');
        if (!kpiGrid) {
            console.error('KPI grid not found');
            return;
        }
        
        kpiGrid.innerHTML = '';

        Object.entries(funnelData.kpis).forEach(([key, value]) => {
            const kpiCard = document.createElement('div');
            kpiCard.className = 'kpi-card';
            
            const title = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            kpiCard.innerHTML = `
                <h4>${title}</h4>
                <div class="kpi-value">${value}</div>
            `;
            
            kpiGrid.appendChild(kpiCard);
        });

        console.log(`Updated ${Object.keys(funnelData.kpis).length} KPI cards`);
    }

    switchView(viewType) {
        console.log(`Switching to ${viewType} view`);
        this.currentView = viewType;
        
        // Update button states
        const volumeBtn = document.getElementById('volumeView');
        const percentBtn = document.getElementById('percentView');
        
        if (volumeBtn && percentBtn) {
            // Reset button classes
            volumeBtn.className = 'btn btn--sm btn--secondary';
            percentBtn.className = 'btn btn--sm btn--secondary';
            
            if (viewType === 'volume') {
                volumeBtn.className = 'btn btn--sm btn--primary';
            } else {
                percentBtn.className = 'btn btn--sm btn--primary';
            }
        }
        
        // Update chart if funnel is selected
        if (this.currentFunnel) {
            setTimeout(() => {
                this.updateChart();
            }, 100);
        }
    }

    refreshData() {
        console.log('Refreshing data...');
        const refreshBtn = document.getElementById('refreshData');
        if (!refreshBtn) return;
        
        const originalText = refreshBtn.textContent;
        
        refreshBtn.textContent = 'Refreshing...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            this.updateLastUpdated();
            refreshBtn.textContent = originalText;
            refreshBtn.disabled = false;
            
            // Add a subtle animation to indicate refresh
            document.querySelectorAll('.metric-value, .performance-value').forEach(element => {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'fadeInUp 0.5s ease-out';
                }, 10);
            });
            
            console.log('Data refresh completed');
        }, 1500);
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing dashboard...');
    
    // Wait a bit more to ensure all elements are rendered
    setTimeout(() => {
        const dashboard = new MathtecDashboard();
        
        // Store dashboard instance globally for debugging
        window.mathtecDashboard = dashboard;
        
        console.log('Dashboard initialized successfully');
    }, 200);
});
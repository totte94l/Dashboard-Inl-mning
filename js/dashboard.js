(function($) {
  'use strict';
  $(function() {

    // Green Box
    if( $("#total-sales-amount").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let greenbox = JSON.parse(this.response);
          let amount = greenbox.amount;
          let currency = greenbox.currency;
          let period = greenbox.period;
          $("#total-sales-amount").text(`${amount} ${currency}`);
          $("#total-sales-period").text(period);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalsales", true);
      request.send();
    }

    // Blue Box
    if( $("#total-purchases-amount").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let bluebox = JSON.parse(this.response);
          let amount = bluebox.amount;
          let currency = bluebox.currency;
          let period = bluebox.period;
          $("#total-purchases-amount").text(`${amount} ${currency}`);
          $("#total-purchases-period").text(period);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalpurchases", true);
      request.send();
    }

    // Red Box
    if( $("#total-purchases-amount").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let redbox = JSON.parse(this.response);
          let amount = redbox.amount;
          let currency = redbox.currency;
          let period = redbox.period;
          $("#total-orders-amount").text(`${amount} ${currency}`);
          $("#total-orders-period").text(period);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalorders", true);
      request.send();
    }

    // Yellow Box
    if( $("#total-growth-amount").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let orangebox = JSON.parse(this.response);
          let amount = orangebox.amount;
          let currency = orangebox.currency;
          let period = orangebox.period;
          $("#total-growth-amount").text(`${amount} ${currency}`);
          $("#total-growth-period").text(period);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalgrowth", true);
      request.send();
    }

    //Total Sales Chart
    if ($("#total-sales-chart").length) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let totalSales = JSON.parse(this.response);

          // Chart
          let days = totalSales.labels;
          let servicesData = totalSales.datasets[0].data;
          let productsData = totalSales.datasets[1].data;
          let servicesLabel = totalSales.datasets[0].label;
          let productsLabel = totalSales.datasets[1].label;

          //Overview
          let revenue = totalSales.revenue;
          let returns = totalSales.returns;
          let queries = totalSales.queries;
          let invoices = totalSales.invoices;

          $("#total-sales-revenue").text(revenue);
          $("#total-sales-returns").text(returns);
          $("#total-sales-queries").text(queries);
          $("#total-sales-invoices").text(invoices);

          var areaData = {
            labels: days,
            datasets: [
              {
                data: servicesData,
                backgroundColor: [
                  'rgba(61, 165, 244, .0)'
                ],
                borderColor: [
                  'rgb(61, 165, 244)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: servicesLabel
              },
              {
                data: productsData,
                backgroundColor: [
                  'rgba(241, 83, 110, .0)'
                ],
                borderColor: [
                  'rgb(241, 83, 110)'
                ],
                borderWidth: 2,
                fill: 'origin',
                label: productsLabel
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: true,
                ticks: {
                  display: true,
                  padding: 20,
                  fontColor:"#000",
                  fontSize: 14
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: true,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  fontColor: "#000",
                  fontSize: 14,
                  padding: 18,
                  stepSize: 100000,
                  callback: function(value) {
                    var ranges = [
                        { divider: 1e6, suffix: 'M' },
                        { divider: 1e3, suffix: 'k' }
                    ];
                    function formatNumber(n) {
                        for (var i = 0; i < ranges.length; i++) {
                          if (n >= ranges[i].divider) {
                              return (n / ranges[i].divider).toString() + ranges[i].suffix;
                          }
                        }
                        return n;
                    }
                    return formatNumber(value);
                  }
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .37
              },
              point: {
                radius: 0
              }
            }
          }
          var revenueChartCanvas = $("#total-sales-chart").get(0).getContext("2d");
          var revenueChart = new Chart(revenueChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/totalsaleschart", true);
      request.send();
    }

    if ($("#users-chart").length) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let users = JSON.parse(this.response);
          let amount = users.users;
          let growth = users.growth;
          let months = users.labels;
          let data = users.datasets[0].data;
          let label = users.datasets[0].label;

          $("#users-growth").text(growth);
          $("#users-amount").text(amount);

          var areaData = {
            labels: months,
            datasets: [{
                data: data,
                backgroundColor: [
                  '#e0fff4'
                ],
                borderWidth: 2,
                borderColor: "#00c689",
                fill: 'origin',
                label: label
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .35
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#users-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/userschart", true);
      request.send();
    }

    // Projects Chart
    if ($("#projects-chart").length) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {

          let projects = JSON.parse(this.response);
          let percent = projects.procent;
          let growth = projects.growth;
          let months = projects.months;
          let data = projects.datasets[0].data;
          let label = projects.datasets[0].label;
          
          $("#projects-percent").text(percent);
          $("#projects-growth").text(growth);
          
          var areaData = {
            labels: months,
            datasets: [{
                data: data,
                backgroundColor: [
                  '#e5f2ff'
                ],
                borderWidth: 2,
                borderColor: "#3da5f4",
                fill: 'origin',
                label: label
              }
            ]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              filler: {
                propagate: false
              }
            },
            scales: {
              xAxes: [{
                display: false,
                ticks: {
                  display: true
                },
                gridLines: {
                  display: false,
                  drawBorder: false,
                  color: 'transparent',
                  zeroLineColor: '#eeeeee'
                }
              }],
              yAxes: [{
                display: false,
                ticks: {
                  display: true,
                  autoSkip: false,
                  maxRotation: 0,
                  stepSize: 100,
                  min: 0,
                  max: 300
                },
                gridLines: {
                  drawBorder: false
                }
              }]
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            elements: {
              line: {
                tension: .05
              },
              point: {
                radius: 0
              }
            }
          }
          var salesChartCanvas = $("#projects-chart").get(0).getContext("2d");
          var salesChart = new Chart(salesChartCanvas, {
            type: 'line',
            data: areaData,
            options: areaOptions
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/projectschart", true);
      request.send();
    }

    // Progression
    if ($('#offlineProgress').length && "#onlineProgress") {

      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let downloads = JSON.parse(this.response);
          let online = downloads.online;
          let offline = downloads.offline;

          var bar = new ProgressBar.Circle(offlineProgress, {
            color: '#000',
            // This has to be the same size as the maximum width to
            // prevent clipping
            strokeWidth: 6,
            trailWidth: 6,
            easing: 'easeInOut',
            duration: 1400,
            text: {
              autoStyleContainer: true,
              style : {
                color : "#fff",
                position: 'absolute',
                left: '40%',
                top: '50%'
              }
            },
            svgStyle: {
              width: '90%'
            },
            from: {
              color: '#f1536e',
              width: 6
            },
            to: {
              color: '#f1536e',
              width: 6
            },
            // Set default step function for all animate calls
            step: function(state, circle) {
              circle.path.setAttribute('stroke', state.color);
              circle.path.setAttribute('stroke-width', state.width);
      
              var value = Math.round(circle.value() * 100);
              if (value === 0) {
                circle.setText('');
              } else {
                circle.setText(value);
              }
      
            }
          });
      
          bar.text.style.fontSize = '1rem';
          bar.animate(offline); // Number from 0.0 to 1.0
    
            var bar = new ProgressBar.Circle(onlineProgress, {
              color: '#000',
              // This has to be the same size as the maximum width to
              // prevent clipping
              strokeWidth: 6,
              trailWidth: 6,
              easing: 'easeInOut',
              duration: 1400,
              text: {
                autoStyleContainer: true,
                style : {
                  color : "#fff",
                  position: 'absolute',
                  left: '40%',
                  top: '50%'
                }
              },
              svgStyle: {
                width: '90%'
              },
              from: {
                color: '#fda006',
                width: 6
              },
              to: {
                color: '#fda006',
                width: 6
              },
              // Set default step function for all animate calls
              step: function(state, circle) {
                circle.path.setAttribute('stroke', state.color);
                circle.path.setAttribute('stroke-width', state.width);
        
                var value = Math.round(circle.value() * 100);
                if (value === 0) {
                  circle.setText('');
                } else {
                  circle.setText(value);
                }
        
              }
            });
        
            bar.text.style.fontSize = '1rem';
            bar.animate(online); // Number from 0.0 to 1.0

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/downloads", true);
      request.send();
    }

    if ($("#revenue-chart").length) {
      var CurrentChartCanvas = $("#revenue-chart").get(0).getContext("2d");
      var CurrentChart = new Chart(CurrentChartCanvas, {
        type: 'bar',
        data: {
          labels: ["1982","","1993", "", "2003", "", "2013"],
          datasets: [{
              label: 'Europe',
              data: [280000, 90000, 150000, 200000, 50000, 150000, 260000, 150000, 260000],
              backgroundColor: '#405189'
            },
            {
              label: 'Africa',
              data: [250000, 230000, 130000, 160000, 110000, 230000, 50000, 230000, 50000],
              backgroundColor: '#3da5f4'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            yAxes: [{
              display: true,
              gridLines: {
                drawBorder: false
              },
              ticks: {
                fontColor: "#000",
                display: true,
                fontStyle: 400,
                fontSize: 14,
                stepSize: 100000,
                callback: function(value) {
                  var ranges = [
                      { divider: 1e6, suffix: 'M' },
                      { divider: 1e3, suffix: 'k' }
                  ];
                  function formatNumber(n) {
                      for (var i = 0; i < ranges.length; i++) {
                        if (n >= ranges[i].divider) {
                            return (n / ranges[i].divider).toString() + ranges[i].suffix;
                        }
                      }
                      return n;
                  }
                  return formatNumber(value);
                }
              }
            }],
            xAxes: [{
              stacked: false,
              categoryPercentage: .5,
              barPercentage: 1,
              ticks: {
                beginAtZero: true,
                fontColor: "#000",
                display: true,
                fontSize: 14
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                display: true
              },
            }]
          },
          legend: {
            display: false
          },
          elements: {
            point: {
              radius: 0
            }
          }
        }
      });
    }

    // Distribution
    if ($("#distribution-chart").length) {
      let request = new XMLHttpRequest();
  
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
          let distChart = JSON.parse(this.response);
          let labels = distChart.labels;
          let data = distChart.datasets[0].data;
          let cities = distChart.datasets[0].city;
  
          var areaData = {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: [
                "#3da5f4", "#f1536e", "#fda006"
              ],
              borderColor: "rgba(0,0,0,0)"
            }]
          };
          var areaOptions = {
            responsive: true,
            maintainAspectRatio: true,
            segmentShowStroke: false,
            cutoutPercentage: 72,
            elements: {
              arc: {
                borderWidth: 4
              }
            },
            legend: {
              display: false
            },
            tooltips: {
              enabled: true
            },
            legendCallback: function (chart) {
              var text = [];
              text.push('<div class="distribution-chart">');
              let i = 0;
              cities.forEach(element => {
                text.push('<div class="item"><div class="legend-label" style="border: 3px solid ' + chart.data.datasets[0].backgroundColor[i] + '"></div>');
                text.push(`<p>${element}</p>`);
                text.push('</div>');
                i++;
              });
              text.push('</div>');
  
              return text.join("");
            },
          }
          var distributionChartPlugins = {
            beforeDraw: function (chart) {
              var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;
  
              ctx.restore();
              var fontSize = .96;
              ctx.font = "600 " + fontSize + "em sans-serif";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "#000";
  
              var text = "70%",
                textX = Math.round((width - ctx.measureText(text).width) / 2),
                textY = height / 2;
  
              ctx.fillText(text, textX, textY);
              ctx.save();
            }
          }
          var distributionChartCanvas = $("#distribution-chart").get(0).getContext("2d");
          var distributionChart = new Chart(distributionChartCanvas, {
            type: 'doughnut',
            data: areaData,
            options: areaOptions,
            plugins: distributionChartPlugins
          });
          document.getElementById('distribution-legend').innerHTML = distributionChart.generateLegend();
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/distributionchart", true);
      request.send();
    };

    // Sale Report
    if ($("#sale-report-chart").length) {

      let request = new XMLHttpRequest();
  
      request.onload = function () {
        if (this.readyState == 4 && this.status == 200) {

          let saleReportChart = JSON.parse(this.response);
          let months = saleReportChart.labels;
          let location = saleReportChart.datasets[0].label;
          let data = saleReportChart.datasets[0].data;

          var CurrentChartCanvas = $("#sale-report-chart").get(0).getContext("2d");
          var CurrentChart = new Chart(CurrentChartCanvas, {
            type: 'bar',
            data: {
              labels: months,
              datasets: [{
                  label: location,
                  data: data,
                  backgroundColor: ["#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4","#e0f2ff","#3da5f4"]
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: true,
              layout: {
                padding: {
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0
                }
              },
              scales: {
                yAxes: [{
                  display: true,
                  gridLines: {
                    drawBorder: false
                  },
                  ticks: {
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14,
                    stepSize: 10000,
                    callback: function(value) {
                      var ranges = [
                          { divider: 1e6, suffix: 'M' },
                          { divider: 1e3, suffix: 'k' }
                      ];
                      function formatNumber(n) {
                          for (var i = 0; i < ranges.length; i++) {
                            if (n >= ranges[i].divider) {
                                return (n / ranges[i].divider).toString() + ranges[i].suffix;
                            }
                          }
                          return n;
                      }
                      return "$" + formatNumber(value);
                    }
                  }
                }],
                xAxes: [{
                  stacked: false,
                  categoryPercentage: .6,
                  ticks: {
                    beginAtZero: true,
                    fontColor: "#000",
                    display: true,
                    padding: 20,
                    fontSize: 14
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                    display: true
                  },
                  barPercentage: .7
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            }
          });
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/salereportchart", true);
      request.send();
    }

    //Sale Report Overview
    if( $("#sales-report-downloads").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let overview = JSON.parse(this.response);
          let downloads = overview.downloads;
          let purchases = overview.försäljning;
          let users = overview.users;
          let growth = overview.growth;
          $("#sales-report-downloads").text(downloads);
          $("#sales-report-purchases").text(purchases);
          $("#sales-report-users").text(users);
          $("#sales-report-growth").text(growth);
        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/salesreportoverview", true);
      request.send();
    }

    // Tickets
    if( $("#ticket-sort").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let ticketsInfo = JSON.parse(this.response);
          let years = ticketsInfo.years;
          let tickets = ticketsInfo.tickets;

          //Genererar åren i dropdown'en
          let counter = 0;
          years.forEach(element => {
            $("#ticket-sort").append(`<a class="dropdown-item" data-year="${element}">${element}`);
          });

          //Genererar en tabell med alla tickets
          tickets.forEach(element => {
            let matches = tickets[counter].fullname.match(/\b(\w)/g);
            let shortName = matches.join('');
            

            let tempTicket =  `<tr>
                              <td class="pl-0">
                              <div class="icon-rounded-primary icon-rounded-md">
                              <h4 class="font-weight-medium">${shortName}</h4>
                              </div>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].fullname}</p>
                              <p class="text-muted mb-0">${tickets[counter].city}</p>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].date}</p>
                              <p class="text-muted mb-0"> ${tickets[counter].time}</p>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].project}</p>
                              <p class="text-muted mb-0">${tickets[counter].status}</p>
                              </td>
                              </tr>`;
            
            counter++; 
            $('#ticket-table').append(tempTicket);
          });

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/tickets", true);
      request.send();
    }

    // Sort Ticket Table
    function sortTable(year) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let ticketsInfo = JSON.parse(this.response);
          let tickets = ticketsInfo.tickets;
          let sortMatch = new Array();
          let counter = 0;

          // Creates a array with all tickets that matches the selected year
          tickets.forEach(element => {
              
            let date = new Date(element.date);
            let ticketYear = date.getFullYear();

            if(ticketYear == year) {
              sortMatch.push(element);
              console.log(`${ticketYear} | ${year}`);
            } 
          });

          // Clears the table
          $('#ticket-table').html("");

          // Adds the matched tickets to the table
          sortMatch.forEach(element => {
            let matches = tickets[counter].fullname.match(/\b(\w)/g);
            let shortName = matches.join('');
            

            let tempTicket =  `<tr>
                              <td class="pl-0">
                              <div class="icon-rounded-primary icon-rounded-md">
                              <h4 class="font-weight-medium">${shortName}</h4>
                              </div>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].fullname}</p>
                              <p class="text-muted mb-0">${tickets[counter].city}</p>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].date}</p>
                              <p class="text-muted mb-0"> ${tickets[counter].time}</p>
                              </td>
                              <td>
                              <p class="mb-0">${tickets[counter].project}</p>
                              <p class="text-muted mb-0">${tickets[counter].status}</p>
                              </td>
                              </tr>`;
            
            counter++; 
            $('#ticket-table').append(tempTicket);
          });
        }

        // Clears the array so user can filter again. Missade nästan detta då det inte fanns några andra år än 2019 inlagt!
        sortMatch = [];
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/tickets", true);
      request.send();
    }

    // Filter tickets click event
    $("#dropdownMenuDate1").on("click", function() {
      $(".dropdown-item").on("click", function() {
        sortTable($(this).attr("data-year"));
    })
    })

    // Updates
    if( $("#updates-list").length ) {
      let request = new XMLHttpRequest();

      request.onload = function() {
        if( this.readyState == 4 && this.status == 200) {
          let updates = JSON.parse(this.response);
          let updatesList = updates.updates;

          updatesList.forEach(element => {
            let updateCard = `<li>
                              <h6>${element.title}</h6>
                              <p class="mt-2">${element.description}</p>
                              <p class="text-muted mb-4"><i class="mdi mdi-clock-outline"></i>${element.time}</p>
                              </li>`
            
            $("#updates-list").append(updateCard);
          });

        }
      }
      request.open("GET", "https://fe18.azurewebsites.net/api/updates", true);
      request.send();
    }

  });
})(jQuery);

function calculate() {
    var Vp = parseFloat(document.getElementById('primaryVoltage').value);
    var Vs = parseFloat(document.getElementById('secondaryVoltage').value);
    var Np = parseFloat(document.getElementById('primaryTurns').value);
    var Ns = parseFloat(document.getElementById('secondaryTurns').value);
    var hoursUsed = parseFloat(document.getElementById('hoursUsed').value);

    var turnsRatio = Np / Ns;
    var voltageRatio = Vp / Vs;
    var Is = (Vp / Vs) * (Ns / Np); // Ideal secondary current (A)
    var Ip = Is * (Ns / Np); // Primary current (A)

    var kVA = (Vp * Ip) / 1000; // kVA rating
    var copperLoss = Math.pow((Ip / Is), 2) * (Vs / turnsRatio); // Total Copper Loss (W)
    var totalCost = 7.5 * hoursUsed; // Assumed cost per hour in INR (adjust as needed)

    displayResults(turnsRatio, voltageRatio, Ip, Is, kVA, copperLoss, totalCost);
    plotChart(kVA, totalCost);
}

function displayResults(turnsRatio, voltageRatio, Ip, Is, kVA, copperLoss, totalCost) {
    var formattedCost = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalCost);
    var resultText = `
        <p><strong>Turns Ratio:</strong> ${turnsRatio.toFixed(2)}</p>
        <p><strong>Voltage Ratio:</strong> ${voltageRatio.toFixed(2)}</p>
        <p><strong>Primary Current (A):</strong> ${Ip.toFixed(2)} A</p>
        <p><strong>Secondary Current (A):</strong> ${Is.toFixed(2)} A</p>
        <p><strong>kVA Rating:</strong> ${kVA.toFixed(2)} kVA</p>
        <p><strong>Total Copper Loss:</strong> ${copperLoss.toFixed(2)} W</p>
        <p><strong>Total Cost (₹):</strong> ${formattedCost}</p>
    `;
    document.getElementById('resultText').innerHTML = resultText;
    document.getElementById('results').style.display = 'block';
}

function plotChart(kVA, totalCost) {
    var ctx = document.getElementById('chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['On-load Test', 'No-load Test'],
            datasets: [{
                label: 'kVA Rating',
                data: [kVA * 0.8, kVA * 0.5], // Example: 80% and 50% of kVA rating for on-load and no-load tests
                backgroundColor: [
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 99, 132, 0.5)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }, {
                label: 'Total Cost',
                data: [totalCost * 0.8, totalCost * 0.5], // Example: 80% and 50% of total cost for on-load and no-load tests
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 206, 86, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

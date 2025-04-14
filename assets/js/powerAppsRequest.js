// Function to fetch data from Power Apps
async function fetchPowerAppsData() {
    const powerAppsUrl = 'https://prod-27.australiasoutheast.logic.azure.com:443/workflows/ab19ec2a4bf34867aedf5ba0b78d45e0/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=pmQ50LnpasZYKadG_DkHarIQKOEm6dIAoL6B6AEtyu4';

    try {
        const response = await fetch(powerAppsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                trigger: "page_load"
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data received from Power Apps:', data);
        
        // Update the h4 element with the Total Client value
        if (data && data[0] && data[0]["Total Client"]) {
            const totalClientValue = data[0]["Total Client"];
            const totalClientsElement = document.getElementById('total-client-num');
            if (totalClientsElement) {
                totalClientsElement.textContent = totalClientValue;
            } else {
                console.error('Element with ID total-client-num not found');
            }
        } else {
            console.error('Data structure is not as expected:', data);
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching data from Power Apps:', error);
        throw error;
    }
}

// Function to initialize the Power Apps request
function initializePowerAppsRequest() {
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            const data = await fetchPowerAppsData();
        } catch (error) {
            console.error('Failed to initialize Power Apps request:', error);
        }
    });
}

// Initialize when the script loads
initializePowerAppsRequest(); 
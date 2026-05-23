document.getElementById('tracking-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const tracking = document.getElementById('tracking-input').value.trim();
    const resultDiv = document.getElementById('tracking-result');
    resultDiv.textContent = 'Loading...';
    try {
        const res = await fetch('backend/delivery.php?tracking=' + encodeURIComponent(tracking));
        const data = await res.json();
        if (data.error) {
            resultDiv.textContent = data.error;
        } else {
            resultDiv.innerHTML = `<b>Status:</b> ${data.status}<br><b>Order ID:</b> ${data.order_id}<br><b>Tracking Number:</b> ${data.tracking_number}<br><b>Last Update:</b> ${data.last_update}`;
        }
    } catch (err) {
        resultDiv.textContent = 'Error fetching tracking info.';
    }
});

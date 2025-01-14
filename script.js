document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value;
    searchInstallers(query);
});

async function searchInstallers(query) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = 'Buscando...';

    try {
        const response = await fetch(`https://api.opendata.com/v1/search?q=${encodeURIComponent(query)}&category=installers`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            resultsContainer.innerHTML = '';
            data.results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.innerHTML = `
                    <h3>${result.name}</h3>
                    <p>${result.description}</p>
                    <p>Teléfono: ${result.phone}</p>
                `;
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.innerHTML = 'No se encontraron resultados.';
        }
    } catch (error) {
        resultsContainer.innerHTML = 'Error al buscar. Por favor, intente nuevamente.';
        console.error('Error:', error);
    }
}

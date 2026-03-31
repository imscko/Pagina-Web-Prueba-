async function loadPatch() {
    try {
        // Añadimos un timestamp para esquivar el caché molesto del navegador
        const res = await fetch('cs2-patch.json?nocache=' + new Date().getTime());
        if (!res.ok) throw new Error('No se pudo cargar');
        const data = await res.json();

        document.getElementById('patch-summary').textContent = data.summary || 'Sin resumen';
        document.getElementById('patch-date').textContent = data.date || 'Desconocida';

        const changesEl = document.getElementById('changes');
        changesEl.innerHTML = '';
        (data.changes || []).forEach(c => {
            const li = document.createElement('li');
            li.textContent = c;
            changesEl.appendChild(li);
        });
        if ((data.changes || []).length === 0) changesEl.innerHTML = '<li>Sin cambios listados</li>';

        document.getElementById('impact-weapons').textContent = (data.impact && data.impact.weapons) || '—';
        document.getElementById('impact-econ').textContent = (data.impact && data.impact.econ) || '—';
        document.getElementById('impact-maps').textContent = (data.impact && data.impact.maps) || '—';

        const steamLink = document.getElementById('link-steam');
        const fullLink = document.getElementById('link-full-notes');
        steamLink.href = (data.links && data.links.steam) || '#';
        fullLink.href = (data.links && data.links.full) || '#';

        document.getElementById('tips').textContent = data.tips || 'Sin consejos disponibles.';
    } catch (err) {
        document.getElementById('patch-summary').textContent = 'No se pudo obtener la información del parche.';
        document.getElementById('changes').innerHTML = '<li>Error al cargar cambios</li>';
        document.getElementById('tips').textContent = '';
        console.error(err);
    }
}
loadPatch();

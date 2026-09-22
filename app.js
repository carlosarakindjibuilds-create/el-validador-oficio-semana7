let estadoApp = {
    usuario: "Doña Mari",
    modulo: "Semana 7 - Business Bending Logistics",
    rutaActiva: "Puesto Informal -> Central de Abastos",
    telemetriaSimulada: { velocidad_promedio_kmh: 42, vibracion_sensor: "Estable" },
    metricasLogistica: { eficiencia: "94.2%", incidentes_evitados: 0 },
    estado_ia: "ESCUCHANDO_TELEMETRIA"
};

function actualizarInspeccionJSON() {
    const jsonBlock = document.getElementById('jsonBlock');
    if (jsonBlock) {
        jsonBlock.innerText = JSON.stringify({
            "metadatos_simulacion": { "dragon_stack_version": "v7.1.2-adaptive", "timestamp": new Date().toISOString() },
            "estado_actual_sistema": estadoApp
        }, null, 2);
    }
}

function simularViaje() {
    const vehiculo = document.getElementById('vehiculoSimulado');
    const feedback = document.getElementById('feedbackVoz');
    feedback.innerHTML = "🚚 <b>Simulación telemática:</b> Avanzando por coordenadas seguras y midiendo vibraciones...";
    setTimeout(() => {
        vehiculo.style.left = "40%"; vehiculo.style.top = "47%";
        estadoApp.telemetriaSimulada.vibracion_sensor = "Moderada (Baches)";
        actualizarInspeccionJSON();
    }, 1000);
    setTimeout(() => {
        vehiculo.style.left = "80%"; vehiculo.style.top = "50%";
        feedback.innerHTML = "✅ <b>Destino alcanzado:</b> Insumos transportados exitosamente sin alertas críticas.";
        estadoApp.telemetriaSimulada.velocidad_promedio_kmh = 0;
        actualizarInspeccionJSON();
    }, 2500);
}

function inyectarIncidente() {
    const feedback = document.getElementById('feedbackVoz');
    const valRiesgo = document.getElementById('valRiesgo');
    const valEficiencia = document.getElementById('valEficiencia');
    estadoApp.metricasLogistica.incidentes_evitados += 1;
    estadoApp.estado_ia = "RECALCULANDO_MATRIZ_DESVIO";
    valRiesgo.innerText = "ALTO"; valRiesgo.style.color = "#f87171";
    valEficiencia.innerText = "71.4%";
    feedback.innerHTML = "⚠️ <b>Alerta Geodata ML:</b> Bloqueo detectado en tiempo real. Modificando matriz adaptativa de riesgo urbano...";
    actualizarInspeccionJSON();
}

let dechRecognition;
let reconociendo = false;

function alternarVoz() {
    const btn = document.getElementById('btnMicrofono');
    const feedback = document.getElementById('feedbackVoz');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        feedback.innerHTML = "❌ La API de voz nativa no es soportada en este navegador. Usa los botones manuales.";
        return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!dechRecognition) {
        dechRecognition = new SpeechRecognition();
        dechRecognition.lang = 'es-MX';
        dechRecognition.onstart = function() {
            reconociendo = true; btn.style.backgroundColor = "#dc2626"; btn.innerText = "Escuchando... Reporta ahora";
            feedback.innerHTML = "🎙️ <b>Micrófono abierto:</b> Habla usando lenguaje coloquial (ej. 'está muy feo por acá' o 'peligro')...";
        };
        dechRecognition.onresult = function(event) {
            const texto = event.results[0][0].transcript.toLowerCase();
            if (texto.includes("peligro") || texto.includes("feo") || texto.includes("asalto") || texto.includes("bloqueo")) {
                inyectarIncidente();
                feedback.innerHTML = `🗣️ <b>Escuchado:</b> "${texto}" <br>🚨 <b>Clasificador ML de Voz:</b> Peligro detectado. Desvío inmediato activo.`;
            } else {
                feedback.innerHTML = `🗣️ <b>Escuchado:</b> "${texto}" <br>ℹ️ Reporte archivado en los logs logísticos de la sesión.`;
            }
        };
        dechRecognition.onend = function() { reconociendo = false; btn.style.backgroundColor = "#2563eb"; btn.innerText = "Reportar Incidente Vial por Voz (Web Speech API)"; };
    }
    if (reconociendo) { dechRecognition.stop(); } else { dechRecognition.start(); }
}

window.onload = function() { actualizarInspeccionJSON(); };

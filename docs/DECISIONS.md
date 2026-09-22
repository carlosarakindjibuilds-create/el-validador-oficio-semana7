# Cierre de Sesión Técnica - Semana 7 (DECISIONS.md)

## Decisiones Técnicas Tomadas
1.  **Adopción de Simulación Geodata Nativa:** Se omitió el uso de librerías externas de mapas con API keys de pago para cumplir con la restricción estricta de no exponer llaves públicas en repositorios.
2.  **Lógica Adaptativa Local Basada en Clasificación Temática:** Se estructuró un motor adaptativo en JavaScript que recalcula el riesgo urbano sin comprometer el hilo de renderizado principal del navegador.
3.  **Procesamiento de Voz Asíncrono sin Barreras de Lectoescritura:** Se implementó la Web Speech API nativa para capturar comandos de voz de Doña Mari, eliminando por completo los formularios complejos de oficina.

## Consecuencias del Diseño
*   **Positivas:** El software opera a costo cero en infraestructura y reacciona de forma inmediata a los cambios del terreno urbano adaptándose al lenguaje informal de la usuaria.
*   **Mitigaciones:** El análisis por voz se acopló a un diccionario restrictivo local para evitar falsos positivos provocados por el ruido ambiental del tráfico.

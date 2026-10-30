const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'img');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

// 1. Patrón de tiza de fondo (chalk doodles)
const chalkDoodles = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <style>
      .chalk { stroke: #FFFFFF; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; fill: none; opacity: 0.16; }
      .chalk-fill { fill: #FFFFFF; opacity: 0.12; }
      .chalk-text { font-family: 'Caveat Brush', cursive, sans-serif; font-size: 18px; fill: #FFFFFF; opacity: 0.2; }
    </style>
  </defs>

  <!-- Sombrero de chef -->
  <g class="chalk" transform="translate(60, 40) scale(0.9)">
    <path d="M 10 30 C 5 20, 15 10, 25 12 C 30 2, 50 2, 55 12 C 65 10, 75 20, 70 30 Z" />
    <rect x="12" y="30" width="56" height="12" rx="2" />
    <line x1="20" y1="36" x2="60" y2="36" stroke-dasharray="2 3" />
  </g>

  <!-- Rebanada de pizza en tiza -->
  <g class="chalk" transform="translate(420, 50) rotate(15) scale(0.9)">
    <path d="M 10 10 L 60 30 L 25 70 Z" />
    <path d="M 8 10 Q 35 0 62 28" stroke-width="3" />
    <circle cx="32" cy="35" r="4" class="chalk-fill" />
    <circle cx="28" cy="52" r="3" class="chalk-fill" />
    <circle cx="45" cy="40" r="3.5" class="chalk-fill" />
  </g>

  <!-- Corazón de tiza -->
  <g class="chalk" transform="translate(260, 100) scale(0.8)">
    <path d="M 25 10 C 15 -5, -2 12, 10 28 L 25 42 L 40 28 C 52 12, 35 -5, 25 10 Z" />
    <text x="5" y="60" class="chalk-text">con amore</text>
  </g>

  <!-- Rodillo de amasar -->
  <g class="chalk" transform="translate(70, 220) rotate(-25) scale(0.8)">
    <rect x="20" y="8" width="70" height="18" rx="4" />
    <rect x="5" y="13" width="15" height="8" rx="2" />
    <rect x="90" y="13" width="15" height="8" rx="2" />
  </g>

  <!-- Tomate con hojita -->
  <g class="chalk" transform="translate(460, 230) scale(0.85)">
    <circle cx="30" cy="30" r="20" />
    <path d="M 30 10 Q 32 3 36 2" stroke-width="3" />
    <path d="M 26 11 Q 20 8 18 10" />
    <path d="M 34 11 Q 40 8 42 10" />
  </g>

  <!-- Cuña de queso -->
  <g class="chalk" transform="translate(180, 310) scale(0.8)">
    <polygon points="10,35 60,15 65,45 15,55" />
    <polygon points="60,15 90,30 65,45" />
    <circle cx="30" cy="40" r="3" />
    <circle cx="48" cy="32" r="4" />
    <circle cx="38" cy="48" r="2.5" />
  </g>

  <!-- Hojas de albahaca -->
  <g class="chalk" transform="translate(380, 360) scale(0.9)">
    <path d="M 20 40 Q 5 25 25 10 Q 45 25 30 40 Z" />
    <line x1="25" y1="12" x2="25" y2="44" />
    <path d="M 25 24 Q 15 20 12 22" />
    <path d="M 25 28 Q 35 24 38 26" />
  </g>

  <!-- Salero y pimentero -->
  <g class="chalk" transform="translate(80, 440) scale(0.75)">
    <path d="M 15 15 L 20 45 L 40 45 L 45 15 Z" />
    <rect x="20" y="8" width="20" height="7" rx="3" />
    <text x="24" y="36" class="chalk-text">P</text>
  </g>

  <!-- Bigote o sonrisa cartoon -->
  <g class="chalk" transform="translate(260, 480) scale(0.85)">
    <path d="M 10 20 Q 30 10 45 22 Q 60 10 80 20 Q 55 35 45 25 Q 35 35 10 20 Z" />
  </g>

  <!-- Rebanada de pizza en esquina inferior derecha -->
  <g class="chalk" transform="translate(480, 470) rotate(-20) scale(0.85)">
    <path d="M 10 10 L 55 35 L 18 65 Z" />
    <circle cx="28" cy="35" r="4" class="chalk-fill" />
  </g>

  <!-- Destellos y estrellas tipo tiza -->
  <g class="chalk">
    <path d="M 200 50 L 205 60 L 215 65 L 205 70 L 200 80 L 195 70 L 185 65 L 195 60 Z" />
    <path d="M 330 220 L 333 226 L 340 228 L 333 231 L 330 238 L 327 231 L 320 228 L 327 226 Z" />
    <path d="M 490 160 L 493 165 L 500 167 L 493 170 L 490 175 L 487 170 L 480 167 L 487 165 Z" />
    <circle cx="150" cy="180" r="2" class="chalk-fill" />
    <circle cx="340" cy="430" r="2.5" class="chalk-fill" />
    <circle cx="20" cy="340" r="2" class="chalk-fill" />
    <circle cx="560" cy="380" r="2" class="chalk-fill" />
  </g>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'chalk-doodles.svg'), chalkDoodles, 'utf8');

// 2. Slice decorativa para esquinas del Hero
const sliceDecor = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <defs>
    <filter id="sd-shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#111" />
    </filter>
  </defs>
  <g filter="url(#sd-shadow)">
    <!-- Contorno sticker blanco -->
    <path d="M 180 30 C 130 10, 40 25, 20 60 L 105 175 Z" fill="#FFF" stroke="#FFF" stroke-width="14" stroke-linejoin="round" />
    <!-- Corteza -->
    <path d="M 175 35 C 130 18, 45 32, 28 62 L 105 168 Z" fill="#FFD52A" stroke="#C68A50" stroke-width="4" />
    <!-- Masa dorada orilla -->
    <path d="M 175 35 C 130 18, 45 32, 28 62 L 38 75 C 65 52, 140 40, 168 50 Z" fill="#C68A50" />
    <!-- Queso y salsa -->
    <path d="M 160 55 C 130 45, 60 56, 42 78 L 105 160 Z" fill="#FFD52A" />
    <!-- Pepperoni -->
    <circle cx="95" cy="85" r="18" fill="#E31E24" stroke="#A51115" stroke-width="3" />
    <circle cx="90" cy="80" r="2.5" fill="#FFA5A7" />
    <circle cx="70" cy="120" r="14" fill="#E31E24" stroke="#A51115" stroke-width="2.5" />
    <circle cx="120" cy="115" r="15" fill="#E31E24" stroke="#A51115" stroke-width="2.5" />
    <!-- Albahaca verde -->
    <path d="M 98 128 C 90 120, 110 115, 115 130 Z" fill="#63A83D" />
  </g>
</svg>`;
fs.writeFileSync(path.join(imgDir, 'Rebanada.webp'), sliceDecor, 'utf8');

// Función helper para generar SVGs de productos con estilo sticker cartoon
function generateProductSVG(type, title, subtitle, colorAccent = '#E31E24') {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <filter id="prod-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="4" dy="6" stdDeviation="0" flood-color="#181818" />
    </filter>
    <linearGradient id="bg-plate" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#282828" />
      <stop offset="100%" stop-color="#151515" />
    </linearGradient>
  </defs>

  <!-- Plato pizarra de fondo con borde tiza -->
  <rect x="15" y="15" width="370" height="270" rx="24" fill="url(#bg-plate)" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="6 4" />
  
  <!-- Mini doodles de tiza en esquinas -->
  <g stroke="#FFF" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.25">
    <path d="M 35 45 Q 42 35 55 42" />
    <path d="M 345 42 Q 355 52 360 40" />
    <circle cx="45" cy="255" r="2" fill="#FFF" />
    <circle cx="355" cy="255" r="2" fill="#FFF" />
  </g>

  <!-- Contenedor central con filtro sticker -->
  <g filter="url(#prod-shadow)" transform="translate(200, 140)">
    ${getIllustration(type)}
  </g>

  <!-- Badge sutil de amor o título -->
  <g transform="translate(200, 260)">
    <rect x="-90" y="-14" width="180" height="24" rx="12" fill="#FFFFFF" stroke="${colorAccent}" stroke-width="2" />
    <text x="0" y="3" font-family="'Caveat Brush', cursive, sans-serif" font-size="14" font-weight="bold" fill="#1C1C1C" text-anchor="middle">${title}</text>
  </g>
</svg>`;
}

function getIllustration(type) {
  switch (type) {
    case 'pizza-pepperoni':
      return `
        <!-- Borde sticker blanco -->
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="74" fill="#E31E24" />
        <circle cx="0" cy="0" r="70" fill="#FFD52A" stroke="#FFF" stroke-width="2" stroke-dasharray="4 4" />
        <!-- Pepperonis -->
        <circle cx="-32" cy="-28" r="16" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <circle cx="32" cy="-25" r="16" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <circle cx="0" cy="0" r="18" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <circle cx="-35" cy="28" r="15" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <circle cx="32" cy="30" r="16" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <!-- Albahaca verde -->
        <path d="M -15 15 C -25 5, -10 -5, -5 10 Z" fill="#63A83D" />
        <path d="M 18 -8 C 28 -18, 30 -5, 18 -2 Z" fill="#63A83D" />
      `;

    case 'pizza-margarita':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="74" fill="#E31E24" />
        <circle cx="0" cy="0" r="70" fill="#FFF275" />
        <!-- Bolas mozzarella fresca -->
        <circle cx="-30" cy="-25" r="18" fill="#FFFFFF" stroke="#E5DAC5" stroke-width="3" />
        <circle cx="30" cy="-20" r="16" fill="#FFFFFF" stroke="#E5DAC5" stroke-width="3" />
        <circle cx="0" cy="15" r="20" fill="#FFFFFF" stroke="#E5DAC5" stroke-width="3" />
        <!-- Hojas de albahaca fresca -->
        <path d="M -10 -15 C -30 -30, -5 -40, 2 -20 Z" fill="#63A83D" stroke="#3D6B24" stroke-width="2" />
        <path d="M 25 15 C 45 5, 45 35, 20 28 Z" fill="#63A83D" stroke="#3D6B24" stroke-width="2" />
        <path d="M -25 25 C -45 15, -35 45, -15 35 Z" fill="#63A83D" stroke="#3D6B24" stroke-width="2" />
        <!-- Tomatitos cherry -->
        <circle cx="-8" cy="-5" r="9" fill="#E31E24" />
        <circle cx="18" cy="-28" r="9" fill="#E31E24" />
      `;

    case 'pizza-hawaiana':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="72" fill="#FFD52A" />
        <!-- Trozos de Jamón -->
        <rect x="-45" y="-35" width="22" height="18" rx="4" fill="#E87A90" stroke="#C4566E" stroke-width="2" transform="rotate(15 -35 -25)" />
        <rect x="20" y="-35" width="24" height="20" rx="4" fill="#E87A90" stroke="#C4566E" stroke-width="2" transform="rotate(-20 30 -25)" />
        <rect x="-10" y="20" width="24" height="18" rx="4" fill="#E87A90" stroke="#C4566E" stroke-width="2" transform="rotate(5 0 30)" />
        <rect x="-40" y="10" width="20" height="18" rx="4" fill="#E87A90" stroke="#C4566E" stroke-width="2" />
        <!-- Trozos de Piña asada -->
        <polygon points="5,-15 25,-25 22,-5" fill="#FFE247" stroke="#D8A915" stroke-width="2" />
        <polygon points="-25,-5 -10,-18 -5,-2" fill="#FFE247" stroke="#D8A915" stroke-width="2" />
        <polygon points="25,15 45,10 38,30" fill="#FFE247" stroke="#D8A915" stroke-width="2" />
        <polygon points="-25,35 -10,25 -8,45" fill="#FFE247" stroke="#D8A915" stroke-width="2" />
      `;

    case 'pizza-quesos':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="72" fill="#FFDE59" />
        <!-- Espirales de 4 quesos fundidos -->
        <path d="M -50 -20 Q 0 -60 50 -10 Q 0 40 -40 20" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.8" />
        <!-- Puntos queso azul -->
        <circle cx="-25" cy="-15" r="4" fill="#58869F" />
        <circle cx="20" cy="-25" r="4" fill="#58869F" />
        <circle cx="15" cy="25" r="4.5" fill="#58869F" />
        <circle cx="-20" cy="30" r="3.5" fill="#58869F" />
        <!-- Queso tostado gratinado -->
        <ellipse cx="0" cy="-5" rx="18" ry="10" fill="#D89230" opacity="0.4" />
        <ellipse cx="-30" cy="5" rx="12" ry="7" fill="#D89230" opacity="0.4" />
      `;

    case 'pizza-corazon':
      return `
        <!-- Sticker blanco corazón -->
        <path d="M 0 -70 C -60 -140, -145 -70, -115 20 C -95 80, -20 120, 0 145 C 20 120, 95 80, 115 20 C 145 -70, 60 -140, 0 -70 Z" 
              fill="#FFFFFF" stroke="#FFFFFF" stroke-width="10" transform="scale(0.62) translate(0, -20)" />
        <!-- Masa dorada -->
        <path d="M 0 -70 C -60 -140, -145 -70, -115 20 C -95 80, -20 120, 0 145 C 20 120, 95 80, 115 20 C 145 -70, 60 -140, 0 -70 Z" 
              fill="#C68A50" stroke="#8F5826" stroke-width="3" transform="scale(0.58) translate(0, -20)" />
        <!-- Queso fundido corazón -->
        <path d="M 0 -55 C -45 -110, -115 -55, -90 15 C -75 60, -15 95, 0 115 C 15 95, 75 60, 90 15 C 115 -55, 45 -110, 0 -55 Z" 
              fill="#FFD52A" transform="scale(0.54) translate(0, -20)" />
        <!-- Pepperonis de corazón -->
        <g transform="translate(0, -25) scale(0.45)">
          <path d="M 0 -15 C -25 -40, -50 -5, -20 25 L 0 45 L 20 25 C 50 -5, 25 -40, 0 -15 Z" fill="#E31E24" stroke="#8A1013" stroke-width="3" />
        </g>
        <g transform="translate(-25, 5) scale(0.38)">
          <path d="M 0 -15 C -25 -40, -50 -5, -20 25 L 0 45 L 20 25 C 50 -5, 25 -40, 0 -15 Z" fill="#E31E24" stroke="#8A1013" stroke-width="3" />
        </g>
        <g transform="translate(25, 5) scale(0.38)">
          <path d="M 0 -15 C -25 -40, -50 -5, -20 25 L 0 45 L 20 25 C 50 -5, 25 -40, 0 -15 Z" fill="#E31E24" stroke="#8A1013" stroke-width="3" />
        </g>
        <!-- Hojas de albahaca fresca -->
        <path d="M -5 18 C -18 10, -12 25, 0 25 Z" fill="#63A83D" />
        <path d="M 12 -10 C 22 -15, 20 -2, 8 -3 Z" fill="#63A83D" />
      `;

    case 'pizza-carnivora':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="72" fill="#FFD52A" />
        <!-- Pepperonis y trozos carnívoros -->
        <circle cx="-35" cy="-25" r="16" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <circle cx="35" cy="20" r="16" fill="#E31E24" stroke="#8A1013" stroke-width="2.5" />
        <!-- Tiras de tocino crujiente -->
        <path d="M -25 15 Q -10 25 5 15 Q 20 5 35 15" stroke="#9E2A2B" stroke-width="8" stroke-linecap="round" fill="none" />
        <path d="M -35 -5 Q -20 -15 -5 -5 Q 10 5 25 -5" stroke="#9E2A2B" stroke-width="7" stroke-linecap="round" fill="none" />
        <!-- Albóndigas / Salchicha italiana -->
        <circle cx="5" cy="-30" r="11" fill="#723D1F" stroke="#482410" stroke-width="2" />
        <circle cx="-15" cy="35" r="10" fill="#723D1F" stroke="#482410" stroke-width="2" />
        <circle cx="15" cy="35" r="9" fill="#723D1F" stroke="#482410" stroke-width="2" />
      `;

    case 'pizza-diabla':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="72" fill="#FF8D3B" />
        <!-- Chiles jalapeños y salsa brava -->
        <circle cx="-25" cy="-25" r="14" fill="#E31E24" stroke="#8A1013" stroke-width="2" />
        <circle cx="28" cy="-20" r="14" fill="#E31E24" stroke="#8A1013" stroke-width="2" />
        <circle cx="0" cy="20" r="15" fill="#E31E24" stroke="#8A1013" stroke-width="2" />
        <!-- Rodajas de Jalapeño verde -->
        <circle cx="-20" cy="15" r="11" fill="#3D821C" stroke="#22500D" stroke-width="2" />
        <circle cx="-20" cy="15" r="5" fill="#FF8D3B" />
        <circle cx="25" cy="15" r="11" fill="#3D821C" stroke="#22500D" stroke-width="2" />
        <circle cx="25" cy="15" r="5" fill="#FF8D3B" />
        <circle cx="2" cy="-12" r="10" fill="#3D821C" stroke="#22500D" stroke-width="2" />
        <circle cx="2" cy="-12" r="4" fill="#FF8D3B" />
        <!-- Llamitas de fuego tiza -->
        <path d="M 0 -45 Q -10 -30 0 -25 Q 10 -30 0 -45 Z" fill="#E31E24" />
      `;

    case 'pizza-huerto':
      return `
        <circle cx="0" cy="0" r="92" fill="#FFF" stroke="#FFF" stroke-width="8" />
        <circle cx="0" cy="0" r="88" fill="#C68A50" stroke="#8F5826" stroke-width="4" />
        <circle cx="0" cy="0" r="72" fill="#FFF59D" />
        <!-- Pimientos tricolor -->
        <path d="M -30 -25 Q -15 -40 0 -25" stroke="#E31E24" stroke-width="6" stroke-linecap="round" fill="none" />
        <path d="M 10 -30 Q 30 -20 35 0" stroke="#4CAF50" stroke-width="6" stroke-linecap="round" fill="none" />
        <path d="M -35 15 Q -25 35 0 30" stroke="#FF9800" stroke-width="6" stroke-linecap="round" fill="none" />
        <!-- Aceitunas negras -->
        <circle cx="20" cy="25" r="9" fill="#2E2E2E" stroke="#FFF" stroke-width="1.5" />
        <circle cx="20" cy="25" r="4" fill="#FFF59D" />
        <circle cx="-15" cy="-5" r="9" fill="#2E2E2E" stroke="#FFF" stroke-width="1.5" />
        <circle cx="-15" cy="-5" r="4" fill="#FFF59D" />
        <!-- Champiñones -->
        <path d="M 5 5 C 0 -10, 20 -10, 15 5 Z" fill="#D7CCC8" stroke="#8D6E63" stroke-width="2" />
      `;

    case 'combo':
      return `
        <!-- Combo: Caja / Pizza + Vaso de gaseosa con popote -->
        <g transform="translate(-30, 10)">
          <ellipse cx="0" cy="0" rx="60" ry="40" fill="#FFF" stroke="#FFF" stroke-width="6" />
          <ellipse cx="0" cy="0" rx="56" ry="36" fill="#C68A50" />
          <ellipse cx="0" cy="0" rx="46" ry="28" fill="#FFD52A" />
          <circle cx="-15" cy="-5" r="8" fill="#E31E24" />
          <circle cx="15" cy="5" r="8" fill="#E31E24" />
          <circle cx="0" cy="0" r="8" fill="#E31E24" />
        </g>
        <!-- Vaso de refresco cartoon -->
        <g transform="translate(50, -15)">
          <path d="M -20 -35 L 20 -35 L 14 45 L -14 45 Z" fill="#E31E24" stroke="#FFF" stroke-width="6" stroke-linejoin="round" />
          <!-- Tapa y popote -->
          <ellipse cx="0" cy="-35" rx="22" ry="6" fill="#FFF" />
          <path d="M 0 -35 L 8 -65 L 20 -60" stroke="#FFD52A" stroke-width="6" stroke-linecap="round" fill="none" />
          <!-- Corazón en el vaso -->
          <path d="M 0 -10 C -8 -20, -16 -5, 0 10 C 16 -5, 8 -20, 0 -10 Z" fill="#FFF" />
        </g>
      `;

    case 'entrada':
      return `
        <!-- Palitroques o alitas -->
        <rect x="-65" y="-35" width="130" height="70" rx="20" fill="#FFF" stroke="#FFF" stroke-width="6" />
        <rect x="-60" y="-30" width="120" height="60" rx="16" fill="#D98A36" stroke="#9E5D1A" stroke-width="3" />
        <!-- Rayas de mantequilla con ajo y perejil -->
        <line x1="-40" y1="-25" x2="-40" y2="25" stroke="#FFF275" stroke-width="7" stroke-linecap="round" />
        <line x1="-15" y1="-25" x2="-15" y2="25" stroke="#FFF275" stroke-width="7" stroke-linecap="round" />
        <line x1="12" y1="-25" x2="12" y2="25" stroke="#FFF275" stroke-width="7" stroke-linecap="round" />
        <line x1="38" y1="-25" x2="38" y2="25" stroke="#FFF275" stroke-width="7" stroke-linecap="round" />
        <!-- Pizcas perejil -->
        <circle cx="-40" cy="-5" r="2" fill="#3D821C" />
        <circle cx="-15" cy="10" r="2" fill="#3D821C" />
        <circle cx="12" cy="-8" r="2" fill="#3D821C" />
        <circle cx="38" cy="8" r="2" fill="#3D821C" />
        <!-- Dips de salsa -->
        <circle cx="0" cy="45" r="22" fill="#FFF" stroke="#FFF" stroke-width="4" />
        <circle cx="0" cy="45" r="18" fill="#E31E24" stroke="#8A1013" stroke-width="2" />
      `;

    case 'bebida':
      return `
        <!-- Botella o vaso frío cartoon -->
        <g transform="translate(0, -10)">
          <path d="M -22 60 L -25 -20 C -25 -45, -10 -55, -8 -70 L 8 -70 C 10 -55, 25 -45, 25 -20 L 22 60 Z" 
                fill="#E31E24" stroke="#FFF" stroke-width="6" stroke-linejoin="round" />
          <!-- Tapa -->
          <rect x="-10" y="-78" width="20" height="10" rx="3" fill="#FFD52A" stroke="#FFF" stroke-width="2" />
          <!-- Etiqueta con corazón -->
          <rect x="-24" y="-5" width="48" height="36" fill="#FFF" />
          <path d="M 0 5 C -6 -3, -12 7, 0 18 C 12 7, 6 -3, 0 5 Z" fill="#E31E24" />
          <!-- Gotitas condensación -->
          <circle cx="15" cy="45" r="2.5" fill="#FFF" opacity="0.8" />
          <circle cx="-12" cy="35" r="2" fill="#FFF" opacity="0.8" />
          <circle cx="12" cy="-15" r="2" fill="#FFF" opacity="0.8" />
        </g>
      `;

    case 'postre':
      return `
        <!-- Porción de pizza con Nutella o brownie con fresas -->
        <path d="M 0 -65 L 65 45 C 40 60, -40 60, -65 45 Z" fill="#FFF" stroke="#FFF" stroke-width="8" stroke-linejoin="round" />
        <path d="M 0 -58 L 58 40 C 35 52, -35 52, -58 40 Z" fill="#542E13" stroke="#381D09" stroke-width="3" />
        <!-- Chispas y fresa -->
        <path d="M 0 -10 C -12 -22, -22 -6, 0 12 C 22 -6, 12 -22, 0 -10 Z" fill="#E31E24" stroke="#FFF" stroke-width="2" />
        <!-- Hojas fresa -->
        <path d="M 0 -12 Q -8 -18 0 -22 Q 8 -18 0 -12" fill="#63A83D" />
        <!-- Sirope blanco decorativo -->
        <path d="M -30 20 Q 0 10 30 25" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round" fill="none" />
      `;

    default:
      return `<circle cx="0" cy="0" r="60" fill="#FFD52A" stroke="#FFF" stroke-width="6" />`;
  }
}

// Generar lista de productos e imágenes específicas
const svgMap = [
  { file: 'pizza-pepperoni.svg', type: 'pizza-pepperoni', title: 'Pepperoni Lovers', color: '#E31E24' },
  { file: 'pizza-margarita.svg', type: 'pizza-margarita', title: 'Margarita Tradizionale', color: '#63A83D' },
  { file: 'pizza-hawaiana.svg', type: 'pizza-hawaiana', title: 'Hawaiana Caribeña', color: '#FFD52A' },
  { file: 'pizza-quesos.svg', type: 'pizza-quesos', title: 'Cuatro Quesos Dorados', color: '#FFD52A' },
  { file: 'pizza-corazon.svg', type: 'pizza-corazon', title: 'Love Pizza Corazón', color: '#E31E24' },
  { file: 'pizza-carnivora.svg', type: 'pizza-carnivora', title: 'Carnívora Brutal', color: '#E31E24' },
  { file: 'pizza-diabla.svg', type: 'pizza-diabla', title: 'La Diabla Picante', color: '#E31E24' },
  { file: 'pizza-huerto.svg', type: 'pizza-huerto', title: 'Huerto del Amor', color: '#63A83D' },

  { file: 'combo-duo.svg', type: 'combo', title: 'Combo Cita Perfecta', color: '#E31E24' },
  { file: 'combo-familiar.svg', type: 'combo', title: 'Combo Familiar', color: '#FFD52A' },
  { file: 'combo-alitas.svg', type: 'combo', title: 'Combo Alitas & Pizza', color: '#E31E24' },
  { file: 'combo-personal.svg', type: 'combo', title: 'Combo Solitario', color: '#63A83D' },

  { file: 'entrada-palitroques.svg', type: 'entrada', title: 'Palitroques de Ajo', color: '#C68A50' },
  { file: 'entrada-alitas.svg', type: 'entrada', title: 'Alitas BBQ Glaseadas', color: '#E31E24' },
  { file: 'entrada-nudos.svg', type: 'entrada', title: 'Nudos de Amor al Romero', color: '#63A83D' },
  { file: 'entrada-papas.svg', type: 'entrada', title: 'Papas Rústicas con Queso', color: '#FFD52A' },

  { file: 'bebida-gaseosa.svg', type: 'bebida', title: 'Coca-Cola 1.5L', color: '#E31E24' },
  { file: 'bebida-limonada.svg', type: 'bebida', title: 'Limonada Rosa de Amor', color: '#E31E24' },
  { file: 'bebida-te.svg', type: 'bebida', title: 'Té Helado Melocotón', color: '#FFD52A' },
  { file: 'bebida-cerveza.svg', type: 'bebida', title: 'Cerveza Blonde Ale', color: '#FFD52A' },

  { file: 'postre-nutella.svg', type: 'postre', title: 'Pizza Dulce Nutella', color: '#C68A50' },
  { file: 'postre-calzone.svg', type: 'postre', title: 'Mini Calzone Manzana', color: '#C68A50' },
  { file: 'postre-brownie.svg', type: 'postre', title: 'Volcán Brownie Helado', color: '#E31E24' },
  { file: 'postre-churros.svg', type: 'postre', title: 'Churros Bites Caseros', color: '#FFD52A' }
];

svgMap.forEach(item => {
  const content = generateProductSVG(item.type, item.title, '', item.color);
  fs.writeFileSync(path.join(imgDir, item.file), content, 'utf8');
});

// Generar imágenes de galería (5 fotos estilizadas)
for (let i = 1; i <= 5; i++) {
  const galSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g-grad-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#222" />
        <stop offset="50%" stop-color="#1A1A1A" />
        <stop offset="100%" stop-color="#0E0E0E" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g-grad-${i})" />
    <!-- Trama sutil de cuadros / pizarra -->
    <rect x="20" y="20" width="560" height="360" rx="16" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="2" stroke-dasharray="8 6" />
    
    <!-- Elemento ilustrado temático de galería -->
    <g transform="translate(300, 180) scale(1.1)">
      ${i === 1 ? getIllustration('pizza-corazon') : i === 2 ? getIllustration('pizza-pepperoni') : i === 3 ? getIllustration('entrada') : i === 4 ? getIllustration('pizza-huerto') : getIllustration('combo')}
    </g>
    
    <!-- Sello de Love Pizza -->
    <circle cx="80" cy="80" r="35" fill="#E31E24" stroke="#FFF" stroke-width="4" />
    <text x="80" y="85" font-family="'Lilita One', Impact" font-size="20" fill="#FFF" text-anchor="middle">LOVE</text>
    <text x="80" y="100" font-family="'Caveat Brush', cursive" font-size="12" fill="#FFD52A" text-anchor="middle">PIZZA</text>
  </svg>`;
  fs.writeFileSync(path.join(imgDir, `galeria-${i}.svg`), galSvg, 'utf8');
}

console.log('SVGs generados exitosamente.');

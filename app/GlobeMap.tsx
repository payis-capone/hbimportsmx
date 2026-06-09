"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false });

// Data structure for our regions
const regionsData = [
  // Mexico
  { country: "Mexico", lat: 29.07, lng: -110.95, label: "Sonora", desc: "Agave Prohibido Brands", color: "#B21F24" },
  { country: "Mexico", lat: 32.06, lng: -116.63, label: "Baja California Norte", desc: "Vino Décima", color: "#B21F24" },
  // Argentina
  { country: "Argentina", lat: -32.89, lng: -68.82, label: "Mendoza", desc: "Bodegas Pascual Toso", color: "#B21F24" },
  { country: "Argentina", lat: -33.4, lng: -69.1, label: "Valle de Uco, Mendoza", desc: "El Secreto - Kosher", color: "#B21F24" },
  // Spain
  { country: "Spain", lat: 42.27, lng: -2.52, label: "D.O.Ca. Rioja", desc: "Hispano Bodegas", color: "#B21F24" },
  { country: "Spain", lat: 41.68, lng: -3.68, label: "D.O. Ribera del Duero", desc: "Hispano Bodegas", color: "#B21F24" },
  { country: "Spain", lat: 41.41, lng: -4.95, label: "D.O. Rueda", desc: "Hispano Bodegas", color: "#B21F24" },
  // USA
  { country: "United States of America", lat: 38.13, lng: -121.27, label: "Lodi, California", desc: "Lapis Luna", color: "#B21F24" },
  { country: "United States of America", lat: 39.15, lng: -123.20, label: "Mendocino, California", desc: "DNA Vineyards", color: "#B21F24" }
];

const hbCountriesMap: Record<string, string> = {
  "Argentina": "Bodegas Pascual Toso (Mendoza, Argentina)<br/>El Secreto - Kosher (Mendoza, Argentina)",
  "Spain": "Hispano Bodegas<br/><span style='font-size:11px;color:#ccc;'>(D.O.Ca. Rioja, D.O. Ribera del Duero, D.O. Rueda)</span>",
  "United States of America": "Lapis Luna (Lodi, California)<br/>DNA Vineyards (Mendocino, California)",
  "Mexico": "Agave Prohibido Brands (Sonora)<br/>Vino Décima (Valle de Guadalupe, Baja California)"
};

export default function GlobeMap() {
  const [countries, setCountries] = useState({ features: [] });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);

  useEffect(() => {
    // Load GeoJSON data
    fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
      .then(res => res.json())
      .then(data => {
        setCountries(data);
      });
      
    // Handle resize
    const updateSize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize(); // Initial call
    setTimeout(updateSize, 100);
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (globeRef.current && !selectedCountry) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      controls.enableZoom = false; 
    }
  }, [dimensions, selectedCountry]);

  const handlePolygonClick = (d: any) => {
    const admin = d.properties.ADMIN;
    if (hbCountriesMap[admin]) {
      setSelectedCountry(admin);
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        controls.autoRotate = false;
        
        // Find center of the points for this country to focus on
        const points = regionsData.filter(r => r.country === admin);
        if (points.length > 0) {
          const avgLat = points.reduce((sum, p) => sum + p.lat, 0) / points.length;
          const avgLng = points.reduce((sum, p) => sum + p.lng, 0) / points.length;
          
          // Move camera with closer zoom to avoid label overlap
          const zoomAltitude = window.innerWidth < 768 ? 0.35 : 0.45;
          globeRef.current.pointOfView({ lat: avgLat, lng: avgLng, altitude: zoomAltitude }, 1500);
        }
      }
    }
  };

  const handleReset = () => {
    setSelectedCountry(null);
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
      // Reset zoom
      globeRef.current.pointOfView({ altitude: 2.2 }, 1500);
    }
  };

  return (
    <div className="relative w-full">
      {/* Back button overlay */}
      {selectedCountry && (
        <button 
          onClick={handleReset}
          className="absolute top-4 lg:top-8 left-4 lg:left-8 z-20 bg-primary text-white px-6 py-3 rounded-full font-bold text-[10px] md:text-xs tracking-widest uppercase shadow-2xl hover:bg-white hover:text-primary transition-all border border-transparent flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm md:text-base">arrow_back</span> Volver al mundo
        </button>
      )}

      {/* Title overlay */}
      {selectedCountry && (
        <div className="absolute bottom-4 right-4 lg:bottom-8 lg:right-8 z-20 bg-black/90 backdrop-blur-md text-white p-6 rounded-2xl shadow-2xl border border-white/10 text-right pointer-events-none">
          <p className="font-label text-[9px] md:text-xs tracking-[0.3em] text-white/50 uppercase mb-2">Regiones Vinícolas</p>
          <h3 className="font-headline text-3xl md:text-5xl font-bold text-primary italic leading-none">{selectedCountry === 'United States of America' ? 'USA' : selectedCountry}</h3>
        </div>
      )}

      <div 
        ref={containerRef} 
        className="w-full flex justify-center items-center h-[500px] md:h-[650px] cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {typeof window !== 'undefined' && dimensions.width > 0 && (
          <Globe
            ref={globeRef}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="rgba(0,0,0,0)"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-water.png"
            polygonsData={countries.features}
            
            // Polygon styling
            polygonAltitude={(d: any) => {
              if (selectedCountry === d.properties.ADMIN) return 0.04;
              return Object.keys(hbCountriesMap).includes(d.properties.ADMIN) ? 0.04 : 0.01;
            }}
            polygonCapColor={(d: any) => {
              if (selectedCountry === d.properties.ADMIN) return "rgba(178, 31, 36, 0.9)";
              return Object.keys(hbCountriesMap).includes(d.properties.ADMIN) ? "rgba(178, 31, 36, 0.7)" : "rgba(220, 220, 220, 0.5)";
            }}
            polygonSideColor={(d: any) => Object.keys(hbCountriesMap).includes(d.properties.ADMIN) ? "rgba(178, 31, 36, 0.3)" : "rgba(200, 200, 200, 0.2)"}
            polygonStrokeColor={() => "#fff"}
            polygonsTransitionDuration={500}
            
            // Polygon interaction
            onPolygonClick={handlePolygonClick}
            polygonLabel={(d: any) => {
              const admin = d.properties.ADMIN;
              if (selectedCountry) return ''; // Hide polygon labels when zoomed in
              
              if (hbCountriesMap[admin]) {
                return `
                  <div style="background: rgba(28, 28, 28, 0.95); color: white; padding: 12px 18px; border-radius: 8px; font-size: 13px; font-family: sans-serif; box-shadow: 0 4px 20px rgba(0,0,0,0.3); min-width: 150px; text-align: left;">
                    <b style="color: #B21F24; font-size: 16px; display: block; margin-bottom: 6px; border-bottom: 1px solid rgba(178,31,36,0.3); padding-bottom: 4px;">${admin === 'United States of America' ? 'USA' : admin}</b>
                    <span style="color: #aaa; font-size: 11px; display: block; margin-bottom: 2px; text-transform: uppercase; letter-spacing: 1px;">Marcas:</span>
                    <i style="color: #fff; font-size: 14px; font-weight: 500;">${hbCountriesMap[admin]}</i>
                    <div style="margin-top: 10px; font-size: 10px; color: #B21F24; text-transform: uppercase; letter-spacing: 1px; padding-top: 6px; display: flex; align-items: center; gap: 4px;">
                      Clic para explorar regiones <span style="font-size: 12px;">›</span>
                    </div>
                  </div>
                `;
              }
              return `
                <div style="background: rgba(28, 28, 28, 0.9); color: white; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-family: sans-serif;">
                  <b>${admin}</b>
                </div>
              `;
            }}
            
            onPolygonHover={(d: any) => {
              if (globeRef.current && !selectedCountry) {
                const controls = globeRef.current.controls();
                if (d) {
                  controls.autoRotate = false;
                  containerRef.current!.style.cursor = hbCountriesMap[d.properties.ADMIN] ? 'pointer' : 'grab';
                } else {
                  controls.autoRotate = true;
                  containerRef.current!.style.cursor = 'grab';
                }
              }
            }}

            // Region points
            labelsData={selectedCountry ? regionsData.filter(r => r.country === selectedCountry) : []}
            labelLat={(d: any) => d.lat}
            labelLng={(d: any) => d.lng}
            labelText={() => ''}
            labelSize={0}
            labelDotRadius={0.7}
            labelColor={() => 'white'}
            labelAltitude={0.06}
            
            // High-quality region text
            htmlElementsData={selectedCountry ? regionsData.filter(r => r.country === selectedCountry) : []}
            htmlLat={(d: any) => d.lat}
            htmlLng={(d: any) => d.lng}
            htmlAltitude={0.06}
            htmlElement={(d: any) => {
              const el = document.createElement('div');
              el.style.fontFamily = 'system-ui, sans-serif';
              el.style.textShadow = '0px 2px 10px rgba(0,0,0,1), 0px 0px 4px rgba(0,0,0,0.8), 2px 2px 2px rgba(178,31,36,0.5)';
              el.style.pointerEvents = 'none';
              el.style.whiteSpace = 'nowrap';
              
              // Custom offsets to prevent overlapping for nearby points
              let yOffset = -12;
              let xOffset = 12;
              let showBrand = true;
              
              const lbl = d.label.toLowerCase();
              if (lbl.includes('mendocino')) { yOffset = -25; xOffset = -20; }
              if (lbl.includes('lodi')) { yOffset = 15; xOffset = 15; }
              if (lbl.includes('rioja')) { yOffset = -35; xOffset = -10; }
              if (lbl.includes('ribera')) { yOffset = -5; xOffset = 25; showBrand = false; }
              if (lbl.includes('rueda')) { yOffset = 25; xOffset = -15; showBrand = false; }
              if (lbl.includes('mendoza') && !lbl.includes('uco')) { yOffset = -25; xOffset = -15; }
              if (lbl.includes('uco')) { yOffset = 15; xOffset = 15; }

              const brandHtml = showBrand ? `<span style="font-size: 12px; font-weight: bold; color: #ffffff;">${d.desc}</span><br/>` : '';
              el.innerHTML = `${brandHtml}<span style="font-size: 9px; font-weight: 500; color: #e0e0e0; text-transform: uppercase; letter-spacing: 0.5px;">${d.label}</span>`;

              el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
              el.style.lineHeight = '1.2';
              return el;
            }}
            labelLabel={(d: any) => `
              <div style="background: rgba(178, 31, 36, 0.95); color: white; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-family: sans-serif; box-shadow: 0 4px 15px rgba(0,0,0,0.3); text-align: left;">
                <b style="display: block; font-size: 15px; margin-bottom: 2px;">${d.label}</b>
                <i style="color: rgba(255,255,255,0.9); font-size: 13px;">${d.desc}</i>
              </div>
            `}
            
            // Region rings for visual effect
            ringsData={selectedCountry ? regionsData.filter(r => r.country === selectedCountry) : []}
            ringLat={(d: any) => d.lat}
            ringLng={(d: any) => d.lng}
            ringColor={(d: any) => d.color}
            ringMaxRadius={4}
            ringPropagationSpeed={2}
            ringRepeatPeriod={800}
            ringAltitude={0.06}
          />
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Heart, Leaf, Globe, Camera } from 'lucide-react';

const TreePlantingTracker = () => {
  const [plantings, setPlantings] = useState([
    { id: 1, count: 5, location: "Brooklyn, NY", message: "For my grandma 💐", date: "2025-07-20", photo: null },
    { id: 2, count: 2, location: "Tokyo, Japan", message: "Cherry blossoms for hope 🌸", date: "2025-07-19", photo: null },
    { id: 3, count: 10, location: "São Paulo, Brazil", message: "Healing the earth one seed at a time 🌱", date: "2025-07-18", photo: null }
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newPlanting, setNewPlanting] = useState({
    count: '',
    location: '',
    message: ''
  });
  
  const [aiPoetry, setAiPoetry] = useState('');
  const [showPoetry, setShowPoetry] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);

  const totalTrees = plantings.reduce((sum, p) => sum + p.count, 0);

  const plantingSuggestions = [
    { 
      id: 1, 
      title: "Urban Heat Islands", 
      description: "Cities need more green spaces to cool down",
      locations: ["Downtown areas", "Parking lots", "Industrial zones"],
      pixelIcon: "🏙️"
    },
    { 
      id: 2, 
      title: "Near Water Sources", 
      description: "Rivers and lakes areas for better growth",
      locations: ["Riverbanks", "Lake shores", "Stream sides"],
      pixelIcon: "🌊"
    },
    { 
      id: 3, 
      title: "School Gardens", 
      description: "Educational spaces for future generations",
      locations: ["Elementary schools", "Community centers", "Libraries"],
      pixelIcon: "🏫"
    }
  ];

  const generatePoetry = () => {
    const poems = [
      "Seeds scattered like whispers in the wind,\nEach one a promise, a future pinned.\nYour hands have touched tomorrow's air,\nWith love that grows beyond compare.",
      "In soil dark and rich with dreams,\nYour planted hope forever gleams.\nA forest born from human heart,\nWhere earth and soul shall never part.",
      "Small seeds, big dreams, gentle hands,\nAcross the globe, life expands.\nYou are the gardener of tomorrow,\nTurning joy from earth's deep sorrow."
    ];
    const randomPoem = poems[Math.floor(Math.random() * poems.length)];
    setAiPoetry(randomPoem);
    setShowPoetry(true);
  };

  const handleSubmit = () => {
    if (newPlanting.count && newPlanting.location) {
      const planting = {
        id: Date.now(),
        count: parseInt(newPlanting.count),
        location: newPlanting.location,
        message: newPlanting.message || "Growing hope 🌱",
        date: new Date().toISOString().split('T')[0],
        photo: null
      };
      setPlantings([planting, ...plantings]);
      setNewPlanting({ count: '', location: '', message: '' });
      setShowForm(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setNewPlanting({
      ...newPlanting,
      location: suggestion.locations[Math.floor(Math.random() * suggestion.locations.length)]
    });
    setShowForm(true);
  };

  return (
    <div 
      className="min-h-screen p-4 relative overflow-x-auto"
      style={{
        cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, auto',
        backgroundColor: '#064e3b'
      }}
    >
      {/* Pixel art header */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 relative">
          {/* Pixel art tree */}
          <div className="relative inline-block mb-4">
            <div 
              className="text-8xl mb-2 pixelated"
              style={{
                imageRendering: 'pixelated',
                filter: 'drop-shadow(4px 4px 0px #166534)',
                animation: 'bounce 2s infinite'
              }}
            >
              🌲
            </div>
            <div 
              className="absolute -top-4 -right-4 text-white rounded-none w-16 h-16 flex items-center justify-center font-bold text-lg pixelated"
              style={{
                backgroundColor: '#22c55e',
                border: '4px solid #166534',
                boxShadow: 'inset -4px -4px 0px #166534',
                animation: 'pulse 1s infinite'
              }}
            >
              {totalTrees}
            </div>
          </div>
          
          <h1 
            className="text-6xl font-bold mb-4 pixelated"
            style={{
              color: '#166534',
              textShadow: '4px 4px 0px #22c55e',
              fontFamily: 'monospace',
              letterSpacing: '2px'
            }}
          >
            🌟 PLANT QUEST 🌟
          </h1>
          
          <p 
            className="text-2xl mb-6 pixelated"
            style={{
              color: '#15803d',
              fontFamily: 'monospace',
              textShadow: '2px 2px 0px #86efac'
            }}
          >
            TREES PLANTED: {totalTrees} 🌍 LEVEL: {Math.floor(totalTrees / 10) + 1}
          </p>
          
          {/* Pixel progress bar */}
          <div 
            className="mx-auto mb-4"
            style={{
              width: '320px',
              height: '32px',
              backgroundColor: '#166534',
              border: '4px solid #000',
              position: 'relative'
            }}
          >
            <div 
              className="h-full transition-all duration-1000"
              style={{
                width: `${Math.min((totalTrees / 100) * 100, 100)}%`,
                backgroundColor: '#22c55e',
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, #86efac 4px, #86efac 8px)'
              }}
            />
            <div 
              className="absolute inset-0 flex items-center justify-center text-white font-bold pixelated"
              style={{ fontFamily: 'monospace', textShadow: '1px 1px 0px #000' }}
            >
              GOAL: 100 TREES
            </div>
          </div>
        </div>

        {/* Pixel action buttons */}
        <div className="flex justify-center gap-6 mb-8">
          <button
            onClick={() => setShowForm(!showForm)}
            className="pixelated transition-all transform hover:scale-110"
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              border: '4px solid #166534',
              padding: '16px 24px',
              fontSize: '18px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              boxShadow: '4px 4px 0px #166534',
              cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer'
            }}
            onMouseDown={(e) => e.target.style.transform = 'translate(2px, 2px)'}
            onMouseUp={(e) => e.target.style.transform = 'translate(0, 0)'}
          >
            🌱 LOG PLANTING
          </button>
          
          <button
            onClick={generatePoetry}
            className="pixelated transition-all transform hover:scale-110"
            style={{
              backgroundColor: '#a855f7',
              color: 'white',
              border: '4px solid #7c3aed',
              padding: '16px 24px',
              fontSize: '18px',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              boxShadow: '4px 4px 0px #7c3aed',
              cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer'
            }}
            onMouseDown={(e) => e.target.style.transform = 'translate(2px, 2px)'}
            onMouseUp={(e) => e.target.style.transform = 'translate(0, 0)'}
          >
            🤖 AI POETRY
          </button>
        </div>

        {/* AI Poetry Modal - Pixel style */}
        {showPoetry && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div 
              className="max-w-md mx-auto relative pixelated"
              style={{
                backgroundColor: '#dcfce7',
                border: '8px solid #166534',
                boxShadow: '8px 8px 0px #000'
              }}
            >
              <button
                onClick={() => setShowPoetry(false)}
                className="absolute -top-4 -right-4 w-12 h-12 flex items-center justify-center font-bold pixelated"
                style={{
                  backgroundColor: '#ef4444',
                  border: '4px solid #dc2626',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer'
                }}
              >
                ✕
              </button>
              
              <div className="p-8">
                <h3 
                  className="text-3xl mb-6 text-center pixelated"
                  style={{
                    color: '#166534',
                    fontFamily: 'monospace',
                    textShadow: '2px 2px 0px #22c55e'
                  }}
                >
                  🌺 AI POEM 🌺
                </h3>
                <div 
                  className="leading-relaxed whitespace-pre-line text-center mb-6 pixelated"
                  style={{
                    color: '#374151',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    lineHeight: '1.6'
                  }}
                >
                  {aiPoetry}
                </div>
                <div className="text-center">
                  <span 
                    className="pixelated"
                    style={{
                      color: '#6b7280',
                      fontFamily: 'monospace',
                      fontSize: '14px'
                    }}
                  >
                    💚 GENERATED BY AI 💚
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pixel planting form */}
        {showForm && (
          <div 
            className="mb-8 pixelated"
            style={{
              backgroundColor: '#f0f9ff',
              border: '6px solid #0ea5e9',
              boxShadow: '6px 6px 0px #0284c7'
            }}
          >
            <div className="p-6">
              <h2 
                className="text-3xl mb-6 flex items-center gap-4 pixelated"
                style={{
                  color: '#0c4a6e',
                  fontFamily: 'monospace',
                  textShadow: '2px 2px 0px #7dd3fc'
                }}
              >
                🌿 ADD PLANTING 🌿
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label 
                    className="block mb-3 font-bold pixelated"
                    style={{
                      color: '#0c4a6e',
                      fontFamily: 'monospace',
                      fontSize: '18px'
                    }}
                  >
                    HOW MANY TREES? *
                  </label>
                  <input
                    type="number"
                    value={newPlanting.count}
                    onChange={(e) => setNewPlanting({...newPlanting, count: e.target.value})}
                    className="w-full pixelated"
                    style={{
                      padding: '12px',
                      border: '4px solid #0284c7',
                      backgroundColor: 'white',
                      fontFamily: 'monospace',
                      fontSize: '16px'
                    }}
                    placeholder="5"
                  />
                </div>
                
                <div>
                  <label 
                    className="block mb-3 font-bold pixelated"
                    style={{
                      color: '#0c4a6e',
                      fontFamily: 'monospace',
                      fontSize: '18px'
                    }}
                  >
                    WHERE? *
                  </label>
                  <input
                    type="text"
                    value={newPlanting.location}
                    onChange={(e) => setNewPlanting({...newPlanting, location: e.target.value})}
                    className="w-full pixelated"
                    style={{
                      padding: '12px',
                      border: '4px solid #0284c7',
                      backgroundColor: 'white',
                      fontFamily: 'monospace',
                      fontSize: '16px'
                    }}
                    placeholder="Brooklyn, NY or My backyard"
                  />
                </div>
                
                <div>
                  <label 
                    className="block mb-3 font-bold pixelated"
                    style={{
                      color: '#0c4a6e',
                      fontFamily: 'monospace',
                      fontSize: '18px'
                    }}
                  >
                    MESSAGE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={newPlanting.message}
                    onChange={(e) => setNewPlanting({...newPlanting, message: e.target.value})}
                    className="w-full pixelated"
                    style={{
                      padding: '12px',
                      border: '4px solid #0284c7',
                      backgroundColor: 'white',
                      fontFamily: 'monospace',
                      fontSize: '16px'
                    }}
                    placeholder="For my grandma 💐"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 pixelated"
                    style={{
                      backgroundColor: '#22c55e',
                      color: 'white',
                      border: '4px solid #166534',
                      padding: '12px',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      boxShadow: '4px 4px 0px #166534',
                      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer'
                    }}
                  >
                    🌱 ADD TO FOREST
                  </button>
                  <button
                    onClick={() => setShowForm(false)}
                    className="pixelated"
                    style={{
                      backgroundColor: '#6b7280',
                      color: 'white',
                      border: '4px solid #374151',
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      boxShadow: '4px 4px 0px #374151',
                      cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Cg fill=\'%23ff69b4\'%3E%3Crect x=\'14\' y=\'8\' width=\'4\' height=\'4\'/%3E%3Crect x=\'10\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'18\' y=\'12\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'16\' width=\'4\' height=\'4\'/%3E%3Crect x=\'14\' y=\'20\' width=\'4\' height=\'8\' fill=\'%2322c55e\'/%3E%3C/g%3E%3C/svg%3E") 16 16, pointer'
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pixel plantings grid */}
        <div className="mb-8">
          <h2 
            className="text-4xl mb-6 flex items-center gap-4 pixelated"
            style={{
              color: '#166534',
              fontFamily: 'monospace',
              textShadow: '3px 3px 0px #22c55e'
            }}
          >
            🌍 RECENT PLANTINGS 🌍
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plantings.map((planting, index) => (
              <div 
                key={planting.id}
                className="pixelated transform hover:scale-105 transition-all duration-300"
                style={{
                  backgroundColor: ['#fef3c7', '#ddd6fe', '#fce7f3'][index % 3],
                  border: `6px solid ${['#f59e0b', '#8b5cf6', '#ec4899'][index % 3]}`,
                  boxShadow: `6px 6px 0px ${['#d97706', '#7c3aed', '#db2777'][index % 3]}`,
                  transform: `rotate(${(index % 2 === 0 ? 1 : -1) * 2}deg)`
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div 
                      className="text-4xl font-bold pixelated"
                      style={{
                        color: ['#92400e', '#5b21b6', '#be185d'][index % 3],
                        fontFamily: 'monospace',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.3)'
                      }}
                    >
                      {planting.count}
                    </div>
                    <div className="text-4xl">
                      {planting.count === 1 ? '🌱' : planting.count < 5 ? '🌿' : '🌳'}
                    </div>
                  </div>
                  
                  <div 
                    className="flex items-center gap-2 mb-3 pixelated"
                    style={{
                      color: ['#92400e', '#5b21b6', '#be185d'][index % 3],
                      fontFamily: 'monospace',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    📍 {planting.location}
                  </div>
                  
                  {planting.message && (
                    <div 
                      className="mb-4 p-3 pixelated"
                      style={{
                        color: '#374151',
                        fontStyle: 'italic',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        border: '2px solid rgba(0,0,0,0.2)',
                        fontFamily: 'monospace'
                      }}
                    >
                      "{planting.message}"
                    </div>
                  )}
                  
                  <div 
                    className="pixelated"
                    style={{
                      fontSize: '14px',
                      color: '#6b7280',
                      fontFamily: 'monospace'
                    }}
                  >
                    {new Date(planting.date).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive AI suggestions - NOW WITH WORKING BUTTONS! */}
        <div 
          className="pixelated"
          style={{
            backgroundColor: '#f3e8ff',
            border: '6px solid #8b5cf6',
            boxShadow: '6px 6px 0px #7c3aed'
          }}
        >
          <div className="p-6 text-center">
            <h3 
              className="text-3xl mb-6 pixelated"
              style={{
                color: '#581c87',
                fontFamily: 'monospace',
                textShadow: '2px 2px 0px #c4b5fd'
              }}
            >
              🤖 AI SUGGESTS: PLANT HERE! 🤖
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {plantingSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="pixelated w-full text-left transform hover:scale-105 transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'white',
                    border: '4px solid #8b5cf6',
                    boxShadow: '4px 4px 0px #7c3aed',
                    padding: '16px'
                  }}
                >
                  <div className="text-3xl mb-2">{suggestion.pixelIcon}</div>
                  <div 
                    className="font-bold mb-2 pixelated"
                    style={{
                      color: '#581c87',
                      fontFamily: 'monospace',
                      fontSize: '16px'
                    }}
                  >
                    {suggestion.title}
                  </div>
                  <div 
                    className="text-sm pixelated"
                    style={{
                      color: '#6b7280',
                      fontFamily: 'monospace'
                    }}
                  >
                    {suggestion.description}
                  </div>
                  <div 
                    className="mt-3 text-xs font-bold pixelated"
                    style={{
                      color: '#22c55e',
                      fontFamily: 'monospace'
                    }}
                  >
                    CLICK TO USE! 🌱
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TreePlantingTracker;
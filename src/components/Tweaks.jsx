import { useState } from 'react'

function Tweaks({ open, setOpen, settings, setSettings }) {
  const [localSettings, setLocalSettings] = useState(settings)

  const handleChange = (key, value) => {
    const newSettings = { ...localSettings, [key]: value }
    setLocalSettings(newSettings)
    setSettings(newSettings)
  }

  if (!open) return null

  return (
    <div className="tweaks-panel">
      <div className="tweaks-header">
        <h3>Settings</h3>
        <button onClick={() => setOpen(false)}>×</button>
      </div>

      <div className="tweaks-content">
        <div className="tweak-group">
          <label>Layout</label>
          <select 
            value={localSettings.layout} 
            onChange={(e) => handleChange('layout', e.target.value)}
          >
            <option value="offset">Offset</option>
            <option value="editorial">Editorial</option>
            <option value="centered">Centered</option>
          </select>
        </div>

        <div className="tweak-group">
          <label>Type</label>
          <select 
            value={localSettings.type} 
            onChange={(e) => handleChange('type', e.target.value)}
          >
            <option value="editorial">Editorial</option>
            <option value="grotesk">Grotesk</option>
            <option value="mono">Mono</option>
            <option value="classic">Classic</option>
          </select>
        </div>

        <div className="tweak-group">
          <label>Theme</label>
          <select 
            value={localSettings.theme} 
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="tweak-group">
          <label>
            <input 
              type="checkbox" 
              checked={localSettings.cursor}
              onChange={(e) => handleChange('cursor', e.target.checked)}
            />
            Custom Cursor
          </label>
        </div>
      </div>
    </div>
  )
}

export default Tweaks

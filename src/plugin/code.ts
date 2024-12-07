const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Atomic Design Components</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: var(--figma-color-bg);
            color: var(--figma-color-text);
            width: 100%;
            height: 100vh;
            overflow-x: hidden;
        }
        #root {
            width: 100%;
            height: 100%;
            padding: 20px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .header {
            padding-bottom: 20px;
            border-bottom: 1px solid var(--figma-color-border);
            margin-bottom: 20px;
        }
        .title {
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 12px 0;
            color: var(--figma-color-text);
        }
        .description {
            font-size: 14px;
            color: var(--figma-color-text-secondary);
            margin: 0;
            line-height: 1.5;
            max-width: 100%;
        }
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
            width: 100%;
        }
        .section {
            background: var(--figma-color-bg-secondary);
            border-radius: 12px;
            padding: 16px;
            transition: all 0.2s;
            border: 1px solid var(--figma-color-border);
            width: 100%;
        }
        .section:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .section-title {
            font-size: 16px;
            font-weight: 600;
            margin: 0 0 8px 0;
            color: var(--figma-color-text);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .section-title .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
        }
        .atoms .dot { background: #0D99FF; }
        .molecules .dot { background: #00C853; }
        .organisms .dot { background: #FF6B00; }
        .templates .dot { background: #8E24AA; }
        
        .section-description {
            font-size: 13px;
            color: var(--figma-color-text-secondary);
            margin: 0 0 16px 0;
            line-height: 1.4;
        }
        .view-all-button {
            background-color: var(--figma-color-bg);
            color: var(--figma-color-text);
            border: 1px solid var(--figma-color-border);
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
        }
        .view-all-button:hover {
            background-color: var(--figma-color-bg-hover);
            transform: translateY(-1px);
        }
        .view-all-button svg {
            width: 16px;
            height: 16px;
        }
        .view-atoms-btn {
            background-color: var(--figma-color-bg);
            color: var(--figma-color-text);
            border: 1px solid var(--figma-color-border);
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
        }
        .view-atoms-btn:hover {
            background-color: var(--figma-color-bg-hover);
            transform: translateY(-1px);
        }
        .view-atoms-btn svg {
            width: 16px;
            height: 16px;
        }
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        .modal {
            background: var(--figma-color-bg);
            border-radius: 12px;
            padding: 24px;
            width: 90%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }
        .modal-title {
            font-size: 20px;
            font-weight: 600;
        }
        .close-button {
            background: none;
            border: none;
            cursor: pointer;
            color: var(--figma-color-text);
            padding: 4px;
        }
        .atoms-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }
        .atom-card {
            background: var(--figma-color-bg-secondary);
            border: 1px solid var(--figma-color-border);
            border-radius: 8px;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .atom-title {
            font-size: 14px;
            font-weight: 600;
            color: var(--figma-color-text);
        }
        .atom-description {
            font-size: 12px;
            color: var(--figma-color-text-secondary);
            line-height: 1.4;
        }
        .generate-button {
            background-color: #0D99FF;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.2s;
        }
        .generate-button:hover {
            background-color: #0B87E3;
        }
        .modal.show {
            animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
            from {
                transform: translateY(10px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        .empty-state {
            color: var(--figma-color-text-tertiary);
            font-size: 13px;
            text-align: center;
            padding: 12px;
            background: var(--figma-color-bg);
            border-radius: 8px;
            border: 1px dashed var(--figma-color-border);
            width: 100%;
        }
        
        /* Estilos para el configurador de botones */
        .component-config {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            background: var(--figma-color-bg);
            transform: translateX(100%);
            transition: transform 0.3s ease-out;
            z-index: 1000;
            display: flex;
        }
        
        .component-config.show {
            transform: translateX(0);
        }

        .preview-panel {
            flex: 1;
            padding: 32px;
            border-right: 1px solid var(--figma-color-border);
            display: flex;
            flex-direction: column;
        }

        .preview-header {
            margin-bottom: 24px;
        }

        .preview-title {
            font-size: 20px;
            font-weight: 600;
        }

        .preview-subtitle {
            color: var(--figma-color-text-secondary);
            font-size: 13px;
        }

        .preview-canvas {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
            border-radius: 8px;
            margin: 16px 0;
            position: relative;
            box-shadow: inset 0 0 0 1px var(--figma-color-border);
        }

        .preview-canvas::before {
            content: '';
            position: absolute;
            inset: 0;
            background: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='10' height='10' fill='%23F8F8F8'/%3E%3Crect x='10' y='10' width='10' height='10' fill='%23F8F8F8'/%3E%3C/svg%3E") repeat;
            opacity: 0.4;
            border-radius: 8px;
        }

        .settings-panel {
            width: 320px;
            padding: 24px;
            overflow-y: auto;
        }
        
        .config-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }
        
        .config-title {
            font-size: 16px;
            font-weight: 600;
        }
        
        .config-section {
            margin-bottom: 24px;
        }
        
        .config-section-title {
            font-size: 13px;
            font-weight: 500;
            margin-bottom: 12px;
            color: var(--figma-color-text-secondary);
        }
        
        .variant-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
            margin-bottom: 16px;
        }
        
        .variant-option {
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            text-align: center;
            transition: all 0.2s;
        }
        
        .variant-option:hover {
            background: var(--figma-color-bg-hover);
        }
        
        .variant-option.selected {
            background: var(--figma-color-bg-brand);
            color: white;
            border-color: var(--figma-color-bg-brand);
        }
        
        .config-row {
            margin-bottom: 16px;
        }
        
        .config-label {
            font-size: 12px;
            margin-bottom: 8px;
            display: block;
        }
        
        .config-input {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 4px;
            font-size: 13px;
            background: var(--figma-color-bg);
            color: var(--figma-color-text);
        }
        
        .config-select {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 4px;
            font-size: 13px;
            background: var(--figma-color-bg);
            color: var(--figma-color-text);
        }
        
        .config-checkbox {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 8px;
        }
        
        .preview-section {
            padding: 24px;
            border: 1px solid var(--figma-color-border);
            border-radius: 8px;
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--figma-color-bg-secondary);
        }
        
        .preview-button {
            padding: 10px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
            position: relative;
            z-index: 1;
        }
        
        .preview-button.default {
            background: #0D99FF;
            color: white;
            border: none;
        }
        
        .preview-button.secondary {
            background: #F3F4F6;
            color: var(--figma-color-text);
            border: none;
        }
        
        .preview-button.destructive {
            background: #EF4444;
            color: white;
            border: none;
        }
        
        .preview-button.outline {
            background: #FFFFFF;
            border: 1px solid var(--figma-color-border);
            color: var(--figma-color-text);
        }
        
        .preview-button.ghost {
            background: transparent;
            border: none;
            color: var(--figma-color-text);
        }
        
        .preview-button.link {
            background: transparent;
            border: none;
            color: #0D99FF;
            padding: 0;
        }
        
        .preview-button.sm {
            padding: 8px 12px;
            font-size: 13px;
        }
        
        .preview-button.lg {
            padding: 12px 20px;
            font-size: 15px;
        }
        
        .preview-button.loading {
            opacity: 0.7;
            cursor: wait;
        }
        
        .preview-button.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .generate-button-fixed {
            position: sticky;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 16px 24px;
            background: var(--figma-color-bg);
            border-top: 1px solid var(--figma-color-border);
            margin: 0 -24px;
        }
        
        .spinner {
            animation: spin 1s linear infinite;
            margin-right: 8px;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }

        /* Estilos para el modal de branding */
        .branding-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .branding-modal-content {
            background: var(--figma-color-bg);
            padding: 24px;
            border-radius: 8px;
            width: 400px;
            max-width: 90%;
        }

        .branding-modal h2 {
            margin: 0 0 16px 0;
            font-size: 20px;
            font-weight: 600;
        }

        .branding-options {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
        }

        .branding-option {
            flex: 1;
            padding: 12px;
            border: 1px solid var(--figma-color-border);
            border-radius: 6px;
            cursor: pointer;
            text-align: center;
            transition: all 0.2s;
        }

        .branding-option:hover {
            background: var(--figma-color-bg-hover);
        }

        .branding-option.selected {
            border-color: var(--figma-color-border-brand);
            background: var(--figma-color-bg-brand);
            color: var(--figma-color-text-onbrand);
        }

        .color-fields {
            display: none;
            gap: 12px;
            flex-direction: column;
        }

        .color-field {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .color-field label {
            flex: 1;
        }

        .color-field input {
            width: 100px;
            padding: 4px 8px;
            border: 1px solid var(--figma-color-border);
            border-radius: 4px;
            background: var(--figma-color-bg);
            color: var(--figma-color-text);
        }

        .branding-actions {
            display: flex;
            justify-content: flex-end;
            gap: 8px;
            margin-top: 24px;
        }

        .branding-actions button {
            padding: 8px 16px;
            border-radius: 6px;
            border: none;
            cursor: pointer;
            font-weight: 500;
        }

        .btn-secondary {
            background: var(--figma-color-bg-secondary);
            color: var(--figma-color-text);
        }

        .btn-primary {
            background: var(--figma-color-bg-brand);
            color: var(--figma-color-text-onbrand);
        }
    </style>
</head>
<body>
    <div id="root">
        <div class="header">
            <h1 class="title">Atomic Design Components</h1>
            <p class="description">Generate design system components using atomic design principles. Start with basic atoms and combine them into more complex molecules and organisms.</p>
        </div>

        <div class="grid">
            <div class="section atoms">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Atoms
                </h2>
                <p class="section-description">Basic building blocks like buttons, inputs, and labels that form the foundation of your design system.</p>
                <button class="view-atoms-btn" onclick="viewAtoms()">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                    View Atoms
                </button>
            </div>

            <div class="section molecules">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Molecules
                </h2>
                <p class="section-description">Simple combinations of atoms working together as a unit, like a form field with label and input.</p>
                <div class="empty-state">Coming soon...</div>
            </div>

            <div class="section organisms">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Organisms
                </h2>
                <p class="section-description">Complex UI components composed of molecules and atoms that form distinct sections of an interface.</p>
                <div class="empty-state">Coming soon...</div>
            </div>

            <div class="section templates">
                <h2 class="section-title">
                    <span class="dot"></span>
                    Templates
                </h2>
                <p class="section-description">Page-level objects that place components into a layout and articulate the design's underlying content structure.</p>
                <div class="empty-state">Coming soon...</div>
            </div>
        </div>
    </div>

    <!-- Modal for Atoms -->
    <div class="modal-overlay" id="atomsModal">
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Atomic Components</h3>
                <button class="close-button" onclick="closeAtomsModal()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
            <div class="atoms-grid">
                <div class="atom-card">
                    <h4 class="atom-title">Button</h4>
                    <p class="atom-description">A versatile button component with various states and styles. Perfect for actions and form submissions.</p>
                    <button class="generate-button" onclick="createButton()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Input Field</h4>
                    <p class="atom-description">A clean and functional input field for text entry. Includes states for focus, error, and disabled.</p>
                    <button class="generate-button" onclick="createInput()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Checkbox</h4>
                    <p class="atom-description">A customizable checkbox component for binary choices. Includes checked, unchecked, and indeterminate states.</p>
                    <button class="generate-button" onclick="createCheckbox()">Start Generating</button>
                </div>
                <div class="atom-card">
                    <h4 class="atom-title">Radio Button</h4>
                    <p class="atom-description">A radio button component for single selection from multiple options. Includes selected and unselected states.</p>
                    <button class="generate-button" onclick="createRadio()">Start Generating</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Configurador de Botón -->
    <div class="component-config" id="buttonConfig">
        <div class="preview-panel">
            <div class="preview-header">
                <div class="preview-title">Button Preview</div>
                <div class="preview-subtitle">Interactive preview of your button component</div>
            </div>
            <div class="preview-canvas">
                <button id="buttonPreview" class="preview-button default">
                    Button
                </button>
            </div>
        </div>
        
        <div class="settings-panel">
            <div class="config-header">
                <h3 class="config-title">Settings</h3>
                <button class="close-button" onclick="closeButtonConfig()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Variant</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonVariant('default')">Default</div>
                    <div class="variant-option" onclick="updateButtonVariant('secondary')">Secondary</div>
                    <div class="variant-option" onclick="updateButtonVariant('destructive')">Destructive</div>
                    <div class="variant-option" onclick="updateButtonVariant('outline')">Outline</div>
                    <div class="variant-option" onclick="updateButtonVariant('ghost')">Ghost</div>
                    <div class="variant-option" onclick="updateButtonVariant('link')">Link</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Size</h4>
                <div class="variant-grid">
                    <div class="variant-option" onclick="updateButtonSize('sm')">Small</div>
                    <div class="variant-option selected" onclick="updateButtonSize('md')">Medium</div>
                    <div class="variant-option" onclick="updateButtonSize('lg')">Large</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Content</h4>
                <div class="config-row">
                    <label class="config-label">Button Text</label>
                    <input type="text" class="config-input" value="Button" onchange="updateButtonText(this.value)">
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Icon</h4>
                <div class="config-row">
                    <div class="config-checkbox">
                        <input type="checkbox" id="hasIcon" onchange="toggleIcon()">
                        <label for="hasIcon">Add Icon</label>
                    </div>
                    <select class="config-select" id="iconPosition" onchange="updateIconPosition()" disabled>
                        <option value="left">Left</option>
                        <option value="right">Right</option>
                    </select>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">State</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonState('default')">Default</div>
                    <div class="variant-option" onclick="updateButtonState('loading')">Loading</div>
                    <div class="variant-option" onclick="updateButtonState('disabled')">Disabled</div>
                </div>
            </div>

            <div class="config-section">
                <h4 class="config-section-title">Width</h4>
                <div class="variant-grid">
                    <div class="variant-option selected" onclick="updateButtonWidth('hug')">Hug</div>
                    <div class="variant-option" onclick="updateButtonWidth('full')">Full</div>
                </div>
            </div>

            <div class="generate-button-fixed">
                <button class="generate-button" onclick="generateFinalButton()" style="width: 100%">
                    Generate Button
                </button>
            </div>
        </div>
    </div>

    <!-- Modal de branding -->
    <div id="brandingModal" class="branding-modal">
        <div class="branding-modal-content">
            <h2>Do you have branding colors?</h2>
            <div class="branding-options">
                <div class="branding-option" onclick="selectBrandingOption(event, 'yes')">Yes</div>
                <div class="branding-option" onclick="selectBrandingOption(event, 'no')">No</div>
            </div>
            <div id="colorFields" class="color-fields">
                <div class="color-field">
                    <label>Primary Color</label>
                    <input type="text" id="primaryColor" placeholder="#0c8ce9">
                </div>
                <div class="color-field">
                    <label>Secondary Color</label>
                    <input type="text" id="secondaryColor" placeholder="#6c757d">
                </div>
                <div class="color-field">
                    <label>Tertiary Color</label>
                    <input type="text" id="tertiaryColor" placeholder="#394360">
                </div>
            </div>
            <div class="branding-actions">
                <button class="btn-secondary" onclick="closeBrandingModal()">Cancel</button>
                <button class="btn-primary" onclick="confirmBranding()">Continue</button>
            </div>
        </div>
    </div>

    <script>
        let buttonConfig = {
            variant: 'default',
            size: 'md',
            text: 'Button',
            hasIcon: false,
            iconPosition: 'left',
            state: 'default',
            width: 'hug'
        };

        // Configuración global de colores
        let globalColors = {
            primary: '#0c8ce9',
            secondary: '#6c757d',
            tertiary: '#394360',
            success: '#198f51',
            warning: '#f3c11b',
            danger: '#e03e1a'
        };

        // Funciones para el modal de átomos
        function openAtomsModal() {
            console.log('Opening atoms modal...');
            const modal = document.getElementById('atomsModal');
            if (modal) {
                modal.style.display = 'flex';
                modal.querySelector('.modal').classList.add('show');
            } else {
                console.error('Atoms modal not found');
            }
        }

        function closeAtomsModal() {
            console.log('Closing atoms modal...');
            const modal = document.getElementById('atomsModal');
            if (modal) {
                modal.style.display = 'none';
                modal.querySelector('.modal').classList.remove('show');
            }
        }

        function createButton() {
            closeAtomsModal();
            const config = document.getElementById('buttonConfig');
            config.classList.add('show');
        }

        function closeButtonConfig() {
            const config = document.getElementById('buttonConfig');
            config.classList.remove('show');
        }

        function updateSelectedOption(section, value) {
            // Encuentra todas las opciones en la sección específica
            const options = section.querySelectorAll('.variant-option');
            options.forEach(opt => {
                opt.classList.remove('selected');
                if (opt.innerText.toLowerCase() === value.toLowerCase()) {
                    opt.classList.add('selected');
                }
            });
        }

        function updateButtonVariant(variant) {
            buttonConfig.variant = variant;
            updatePreview();
            const section = event.target.closest('.config-section');
            updateSelectedOption(section, variant);
        }

        function updateButtonSize(size) {
            buttonConfig.size = size;
            updatePreview();
            const section = event.target.closest('.config-section');
            updateSelectedOption(section, size === 'sm' ? 'Small' : size === 'md' ? 'Medium' : 'Large');
        }

        function updateButtonState(state) {
            buttonConfig.state = state;
            updatePreview();
            const section = event.target.closest('.config-section');
            updateSelectedOption(section, state === 'default' ? 'Default' : state === 'loading' ? 'Loading' : 'Disabled');
        }

        function updateButtonWidth(width) {
            buttonConfig.width = width;
            updatePreview();
            const section = event.target.closest('.config-section');
            updateSelectedOption(section, width === 'hug' ? 'Hug' : 'Full');
        }

        function updateButtonText(text) {
            buttonConfig.text = text;
            updatePreview();
        }

        function toggleIcon() {
            buttonConfig.hasIcon = document.getElementById('hasIcon').checked;
            document.getElementById('iconPosition').disabled = !buttonConfig.hasIcon;
            updatePreview();
        }

        function updateIconPosition() {
            buttonConfig.iconPosition = document.getElementById('iconPosition').value;
            updatePreview();
        }

        function updatePreview() {
            const preview = document.getElementById('buttonPreview');
            
            // Reset classes
            preview.className = 'preview-button';
            
            // Add variant
            preview.classList.add(buttonConfig.variant);
            
            // Add size
            preview.classList.add(buttonConfig.size);
            
            // Add state
            preview.classList.add(buttonConfig.state);
            
            // Update width
            preview.style.width = buttonConfig.width === 'full' ? '100%' : 'auto';
            
            // Update content
            let content = '';
            
            // Add loading spinner if needed
            if (buttonConfig.state === 'loading') {
                content += '<svg class="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>';
            }
            
            // Add left icon if needed
            if (buttonConfig.hasIcon && buttonConfig.iconPosition === 'left') {
                content += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            }
            
            content += buttonConfig.text;
            
            // Add right icon if needed
            if (buttonConfig.hasIcon && buttonConfig.iconPosition === 'right') {
                content += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
            }
            
            preview.innerHTML = content;
        }

        function generateFinalButton() {
            parent.postMessage({ 
                pluginMessage: { 
                    type: 'create-button',
                    config: buttonConfig
                }
            }, '*');
            closeButtonConfig();
        }

        // Funciones para el modal de branding
        function viewAtoms() {
            console.log('Opening branding modal...');
            const brandingModal = document.getElementById('brandingModal');
            if (brandingModal) {
                brandingModal.style.display = 'flex';
            } else {
                console.error('Branding modal not found');
            }
        }

        function closeBrandingModal() {
            console.log('Closing branding modal...');
            const brandingModal = document.getElementById('brandingModal');
            if (brandingModal) {
                brandingModal.style.display = 'none';
            }
        }

        function selectBrandingOption(event, option) {
            console.log('Selected option:', option);
            const options = document.querySelectorAll('.branding-option');
            options.forEach(opt => opt.classList.remove('selected'));
            event.target.classList.add('selected');
            
            const colorFields = document.getElementById('colorFields');
            if (colorFields) {
                colorFields.style.display = option === 'yes' ? 'flex' : 'none';
            }
        }

        function confirmBranding() {
            console.log('Confirming branding...');
            const selectedOption = document.querySelector('.branding-option.selected');
            if (selectedOption && selectedOption.textContent === 'Yes') {
                // Actualizar colores globales con los valores ingresados
                globalColors = {
                    primary: document.getElementById('primaryColor')?.value || globalColors.primary,
                    secondary: document.getElementById('secondaryColor')?.value || globalColors.secondary,
                    tertiary: document.getElementById('tertiaryColor')?.value || globalColors.tertiary,
                    success: globalColors.success,
                    warning: globalColors.warning,
                    danger: globalColors.danger
                };
                console.log('Updated global colors:', globalColors);
            }
            
            closeBrandingModal();
            openAtomsModal();
        }

        // Asegurarse de que los eventos estén conectados cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            console.log('DOM loaded, setting up event listeners...');
            const viewAtomsBtn = document.querySelector('.view-atoms-btn');
            if (viewAtomsBtn) {
                viewAtomsBtn.addEventListener('click', viewAtoms);
            }
        });
    </script>
</body>
</html>
`;

figma.showUI(html, { 
  width: 600, 
  height: 600,
  themeColors: true
});

figma.ui.onmessage = async (msg: { type: string, config?: any }) => {
  if (msg.type === 'create-button') {
    const config = msg.config || {};
    
    // Create a single frame for the button
    const button = figma.createFrame();
    button.name = "Button";
    
    // Set AutoLayout
    button.layoutMode = "HORIZONTAL";
    button.primaryAxisAlignItems = "CENTER";
    button.counterAxisAlignItems = "CENTER";
    button.primaryAxisSizingMode = "AUTO"; // HUG content width
    button.counterAxisSizingMode = "AUTO"; // HUG content height
    button.paddingLeft = 16;
    button.paddingRight = 16;
    button.paddingTop = 10;
    button.paddingBottom = 10;
    button.itemSpacing = 8;
    button.cornerRadius = 6;
    
    // Apply variant styles
    switch(config.variant) {
      case 'default':
        button.fills = [{type: 'SOLID', color: {r: 0.05, g: 0.6, b: 1}}];
        break;
      case 'secondary':
        button.fills = [{type: 'SOLID', color: {r: 0.95, g: 0.95, b: 0.95}}];
        break;
      case 'destructive':
        button.fills = [{type: 'SOLID', color: {r: 0.937, g: 0.267, b: 0.267}}];
        break;
      case 'outline':
        button.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
        button.strokes = [{type: 'SOLID', color: {r: 0.8, g: 0.8, b: 0.8}}];
        button.strokeWeight = 1;
        break;
      case 'ghost':
        button.fills = [];
        break;
      case 'link':
        button.fills = [];
        break;
    }
    
    // Apply size
    switch(config.size) {
      case 'sm':
        button.paddingLeft = 12;
        button.paddingRight = 12;
        button.paddingTop = 8;
        button.paddingBottom = 8;
        break;
      case 'lg':
        button.paddingLeft = 20;
        button.paddingRight = 20;
        button.paddingTop = 12;
        button.paddingBottom = 12;
        break;
    }
    
    // Add left icon if needed
    if (config.hasIcon && config.iconPosition === 'left') {
      const icon = figma.createNodeFromSvg(`
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      `);
      button.appendChild(icon);
    }
    
    // Add text
    const text = figma.createText();
    await figma.loadFontAsync({ family: "Inter", style: "Medium" });
    text.fontName = { family: "Inter", style: "Medium" };
    text.characters = config.text || "Button";
    
    // Set text color based on variant
    if (config.variant === 'default' || config.variant === 'destructive') {
      text.fills = [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}];
    } else if (config.variant === 'link') {
      text.fills = [{type: 'SOLID', color: {r: 0.05, g: 0.6, b: 1}}];
    } else {
      text.fills = [{type: 'SOLID', color: {r: 0.1, g: 0.1, b: 0.1}}];
    }
    
    button.appendChild(text);
    
    // Add right icon if needed
    if (config.hasIcon && config.iconPosition === 'right') {
      const icon = figma.createNodeFromSvg(`
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
        </svg>
      `);
      button.appendChild(icon);
    }
    
    // Set width
    if (config.width === 'full') {
      button.resize(320, button.height);
    }
    
    // Add loading state if needed
    if (config.state === 'loading') {
      button.opacity = 0.7;
      const spinner = figma.createNodeFromSvg(`
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/>
        </svg>
      `);
      button.insertChild(0, spinner);
    }
    
    // Add disabled state if needed
    if (config.state === 'disabled') {
      button.opacity = 0.5;
    }
    
    figma.currentPage.appendChild(button);
    figma.viewport.scrollAndZoomIntoView([button]);
  }
};

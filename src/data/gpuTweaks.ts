export interface Subsection {
  title: string;
  content?: string;
  command?: string;
  language?: string;
  type?: "warning" | "note" | "info";
}

export interface Tweak {
  id: string;
  name: string;
  description: string;
  benefit: string;
  impactLevel: "low" | "medium" | "high";
  subsections: Subsection[];
}

export const gpuTweaks = [
    {
      id: "gpu-scheduling",
      name: "Hardware-Accelerated GPU Scheduling",
      description: "Reduces latency by allowing GPU to manage its own memory",
      benefit:
        "Lower GPU latency, improved frame times in games and 3D applications",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable GPU Scheduling",
          content:
            "This registry setting enables hardware-accelerated GPU scheduling (Windows 10 2004+). Value: 1=Disabled, 2=Enabled (recommended)",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" -Name "HwSchMode" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "Requires Windows 10 build 2004 or later. May require driver updates for optimal compatibility.",
          type: "info",
        },
      ],
    },
    {
      id: "tdr-timeout",
      name: "Timeout Detection and Recovery (TDR)",
      description:
        "TDR restarts GPU driver if it detects a timeout. Adjust for gaming performance",
      benefit: "Prevents driver timeouts during intensive GPU tasks",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Increase Timeout to 10 Seconds",
          content: "Increases TDR timeout delay for GPU-intensive operations",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"\nNew-ItemProperty -Path $path -Name "TdrDelay" -PropertyType DWord -Value 10 -Force',
          language: "powershell",
        },
        {
          title: "Disable TDR (Not Recommended)",
          content: "Completely disables TDR. Only for advanced users.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"\nNew-ItemProperty -Path $path -Name "TdrLevel" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "TDR Warning",
          content:
            "Disabling TDR completely can cause permanent black screens if driver freezes. It is safer to increase timeout with TdrDelay instead.",
          type: "warning",
        },
      ],
    },
    {
      id: "nvidia-performance",
      name: "Nvidia - Maximum Performance",
      description: "Configure Nvidia GPU for maximum gaming performance",
      benefit: "Improved GPU performance and reduced power management overhead",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable Maximum Performance Mode",
          content:
            "Sets Nvidia GPU to maximum performance level with power management disabled",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000"\nNew-ItemProperty -Path $path -Name "PerfLevelSrc" -PropertyType DWord -Value 8738 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerEnable" -PropertyType DWord -Value 0 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerLevel" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerLevelAC" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Disable Preemption",
          content:
            "Disables GPU context preemption for better frame consistency",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Scheduler"\nNew-ItemProperty -Path $path -Name "EnablePreemption" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Advanced Tuning",
          content:
            "For advanced Nvidia optimizations use Nvidia Profile Inspector to disable options like Vertical Sync, Power Management in Prefer Maximum Performance mode, and aggressive Texture Filtering.",
          type: "info",
        },
      ],
    },
    {
      id: "amd-optimizations",
      name: "AMD - Performance Optimizations",
      description: "Configure AMD GPU for optimal gaming performance",
      benefit: "Improved GPU performance and reduced power state transitions",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable ULPS (Ultra Low Power State)",
          content:
            "ULPS causes power state transitions that can create stuttering. Disabling improves frame consistency.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000"\nNew-ItemProperty -Path $path -Name "EnableUlps" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Enable Anti-Lag and Boost",
          content: "Enables AMD Anti-Lag and performance boost features",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\UMD"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "Main3D_DEF" -PropertyType String -Value "1" -Force\nNew-ItemProperty -Path $path -Name "Main3D" -PropertyType String -Value "1" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "mpo-overlay",
      name: "Disable MPO (Multi-Plane Overlay)",
      description: "Disable Multi-Plane Overlay to prevent stuttering issues",
      benefit: "Improved frame rate stability and reduced stuttering",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable MPO System-Wide",
          content:
            "MPO can cause stuttering in some games. Disabling improves framerate consistency.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\Dwm" -Name "OverlayTestMode" -PropertyType DWord -Value 5 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "fullscreen-optimizations",
      name: "Disable Fullscreen Optimizations",
      description:
        "Disable Windows fullscreen optimizations for better performance",
      benefit:
        "Better frame consistency and reduced input lag in fullscreen games",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable System-Wide",
          content: "Disables fullscreen optimizations globally for all games",
          command:
            'New-ItemProperty -Path "HKCU:\\System\\GameConfigStore" -Name "GameDVR_DXGIHonorFSEWindowsCompatible" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path "HKCU:\\System\\GameConfigStore" -Name "GameDVR_FSEBehavior" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Per-Game Configuration",
          content:
            "You can also disable fullscreen optimizations per-game: Right-click .exe → Properties → Compatibility → Check 'Disable fullscreen optimizations'",
          type: "info",
        },
      ],
    },
    {
      id: "driver-cleanup",
      name: "GPU Driver Cleanup",
      description:
        "Clean old GPU drivers before applying advanced optimizations",
      benefit:
        "Prevents driver conflicts and ensures clean driver installation",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Clean GPU Drivers Safely",
          content:
            "Before applying advanced optimizations, clean old drivers using DDU (Display Driver Uninstaller) in Safe Mode to prevent conflicts.",
          type: "warning",
        },
        {
          title: "Instructions",
          content:
            "1. Boot into Safe Mode\n2. Download and run DDU (Display Driver Uninstaller)\n3. Select your GPU and click Clean and Restart\n4. Install latest drivers from Nvidia or AMD",
          type: "info",
        },
      ],
    },
] as Tweak[];
    {
      id: "gpu-scheduling",
      name: "Planificación Acelerada de GPU (Hardware-Accelerated GPU Scheduling)",
      description:
        "Reduce la latencia permitiendo que la GPU gestione su propia memoria",
      benefit:
        "Menor latencia de GPU, mejora de tiempos de fotograma en juegos y aplicaciones 3D",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Habilitar Planificación de GPU",
          content:
            "Esta configuración de registro habilita la planificación acelerada de GPU (Windows 10 2004+). Valor: 1=Deshabilitado, 2=Habilitado (recomendado)",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers" -Name "HwSchMode" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Nota",
          content:
            "Requiere Windows 10 build 2004 o posterior. Pueden ser necesarias actualizaciones de controladores.",
          type: "info",
        },
      ],
    },
    {
      id: "tdr-timeout",
      name: "Timeout Detection and Recovery (TDR)",
      description:
        "TDR reinicia el controlador de GPU si detecta un timeout. Ajustar para rendimiento de juegos",
      benefit:
        "Previene timeouts de controlador durante tareas intensivas de GPU",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Aumentar Timeout a 10 Segundos",
          content:
            "Aumenta el retraso de timeout TDR para operaciones intensivas de GPU",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"\nNew-ItemProperty -Path $path -Name "TdrDelay" -PropertyType DWord -Value 10 -Force',
          language: "powershell",
        },
        {
          title: "Desactivar TDR (No Recomendado)",
          content: "Desactiva completamente TDR. Solo para usuarios avanzados.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers"\nNew-ItemProperty -Path $path -Name "TdrLevel" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Advertencia de TDR",
          content:
            "Desactivar TDR completamente puede causar pantallazos negros permanentes si el controlador se congela. Es más seguro aumentar el timeout con TdrDelay.",
          type: "warning",
        },
      ],
    },
    {
      id: "nvidia-performance",
      name: "Nvidia - Máximo Rendimiento",
      description: "Configura GPU Nvidia para máximo rendimiento de juegos",
      benefit: "Rendimiento mejorado de GPU y reducción de gestión de energía",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Habilitar Modo de Máximo Rendimiento",
          content:
            "Configura la GPU Nvidia al nivel de rendimiento máximo con gestión de energía deshabilitada",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000"\nNew-ItemProperty -Path $path -Name "PerfLevelSrc" -PropertyType DWord -Value 8738 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerEnable" -PropertyType DWord -Value 0 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerLevel" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "PowerMizerLevelAC" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Desactivar Preemption",
          content:
            "Desactiva la preeemption de contexto de GPU para mejor consistencia de fotogramas",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers\\Scheduler"\nNew-ItemProperty -Path $path -Name "EnablePreemption" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Ajustes Avanzados",
          content:
            "Para optimizaciones avanzadas de Nvidia, usa Nvidia Profile Inspector para desactivar opciones como Sincronización Vertical, Gestión de Energía en modo Máximo Rendimiento y Filtrado de Texturas agresivo.",
          type: "info",
        },
      ],
    },
    {
      id: "amd-optimizations",
      name: "AMD - Optimizaciones de Rendimiento",
      description: "Configura GPU AMD para rendimiento óptimo de juegos",
      benefit:
        "Rendimiento mejorado de GPU y reducción de transiciones de estado de energía",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Desactivar ULPS (Ultra Low Power State)",
          content:
            "ULPS causa transiciones de estado de energía que pueden crear stuttering. Desactivarlo mejora la consistencia de fotogramas.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000"\nNew-ItemProperty -Path $path -Name "EnableUlps" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Habilitar Anti-Lag y Boost",
          content:
            "Habilita características de Anti-Lag y boost de rendimiento de AMD",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4d36e968-e325-11ce-bfc1-08002be10318}\\0000\\UMD"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "Main3D_DEF" -PropertyType String -Value "1" -Force\nNew-ItemProperty -Path $path -Name "Main3D" -PropertyType String -Value "1" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "mpo-overlay",
      name: "Desactivar MPO (Multi-Plane Overlay)",
      description:
        "Desactiva Multi-Plane Overlay para prevenir problemas de stuttering",
      benefit:
        "Mejora de estabilidad de tasa de fotogramas y reducción de stuttering",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar MPO a Nivel Sistema",
          content:
            "MPO puede causar stuttering en algunos juegos. Desactivarlo mejora la consistencia de fotogramas.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows\\Dwm" -Name "OverlayTestMode" -PropertyType DWord -Value 5 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "fullscreen-optimizations",
      name: "Desactivar Optimizaciones de Pantalla Completa",
      description:
        "Desactiva las optimizaciones de pantalla completa de Windows para mejor rendimiento",
      benefit:
        "Mejor consistencia de fotogramas y reducción de latencia de entrada en juegos en pantalla completa",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Desactivar a Nivel Sistema",
          content:
            "Desactiva las optimizaciones de pantalla completa globalmente para todos los juegos",
          command:
            'New-ItemProperty -Path "HKCU:\\System\\GameConfigStore" -Name "GameDVR_DXGIHonorFSEWindowsCompatible" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path "HKCU:\\System\\GameConfigStore" -Name "GameDVR_FSEBehavior" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Configuración por Juego",
          content:
            "También puedes desactivar optimizaciones de pantalla completa por juego: Clic derecho en .exe → Propiedades → Compatibilidad → Marca 'Desactivar optimizaciones de pantalla completa'",
          type: "info",
        },
      ],
    },
    {
      id: "driver-cleanup",
      name: "Limpieza de Controladores de GPU",
      description:
        "Limpia controladores de GPU antiguos antes de aplicar optimizaciones avanzadas",
      benefit:
        "Previene conflictos de controladores y asegura una instalación limpia de controladores",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Limpiar Controladores de GPU de Manera Segura",
          content:
            "Antes de aplicar optimizaciones avanzadas, limpia los controladores antiguos usando DDU (Display Driver Uninstaller) en Modo Seguro para prevenir conflictos.",
          type: "warning",
        },
        {
          title: "Instrucciones",
          content:
            "1. Inicia en Modo Seguro\n2. Descarga y ejecuta DDU (Display Driver Uninstaller)\n3. Selecciona tu GPU y haz clic en Clean and Restart\n4. Instala los últimos controladores de Nvidia o AMD",
          type: "info",
        },
      ],
    },

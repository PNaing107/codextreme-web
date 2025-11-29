export const memoryTweaks = [
    {
      id: "disable-compression",
      name: "🗜️ Desactivar Compresión de RAM",
      description:
        "Desactiva la compresión de memoria que Windows realiza automáticamente.",
      benefit: "Reduce latencia de acceso a memoria",
      impact: "medium",
      subsections: [
        {
          title: "Disable Memory Compression",
          command: "Disable-MMAgent -MemoryCompression",
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-meltdown-spectre",
      name: "🔓 Desactivar Meltdown/Spectre",
      description:
        "Mejora rendimiento desactivando mitigaciones de seguridad (solo para gaming).",
      benefit: "Aumenta rendimiento de CPU",
      impact: "high",
      subsections: [
        {
          title: "Kernel-Managed Memory",
          content: "",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management"\nNew-ItemProperty -Path $path -Name "FeatureSettings" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "FeatureSettingsOverride" -PropertyType DWord -Value 3 -Force\nNew-ItemProperty -Path $path -Name "FeatureSettingsOverrideMask" -PropertyType DWord -Value 3 -Force',
          language: "powershell",
        },
        {
          title: "⚠️ Advertencia de Seguridad",
          content:
            "⚠️ IMPORTANTE: Desactivar Meltdown/Spectre reduce significativamente la seguridad de tu sistema. Solo aplicar en PCs dedicados exclusivamente a gaming.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-paging-executive",
      name: "💾 DisablePagingExecutive",
      description:
        "Evita que drivers se paginen a memoria virtual, manteniéndolos en RAM.",
      benefit: "Mejora estabilidad y rendimiento de drivers",
      impact: "medium",
      subsections: [
        {
          title: "Mantener drivers en RAM",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" -Name "DisablePagingExecutive" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "large-system-cache",
      name: "📊 LargeSystemCache",
      description:
        "Configura el tamaño del cache del sistema para optimizar rendimiento.",
      benefit: "Optimiza cache según uso (gaming o LAN)",
      impact: "medium",
      subsections: [
        {
          title: "Valores posibles",
          content:
            "0: ~8 MB cache (recomendado para gaming)\n1: Hasta RAM-4MB (para transferencias LAN)",
        },
        {
          title: "Configurar para gaming",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" -Name "LargeSystemCache" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "📝 Nota",
          content:
            "El valor 1 mejora las transferencias LAN pero puede tener problemas con drivers ATI/AMD. Para gaming, usar 0.",
          type: "note",
        },
      ],
    },
    {
      id: "page-file",
      name: "📄 Configurar Page File",
      description:
        "Un page file grande (32GB) mejora microstuttering en juegos.",
      benefit: "Reduce microstuttering y mejora fluidez",
      impact: "high",
      subsections: [
        {
          title: "Configurar page file de 32GB",
          command:
            'wmic computersystem where name="%computername%" set AutomaticManagedPagefile=False\nwmic pagefileset where name="C:\\\\pagefile.sys" set InitialSize=32768,MaximumSize=32768',
          language: "powershell",
        },
        {
          title: "⚠️ Advertencia",
          content:
            "⚠️ ADVERTENCIA: El sistema puede volverse inestable si no tienes RAM suficiente. Reinicia Windows después de aplicar este cambio.",
          type: "warning",
        },
      ],
    },
    {
      id: "ntfs-protection",
      name: "🔐 Protección NTFS/ReFS",
      description:
        "Desactiva mitigaciones adicionales de protección del sistema de archivos.",
      benefit: "Aumenta rendimiento de I/O",
      impact: "low",
      subsections: [
        {
          title: "Desactivar mitigaciones adicionales",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager" -Name "ProtectionMode" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "csrss-realtime",
      name: "⏱️ Prioridad Realtime para csrss.exe",
      description:
        "Configura la máxima prioridad para el proceso csrss.exe (gestor de sesiones).",
      benefit: "Mejora respuesta del sistema a eventos críticos",
      impact: "high",
      subsections: [
        {
          title: "Configurar prioridad máxima",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\csrss.exe\\PerfOptions"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "CpuPriorityClass" -PropertyType DWord -Value 4 -Force\nNew-ItemProperty -Path $path -Name "IoPriority" -PropertyType DWord -Value 3 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "resumen",
      name: "💡 Resumen",
      description:
        "Importante: estas optimizaciones mejoran rendimiento en gaming pero reducen seguridad y estabilidad.",
      benefit: "Comprensión de los riesgos",
      impact: "low",
      subsections: [
        {
          title: "⚠️ Importante",
          content:
            "Estas optimizaciones mejoran rendimiento en gaming pero reducen seguridad y estabilidad general del sistema. Solo aplicar en PCs dedicados exclusivamente a gaming y entornos controlados.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-compression",
      name: "🗜️ Disable RAM Compression",
      description:
        "Disables automatic memory compression that Windows performs.",
      benefit: "Reduces memory access latency",
      impact: "medium",
      subsections: [
        {
          title: "Disable Memory Compression",
          command: "Disable-MMAgent -MemoryCompression",
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-meltdown-spectre",
      name: "🔓 Disable Meltdown/Spectre",
      description:
        "Improves performance by disabling security mitigations (gaming only).",
      benefit: "Increases CPU performance",
      impact: "high",
      subsections: [
        {
          title: "Kernel-Managed Memory",
          content: "",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management"\nNew-ItemProperty -Path $path -Name "FeatureSettings" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "FeatureSettingsOverride" -PropertyType DWord -Value 3 -Force\nNew-ItemProperty -Path $path -Name "FeatureSettingsOverrideMask" -PropertyType DWord -Value 3 -Force',
          language: "powershell",
        },
        {
          title: "⚠️ Security Warning",
          content:
            "⚠️ IMPORTANT: Disabling Meltdown/Spectre significantly reduces your system's security. Only apply on PCs dedicated exclusively to gaming.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-paging-executive",
      name: "💾 DisablePagingExecutive",
      description:
        "Prevents drivers from being paged to virtual memory, keeping them in RAM.",
      benefit: "Improves driver stability and performance",
      impact: "medium",
      subsections: [
        {
          title: "Keep drivers in RAM",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" -Name "DisablePagingExecutive" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "large-system-cache",
      name: "📊 LargeSystemCache",
      description: "Configures system cache size to optimize performance.",
      benefit: "Optimizes cache based on usage (gaming or LAN)",
      impact: "medium",
      subsections: [
        {
          title: "Possible values",
          content:
            "0: ~8 MB cache (recommended for gaming)\n1: Up to RAM-4MB (for LAN transfers)",
        },
        {
          title: "Configure for gaming",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\Memory Management" -Name "LargeSystemCache" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "📝 Note",
          content:
            "Value 1 improves LAN transfers but may have issues with ATI/AMD drivers. For gaming, use 0.",
          type: "note",
        },
      ],
    },
    {
      id: "page-file",
      name: "📄 Configure Page File",
      description:
        "A large page file (32GB) improves microstuttering in games.",
      benefit: "Reduces microstuttering and improves fluidity",
      impact: "high",
      subsections: [
        {
          title: "Configure 32GB page file",
          command:
            'wmic computersystem where name="%computername%" set AutomaticManagedPagefile=False\nwmic pagefileset where name="C:\\\\pagefile.sys" set InitialSize=32768,MaximumSize=32768',
          language: "powershell",
        },
        {
          title: "⚠️ Warning",
          content:
            "⚠️ WARNING: System may become unstable if you don't have enough RAM. Restart Windows after applying this change.",
          type: "warning",
        },
      ],
    },
    {
      id: "ntfs-protection",
      name: "🔐 NTFS/ReFS Protection",
      description: "Disables additional filesystem protection mitigations.",
      benefit: "Increases I/O performance",
      impact: "low",
      subsections: [
        {
          title: "Disable additional mitigations",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager" -Name "ProtectionMode" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "csrss-realtime",
      name: "⏱️ Realtime Priority for csrss.exe",
      description:
        "Sets maximum priority for the csrss.exe process (session manager).",
      benefit: "Improves system responsiveness to critical events",
      impact: "high",
      subsections: [
        {
          title: "Configure maximum priority",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\csrss.exe\\PerfOptions"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "CpuPriorityClass" -PropertyType DWord -Value 4 -Force\nNew-ItemProperty -Path $path -Name "IoPriority" -PropertyType DWord -Value 3 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "resumen",
      name: "💡 Summary",
      description:
        "Important: these optimizations improve gaming performance but reduce security and stability.",
      benefit: "Understanding the risks",
      impact: "low",
      subsections: [
        {
          title: "⚠️ Important",
          content:
            "These optimizations improve gaming performance but reduce system security and overall stability. Only apply on PCs dedicated exclusively to gaming and controlled environments.",
          type: "warning",
        },
      ],
    },
];

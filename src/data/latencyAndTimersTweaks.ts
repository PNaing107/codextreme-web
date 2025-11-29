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

export const latencyAndTimersTweaks = [

    {
      id: "latency-timers-overview",
      name: "Understanding Latency and Timers",
      description:
        "Learn about system latency factors: interrupts, DPC, timers, and message handling",
      benefit:
        "Understanding latency sources helps identify optimization opportunities",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "System Latency Sources",
          content:
            "System latency comes from multiple sources:\n- Interrupt processing (IRQ/DPC)\n- Windows timer resolution (15.625ms default)\n- High Precision Event Timer (HPET) overhead\n- Windows message queue processing\n\nEach can be optimized for lower latency gaming.",
          type: "info",
        },
        {
          title: "Latency Impact on Gaming",
          content:
            "Lower latency means:\n- Faster mouse/input response\n- Lower ping in multiplayer games\n- Reduced frame timing jitter\n- Better competitive gaming performance",
          type: "info",
        },
      ],
    },
    {
      id: "disable-dynamic-tick",
      name: "Disable Dynamic Tick",
      description:
        "Configure interrupt priority and disable dynamic tick for consistent timing",
      benefit:
        "Ensures consistent interrupt processing and reduces timing variations",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable Dynamic Tick",
          content:
            "DisableDynamicTick forces Windows to use fixed 15.625ms timer instead of dynamic adjustment. This provides more consistent timing for gaming.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "Requires administrator privileges and Windows restart. Helps consistency in frame timing.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-dpc-watchdog",
      name: "Configure DPC Watchdog",
      description: "Adjust DPC watchdog profile for lower latency",
      benefit: "Prevents DPC timeout issues and improves interrupt response",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set DPC Watchdog Offset",
          content:
            "DPC (Deferred Procedure Call) Watchdog monitors interrupt processing time. Increasing the offset prevents watchdog timeouts.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force',
          language: "powershell",
        },
        {
          title: "Value Meaning",
          content:
            "10000 (0x2710) allows up to 10 microseconds for DPC processing before timeout.",
          type: "info",
        },
      ],
    },
    {
      id: "set-timer-resolution-low",
      name: "Set Low Timer Resolution",
      description:
        "Reduce Windows timer resolution from 15.625ms to 1ms or 0.5ms",
      benefit:
        "Dramatically improves input responsiveness and frame consistency",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Understanding Timer Resolution",
          content:
            "Default Windows timer resolution: 15.625ms (64 Hz)\nGaming optimal: 1ms (1000 Hz)\nAggressive: 0.5ms (2000 Hz)\n\nLower timer resolution = more frequent timer interrupts = lower latency",
          type: "info",
        },
        {
          title: "Set Timer Resolution to 0.5ms",
          content:
            "Use bcdedit commands to set timer resolution to 0.5ms, the most aggressive gaming optimization.",
          command:
            "bcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true",
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "These bcdedit commands require administrator privileges and Windows restart.",
          type: "warning",
        },
      ],
    },
    {
      id: "timer-resolution-tools",
      name: "Timer Resolution Tools",
      description:
        "Use third-party tools to adjust timer resolution in real-time",
      benefit: "Allows dynamic timer adjustment without system restart",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Recommended Tools",
          content:
            "- TimerResolution by Lucas Hale: GUI tool for real-time timer adjustment\n- HPET Utility: Direct hardware timer access\n\nThese tools bypass the 15ms default and work immediately without reboot.",
          type: "info",
        },
        {
          title: "Using TimerResolution",
          content:
            "Download TimerResolution, set to 0.5ms or 1ms, and it immediately takes effect. Recommended for testing before permanent bcdedit changes.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-hpet",
      name: "Disable HPET",
      description:
        "Disable High Precision Event Timer which can introduce latency",
      benefit: "On most modern systems, HPET adds latency rather than helping",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable HPET via Boot Configuration",
          content:
            "Remove useplatformclock setting to disable HPET (High Precision Event Timer) at the firmware level.",
          command: "bcdedit /deletevalue useplatformclock",
          language: "powershell",
        },
        {
          title: "Alternative: Disable via Device Manager",
          content:
            "Disable the High Precision Event Timer device in Device Manager as an alternative method.",
          command:
            'Get-PnpDevice | Where-Object {$_.FriendlyName -like "*High Precision Event Timer*"} | Disable-PnpDevice -Confirm:$false',
          language: "powershell",
        },
        {
          title: "Compatibility Warning",
          content:
            "On very old systems or notebooks, HPET may be necessary. Test stability after disabling before making permanent.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-message-priority",
      name: "Configure Windows Message Priority",
      description:
        "Reduce Windows message queue latency with Win32PrioritySeparation",
      benefit:
        "Improves window message processing speed for faster input response",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Win32PrioritySeparation for Gaming",
          content:
            "Win32PrioritySeparation controls foreground vs background process priority. Value 38 (0x26) is optimal for gaming.",
          command:
            'New-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force',
          language: "powershell",
        },
        {
          title: "Common Values",
          content:
            "26 (0x1A): Balanced\n38 (0x26): Gaming (increased foreground priority) - Recommended\n40 (0x28): Maximum foreground priority (aggressive)",
          type: "info",
        },
      ],
    },
    {
      id: "configure-irq-priority",
      name: "Configure IRQ Priority",
      description: "Set high priority for network and GPU interrupt handling",
      benefit: "Ensures network and GPU interrupts are handled quickly",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set IRQ Priorities",
          content:
            "IRQ8 typically handles system timers, IRQ16 handles PCI-E devices like network and GPU. Set high priority for gaming devices.",
          command:
            '$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force',
          language: "powershell",
        },
        {
          title: "Priority Values",
          content:
            "Higher values = higher priority. Value 1-2 is safe range for gaming optimization.",
          type: "info",
        },
      ],
    },
    {
      id: "enable-msi-mode",
      name: "Enable MSI Mode",
      description: "Enable Message Signaled Interrupts for PCIe devices",
      benefit:
        "Reduces latency by using message-based instead of pin-based interrupts",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "What is MSI?",
          content:
            "Message Signaled Interrupts (MSI) allows devices to signal interrupts via message delivery instead of dedicated interrupt pins. This reduces latency and contention.",
          type: "info",
        },
        {
          title: "Enable MSI for Gaming",
          content:
            "Use MSI Utility or registry editing to enable MSI on:\n- Network adapter\n- GPU\n- USB controller\n\nMost gaming devices benefit from MSI mode.",
          type: "info",
        },
        {
          title: "Note",
          content:
            "MSI mode is typically enabled by default on modern gaming hardware. Check Device Manager > Properties > MSI Support tab.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-latency-settings",
      name: "Verify Latency Settings",
      description: "Check that all latency optimizations were applied",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check Dynamic Tick Disabled",
          content: "Verify DisableDynamicTick is set to 1.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity" -Name "DisableDynamicTick"',
          language: "powershell",
        },
        {
          title: "Check DPC Watchdog",
          content: "Verify DPC Watchdog profile offset is set.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel" -Name "DpcWatchdogProfileOffset"',
          language: "powershell",
        },
        {
          title: "Check Timer Resolution",
          content:
            "Verify bcdedit timer settings are applied. Check in System Information for Timer Resolution.",
          command: "bcdedit /enum | findstr /i timer",
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-latency-optimization",
      name: "Complete Latency Optimization",
      description: "Apply all latency and timer optimizations at once",
      benefit: "Comprehensive latency reduction in one script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Complete Optimization Script",
          content:
            "This script applies all recommended latency and timer optimizations.",
          command:
            '# Disable Dynamic Tick\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\KernelVelocity"\nNew-Item -Path $path -Force | Out-Null\nNew-ItemProperty -Path $path -Name "DisableDynamicTick" -PropertyType DWord -Value 1 -Force\n\n# Configure DPC Watchdog\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Session Manager\\kernel"\nNew-ItemProperty -Path $path -Name "DpcWatchdogProfileOffset" -PropertyType DWord -Value 10000 -Force\n\n# Configure Win32PrioritySeparation for Gaming\nNew-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl" -Name "Win32PrioritySeparation" -PropertyType DWord -Value 38 -Force\n\n# Configure IRQ Priorities\n$path = "HKLM:\\SYSTEM\\CurrentControlSet\\Control\\PriorityControl"\nNew-ItemProperty -Path $path -Name "IRQ8Priority" -PropertyType DWord -Value 1 -Force\nNew-ItemProperty -Path $path -Name "IRQ16Priority" -PropertyType DWord -Value 2 -Force\n\n# Set Timer Resolution via bcdedit\nbcdedit /set disabledynamictick yes\nbcdedit /set useplatformclock true\n\nWrite-Host "All latency optimizations applied. Please restart Windows."',
          language: "powershell",
        },
        {
          title: "After Running Script",
          content: "Restart Windows for all changes to take effect properly.",
          type: "warning",
        },
      ],
    },
    {
      id: "latency-best-practices",
      name: "Latency and Timers Best Practices",
      description: "Important guidelines for applying latency optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Test in safe mode first if concerned about stability\n4. Have driver CDs/downloads ready for GPU and network\n5. Note all original settings before changes",
          type: "warning",
        },
        {
          title: "System Restart Required",
          content:
            "All these changes require a complete system restart to take effect. Plan accordingly.",
          type: "warning",
        },
        {
          title: "Compatibility Notes",
          content:
            "- Works on Windows 7, 8, 10, and 11\n- Some very old systems may need HPET enabled\n- Virtual machines may not support all changes\n- Some settings require specific hardware support",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Reduced input latency (5-10ms typical), lower frame time consistency, better ping stability. Results vary by hardware and game.",
          type: "info",
        },
      ],
    },
  ] as Tweak[]
];

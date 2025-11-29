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

export const systemResponsivenessTweaks = [

    {
      id: "system-responsiveness-overview",
      name: "Understanding System Responsiveness",
      description: "Learn how MMCSS CPU reservation impacts gaming performance",
      benefit:
        "Understanding CPU reservation helps optimize gaming performance",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is MMCSS?",
          content:
            "MMCSS (Multimedia Class Scheduler) is a Windows service that reserves 20% of CPU by default for background processes. This means gaming applications can only use up to 80% of your CPU, even if more is available. Reducing this reservation gives more CPU power to games.",
          type: "info",
        },
        {
          title: "SystemResponsiveness Values",
          content:
            "Default: 20 (20% CPU reserved for background tasks)\nGeneral Applications: 10 (10% reserved)\nGaming/Streaming: 0 (0% reserved, maximum gaming priority)",
          type: "info",
        },
        {
          title: "Performance Impact",
          content:
            "- Setting to 0 gives 100% CPU availability to gaming\n- Reduces frame rate stuttering\n- Improves frame consistency\n- Frees up CPU for physics calculations and AI processing",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-responsiveness",
      name: "Check Current SystemResponsiveness",
      description: "View your current MMCSS CPU reservation setting",
      benefit: "Verify current CPU reservation before making changes",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Current Value",
          content:
            "This command shows your current SystemResponsiveness value. Default on desktop Windows is 20.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Expected Default Output",
          content: "SystemResponsiveness : 20",
          type: "info",
        },
      ],
    },
    {
      id: "set-system-responsiveness-zero",
      name: "Set SystemResponsiveness to 0",
      description: "Configure maximum CPU priority for gaming applications",
      benefit: "Frees all CPU resources for gaming, maximum performance",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set SystemResponsiveness to 0",
          content:
            "This sets SystemResponsiveness to 0, meaning 0% CPU is reserved for background processes and games get 100% CPU availability.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "This change requires administrator privileges. Windows restart is recommended but not always required.",
          type: "warning",
        },
      ],
    },
    {
      id: "configure-gpu-priority",
      name: "Configure GPU Priority",
      description: "Set GPU scheduling priority for games task",
      benefit: "Ensures GPU prioritizes game rendering",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set GPU Priority to 8",
          content:
            "GPU Priority ranges from 0-31. Value 8 is optimal for gaming, giving high priority to GPU tasks without starving other GPU work.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "GPU Priority" -PropertyType DWord -Value 8 -Force',
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "The Games task must exist in the registry. This is created automatically by Windows or during multimedia configuration.",
          type: "info",
        },
      ],
    },
    {
      id: "configure-scheduling-category",
      name: "Configure Scheduling Category",
      description: "Set scheduling priority category for games",
      benefit: "Ensures games run in high-priority scheduling category",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Scheduling Category to High",
          content:
            "Scheduling Category determines how the MMCSS scheduler treats the task. 'High' gives maximum priority.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Scheduling Category" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-sfio-priority",
      name: "Configure SFIO Priority",
      description: "Set System File I/O priority for games",
      benefit: "Prioritizes disk I/O for game asset loading",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set SFIO Priority to High",
          content:
            "SFIO (System File I/O) Priority determines disk access priority. 'High' ensures game asset loading is prioritized.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "SFIO Priority" -PropertyType String -Value "High" -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "configure-task-priority",
      name: "Configure Task Priority",
      description: "Set thread priority for games task",
      benefit: "Ensures game threads get high priority",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set Priority to 6",
          content:
            "Priority ranges from 1-8. Value 6 is high priority without causing too much CPU contention with system tasks.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $path -Name "Priority" -PropertyType DWord -Value 6 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "complete-gaming-profile",
      name: "Apply Complete Gaming Profile",
      description: "Apply all gaming optimization settings at once",
      benefit: "Comprehensive gaming optimization in one script",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Complete Gaming Configuration Script",
          content:
            "This script applies all recommended gaming optimization settings.",
          command:
            '# Set SystemResponsiveness to 0\n$profilePath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile"\nNew-ItemProperty -Path $profilePath -Name "SystemResponsiveness" -PropertyType DWord -Value 0 -Force\n\n# Configure Games task\n$gamesPath = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nNew-ItemProperty -Path $gamesPath -Name "GPU Priority" -PropertyType DWord -Value 8 -Force\nNew-ItemProperty -Path $gamesPath -Name "Scheduling Category" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "SFIO Priority" -PropertyType String -Value "High" -Force\nNew-ItemProperty -Path $gamesPath -Name "Priority" -PropertyType DWord -Value 6 -Force\nNew-ItemProperty -Path $gamesPath -Name "Affinity" -PropertyType DWord -Value 0 -Force\nNew-ItemProperty -Path $gamesPath -Name "Background Only" -PropertyType String -Value "False" -Force\nNew-ItemProperty -Path $gamesPath -Name "Clock Rate" -PropertyType DWord -Value 2710 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "verify-gaming-settings",
      name: "Verify Gaming Settings",
      description: "Check that all gaming optimization settings were applied",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check SystemResponsiveness",
          content: "Verify the main SystemResponsiveness setting is now 0.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "SystemResponsiveness"',
          language: "powershell",
        },
        {
          title: "Check Games Task Settings",
          content: "Verify all Games task settings are configured.",
          command:
            '$path = "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile\\Tasks\\Games"\nGet-ItemProperty -Path $path | Select-Object "GPU Priority", "Priority", "Scheduling Category", "SFIO Priority"',
          language: "powershell",
        },
      ],
    },
    {
      id: "system-responsiveness-best-practices",
      name: "System Responsiveness Best Practices",
      description:
        "Important guidelines for applying system responsiveness optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Close all games and resource-intensive applications\n4. Note your current settings before making changes\n5. Test performance in your main games",
          type: "warning",
        },
        {
          title: "Windows Server Note",
          content:
            "On Windows Server, SystemResponsiveness defaults to 100, giving priority to background services over multimedia. Do not set to 0 on Server OS.",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11 (desktop versions). Server versions behave differently.",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Smoother frame times, reduced frame rate stuttering, better performance in CPU-heavy games. Improvement varies by game and system.",
          type: "info",
        },
      ],
    },
  ] as Tweak[]
];

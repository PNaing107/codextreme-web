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

export const nagleAlgorithmTweaks = [

    {
      id: "nagle-overview",
      name: "Understanding Nagle Algorithm",
      description:
        "Learn what Nagle algorithm does and why disabling it helps gaming",
      benefit:
        "Understanding helps determine if disabling Nagle is right for your use case",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is Nagle Algorithm?",
          content:
            "Nagle algorithm combines several small packets into one larger packet to improve efficiency. This reduces network overhead but introduces a small delay (up to 40ms) that can be problematic for gaming and real-time applications.",
          type: "info",
        },
        {
          title: "Benefits of Disabling",
          content:
            "- Reduces latency up to 50% in MMOs like World of Warcraft and Diablo III\n- Improves response time in FPS and MOBA games\n- Eliminates micro-stuttering on consistent connections\n- Better real-time communication",
          type: "info",
        },
        {
          title: "Caution",
          content:
            "Disabling Nagle can reduce performance on large file transfers. Only recommended for gaming-focused systems.",
          type: "warning",
        },
      ],
    },
    {
      id: "find-nic-guid",
      name: "Find Network Adapter GUID",
      description:
        "Locate your network adapter's GUID for registry configuration",
      benefit:
        "Required first step to apply Nagle algorithm tweaks to the correct NIC",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Get Network Adapter GUID",
          content:
            "This command lists all network adapters and their GUIDs. Find your active gaming network adapter.",
          command: "Get-NetAdapter | Select-Object Name, InterfaceGuid",
          language: "powershell",
        },
        {
          title: "Registry Path",
          content:
            "Registry location for network settings: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}",
          type: "info",
        },
      ],
    },
    {
      id: "tcp-ack-frequency",
      name: "Configure TcpAckFrequency",
      description: "Disable TCP acknowledgment delay to reduce latency",
      benefit: "Main setting for Nagle algorithm optimization",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set TcpAckFrequency to 1",
          content:
            "Default value: 2 (introduces ~200ms delay through Nagle algorithm)\nRecommended: 1 (disables Nagle buffering)\n\nReplace {NIC-GUID} with your adapter's GUID from previous step.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "Replace {NIC-GUID} with your actual network adapter GUID. Get it from the previous step.",
          type: "warning",
        },
      ],
    },
    {
      id: "tcp-no-delay",
      name: "Enable TCPNoDelay",
      description: "Disable TCP Nagle algorithm at the protocol level",
      benefit: "Ensures immediate packet transmission without buffering",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set TCPNoDelay to 1",
          content:
            "TCPNoDelay disables Nagle algorithm completely. Value 1 = Enabled (disables Nagle).\n\nReplace {NIC-GUID} with your adapter's GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
      ],
    },
    {
      id: "tcp-del-ack-ticks",
      name: "Configure TcpDelAckTicks (Optional)",
      description: "Fine-tune TCP delayed acknowledgment timing",
      benefit: "Further reduces acknowledgment delay for ultra-low latency",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Set TcpDelAckTicks to 0",
          content:
            "TcpDelAckTicks controls the number of acknowledgments delayed. Setting to 0 means no delay.\n\nReplace {NIC-GUID} with your adapter's GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nNew-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -PropertyType DWord -Value 0 -Force',
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "This setting is optional but recommended for maximum latency reduction in competitive gaming.",
          type: "info",
        },
      ],
    },
    {
      id: "msmq-tcp-no-delay",
      name: "Enable TCPNoDelay for MSMQ",
      description: "Apply TCPNoDelay to Message Queuing if you use MSMQ",
      benefit: "Ensures MSMQ uses low-latency TCP communication",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Set MSMQ TCPNoDelay",
          content:
            "If you use MSMQ (Message Queuing), apply TCPNoDelay setting at the MSMQ level.",
          command:
            '$msmqPath = "HKLM:\\SOFTWARE\\Microsoft\\MSMQ\\Parameters"\nNew-ItemProperty -Path $msmqPath -Name "TCPNoDelay" -PropertyType DWord -Value 1 -Force',
          language: "powershell",
        },
        {
          title: "When to Use",
          content:
            "Only applies if you use MSMQ for enterprise messaging. Skip if you don't use MSMQ.",
          type: "info",
        },
      ],
    },
    {
      id: "verify-settings",
      name: "Verify Nagle Settings",
      description:
        "Check that your Nagle algorithm settings were applied correctly",
      benefit: "Confirms configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check Registry Values",
          content:
            "After applying settings, verify they appear in the registry. Replace {NIC-GUID} with your adapter GUID.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}" | Select-Object TcpAckFrequency, TCPNoDelay, TcpDelAckTicks',
          language: "powershell",
        },
        {
          title: "Expected Values",
          content: "TcpAckFrequency: 1\nTCPNoDelay: 1\nTcpDelAckTicks: 0",
          type: "info",
        },
      ],
    },
    {
      id: "revert-changes",
      name: "Revert Nagle Changes",
      description: "Remove Nagle algorithm modifications to return to defaults",
      benefit: "Allows reverting settings if they cause issues",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Remove Nagle Settings",
          content:
            "This removes the three main Nagle settings from registry. Replace {NIC-GUID} with your adapter GUID.",
          command:
            '$nicPath = "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces\\{NIC-GUID}"\nRemove-ItemProperty -Path $nicPath -Name "TcpAckFrequency" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TCPNoDelay" -ErrorAction SilentlyContinue\nRemove-ItemProperty -Path $nicPath -Name "TcpDelAckTicks" -ErrorAction SilentlyContinue',
          language: "powershell",
        },
        {
          title: "After Reverting",
          content:
            "Restart Windows for changes to take effect. This will restore default Nagle algorithm behavior.",
          type: "info",
        },
      ],
    },
    {
      id: "nagle-best-practices",
      name: "Nagle Algorithm Best Practices",
      description:
        "Important guidelines for safely applying Nagle optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Note your NIC GUID before making changes\n4. Test on a non-critical network first\n5. Restart Windows after applying",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11. Also improves WiFi performance slightly.",
          type: "info",
        },
        {
          title: "When to Use",
          content:
            "Recommended for: Gaming, MMOs, FPS games, real-time applications\nNot recommended for: Heavy file transfer systems, general-purpose servers",
          type: "info",
        },
      ],
    },
  ] as Tweak[]
];

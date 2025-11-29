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

export const networkThrottlingTweaks = [

    {
      id: "network-throttling-overview",
      name: "Understanding Network Throttling",
      description:
        "Learn about Windows network throttling and how it impacts gaming performance",
      benefit:
        "Understanding throttling helps determine if disabling it will help your use case",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "What is NetworkThrottlingIndex?",
          content:
            "Windows limits non-multimedia traffic processing to 10 packets per millisecond (approximately 100 Mbits/s) to prioritize multimedia applications. On Gigabit networks and in online gaming, this artificial limit can reduce performance.",
          type: "info",
        },
        {
          title: "Default Behavior",
          content:
            "Default value: 10 packets/ms\nFor media sharing: 10 packets/ms\nFor gaming/max throughput: 0xffffffff (disabled)",
          type: "info",
        },
        {
          title: "Performance Impact",
          content:
            "- Reduces ping spikes in online games\n- Improves maximum throughput on Gigabit networks\n- Better performance in games like TF2, CS:S, Left 4 Dead, HoN, CoD, and Overlord\n- Only effective on Gigabit connections (100+ Mbps)",
          type: "info",
        },
      ],
    },
    {
      id: "check-current-throttling",
      name: "Check Current Throttling Value",
      description: "View your current NetworkThrottlingIndex setting",
      benefit:
        "Verify your current network throttling configuration before making changes",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Current Value",
          content:
            "This command shows your current NetworkThrottlingIndex value. Default is 10.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Expected Default Output",
          content: "NetworkThrottlingIndex : 10",
          type: "info",
        },
      ],
    },
    {
      id: "disable-network-throttling",
      name: "Disable Network Throttling",
      description:
        "Set NetworkThrottlingIndex to maximum for gaming performance",
      benefit: "Removes Windows packet processing limit for maximum throughput",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Set NetworkThrottlingIndex to 0xffffffff",
          content:
            "This sets the value to the maximum (0xffffffff = 4294967295), effectively disabling throttling. Recommended for gaming on Gigabit networks.",
          command:
            'New-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -PropertyType DWord -Value 0xffffffff -Force',
          language: "powershell",
        },
        {
          title: "Important",
          content:
            "This change requires administrator privileges and Windows restart to take effect.",
          type: "warning",
        },
      ],
    },
    {
      id: "verify-throttling-disabled",
      name: "Verify Throttling is Disabled",
      description:
        "Confirm that network throttling has been successfully disabled",
      benefit: "Ensures configuration changes took effect",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Check New Value",
          content:
            "After restarting Windows, verify the NetworkThrottlingIndex is now set to the maximum value.",
          command:
            'Get-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex"',
          language: "powershell",
        },
        {
          title: "Expected Output After Disabling",
          content:
            "NetworkThrottlingIndex : 4294967295 (or shown in hex as 0xffffffff)",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-when-to-use",
      name: "When to Use Network Throttling Disable",
      description: "Determine if disabling throttling is right for your setup",
      benefit: "Helps decide if this optimization applies to your gaming style",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Recommended For",
          content:
            "✓ Gaming on Gigabit networks (100+ Mbps)\n✓ Online multiplayer games (FPS, MOBA, MMO)\n✓ Games experiencing ping spikes: TF2, CS:S, Left 4 Dead, HoN, CoD, Overlord\n✓ Systems where media streaming is not a priority",
          type: "info",
        },
        {
          title: "Not Recommended For",
          content:
            "✗ Systems with media streaming as priority\n✗ Non-Gigabit networks (under 100 Mbps)\n✗ General-purpose systems balancing gaming and media",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-settings-reference",
      name: "NetworkThrottlingIndex Values Reference",
      description: "Understanding different NetworkThrottlingIndex values",
      benefit: "Reference guide for different throttling levels",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Common Values",
          content:
            "10 (0xa) - Default Windows setting, 10 packets/ms (~100 Mbits/s)\n10 (0xa) - Media sharing priority mode\n0xffffffff - Gaming mode, maximum throughput (disabled throttling)\n\nMost systems use 10 by default. Gaming optimized systems should use 0xffffffff.",
          type: "info",
        },
      ],
    },
    {
      id: "revert-network-throttling",
      name: "Revert Network Throttling",
      description: "Restore default network throttling settings",
      benefit: "Allows reverting to default behavior if needed",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Restore Default Value",
          content:
            "This sets NetworkThrottlingIndex back to the default value of 10.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Multimedia\\SystemProfile" -Name "NetworkThrottlingIndex" -Value 10',
          language: "powershell",
        },
        {
          title: "After Reverting",
          content:
            "Restart Windows for changes to take effect. Default throttling (10 packets/ms) will be restored.",
          type: "info",
        },
      ],
    },
    {
      id: "network-throttling-best-practices",
      name: "Network Throttling Best Practices",
      description:
        "Important guidelines for applying network throttling optimizations",
      benefit: "Prevents issues and ensures optimal configuration",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run PowerShell as Administrator\n3. Check that you have a Gigabit network connection\n4. Verify your network speed: Run speed test before and after\n5. Test on non-critical network first",
          type: "warning",
        },
        {
          title: "Compatibility",
          content:
            "Works on Windows 7, 8, 10, and 11. Most effective on Gigabit networks. Minimal impact on networks under 100 Mbps.",
          type: "info",
        },
        {
          title: "Testing Results",
          content:
            "Expected improvements: Reduced ping spikes, faster downloads/uploads on Gigabit networks. Some users report 10-30% latency improvement in specific games.",
          type: "info",
        },
      ],
    },
  ] as Tweak[]
];

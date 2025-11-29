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

export const windowsFeaturesTweaks = [

    {
      id: "virtualization-features",
      name: "Disable Virtualization Features",
      description:
        "Disable Hyper-V, WSL, and virtualization-related features if not needed",
      benefit:
        "Frees up system resources and improves performance if virtualization is not used",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Virtualization Components",
          content:
            "Disables Hyper-V, Virtual Machine Platform, Windows Subsystem for Linux, and ProjFS. Only disable if you don't use these features.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:HypervisorPlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:VirtualMachinePlatform\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Microsoft-Windows-Subsystem-Linux\nDism.exe /Online /Disable-Feature /NoRestart /featurename:Client-ProjFS",
          language: "powershell",
        },
        {
          title: "Important Note",
          content:
            "Disabling these features will prevent running virtual machines, WSL, and Docker containers.",
          type: "warning",
        },
      ],
    },
    {
      id: "iis-services",
      name: "Disable IIS and Web Services",
      description:
        "Remove IIS and web server components if not running web services",
      benefit:
        "Reduces system footprint and closes unnecessary network services",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable IIS Components",
          content:
            "Removes Internet Information Services and related web server components.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerRole\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-WebServerManagementTools\nDism.exe /Online /Disable-Feature /NoRestart /featurename:IIS-ManagementConsole",
          language: "powershell",
        },
        {
          title: "When to Disable",
          content:
            "Safe to disable if you don't run web services or development environments requiring IIS.",
          type: "info",
        },
      ],
    },
    {
      id: "legacy-components",
      name: "Disable Legacy Components",
      description: "Remove outdated and rarely-used Windows components",
      benefit:
        "Reduces system bloat, improves startup time, and enhances security by removing old code",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable Legacy Features",
          content:
            "Removes Internet Explorer, Windows Media Player, DirectPlay, and PowerShell v2. These are rarely needed on modern systems.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:Internet-Explorer-Optional-amd64\nDism.exe /Online /Disable-Feature /NoRestart /featurename:WindowsMediaPlayer\nDism.exe /Online /Disable-Feature /NoRestart /featurename:DirectPlay\nDism.exe /Online /Disable-Feature /NoRestart /featurename:LegacyComponents\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MicrosoftWindowsPowerShellV2Root",
          language: "powershell",
        },
        {
          title: "Note",
          content:
            "Windows Media Player can be replaced with modern media players like VLC or Windows 11 Media Player.",
          type: "info",
        },
      ],
    },
    {
      id: "smb1-protocol",
      name: "Disable SMB1 Protocol",
      description:
        "Remove the insecure SMB1 protocol which has known vulnerabilities",
      benefit:
        "Significantly improves security by removing outdated and vulnerable network protocol",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable SMB1",
          content:
            "SMB1 is deprecated and has multiple security vulnerabilities. Should be disabled on all systems. Modern systems use SMB2/3.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Client\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SMB1Protocol-Server",
          language: "powershell",
        },
        {
          title: "Security Warning",
          content:
            "SMB1 has been the target of multiple ransomware attacks (WannaCry, etc.). Disabling is strongly recommended.",
          type: "warning",
        },
      ],
    },
    {
      id: "unused-network-services",
      name: "Disable Unused Network Services",
      description: "Remove rarely-used network service features",
      benefit:
        "Reduces attack surface and frees up resources by disabling obsolete protocols",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable Network Services",
          content:
            "Removes Telnet Client, TFTP, SNMP, and SimpleTCP. These are legacy protocols rarely used on modern networks.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:TelnetClient\nDism.exe /Online /Disable-Feature /NoRestart /featurename:TFTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SNMP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:SimpleTCP",
          language: "powershell",
        },
      ],
    },
    {
      id: "msmq-services",
      name: "Disable MSMQ (Message Queuing)",
      description:
        "Remove Message Queuing components if not used for enterprise messaging",
      benefit:
        "Frees resources by removing unused enterprise messaging infrastructure",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable MSMQ",
          content:
            "Removes Message Queuing components. Only needed if using MSMQ for application integration.",
          command:
            "Dism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Container\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Server\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-HTTP\nDism.exe /Online /Disable-Feature /NoRestart /featurename:MSMQ-Triggers",
          language: "powershell",
        },
      ],
    },
    {
      id: "enable-useful-features",
      name: "Enable Useful Features",
      description:
        "Enable beneficial Windows features for system compatibility and functionality",
      benefit:
        "Ensures system has necessary components for optimal compatibility",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Enable Recommended Features",
          content:
            "Enables .NET Framework, PDF printing, Windows Search, and Defender definitions. Recommended for all users.",
          command:
            "Dism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx3\nDism.exe /Online /Enable-Feature /NoRestart /featurename:NetFx4-AdvSrvs\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Printing-PrintToPDFServices-Features\nDism.exe /Online /Enable-Feature /NoRestart /featurename:SearchEngine-Client-Package\nDism.exe /Online /Enable-Feature /NoRestart /featurename:Windows-Defender-Default-Definitions",
          language: "powershell",
        },
      ],
    },
    {
      id: "check-disabled-features",
      name: "Check Disabled Features",
      description: "Verify which Windows features are currently disabled",
      benefit:
        "Helps identify which features have been disabled and monitor system configuration",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "View Disabled Features",
          content: "Shows only disabled Windows features",
          command:
            "Dism.exe /Online /Get-Features /Format:Table | Select-String 'Disabled'",
          language: "powershell",
        },
        {
          title: "View All Features",
          content: "Shows all Windows features with their current state",
          command: "Dism.exe /Online /Get-Features",
          language: "powershell",
        },
      ],
    },
    {
      id: "dism-best-practices",
      name: "DISM Best Practices",
      description: "Important guidelines for safely managing Windows features",
      benefit:
        "Prevents system instability and ensures safe feature management with proper backup",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Before Making Changes",
          content:
            "1. Create a system restore point\n2. Run all commands as Administrator\n3. Use /NoRestart flag to group changes\n4. Test on a non-critical system first",
          type: "warning",
        },
        {
          title: "Important Notes",
          content:
            "- Backup: Create a restore point before changes\n- Permissions: Always run as Administrator\n- Restart: Manually restart after all changes\n- Reversible: Use /Enable-Feature to revert disabled features\n- NoRestart: Use /NoRestart flag to batch multiple commands",
          type: "info",
        },
      ],
    },
  ] as Tweak[]
];

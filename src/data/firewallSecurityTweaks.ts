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

export const firewallSecurityTweaks = [

    {
      id: "firewall-app-rules",
      name: "Disable Unnecessary App Firewall Rules",
      description:
        "Disable firewall rules for built-in Windows apps that may not be needed",
      benefit:
        "Reduces attack surface and network exposure for unused applications",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Windows App Firewall Rules",
          content:
            "Disables firewall rules for built-in Windows applications like Cortana, Feedback Hub, Photos, etc. Only disable if you don't use these apps.",
          command:
            'netsh advfirewall firewall set rule group="Connect" new enable=no\nnetsh advfirewall firewall set rule group="Contact Support" new enable=no\nnetsh advfirewall firewall set rule group="Cortana" new enable=no\nnetsh advfirewall firewall set rule group="DiagTrack" new enable=no\nnetsh advfirewall firewall set rule group="Feedback Hub" new enable=no\nnetsh advfirewall firewall set rule group="Microsoft Photos" new enable=no\nnetsh advfirewall firewall set rule group="OneNote" new enable=no\nnetsh advfirewall firewall set rule group="Remote Assistance" new enable=no\nnetsh advfirewall firewall set rule group="Windows Spotlight" new enable=no',
          language: "powershell",
        },
      ],
    },
    {
      id: "block-smb-port",
      name: "Block SMB Port 445",
      description:
        "Block incoming SMB traffic on port 445 to prevent ransomware attacks",
      benefit:
        "Significantly improves security by blocking major attack vector for ransomware and worms",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Block Port 445",
          content:
            "Adds firewall rule to block incoming SMB traffic. SMB port 445 is frequently targeted by WannaCry, Petya, and other ransomware.",
          command:
            "netsh advfirewall firewall add rule name=deny445 dir=in action=block protocol=TCP localport=445",
          language: "powershell",
        },
        {
          title: "Security Note",
          content:
            "Port 445 is the primary vector for ransomware propagation on Windows networks. Blocking is highly recommended unless you require SMB shares.",
          type: "warning",
        },
      ],
    },
    {
      id: "firewall-profiles",
      name: "Configure Firewall Profiles",
      description:
        "Enable firewall on all profiles and restrict local firewall rules",
      benefit:
        "Ensures consistent firewall protection across all network scenarios",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable Firewall Profiles",
          content:
            "Enables Windows Firewall on Domain, Public, and Private profiles. Disallows local firewall rule modifications to prevent tampering.",
          command:
            "Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True -AllowLocalFirewallRules False",
          language: "powershell",
        },
        {
          title: "Protection",
          content:
            "Prevents malware from disabling firewall or creating exceptions for network access.",
          type: "info",
        },
      ],
    },
    {
      id: "disable-netbios",
      name: "Disable NetBIOS and LMHOSTS",
      description:
        "Disable legacy NetBIOS protocol that can expose system information",
      benefit:
        "Reduces exposure of computer names and network discovery attacks",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable NetBIOS/LMHOSTS",
          content:
            "NetBIOS is a legacy protocol that broadcasts computer names on local networks. Modern systems use DNS instead.",
          command:
            'New-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\NetBT\\Parameters" -Name "EnableLMHOSTS" -PropertyType DWord -Value 0',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-network-adapters",
      name: "Disable Unnecessary Network Adapters",
      description:
        "Disable unused network components like Pacer, SMB Server, LLDP, and LLTD",
      benefit:
        "Reduces network exposure and removes potentially vulnerable network services",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Network Components",
          content:
            "Disables Pacer (QoS), SMB Server, LLDP (Link Layer Discovery Protocol), and LLTD (Link-Layer Topology Discovery). These are rarely needed for gaming or productivity.",
          command:
            '# Pacer (QoS)\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_pacer"\n\n# SMB Server\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_server"\n\n# LLDP\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lldp"\n\n# LLTD\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_lltdio"\nDisable-NetAdapterBinding -Name "*" -ComponentID "ms_rspndr"',
          language: "powershell",
        },
      ],
    },
    {
      id: "disable-ipv6",
      name: "Disable IPv6",
      description: "Disable IPv6 protocol if you only use IPv4",
      benefit:
        "Reduces network complexity and potential security gaps from unused protocols",
      impactLevel: "low" as const,
      subsections: [
        {
          title: "Disable IPv6",
          content:
            "Disables IPv6 on network adapters. Only disable if your network exclusively uses IPv4. Some applications may require IPv6.",
          command:
            'Disable-NetAdapterBinding -Name "*" -ComponentID "ms_tcpip6"\nNew-ItemProperty -Force -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\TCPIP6\\Parameters" -Name "DisabledComponents" -PropertyType DWord -Value 0xFFFFFFFF',
          language: "powershell",
        },
        {
          title: "Warning",
          content:
            "Only disable if you exclusively use IPv4. Disabling IPv6 may break some applications or services that depend on it.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-smbv1",
      name: "Disable SMBv1 Protocol",
      description: "Disable insecure SMBv1 file sharing protocol",
      benefit: "Eliminates WannaCry and Petya ransomware attack vector",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable SMBv1",
          content:
            "SMBv1 has critical vulnerabilities and should always be disabled. Modern systems use SMB2/3.",
          command:
            'Set-ItemProperty -Path "HKLM:\\SYSTEM\\CurrentControlSet\\Services\\LanmanServer\\Parameters" -Name SMB1 -Value 0',
          language: "powershell",
        },
        {
          title: "Security Critical",
          content:
            "SMBv1 has been exploited by major ransomware attacks. Disabling is strongly recommended.",
          type: "warning",
        },
      ],
    },
    {
      id: "disable-file-printer-sharing",
      name: "Disable File and Printer Sharing",
      description:
        "Disable firewall rules for file and printer sharing if not needed",
      benefit:
        "Prevents unauthorized access to shared files and printers on network",
      impactLevel: "medium" as const,
      subsections: [
        {
          title: "Disable Sharing Rules",
          content:
            "Disables firewall rules allowing file and printer sharing. Only disable if you don't share files or printers on your network.",
          command:
            'netsh advfirewall firewall set rule group="File and Printer Sharing" new enable=no',
          language: "powershell",
        },
        {
          title: "Impact",
          content:
            "If you use network file/printer sharing, you'll need to enable these rules separately.",
          type: "info",
        },
      ],
    },
    {
      id: "credential-hardening",
      name: "Credential Hardening",
      description:
        "Configure token and credential policies to prevent credential theft attacks",
      benefit:
        "Protects administrator tokens from local privilege escalation attacks",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Enable Credential Protection",
          content:
            "Enables User Account Control (UAC) hardening, administrator token filtering, and local account token policies. Prevents credential theft via token impersonation.",
          command:
            "Set-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name LocalAccountTokenFilterPolicy -Value 0\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name FilterAdministratorToken -Value 1\nSet-ItemProperty HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name EnableLUA -Value 1",
          language: "powershell",
        },
        {
          title: "UAC Effect",
          content:
            "Ensures UAC prompts for all administrative operations, preventing silent privilege escalation.",
          type: "info",
        },
      ],
    },
    {
      id: "cleartext-password-protection",
      name: "Cleartext Password Protection",
      description:
        "Prevent storage of passwords in cleartext and enable token leak detection",
      benefit:
        "Prevents credential harvesting attacks that exploit cleartext password storage",
      impactLevel: "high" as const,
      subsections: [
        {
          title: "Disable Cleartext Passwords",
          content:
            "Disables WDigest cleartext password storage and enables token leak detection. WDigest stores passwords in memory in cleartext, creating severe security risk.",
          command:
            "Set-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\SecurityProviders\\WDigest -Name UseLogonCredential -Value 0\nSet-ItemProperty HKLM:\\SYSTEM\\CurrentControlSet\\Control\\Lsa -Name TokenLeakDetectDelaySecs -Value 30",
          language: "powershell",
        },
        {
          title: "Security Critical",
          content:
            "WDigest cleartext passwords allow attackers to harvest credentials using tools like Mimikatz after system compromise.",
          type: "warning",
        },
      ],
    },
  ] as Tweak[]
];

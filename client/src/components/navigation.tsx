interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "info", label: "Info" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="space-y-4">
      {navItems.map((item) => (
        <div
          key={item.id}
          onClick={() => onSectionChange(item.id)}
          className={`cursor-pointer transition-all duration-200 ${
            activeSection === item.id
              ? "opacity-100 font-medium"
              : "opacity-70 hover:opacity-100"
          }`}
        >
          {item.label}
        </div>
      ))}
    </nav>
  );
}

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HubOverlay from "@/components/hub/HubOverlay";
import HubAbout from "@/components/hub/HubAbout";
import HubResume from "@/components/hub/HubResume";
import ContactContent from "@/components/ContactContent";

export default function HubPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = "Chee Pheng — Portfolio";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="hub-theme relative min-h-screen w-full">
      <Navbar theme="hub" />

      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 35%, var(--hub-bg) 100%)",
          }}
          aria-hidden="true"
        />

        <HubOverlay />
      </div>

      <div
        aria-hidden="true"
        className="relative h-16 md:h-20 w-full"
        style={{
          background: "var(--hub-bg)",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "var(--hub-border)" }}
        />
      </div>

      <HubAbout />
      <HubResume />
      <ContactContent theme="hub" />
    </div>
  );
}

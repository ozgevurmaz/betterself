import Navbar from "@/components/navbar/navbar";
import { t } from "i18n";
export default function Home() {
  return <>
    <Navbar />
    <h1>{t("hello")}</h1>
    <div style={{
      background: "var(--color-bg)",
      color: "var(--color-fg)",
      borderRadius: "var(--radius-xl)",
      padding: "var(--space-lg)"
    }}>
      Tema çalıştı mı?
    </div>

  </>
}
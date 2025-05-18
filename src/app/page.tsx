import Link from "next/link";
import PanchangamTable from "../components/PanchangamTable";
import PanchangamTableHindi from "../components/PanchangamTableHindi";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center">
        Bhaktito Panchangam App
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Your daily spiritual calendar and insights.
      </p>
      <PanchangamTable />
      <PanchangamTableHindi />

      <h2 className="text-3xl font-bold mb-6 text-center">📿 Bhaktito Stotras</h2>

      <ul className="space-y-4">
        <li>
          <Link
            href="/stotras/sri-narasimha-dwadasa-nama-stotram"
            className="block border p-4 rounded shadow hover:bg-gray-50 transition"
          >
            శ్రీ నృసింహ ద్వాదశనామ స్తోత్రం
          </Link>
        </li>
      </ul>
    </main>
  );
}

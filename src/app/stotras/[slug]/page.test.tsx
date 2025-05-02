import { render, screen } from "@testing-library/react";
import StotraPage from "./page";
import fs from "fs/promises";
import path from "path";

vi.mock("fs/promises", async () => {
  const actual = await vi.importActual<typeof import("fs/promises")>("fs/promises");
  return {
    ...actual,
    readFile: vi.fn(() =>
      Promise.resolve(
        JSON.stringify({
          posts: [
            {
              title: "శ్రీ నృసింహ ద్వాదశనామ స్తోత్రం",
              url: "sri-narasimha-dwadasa-nama-stotram",
              content: "అస్య శ్రీనృసింహ ద్వాదశనామస్తోత్ర మహామంత్రస్య ..."
            }
          ]
        })
      )
    )
  };
});

describe("StotraPage", () => {
  it.skip("renders the correct stotra based on slug", async () => {
    render(await StotraPage({ params: { slug: "sri-narasimha-dwadasa-nama-stotram" } }));

    expect(await screen.findByText("శ్రీ నృసింహ ద్వాదశనామ స్తోత్రం")).toBeInTheDocument();
    expect(await screen.findByText(/అస్య శ్రీనృసింహ ద్వాదశనామస్తోత్ర/)).toBeInTheDocument();
  });
});

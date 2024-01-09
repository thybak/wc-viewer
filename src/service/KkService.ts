import { KkEntry } from "../model/KkEntry";

export async function getSecretions(): Promise<KkEntry[]> {
    const kksResponse = await fetch("/wc-viewer/kks.json");
      if (!kksResponse.ok)
        return [];

      return await kksResponse.json();
}
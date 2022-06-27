import { LOAMarketCategory, LOAMarketRegion } from '../models';
import { LOAMarketMaterial } from '../models/material';

const baseUrl = 'https://www.lostarkmarket.online/api/export-market-live';

export interface LOAMarketMaterialsRequest {
  category?: LOAMarketCategory;
  subcategory?: string;
  categories?: LOAMarketCategory[];
  items?: string[];
  format?: 'json' | 'csv';
  class?: string;
  tier?: string;
  ids?: string;
}

const categories: LOAMarketCategory[] = [
  // LOAMarketCategory.CombatSupplies,
  // LOAMarketCategory.Cooking,
  // LOAMarketCategory.EnhancementMaterial,
  // LOAMarketCategory.Trader,
  LOAMarketCategory.CurrencyExchange,
];

export function getMaterials(
  region: LOAMarketRegion,
  request: LOAMarketMaterialsRequest
): Promise<LOAMarketMaterial[]> {
  const params = new URLSearchParams(request as any);
  return fetch(`${baseUrl}/${region}?${params.toString()}`).then(fetchHandler);
}

export async function getAllLOAMMaterials() {
  const mats = await getMaterials(LOAMarketRegion.EUC, { categories });
  return mats;
}

async function fetchHandler(res: any) {
  if (res.ok) return res.json();
  throw await res.json();
}

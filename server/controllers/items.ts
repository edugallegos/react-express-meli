import { Request, Response } from "express";
import axios, { isAxiosError } from "axios";

const BASE_URL = "https://api.mercadolibre.com/";
const AUTHOR = {
  name: "Eduardo",
  lastname: "Gallegos",
};

type Item = {
  id: string;
  title: string;
  category_id: string;
  currency_id: string;
  price: number;
  thumbnail: string;
  condition: string;
  shipping: {
    free_shipping: boolean;
  };
  sold_quantity: number;
  descriptions: string[];
  address?: {
    state_id: string;
    state_name: string;
    city_id?: string;
    city_name: string;
  };
  pictures?: { id: string; url: string }[];
};

const formatItem = (item: Item) => {
  const amount = Math.trunc(item.price);

  return {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount,
      decimals: Number((item.price - amount).toFixed(2)),
    },
    picture: item.pictures ? item.pictures[0].url : item.thumbnail,
    condition: item.condition,
    free_shipping: item.shipping.free_shipping,
    state: item.address?.state_name,
  };
};

const formatItemDetails = (item: Item, description: string) => {
  return {
    ...formatItem(item),
    sold_quantity: item.sold_quantity,
    description,
  };
};

const getCategories = (
  availableFilters: {
    id: string;
    values: { id: string; name: string; results: number }[];
  }[]
): string[] => {
  const categoriesFilter = availableFilters.find(
    (availableFilter) => availableFilter.id === "category"
  );

  if (!categoriesFilter) {
    return [];
  }

  return categoriesFilter.values
    .sort((a, b) =>
      a.results > b.results ? -1 : a.results < b.results ? 1 : 0
    )
    .map((item) => item.name);
};

export const getItems = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${BASE_URL}sites/MLA/search`, {
      params: {
        q: req.query.q,
        limit: req.query.limit,
      },
    });

    return res.status(200).json({
      author: AUTHOR,
      categories: getCategories(response.data.available_filters),
      items: response.data.results.map(formatItem),
    });
  } catch (e) {
    console.log(e);
    if (isAxiosError(e)) {
      return res.status(e.status || 500).json({
        error: e.message,
      });
    }

    return res.status(500).json({
      error: e,
    });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const itemRequest = axios.get(`${BASE_URL}items/${req.params.id}`);
    const descriptionRequest = axios.get(
      `${BASE_URL}items/${req.params.id}/description`
    );
    const [item, description] = await Promise.all([
      itemRequest,
      descriptionRequest,
    ]);
    const category = await axios.get(
      `${BASE_URL}categories/${item.data.category_id}`
    );

    return res.status(200).json({
      author: AUTHOR,
      item: formatItemDetails(item.data, description.data.plain_text),
      categories: category.data.path_from_root,
    });
  } catch (e) {
    console.log(e);
    if (isAxiosError(e)) {
      return res.status(e.status || 500).json({
        error: e.message,
      });
    }
    return res.status(500).json({
      error: e,
    });
  }
};

module.exports = {
  getItems,
  getItem,
};

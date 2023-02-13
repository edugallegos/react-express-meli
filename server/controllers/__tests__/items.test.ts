import request from "supertest";
import app from "../../index";
import axios from "axios";
import {
  responseGetItemsApiMeli,
  expectedGetItemsResponse,
} from "../__mocks__/mockedGetItemsData";
import {
  expectedGetItemResponse,
  responseGetCategoryApiMeli,
  responseGetDescriptionApiMeli,
  responseGetItemApiMeli,
} from "../__mocks__/mockedGetItemData";

jest.mock("axios");

const mockedAxios = axios.get as unknown as jest.MockedFunction<
  typeof axios.get
>;

test("should fetch items when getItems is called", async () => {
  mockedAxios.mockResolvedValueOnce({ data: responseGetItemsApiMeli });
  let res = await request(app).get("/api/items?q=123");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(
    expect.objectContaining({
      items: expectedGetItemsResponse,
    })
  );
  expect(res.body).toHaveProperty("author");
  expect(res.body).toHaveProperty("categories");
  expect(res.body).toHaveProperty("items");
});

test("should fetch item when getItem is called", async () => {
  mockedAxios.mockResolvedValueOnce({ data: responseGetItemApiMeli });
  mockedAxios.mockResolvedValueOnce({ data: responseGetDescriptionApiMeli });
  mockedAxios.mockResolvedValueOnce({ data: responseGetCategoryApiMeli });

  let res = await request(app).get("/api/items/123");

  expect(res.statusCode).toEqual(200);
  expect(res.body).toEqual(expectedGetItemResponse);
});

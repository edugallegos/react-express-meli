import {Request, Response} from 'express';
import axios from "axios";

const BASE_URL = "https://api.mercadolibre.com/"
const AUTHOR = {
    name: "Eduardo",
    lastname: "Gallegos"
}

type Item = {
    id: string,
    title: string,
    category_id: string,
    currency_id: string,
    price: number,
    thumbnail: string,
    condition: string
    shipping: {
        free_shipping: boolean
    },
    sold_quantity: number,
    descriptions: string[]
}

const formatItem = (item: Item) => {
    return {
        id: item.id,
        title: item.title,
        price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: item.price
        },
        picture: item.thumbnail,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
    }
}

const formatItemDetails = (item: Item, description: string) => {
    return {
        ...formatItem(item),
        sold_quantity: item.sold_quantity,
        description
    }
}

const getCategoriesInItems = (items: Item[]): string[] => {
    return items.reduce((acc, value) => {
        if (acc.indexOf(value.category_id) === -1) {
            acc.push(value.category_id)
        }
        return acc
    }, [] as string[])
}


const getItems = async (req: Request, res: Response) => {
    try {
        const response = await axios(`${BASE_URL}sites/MLA/search?q=${req.query.q}`);

        return res.status(200).json({
            author: AUTHOR,
            categories: getCategoriesInItems(response.data.results),
            items: response.data.results.map(formatItem)
        })

    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
}

const getItem = async (req: Request, res: Response) => {
    try {
        const itemRequest = axios(`${BASE_URL}items/${req.params.id}`);
        const descriptionRequest = axios(`${BASE_URL}items/${req.params.id}/description`);

        const responses = await Promise.all([itemRequest, descriptionRequest])

        return res.status(200).json({
            author: AUTHOR,
            item: formatItemDetails(responses[0].data, responses[1].data.plain_text)
        })
    } catch (e) {
        return res.status(500).json({
            error: e
        })
    }
}

module.exports = {
    getItems,
    getItem
}

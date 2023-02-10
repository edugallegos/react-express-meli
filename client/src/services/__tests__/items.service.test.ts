import axios from 'axios'

import { getItem, getItems } from '../items.service'

jest.mock('axios')

const mockedAxios = axios.get as unknown as jest.MockedFunction<typeof axios.get>
const mockGetItemsResponse = {
  author: { name: 'Eduardo', lastname: 'Gallegos' },
  categories: [
    'Libros Físicos',
    'Repuestos Autos y Camionetas',
    'Ropa y Accesorios',
    'Hogar, Muebles y Jardín',
    'Repuestos Motos y Cuatriciclos',
    'Bebés',
    'Computación',
    'Juegos y Juguetes',
    'Deportes y Fitness',
    'Electrónica, Audio y Video',
    'Construcción',
    'Belleza y Cuidado Personal',
    'Instrumentos Musicales',
    'Herramientas',
    'Industrias y Oficinas',
    'Celulares y Teléfonos',
    'Arte, Librería y Mercería',
    'Accesorios de Auto y Camioneta',
    'Electrodomésticos y Aires Ac.',
    'Antigüedades y Colecciones',
    'Alimentos y Bebidas',
    'Animales y Mascotas',
    'Acc. para Motos y Cuatriciclos',
    'Agro',
    'Música, Películas y Series',
    'Joyas y Relojes',
    'Revistas',
    'Otros',
    'Cámaras y Accesorios',
    'Neumáticos',
    'Salud y Equipamiento Médico',
    'Souvenirs, Cotillón y Fiestas',
    'Consolas y Videojuegos',
    'Herramientas para Vehículos',
    'Repuestos de Línea Pesada',
    'Seguridad Vehicular',
    'Tuning',
    'Llantas y Accesorios',
    'Performance',
    'Limpieza de Vehículos',
    'Audio para Vehículos',
    'Repuestos Náuticos',
    'Servicios',
    'Otras categorías',
  ],
  items: [
    {
      id: 'MLA795995998',
      title:
        'Pila Cr123 Motoma 3v Blister X 4 Unids. - Zona San Martín Caseros - Larga Duracion Excelente Calidad Al Mejor Precio',
      price: { currency: 'ARS', amount: 2890, decimals: 0 },
      picture: 'http://http2.mlstatic.com/D_638335-MLA44343635614_122020-I.jpg',
      condition: 'new',
      free_shipping: false,
      state: 'Buenos Aires',
    },
    {
      id: 'MLA867657559',
      title: '6 X Pilas Litio Cr123a Energizer Lithium 3v Cr123 San Martin',
      price: { currency: 'ARS', amount: 8760, decimals: 0 },
      picture: 'http://http2.mlstatic.com/D_772215-MLA42625196744_072020-I.jpg',
      condition: 'new',
      free_shipping: true,
      state: 'Buenos Aires',
    },
    {
      id: 'MLA1193949437',
      title: 'Pila Litio Energizer 123 Bateria Photo Lithium Camaras Otros',
      price: { currency: 'ARS', amount: 1211, decimals: 0 },
      picture: 'http://http2.mlstatic.com/D_751845-MLA40069163089_122019-I.jpg',
      condition: 'new',
      free_shipping: false,
      state: 'Capital Federal',
    },
    {
      id: 'MLA897759708',
      title: 'Fondo 123 Primer Zinsser | Fondo Multiuso | 1lt',
      price: { currency: 'ARS', amount: 2720, decimals: 0 },
      picture: 'http://http2.mlstatic.com/D_707762-MLA44113753606_112020-I.jpg',
      condition: 'new',
      free_shipping: false,
      state: 'Capital Federal',
    },
  ],
}

const mockGetItemResponse = {
  author: { name: 'Eduardo', lastname: 'Gallegos' },
  item: {
    id: 'MLA795995998',
    title:
      'Pila Cr123 Motoma 3v Blister X 4 Unids. - Zona San Martín Caseros - Larga Duracion Excelente Calidad Al Mejor Precio',
    price: { currency: 'ARS', amount: 2890, decimals: 0 },
    picture: 'http://http2.mlstatic.com/D_638335-MLA44343635614_122020-O.jpg',
    condition: 'new',
    free_shipping: false,
    sold_quantity: 500,
    description:
      '4 (Cuatro) x Pilas CR123A de 3V Marca MOTOMA de 1600mAh.\n\nPresentación: Termocontraible cerrado 4 x unidades. (Ver foto de la publicación).\n\nCapacidad de 1600mAh "REALES" - EXCELENTE CALIDAD AL MEJOR PRECIO\n\nFecha de Fabricación: Abril del 2022.\n\nPilas CR123A para cámaras fotográficas, instrumentos, linternas, sensores, alarmas, juguetes, entre otros usos.\n\nEquivalencias: DL123A, CR17345, CR123A, K123LA, L123A, EL123AP, PL123, entre otros.\n-----------------------------------------------------------------------------------------------------------------------\n“Distribuidora XELLEX“ representantes oficiales de MOTOMA POWER CO., LTD. Importadores y Distribuidores de todas sus líneas de productos: Pilas Alcalinas, Pilas Carbón Zinc, Pilas Recargables, Pilas de litio, Pilas de Litio – Ion, pack de baterías y Baterías Industriales.\n-----------------------------------------------------------------------------------------------------------------------\n“Distribuidora XELLEX” representantes en Argentina de las siguientes empresas:\n\nTADIRAN: Líder mundial en el diseño, desarrollo, fabricación y comercialización de pilas y baterías de litio para aplicaciones industriales.\nMOTOMA: Pilas y baterías alcalinas, carbón zinc, recargables, litio, litio - ion, industriales, especiales y armado de packs.\nEFEST: Pilas Litio – Ion IMR (Alta Descarga de Corriente), Cargadores y Accesorios.\nWISDOM: Linternas frontales led antiexplosivas. Uso en minería, petróleo, gas, industria. Cargadores individuales, racks y accesorios.\nDAYSUN: Linternas de seguridad intrínseca que cumplen con las normas UL, ATEX, IECEx.\n\nAdemás, somos distribuidores de las siguientes marcas:\n\nKAISE: UPS Interactivas de 600/800VA, UPS On-Line de 1,2 y 3KVA. Baterías industriales de electrolito absorbido.\nENERGIZER / EVEREADY: Pilas Alcalinas, Carbón Zinc, Litio, Cargadores, Linternas, etc.\nRAYOVAC: Pilas Extra Advanced de Zinc Aire para audífonos.\nMURATA (Ex Sony): Pilas Botón de Litio para uso industrial, relojería, juguetes, etc.\nRENATA: Fabricante y proveedor líder de pilas tipo botón para relojes, audífonos y productos electrónicos.\nVINNIC: Pilas de botón primarias, pilas de botón de litio, Pilas Alcalinas de 12V.\nMAXELL: Micro baterías Líneas LR, SR, CR.\nVAPEX: Cargadores, pilas, baterías recargables y baterías de Electrolito absorbido.\n-----------------------------------------------------------------------------------------------------------------------\nTODOS LOS PRODUCTOS QUE VENDEMOS SON NUEVOS Y ORIGINALES\n-----------------------------------------------------------------------------------------------------------------------\nFACTURA:\nEmitimos A o B, según corresponda. Una vez recibida su compra, en un plazo de 48/72 horas hábiles, recibirá su factura en el detalle de su compra.\n-----------------------------------------------------------------------------------------------------------------------\nMEDIOS DE PAGO:\n- Mercado Pago.\n- Tarjeta de crédito.\n- Tarjeta de débito.\n- Efectivo en Puntos de pago: Pago Fácil, Rapipago y Provincia Net.\n-----------------------------------------------------------------------------------------------------------------------\nFORMAS DE ENVÍOS:\n- Mercado Envíos.\n- Mercado Envíos FLEX.\n- Mercado Envíos FULL\n- Correo, Micro, Transporte o Expreso abonando el cliente el costo del envío en destino.\n-----------------------------------------------------------------------------------------------------------------------\nSTOCK: Tenemos stock Permanente para despacho / entrega inmediata.\n-----------------------------------------------------------------------------------------------------------------------\nRETIRO EN EL DOMICILIO DEL VENDEDOR:\nPara las compras con “Retiro en el domicilio del vendedor”, al terminar el pago, recibirá nuestros datos y podrás retirar la compra con su DNI de lunes a viernes de 9 a 17hs y sábados de 10 a 13hs.\nNuestras referencias son:\n• Ubicación: Partido de Gral. San Martín (Villa Lynch) / Caseros - Pcia. De Bs. As.\n• Colectivos: • 328 •343 •252 •161.\n• Tren: Estación Tropezón, Línea Urquiza.',
  },
  categories: [
    { id: 'MLA1000', name: 'Electrónica, Audio y Video' },
    { id: 'MLA4641', name: 'Pilas y Cargadores' },
    { id: 'MLA6384', name: 'Pilas' },
  ],
}

describe('Items Services', () => {
  it('return items when getItems is called', async () => {
    mockedAxios.mockResolvedValueOnce({ data: mockGetItemsResponse })
    const response = await getItems('query')

    expect(response).toEqual(expect.objectContaining({ items: mockGetItemsResponse.items }))
  })

  it('return item when getItem is called', async () => {
    mockedAxios.mockResolvedValueOnce({ data: mockGetItemResponse })
    const response = await getItem('MLA123')

    expect(response).toEqual(expect.objectContaining({ item: mockGetItemResponse.item }))
  })
})

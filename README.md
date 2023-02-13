# React Express MeLi

## Consideraciones

- `React.lazy` no es necesario para la implementación actual, pero provee una buena escalabilidad
- `ESLint` y `Prettier` fueron añadidos al proyecto para mantener el código limpio y compartir estándares entre el equipo

### Testing

- Se agregaron pruebas 
  - Frontend - Integración `jest` | E2E `cypress` | Coverage > 90%
  - Backend -  Integración `jest` | Coverage > 80%

### SASS

- Usar `SASS` es un requerimiento por lo cual se aplicaron dos enfoques, puesto que usar uno u otro depende del caso de uso
  - Los estilos principales fueron agregados en el archivo global `App.scss`
  - Se usó `css modules` para el componente `ProductItem` para mostrar este enfoque


## Ejecutar

### Backend

En el terminal

Ir a la ruta `/server`

Ejecutar los siguientes comandos:

Instalar dependencias

`npm install`

Ejecutar el servidor

```
npm run build
npm start
```

#### Testing

`npm test`


### Frontend

En el terminal:

Ir a la ruta `/client`

Ejecutar los siguientes comandos:

Instalar dependencias

`yarn`

Ejecutar el servidor

`yarn start`

#### Testing

Pruebas de integración

`yarn test`

Pruebas e2e

`yarn cypress`

# Plan Mafer 🍎

Aplicación web estática y PWA para consultar un plan nutricional de 10 días, generar combinaciones de comidas y llevar un registro local de agua, glucosa y síntomas. La interfaz está disponible en español, inglés y noruego.

## Funciones

- Plan de 10 días con progreso y sustituciones de comidas.
- Generador de ideas para almuerzo y cena.
- Seguimiento diario de ocho vasos de agua.
- Diario de salud y gráfico de las últimas lecturas de glucosa.
- Importación de lecturas desde `export.xml` de Apple Health.
- Instalación como PWA y funcionamiento offline.
- Persistencia local en el navegador; la aplicación no envía los datos a un servidor.

## Ejecutar localmente

La aplicación necesita un servidor HTTP para que el service worker funcione. Desde la raíz del proyecto se puede usar cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

Después abre la URL local indicada por el servidor. Abrir `index.html` directamente permite ver la interfaz, pero no activa todas las funciones PWA.

## Pruebas

No hay dependencias de ejecución ni de pruebas. Con Node.js 20 o posterior:

```bash
npm test
```

Las pruebas validan la sintaxis del JavaScript, el manifiesto, el service worker y protecciones básicas de accesibilidad y almacenamiento.

## Datos y privacidad

El progreso, las sustituciones, el agua y el diario se guardan únicamente en `localStorage` del navegador. Borrar los datos del sitio elimina esa información. Los archivos XML de Apple Health se procesan en el dispositivo y no se suben a ningún servicio.

## Importar desde Apple Health

1. En la app Salud, exporta todos los datos.
2. Descomprime el ZIP generado por Apple.
3. En la sección **Salud**, selecciona el archivo `export.xml`.

El importador extrae registros de glucosa, convierte valores de mmol/L a mg/dL cuando corresponde y evita duplicados por fecha y valor.

> Esta aplicación organiza información personal y no sustituye el consejo de un profesional de salud.

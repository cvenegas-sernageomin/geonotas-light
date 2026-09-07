# PWA Geonotas Light — Captura simplificada

Variante simplificada de [PWA Geonotas](https://cvenegas-sernageomin.github.io/geonotas/) para
captura de **geología básica en terreno** (modelo CDC SERNAGEOMIN). Mismo modelo, misma base de
datos y mismos exports: **lo único que cambia es la capa de formulario**.

**En línea:** https://cvenegas-sernageomin.github.io/geonotas-light/

## Qué la hace distinta: el formulario A/B/C

`formularioLight()` reparte los campos de cada ficha en tres categorías, decididas por
`generar_guia.py` y emitidas a `guia_fields.js`:

- **A) Clasificación** → selects con cascada. Solo la cadena de cascadas, sus padres, las FK y la
  identidad del registro.
- **B) Medidas vitales** → `input=number`. Coordenadas, cota, actitudes, espesores, `_PCT`, tamaños,
  peso/volumen, fecha y hora.
- **C) Todo lo demás** → **un textarea guiado por ficha**, que se teclea o se dicta.

Llevado al extremo a pedido explícito (2026-08-30): **Litología** deja como widget solo
`TIPO_ROCA` → `NOMBRE_ROCA`, y **Afloramiento** solo `CLASE_AFLORAMIENTO` → `CARACTER_MESOSCOPICO`.
Todo lo demás (color, textura, mineralogía, alteración, granulometría, clastos…) va al campo libre,
que muestra una **ayuda-memoria dinámica según la clasificación elegida**. Sigue siendo el mismo dato
al guardar: el parser reconoce cualquier etiqueta escrita a mano (`Color fresco: gris`).
**Muestreo NO se simplifica**: replica la ficha completa.

## El parser de la guía (y el bug que define esta app)

`parsearGuia()` convierte el texto del recuadro en campos. Todo renglón con forma `Etiqueta: valor`
va a su campo; `;` dentro de un valor significa múltiple; un valor fuera del dominio **se conserva y
se avisa**, no se borra.

**Lo que no lleva etiqueta reconocible NO se descarta:** cae en el `CAMPO_LIBRE` que declara cada
panel (`DESCRIPCION_LITOLOGIA`, `NOTA_AFLORAMIENTO`, `NOTA`…). Esto existe porque el parser genérico
**descartaba en silencio** todo renglón que no fuera `Etiqueta: valor` — se descubrió recién al
dictar por voz, porque dictar produce prosa corrida. Era pérdida de datos callada, la peor clase: en
terreno no hay forma de notarla. Si un panel no declarara campo libre, la app **avisa en vez de
callar**.

## Uso local
Requiere servirse por HTTP (no abrir el `index.html` con doble clic, por el Service Worker):
```
python -m http.server 8000    # luego abrir http://localhost:8000
```

## Prueba de humo
Con el servidor levantado, abrir **http://localhost:8000/smoke.html**. Corre sola contra el
`index.html` real en un iframe. **22 pruebas**, centradas en lo que esta app tiene y la completa no:
el parser de la guía, el campo libre de cada panel, la categorización A/B/C, el render de
`formularioLight()` y su `getData()`, y la sincronía de `guia_fields.js` con el modelo — más el
ciclo capturar → respaldar → borrar → restaurar y los exports CSV/KMZ.

**No toca tus datos:** todo lo que crea lleva el prefijo `smoke-` (los ids reales que genera `uid()`
empiezan con `x`), solo borra lo suyo, y la última prueba verifica que la cantidad de registros
ajenos no cambió.

Tres cosas a tener presentes al tocarla:
- La app declara casi todo con `const`/`let` de nivel superior, que **no** son propiedades de
  `window`: desde el iframe padre solo se ven las **declaraciones de función** y las `var`. Por eso
  `guia_fields.js` declara `var GUIA_FIELDS`, y por eso `CAMPO_LIBRE` (que es `const`) **no se puede
  leer** desde la prueba: se verifica **por comportamiento**, parseando prosa y viendo dónde cae.
  Eso además prueba lo que el usuario sufre, no lo que el código declara.
- La versión se lee del archivo con un regex **anclado a la declaración** (`^const CACHE=`). Un
  regex suelto tomaba la primera aparición del patrón, así que un comentario que mencionara
  `CACHE = '…'` eclipsaba a la constante real y la prueba leía un valor falso.
- La prueba de versión afirma el **invariante** (`cache.endsWith('-' + appVer)`), no un prefijo de
  marca: comparar contra un nombre fijo la hizo fallar al renombrar la app, sin defecto real.

### Sobre el retirado `probar_parser.py`
Hubo una batería previa del parser en Python + Playwright. Se **retiró el 2026-08-31** (queda en el
historial de git) y **toda su cobertura útil está portada aquí**. Se fue por dos razones:

1. **Nunca se corría**, porque dependía de un venv externo (`.notebooklm-venv`) de un proyecto que ya
   no se usa. Por eso se pudrió sin que nadie lo notara: llegó a fallar 4 de 13 afirmando el diseño
   anterior al 2026-08-30 —esperaba `TEXTURA` en A y `CLASTOS_TAM_MAX_CM` en B, cuando
   `LITOLOGIA_WIDGET` los mandó al campo libre a propósito—. Un test que afirma un diseño abandonado
   es peor que ninguno: invita a "arreglar" el código hacia atrás.
2. **Su propia razón de ser ya la cumple `smoke.html`**: probar el JS real en un navegador real. Sin
   Playwright, sin venv, con el mismo `http.server` que ya hace falta.

Al portarlo se corrigió su error de fondo: contaba sólo `input[type=number]`, cuando las medidas (B)
incluyen `FECHA` y `HORA`, que salen como `date`/`time`. La prueba nueva compara, store por store,
las medidas declaradas en la guía contra las realmente renderizadas.

## Estructura
- `index.html` — app monolítica; `build_pwa.py` le reinyecta el modelo canónico.
- `guia_fields.js` — **generado** por `generar_guia.py`. Editarlo a mano significa perder los
  cambios: los cambios van en el GENERADOR.
- `build_pwa.py` — reinyecta el modelo **y llama a `generar_guia.py`**, para que la guía no pueda
  quedar desfasada del modelo embebido. Nunca traduce saltos de línea y valida el JSON antes de
  escribir.
- `manifest.json`, `sw.js`, `icons/` — PWA instalable/offline.
- `vendor/` — librerías locales (Leaflet, leaflet.offline, idb, georaster, sql.js, gdal3.js) y
  `vendor/voz/` para el **dictado offline** (Whisper vía Transformers.js).
- `plantilla_guia_*.txt` — plantillas de referencia de la guía de campo.
- `smoke.html` — prueba de humo (ver arriba); no forma parte de la app ni del `sw.js`. Es la **única**
  batería de pruebas de esta app: si hace falta cubrir algo nuevo, va acá, no en un arnés aparte.

Datos capturados quedan en el dispositivo (IndexedDB); el mapa satelital requiere internet la
primera vez (luego los tiles descargados quedan disponibles offline).

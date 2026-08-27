# -*- coding: utf-8 -*-
"""
Generador de la guia de campos de la PWA 'captura-terreno-light' (Track A).

Replica en Python las reglas deterministas que el index.html de la PWA detallada
usa para decidir el widget de cada campo (tipoWidget), la etiqueta visible
(etiquetaCampo) y los campos ocultos (hideField). Con ellas categoriza cada
campo en A (clasificacion: selects/cascada/chips), B (medidas vitales: numero/
fecha/hora) o C (descripcion: texto) y emite `guia_fields.js`, que la PWA light
lee en runtime para construir el formulario A/B/C.

No parsea CONDICIONALES (es JS en index.html): las reglas condicionales se
aplican en runtime en la PWA light; aqui solo se parte del modelo canonico.

Uso:  python generar_guia.py
Salida: guia_fields.js  (junto a este script)
"""
import json, os, re

HERE = os.path.dirname(__file__)
MODELO = os.path.join(HERE, "..", "modelo", "modelo_canonico.json")
OUT = os.path.join(HERE, "guia_fields.js")

# ---------------------------------------------------------------------------
# Mapeo store -> tabla (copiado de index.html: STORE2TBL / STORE_ESQUEMA / linea/nota)
# ---------------------------------------------------------------------------
STORE2TBL = {
    'proyecto': 'TBL_PROYECTO', 'punto': 'PUNTO_CONTROL', 'litologia': 'TBL_LITOLOGIA',
    'estructural': 'TBL_DATOS_ESTRUCTURALES', 'contacto': 'TBL_CONTACTO',
    'muestreo': 'TBL_MUESTREO', 'foto': 'TBL_FOTOGRAFIAS', 'esquema': 'TBL_ESQUEMA_DIBUJO',
    'geomorf': 'TBL_GEOMORFOLOGIA', 'aflora': 'TBL_AFLORAMIENTO',
    'punto_gabinete': 'PUNTO_CONTROL_GABINETE', 'linea_gabinete': 'LINEA_CONTROL_GABINETE',
}
STORE_ESQUEMA = {'punto_gabinete': 'punto', 'linea_gabinete': 'linea'}
LINEA_TBL = 'LINEA_CONTROL'
NOTA_TBL = 'NOTA_CAMPO'
# Stores que tienen ficha de captura (en orden de la app): STORE2TBL + linea + nota.
STORES_FORMA = list(STORE2TBL.keys()) + ['linea', 'nota']

# Claves de negocio que el usuario SÍ nombra (visibles/editables); el resto de ids se ocultan.
NOMBRABLES = {'ID_PROYECTO', 'ID_PUNTO_CONTROL', 'ID_MUESTRA'}

NUM_RE = re.compile(r'COTA|AZIMUT|MANTEO|BUZAMIENTO|PESO|VOLUMEN|RUMBO|ORIENTACION|TREND|PLUNGE|ESPESOR|_PCT$|_CM$|_MM$')
TXT_RE = re.compile(r'DESCRIPCION|OBSERVACION|COMENTARIO|RELACION_LITOLOGIA|DISTRIBUCION|TEXTO|PROSA')


def tabla_de(store):
    s = STORE_ESQUEMA.get(store, store)
    if s == 'linea':
        return LINEA_TBL
    if s == 'nota':
        return NOTA_TBL
    return STORE2TBL[s]


def etiqueta_campo(n):
    s = n
    s = re.sub(r'_PCT$', ' %', s)
    s = re.sub(r'_(MM|CM)$', lambda m: ' (' + m.group(1).lower() + ')', s)
    s = re.sub(r'_(M)$', ' (m)', s)
    s = re.sub(r'_TAM_MAX\b', ' tamaño máx.', s)
    s = s.replace('_', ' ')
    return s


def tipo_widget(campo):
    n = campo.get('nombre')
    # Campos FK / especiales que la ficha renderiza como select o chips reales aunque no
    # tengan 'dominio' en el modelo (ver formulario() en index.html): ID_LITOLOGIA (select de
    # litologias del punto, en estructural/foto) y PUNTOS_APOYO (multi-seleccion de puntos, en punto).
    # Sin este override quedarian como 'text' (cat C) y se perderia el widget FK.
    if n in ('ID_LITOLOGIA', 'PUNTOS_APOYO'):
        return 'select'
    if campo.get('dominio'):
        return 'select'
    if re.match(r'^(LAT|LONG)', n) or re.search(r'Lat$|Long$', n):
        return 'number'
    if NUM_RE.search(n):
        return 'number'
    if n == 'FECHA':
        return 'date'
    if n == 'HORA':
        return 'time'
    if TXT_RE.search(n):
        return 'textarea'
    return 'text'


def categoria(widget):
    if widget == 'select':
        return 'A'
    if widget in ('number', 'date', 'time'):
        return 'B'
    return 'C'


def hide_field(store, n, pk):
    if store not in ('proyecto', 'punto') and n in ('ID_PUNTO_CONTROL', 'ID_PROYECTO'):
        return True
    if store == 'punto' and n == 'ID_PROYECTO':
        return True
    if n == pk and n not in NOMBRABLES:
        return True
    if n == 'ID_LITOLOGIA':
        return store == 'litologia'
    if n in ('ID_ESTRUCTURA', 'ID_CONTACTO', 'ID_FOTOGRAFIA', 'ID_ESQUEMA'):
        return True
    return False


def main():
    with open(MODELO, encoding="utf-8") as fh:
        modelo = json.load(fh)
    tablas = modelo.get('tablas', {})

    guia = {}
    for store in STORES_FORMA:
        t = tabla_de(store)
        tinfo = tablas.get(t, {})
        pk = tinfo.get('pk')
        fields = []
        for campo in tinfo.get('campos', []):
            n = campo.get('nombre')
            if hide_field(store, n, pk):
                continue
            w = tipo_widget(campo)
            fields.append({
                'campo': n,
                'etiqueta': etiqueta_campo(n),
                'cat': categoria(w),
            })
        # Panel Litología: NOMBRE_ROCA se muestra al final (mismo criterio que el index.html).
        if store == 'litologia':
            idx = next((i for i, f in enumerate(fields) if f['campo'] == 'NOMBRE_ROCA'), None)
            if idx is not None:
                fields.append(fields.pop(idx))
        guia[store] = fields

    # Verificacion de consistencia: ninguna tabla del modelo sin mapear en STORE2TBL.
    for t in tablas:
        if t in ('PUNTO_CONTROL_GABINETE', 'LINEA_CONTROL_GABINETE'):
            continue
        if t not in STORE2TBL.values() and t not in (LINEA_TBL, NOTA_TBL):
            print("AVISO: tabla '%s' no mapeada a ningun store de la ficha." % t)

    js = ("// Uso: GUIA_FIELDS[store] = [{campo, etiqueta, cat}, ...]\n"
          "// Generado por generar_guia.py — editar a mano significa perder los cambios.\n"
          "// cat: A=clasificacion (select/cascada/chips) · B=medidas vitales (num/fecha/hora) · C=descripcion (texto).\n"
          "// var (no const): asi queda en window y smoke.html puede leerlo desde el iframe.\n"
          "var GUIA_FIELDS = " + json.dumps(guia, ensure_ascii=False, indent=1) + ";\n")
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write(js)
    total = sum(len(v) for v in guia.values())
    print("OK: guia_fields.js generado (%d stores, %d campos totales)." % (len(guia), total))


if __name__ == "__main__":
    main()

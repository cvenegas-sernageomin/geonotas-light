// Uso: GUIA_FIELDS[store] = [{campo, etiqueta, cat}, ...]
// Generado por generar_guia.py — editar a mano significa perder los cambios.
// cat: A=clasificacion (select/cascada/chips) · B=medidas vitales (num/fecha/hora) · C=descripcion (texto).
// var (no const): asi queda en window y smoke.html puede leerlo desde el iframe.
var GUIA_FIELDS = {
 "proyecto": [
  {
   "campo": "ID_PROYECTO",
   "etiqueta": "ID PROYECTO",
   "cat": "A"
  },
  {
   "campo": "NOMBRE_PROYECTO",
   "etiqueta": "NOMBRE PROYECTO",
   "cat": "A"
  },
  {
   "campo": "JEFE_PROYECTO",
   "etiqueta": "JEFE PROYECTO",
   "cat": "C"
  },
  {
   "campo": "FECHA",
   "etiqueta": "FECHA",
   "cat": "B"
  },
  {
   "campo": "ESCALA_TRABAJO",
   "etiqueta": "ESCALA TRABAJO",
   "cat": "A"
  }
 ],
 "punto": [
  {
   "campo": "ID_PUNTO_CONTROL",
   "etiqueta": "ID PUNTO CONTROL",
   "cat": "A"
  },
  {
   "campo": "GEOLOGO",
   "etiqueta": "GEOLOGO",
   "cat": "A"
  },
  {
   "campo": "Coordenadas Geográficas Decimales_Lat",
   "etiqueta": "Coordenadas Geográficas Decimales Lat",
   "cat": "B"
  },
  {
   "campo": "Coordenadas Geográficas Decimales_Long",
   "etiqueta": "Coordenadas Geográficas Decimales Long",
   "cat": "B"
  },
  {
   "campo": "COTA",
   "etiqueta": "COTA",
   "cat": "B"
  },
  {
   "campo": "PROYECCION",
   "etiqueta": "PROYECCION",
   "cat": "A"
  },
  {
   "campo": "FUENTE_COORDENADAS",
   "etiqueta": "FUENTE COORDENADAS",
   "cat": "A"
  },
  {
   "campo": "PRECISION_GPS",
   "etiqueta": "PRECISION GPS",
   "cat": "A"
  },
  {
   "campo": "METODO_UBICACION",
   "etiqueta": "METODO UBICACION",
   "cat": "A"
  },
  {
   "campo": "NOMBRE_LOCALIDAD",
   "etiqueta": "NOMBRE LOCALIDAD",
   "cat": "A"
  },
  {
   "campo": "CONTEXTO_GEOMORFOLOGICO",
   "etiqueta": "CONTEXTO GEOMORFOLOGICO",
   "cat": "A"
  },
  {
   "campo": "FECHA",
   "etiqueta": "FECHA",
   "cat": "B"
  },
  {
   "campo": "HORA",
   "etiqueta": "HORA",
   "cat": "B"
  },
  {
   "campo": "NOTA",
   "etiqueta": "NOTA",
   "cat": "C"
  },
  {
   "campo": "PROSA_CAMPO",
   "etiqueta": "PROSA CAMPO",
   "cat": "C"
  }
 ],
 "litologia": [
  {
   "campo": "TIPO_ROCA",
   "etiqueta": "TIPO ROCA",
   "cat": "A"
  },
  {
   "campo": "TIPO_VOLCANICA",
   "etiqueta": "TIPO VOLCANICA",
   "cat": "C"
  },
  {
   "campo": "TIPO_DEPOSITO",
   "etiqueta": "TIPO DEPOSITO",
   "cat": "C"
  },
  {
   "campo": "COLOR_FRESCO",
   "etiqueta": "COLOR FRESCO",
   "cat": "C"
  },
  {
   "campo": "COLOR_METEORIZADO",
   "etiqueta": "COLOR METEORIZADO",
   "cat": "C"
  },
  {
   "campo": "GRANULOMETRIA",
   "etiqueta": "GRANULOMETRIA",
   "cat": "C"
  },
  {
   "campo": "TEXTURA",
   "etiqueta": "TEXTURA",
   "cat": "C"
  },
  {
   "campo": "ESTRUCTURA_TIPO_ROCA",
   "etiqueta": "ESTRUCTURA TIPO ROCA",
   "cat": "C"
  },
  {
   "campo": "DESCRIPCION_LITOLOGIA",
   "etiqueta": "DESCRIPCION LITOLOGIA",
   "cat": "C"
  },
  {
   "campo": "GRADO_CONFIANZA_LITO",
   "etiqueta": "GRADO CONFIANZA LITO",
   "cat": "C"
  },
  {
   "campo": "TIPO_ALTERACION_LITO",
   "etiqueta": "TIPO ALTERACION LITO",
   "cat": "C"
  },
  {
   "campo": "INTENSIDAD_ALTERACION",
   "etiqueta": "INTENSIDAD ALTERACION",
   "cat": "C"
  },
  {
   "campo": "DISTRIBUCION_ALTERACION",
   "etiqueta": "DISTRIBUCION ALTERACION",
   "cat": "C"
  },
  {
   "campo": "RELACION_LITOLOGIA_ESTRUCTURA",
   "etiqueta": "RELACION LITOLOGIA ESTRUCTURA",
   "cat": "C"
  },
  {
   "campo": "OBSERVACION",
   "etiqueta": "OBSERVACION",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_GEOLOGICA",
   "etiqueta": "UNIDAD GEOLOGICA",
   "cat": "C"
  },
  {
   "campo": "SELECCION",
   "etiqueta": "SELECCION",
   "cat": "C"
  },
  {
   "campo": "REDONDEAMIENTO",
   "etiqueta": "REDONDEAMIENTO",
   "cat": "C"
  },
  {
   "campo": "ESFERICIDAD",
   "etiqueta": "ESFERICIDAD",
   "cat": "C"
  },
  {
   "campo": "CLASTOS_TAM_MAX_CM",
   "etiqueta": "CLASTOS tamaño máx. (cm)",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_CLASTICA",
   "etiqueta": "COMPOSICION CLASTICA",
   "cat": "C"
  },
  {
   "campo": "LITOLOGIA_CLASTOS",
   "etiqueta": "LITOLOGIA CLASTOS",
   "cat": "C"
  },
  {
   "campo": "LITOLOGIA_CLASTOS_DETALLE",
   "etiqueta": "LITOLOGIA CLASTOS DETALLE",
   "cat": "C"
  },
  {
   "campo": "FABRICA_CLASTOS",
   "etiqueta": "FABRICA CLASTOS",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_CLASTICA_MATRIZ",
   "etiqueta": "COMPOSICION CLASTICA MATRIZ",
   "cat": "C"
  },
  {
   "campo": "CEMENTO",
   "etiqueta": "CEMENTO",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_MINERAL_PRINCIPAL",
   "etiqueta": "COMPOSICION MINERAL PRINCIPAL",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_MINERAL_DETALLE",
   "etiqueta": "COMPOSICION MINERAL DETALLE",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_MINERAL_INTRUSIVA",
   "etiqueta": "COMPOSICION MINERAL INTRUSIVA",
   "cat": "C"
  },
  {
   "campo": "COMPOSICION_MINERAL_INTRUSIVA_DETALLE",
   "etiqueta": "COMPOSICION MINERAL INTRUSIVA DETALLE",
   "cat": "C"
  },
  {
   "campo": "FENOCRISTALES_ESPECIE",
   "etiqueta": "FENOCRISTALES ESPECIE",
   "cat": "C"
  },
  {
   "campo": "FENOCRISTALES_DETALLE",
   "etiqueta": "FENOCRISTALES DETALLE",
   "cat": "C"
  },
  {
   "campo": "MASA_FUNDAMENTAL",
   "etiqueta": "MASA FUNDAMENTAL",
   "cat": "C"
  },
  {
   "campo": "TEXTURA_DUNHAM",
   "etiqueta": "TEXTURA DUNHAM",
   "cat": "C"
  },
  {
   "campo": "SOLDADURA",
   "etiqueta": "SOLDADURA",
   "cat": "C"
  },
  {
   "campo": "GRADO_CONSOLIDACION",
   "etiqueta": "GRADO CONSOLIDACION",
   "cat": "C"
  },
  {
   "campo": "CRISTALES_ESPECIE",
   "etiqueta": "CRISTALES ESPECIE",
   "cat": "C"
  },
  {
   "campo": "CRISTALES_DETALLE",
   "etiqueta": "CRISTALES DETALLE",
   "cat": "C"
  },
  {
   "campo": "LITICOS_PCT",
   "etiqueta": "LITICOS %",
   "cat": "C"
  },
  {
   "campo": "TIPO_LITICOS",
   "etiqueta": "TIPO LITICOS",
   "cat": "C"
  },
  {
   "campo": "TIPO_LITICOS_DETALLE",
   "etiqueta": "TIPO LITICOS DETALLE",
   "cat": "C"
  },
  {
   "campo": "POMEZ_PCT",
   "etiqueta": "POMEZ %",
   "cat": "C"
  },
  {
   "campo": "CRISTALES_PCT",
   "etiqueta": "CRISTALES %",
   "cat": "C"
  },
  {
   "campo": "MATRIZ_COMPOSICION",
   "etiqueta": "MATRIZ COMPOSICION",
   "cat": "C"
  },
  {
   "campo": "TIPO_FRAGMENTO_VITREO",
   "etiqueta": "TIPO FRAGMENTO VITREO",
   "cat": "C"
  },
  {
   "campo": "TIPO_FRAGMENTO_VITREO_DETALLE",
   "etiqueta": "TIPO FRAGMENTO VITREO DETALLE",
   "cat": "C"
  },
  {
   "campo": "MATRIZ_DETALLE",
   "etiqueta": "MATRIZ DETALLE",
   "cat": "C"
  },
  {
   "campo": "MATRIZ_PCT",
   "etiqueta": "MATRIZ %",
   "cat": "C"
  },
  {
   "campo": "CRISTALINIDAD",
   "etiqueta": "CRISTALINIDAD",
   "cat": "C"
  },
  {
   "campo": "NOMBRE_ROCA",
   "etiqueta": "NOMBRE ROCA",
   "cat": "A"
  }
 ],
 "estructural": [
  {
   "campo": "ID_LITOLOGIA",
   "etiqueta": "ID LITOLOGIA",
   "cat": "A"
  },
  {
   "campo": "TIPO_ESTRUCTURA",
   "etiqueta": "TIPO ESTRUCTURA",
   "cat": "A"
  },
  {
   "campo": "TIPO_FALLA",
   "etiqueta": "TIPO FALLA",
   "cat": "C"
  },
  {
   "campo": "AZIMUT",
   "etiqueta": "AZIMUT",
   "cat": "B"
  },
  {
   "campo": "MANTEO_BUZAMIENTO",
   "etiqueta": "MANTEO BUZAMIENTO",
   "cat": "B"
  },
  {
   "campo": "TREND",
   "etiqueta": "TREND",
   "cat": "B"
  },
  {
   "campo": "PLUNGE",
   "etiqueta": "PLUNGE",
   "cat": "B"
  },
  {
   "campo": "TIPO_MEDIDA_ESTRUCTURAL",
   "etiqueta": "TIPO MEDIDA ESTRUCTURAL",
   "cat": "A"
  },
  {
   "campo": "GRADO_CONFIANZA_ESTRUCTURA",
   "etiqueta": "GRADO CONFIANZA ESTRUCTURA",
   "cat": "C"
  },
  {
   "campo": "DESCRIPCION_ESTRUCTURA",
   "etiqueta": "DESCRIPCION ESTRUCTURA",
   "cat": "C"
  }
 ],
 "contacto": [
  {
   "campo": "TIPO_CONTACTO",
   "etiqueta": "TIPO CONTACTO",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_TECHO",
   "etiqueta": "UNIDAD TECHO",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_BASE",
   "etiqueta": "UNIDAD BASE",
   "cat": "C"
  },
  {
   "campo": "GRADO_CONFIANZA_CONTACTO",
   "etiqueta": "GRADO CONFIANZA CONTACTO",
   "cat": "C"
  },
  {
   "campo": "EXPOSICION_CONTACTO",
   "etiqueta": "EXPOSICION CONTACTO",
   "cat": "C"
  },
  {
   "campo": "RUMBO_CONTACTO",
   "etiqueta": "RUMBO CONTACTO",
   "cat": "C"
  },
  {
   "campo": "MANTEO_CONTACTO",
   "etiqueta": "MANTEO CONTACTO",
   "cat": "C"
  },
  {
   "campo": "DESCRIPCION_CONTACTO",
   "etiqueta": "DESCRIPCION CONTACTO",
   "cat": "C"
  }
 ],
 "muestreo": [
  {
   "campo": "ID_MUESTRA",
   "etiqueta": "ID MUESTRA",
   "cat": "A"
  },
  {
   "campo": "ID_LITOLOGIA",
   "etiqueta": "ID LITOLOGIA",
   "cat": "A"
  },
  {
   "campo": "TIPO_MUESTRA",
   "etiqueta": "TIPO MUESTRA",
   "cat": "A"
  },
  {
   "campo": "DESCRIPCION_MUESTRA",
   "etiqueta": "DESCRIPCION MUESTRA",
   "cat": "A"
  },
  {
   "campo": "PROPOSITO_ANALISIS",
   "etiqueta": "PROPOSITO ANALISIS",
   "cat": "A"
  },
  {
   "campo": "PESO",
   "etiqueta": "PESO",
   "cat": "B"
  },
  {
   "campo": "VOLUMEN",
   "etiqueta": "VOLUMEN",
   "cat": "B"
  },
  {
   "campo": "ORIENTACION_MUESTRA",
   "etiqueta": "ORIENTACION MUESTRA",
   "cat": "B"
  }
 ],
 "foto": [
  {
   "campo": "ORIENTACION_FOTO",
   "etiqueta": "ORIENTACION FOTO",
   "cat": "C"
  },
  {
   "campo": "ID_LITOLOGIA",
   "etiqueta": "ID LITOLOGIA",
   "cat": "A"
  },
  {
   "campo": "COMENTARIO_FOTO",
   "etiqueta": "COMENTARIO FOTO",
   "cat": "C"
  }
 ],
 "esquema": [
  {
   "campo": "ID_FOTOGRAFIA_ASOCIADA",
   "etiqueta": "ID FOTOGRAFIA ASOCIADA",
   "cat": "C"
  },
  {
   "campo": "OBSERVACION",
   "etiqueta": "OBSERVACION",
   "cat": "C"
  }
 ],
 "geomorf": [
  {
   "campo": "CATEGORIA_GEOMORF",
   "etiqueta": "CATEGORIA GEOMORF",
   "cat": "A"
  },
  {
   "campo": "GEOFORMA",
   "etiqueta": "GEOFORMA",
   "cat": "A"
  },
  {
   "campo": "AZIMUT",
   "etiqueta": "AZIMUT",
   "cat": "B"
  },
  {
   "campo": "DESCRIPCION_GEOMORFOLOGIA",
   "etiqueta": "DESCRIPCION GEOMORFOLOGIA",
   "cat": "C"
  }
 ],
 "aflora": [
  {
   "campo": "GRADO_EXPOSICION_AFLORAMIENTO",
   "etiqueta": "GRADO EXPOSICION AFLORAMIENTO",
   "cat": "C"
  },
  {
   "campo": "CLASE_AFLORAMIENTO",
   "etiqueta": "CLASE AFLORAMIENTO",
   "cat": "A"
  },
  {
   "campo": "CARACTER_MESOSCOPICO",
   "etiqueta": "CARACTER MESOSCOPICO",
   "cat": "A"
  },
  {
   "campo": "TIPO_AFLORAMIENTO",
   "etiqueta": "TIPO AFLORAMIENTO",
   "cat": "A"
  },
  {
   "campo": "SUBTIPO_AFLORAMIENTO",
   "etiqueta": "SUBTIPO AFLORAMIENTO",
   "cat": "A"
  },
  {
   "campo": "ARREGLO_ESTRATOS",
   "etiqueta": "ARREGLO ESTRATOS",
   "cat": "C"
  },
  {
   "campo": "GRADACION_INTERNA",
   "etiqueta": "GRADACION INTERNA",
   "cat": "C"
  },
  {
   "campo": "ESPESOR_MIN_CM",
   "etiqueta": "ESPESOR MIN (cm)",
   "cat": "C"
  },
  {
   "campo": "ESPESOR_MAX_CM",
   "etiqueta": "ESPESOR MAX (cm)",
   "cat": "C"
  },
  {
   "campo": "ESPESOR_DEPOSITO_MIN_M",
   "etiqueta": "ESPESOR DEPOSITO MIN (m)",
   "cat": "C"
  },
  {
   "campo": "ESPESOR_DEPOSITO_MAX_M",
   "etiqueta": "ESPESOR DEPOSITO MAX (m)",
   "cat": "C"
  },
  {
   "campo": "GEOMETRIA_CUERPO",
   "etiqueta": "GEOMETRIA CUERPO",
   "cat": "C"
  },
  {
   "campo": "EXTENSION_LATERAL",
   "etiqueta": "EXTENSION LATERAL",
   "cat": "C"
  },
  {
   "campo": "TIPO_LIMITE_INFERIOR",
   "etiqueta": "TIPO LIMITE INFERIOR",
   "cat": "C"
  },
  {
   "campo": "GRADO_METEORIZACION",
   "etiqueta": "GRADO METEORIZACION",
   "cat": "C"
  },
  {
   "campo": "GRADO_FRACTURAMIENTO",
   "etiqueta": "GRADO FRACTURAMIENTO",
   "cat": "C"
  },
  {
   "campo": "FABRICA_GRAVOSA",
   "etiqueta": "FABRICA GRAVOSA",
   "cat": "C"
  },
  {
   "campo": "NOTA_AFLORAMIENTO",
   "etiqueta": "NOTA AFLORAMIENTO",
   "cat": "C"
  }
 ],
 "punto_gabinete": [
  {
   "campo": "GEOLOGO",
   "etiqueta": "GEOLOGO",
   "cat": "A"
  },
  {
   "campo": "Coordenadas Geográficas Decimales_Lat",
   "etiqueta": "Coordenadas Geográficas Decimales Lat",
   "cat": "B"
  },
  {
   "campo": "Coordenadas Geográficas Decimales_Long",
   "etiqueta": "Coordenadas Geográficas Decimales Long",
   "cat": "B"
  },
  {
   "campo": "COTA",
   "etiqueta": "COTA",
   "cat": "B"
  },
  {
   "campo": "PROYECCION",
   "etiqueta": "PROYECCION",
   "cat": "A"
  },
  {
   "campo": "FUENTE_COORDENADAS",
   "etiqueta": "FUENTE COORDENADAS",
   "cat": "A"
  },
  {
   "campo": "PRECISION_GPS",
   "etiqueta": "PRECISION GPS",
   "cat": "A"
  },
  {
   "campo": "METODO_UBICACION",
   "etiqueta": "METODO UBICACION",
   "cat": "A"
  },
  {
   "campo": "NOMBRE_LOCALIDAD",
   "etiqueta": "NOMBRE LOCALIDAD",
   "cat": "A"
  },
  {
   "campo": "CONTEXTO_GEOMORFOLOGICO",
   "etiqueta": "CONTEXTO GEOMORFOLOGICO",
   "cat": "A"
  },
  {
   "campo": "FECHA",
   "etiqueta": "FECHA",
   "cat": "B"
  },
  {
   "campo": "HORA",
   "etiqueta": "HORA",
   "cat": "B"
  },
  {
   "campo": "NOTA",
   "etiqueta": "NOTA",
   "cat": "C"
  },
  {
   "campo": "PROSA_CAMPO",
   "etiqueta": "PROSA CAMPO",
   "cat": "C"
  }
 ],
 "linea_gabinete": [
  {
   "campo": "CLASE_LINEA",
   "etiqueta": "CLASE LINEA",
   "cat": "A"
  },
  {
   "campo": "TIPO_LINEA",
   "etiqueta": "TIPO LINEA",
   "cat": "A"
  },
  {
   "campo": "SUBTIPO_LINEA",
   "etiqueta": "SUBTIPO LINEA",
   "cat": "A"
  },
  {
   "campo": "CERTEZA_LINEA",
   "etiqueta": "CERTEZA LINEA",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_TECHO_LINEA",
   "etiqueta": "UNIDAD TECHO LINEA",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_BASE_LINEA",
   "etiqueta": "UNIDAD BASE LINEA",
   "cat": "C"
  },
  {
   "campo": "PUNTOS_APOYO",
   "etiqueta": "PUNTOS APOYO",
   "cat": "A"
  },
  {
   "campo": "NOTA",
   "etiqueta": "NOTA",
   "cat": "C"
  }
 ],
 "linea": [
  {
   "campo": "CLASE_LINEA",
   "etiqueta": "CLASE LINEA",
   "cat": "A"
  },
  {
   "campo": "TIPO_LINEA",
   "etiqueta": "TIPO LINEA",
   "cat": "A"
  },
  {
   "campo": "SUBTIPO_LINEA",
   "etiqueta": "SUBTIPO LINEA",
   "cat": "A"
  },
  {
   "campo": "CERTEZA_LINEA",
   "etiqueta": "CERTEZA LINEA",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_TECHO_LINEA",
   "etiqueta": "UNIDAD TECHO LINEA",
   "cat": "C"
  },
  {
   "campo": "UNIDAD_BASE_LINEA",
   "etiqueta": "UNIDAD BASE LINEA",
   "cat": "C"
  },
  {
   "campo": "PUNTOS_APOYO",
   "etiqueta": "PUNTOS APOYO",
   "cat": "A"
  },
  {
   "campo": "NOTA",
   "etiqueta": "NOTA",
   "cat": "C"
  }
 ],
 "nota": [
  {
   "campo": "CATEGORIA_NOTA",
   "etiqueta": "CATEGORIA NOTA",
   "cat": "C"
  },
  {
   "campo": "TEXTO",
   "etiqueta": "TEXTO",
   "cat": "C"
  },
  {
   "campo": "GEOLOGO",
   "etiqueta": "GEOLOGO",
   "cat": "A"
  },
  {
   "campo": "LATITUD",
   "etiqueta": "LATITUD",
   "cat": "C"
  },
  {
   "campo": "LONGITUD",
   "etiqueta": "LONGITUD",
   "cat": "C"
  },
  {
   "campo": "FECHA",
   "etiqueta": "FECHA",
   "cat": "B"
  },
  {
   "campo": "HORA",
   "etiqueta": "HORA",
   "cat": "B"
  }
 ]
};

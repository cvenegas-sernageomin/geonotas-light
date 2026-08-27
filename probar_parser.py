# -*- coding: utf-8 -*-
"""
Batería del parser de la guia de la PWA 'captura-terreno-light'.

Prueba el JS REAL (parsearGuia/construirGuia/GUIA_FIELDS) cargando la PWA en Chromium
vía Playwright, no una reimplementación. Verifica:
  1) GUIA_FIELDS existe y categoriza litologia (A/B/C, NOMBRE_ROCA al final).
  2) parsearGuia: campo→valor, ';' = múltiple, etiqueta desconocida se ignora,
     números NO se adivinan (nunca pueblan un campo B).
  3) construirGuia produce la guía.

Requiere: venv `.notebooklm-venv` con playwright. Sirve la app con http.server (subiendo
un puerto libre) y carga index.html en Chromium.

Uso: python probar_parser.py
"""
import json
import os
import sys
import threading
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
SRV_ROOT = HERE


def _servir():
    """Sirve SRV_ROOT en un puerto libre; devuelve (url, thread)."""
    import socket
    with socket.socket() as s:
        s.bind(('127.0.0.1', 0))
        port = s.getsockname()[1]
    class _H(SimpleHTTPRequestHandler):
        def log_message(self, *a):  # silenciar log
            pass
    httpd = ThreadingHTTPServer(('127.0.0.1', port), _H)
    t = threading.Thread(target=httpd.serve_forever, daemon=True)
    t.start()
    return 'http://127.0.0.1:%d/' % port, httpd


def main():
    from playwright.sync_api import sync_playwright
    url, httpd = _servir()
    fallos = []

    def check(pred, nombre, extra=''):
        if pred:
            print('  OK   %s' % nombre)
        else:
            print('  FAIL %s %s' % (nombre, extra))
            fallos.append(nombre)

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.on('pageerror', lambda e: print('  (pageerror) %s' % e))
        pg.goto(url, wait_until='load')
        pg.wait_for_timeout(700)

        # --- 1) GUIA_FIELDS y categorización de litologia ---
        info = pg.evaluate("""() => {
          const g = window.GUIA_FIELDS || {};
          const lit = g['litologia'] || [];
          const cat = f => f.cat;
          return {
            stores: Object.keys(g).length,
            lit: lit.map(f => f.campo + ':' + f.cat),
            ultimo: lit[lit.length-1] ? lit[lit.length-1].campo : null,
          };
        }""")
        check(info['stores'] > 0, 'GUIA_FIELDS presente (>0 stores)', str(info))
        lit_cats = dict(x.split(':') for x in info['lit'])
        check(lit_cats.get('TEXTURA') == 'A', 'litologia TEXTURA -> A', str(lit_cats.get('TEXTURA')))
        check(lit_cats.get('CLASTOS_TAM_MAX_CM') == 'B', 'litologia CLASTOS_TAM_MAX_CM -> B', str(lit_cats.get('CLASTOS_TAM_MAX_CM')))
        check(lit_cats.get('DESCRIPCION_LITOLOGIA') == 'C', 'litologia DESCRIPCION_LITOLOGIA -> C', str(lit_cats.get('DESCRIPCION_LITOLOGIA')))
        check(info['ultimo'] == 'NOMBRE_ROCA', 'litologia NOMBRE_ROCA al final', str(info['ultimo']))

        # --- 2) parsearGuia sobre campos C reales de litologia ---
        res = pg.evaluate("""() => {
          const g = window.GUIA_FIELDS['litologia'];
          const cCfg = g.filter(f => f.cat === 'C');
          // campos('litologia') es una funcion global (window) que devuelve los campos reales del modelo.
          const cCampos = campos('litologia').filter(c => cCfg.some(f => f.campo === c.nombre));
          const run = (t) => parsearGuia(t, cCfg, cCampos);
          return {
            guia: construirGuia(cCfg),
            a: run('Descripción litología: roca de grano fino, verdosa'),
            multi: run('Observación: vetillas de cuarzo; óxidos de hierro'),
            desconocida: run('Campo inventado: abc'),
            noadivina: run('Textura: 15%; Observación: algo'),   // TEXTURA es A, no se toca
            etiquetaPorNombre: run('DESCRIPCION_LITOLOGIA: texto por nombre técnico'),
          };
        }""")
        check('Campos:' in res['guia'], 'construirGuia() produce guía', str(res['guia'])[:60])
        check(res['a'].get('DESCRIPCION_LITOLOGIA') == 'roca de grano fino, verdosa',
              'parsearGuia: etiqueta->campo (descripción)', str(res['a']))
        check(res['multi'].get('OBSERVACION') == 'vetillas de cuarzo; óxidos de hierro',
              'parsearGuia: ";" = múltiple', str(res['multi']))
        check(not res['desconocida'] or all(k not in ('Campo inventado',) for k in res['desconocida']),
              'parsearGuia: etiqueta desconocida se ignora', str(res['desconocida']))
        check(not any(k in res['noadivina'] for k in ('TEXTURA', 'LITICOS_PCT', 'CLASTOS_TAM_MAX_CM')),
              'parsearGuia: números NO se adivinan en campos B', str(res['noadivina']))
        check(res['etiquetaPorNombre'].get('DESCRIPCION_LITOLOGIA') == 'texto por nombre técnico',
              'parsearGuia: acepta nombre técnico como etiqueta', str(res['etiquetaPorNombre']))

        # --- 3) El formulario light renderiza A/B/C y un campo por renglón parsea bien ---
        form = pg.evaluate("""() => {
          const f = formularioLight('litologia', {TIPO_ROCA:'Volcánica', TIPO_VOLCANICA:'Lava'}, {});
          document.body.appendChild(f.node);
          const sel = f.node.querySelectorAll('select').length;
          const num = f.node.querySelectorAll('input[type=number]').length;
          const ta  = f.node.querySelectorAll('textarea.lightdesc').length;
          const taEl= f.node.querySelector('textarea.lightdesc');
          taEl.value = 'Descripción litología: roca verde, vetillas\\nObservación: óxidos de hierro';
          const d = f.getData();
          return {sel, num, ta, desc:d['DESCRIPCION_LITOLOGIA'], obs:d['OBSERVACION']};
        }""")
        check(form['sel'] > 0 and form['num'] > 0 and form['ta'] == 1,
              'formularioLight renderiza A/B/C (selects/numbers/1 textarea)',
              'sel=%s num=%s ta=%s' % (form['sel'], form['num'], form['ta']))
        check(form['desc'] == 'roca verde, vetillas' and form['obs'] == 'óxidos de hierro',
              'formularioLight.getData() combina C (un campo por renglón)', str(form))

        b.close()
    httpd.shutdown()

    print('- ' * 20)
    if fallos:
        print('FALLARON %d: %s' % (len(fallos), ', '.join(fallos)))
        sys.exit(1)
    print('TODOS OK')


if __name__ == '__main__':
    main()

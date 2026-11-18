# Cripta Aleatoria — compilar .exe (PC) y .apk (Android)

Requisito común: **Node.js 18 o superior** (https://nodejs.org). Abrí una terminal en esta carpeta y corré una vez:

    npm install

## .exe para Windows
Probar sin compilar:   `npm start`
Compilar el .exe:      `npm run exe`   → queda en `dist/Cripta-Aleatoria.exe` (portable, un solo archivo)
Instalador:            `npm run exe:instalador`
(Conviene compilarlo en Windows. En Mac/Linux hace falta Wine.)
En el juego: F11 = pantalla completa, el menú tiene botón "Salir".

## .apk para Android
Requisitos extra: **Android Studio** (incluye el SDK) y **JDK 17**.
1. `npm run apk:init`   (solo la primera vez; crea la carpeta `android/`)
2. `npm run apk:sync`   (cada vez que cambies el juego)
3. `npm run apk:abrir`  → se abre Android Studio. Esperá a que termine de sincronizar y andá a
   **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El .apk queda en
   `android/app/build/outputs/apk/debug/app-debug.apk`. Copialo al celular e instalalo
   (hay que permitir "instalar apps de orígenes desconocidos").

Opcional (recomendado) — dejar el juego siempre horizontal: en `android/app/src/main/AndroidManifest.xml`,
dentro de la etiqueta `<activity ...>`, agregá `android:screenOrientation="sensorLandscape"`.

## Notas
- `prepare.js` copia three.js y PeerJS a `www/`, así el juego carga sin depender de CDNs.
- El multijugador **online** igual necesita internet (usa el servidor de salas de PeerJS). El modo local y de un jugador funcionan sin conexión.
- El juego guarda récords y ajustes en el almacenamiento de la app.

## Compilar en la nube con GitHub (sin instalar nada)
1. Creá un repositorio en GitHub y subí TODO el contenido de esta carpeta (incluida `.github`).
2. Pestaña **Actions** → "Compilar APK y EXE" → **Run workflow**.
3. Cuando termine (unos 5–10 min), entrá a la ejecución y bajá los archivos de **Artifacts**: `Cripta-Aleatoria-APK` y `Cripta-Aleatoria-EXE`.

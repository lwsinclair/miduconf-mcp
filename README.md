# 🚀 Mi demos de la Miduconf 2025: Programando tus MCPs

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

¡Hola developer 👋🏻! En este repo encontrarás todas las demos que mostré durante mi charla en la [Miduconf 2025](https://www.miduconf.com/) sobre la programación de tus MCPs (Model Context Protocol).

## 🤖 ¿Qué es MCP?

MCP (Model Context Protocol) es un estándar abierto para la comunicación entre modelos de lenguaje y herramientas externas. Permite a los modelos interactuar con APIs, bases de datos y otros servicios de manera estructurada y segura. Pero para que lo veas claro, imagina que quieres poder pedirle a un modelo de IA que busque vídeos en YouTube, playlists, canales, o incluso, por qué no, genere títulos para tus vídeos... si bien es cierto que los modelos de lenguaje pueden generar texto, no tienen acceso directo a internet ni a APIs externas. Aquí es donde entra MCP, permitiendo que el modelo "pida" información a través de herramientas específicas. Para que lo veas claro, te lo dejo en formato comic:

[![Comic explicativo de MCP](images/Explicando%20MCP%20servers%20en%20formato%20comic.png)](images/Explicando%20MCP%20servers%20en%20formato%20comic.png)

y esto es solo un ejemplo de todo lo que se puede hacer con MCP y sus herramientas.

## ⚡ Crear un MCP Server con TypeScript

Para poder crea run MCP Server la forma más sencilla es usar el SDK oficial de MCP para tu lenguaje favorito. A día de hoy hay SDKs para casi todos los lenguajes populares: https://github.com/modelcontextprotocol

Para este ejemplo he usado TypeScript y Node.js, pero puedes usar cualquier otro lenguaje soportado.

El punto de entrada es `src/index.ts`, que crea un `McpServer` y se conecta por stdio (entrada/salida estándar).Esto lo que significa es que el código del servidor se comunica con el cliente (por ejemplo, un modelo de lenguaje) a través de la consola, enviando y recibiendo mensajes en formato JSON, por lo que usando este método de transporte puedes ejecutar el servidor localmente sin necesidad de un servidor web.

🔍 Esto es lo primero que tienes que saber para crear tu propio MCP Server: puedes crear un servidor que se comunique por stdio, es decir que se ejecute localmente, o puedes crear un servidor web que escuche peticiones HTTP.

## 🛠️ Las tools de YouTube 🔴📹

Una vez que tienes definido el MCP Server, puedes registrar las tools que quieras. En mi caso, para hacerlo un poquito modular sin perdernos mucho, he creado una función llamada `registerYouTubeTools` en `src/tools/youtube/index.ts` que registra todas las tools relacionadas con YouTube. En este repo tengo varias tools para que puedas ver diferentes ejemplos y cómo podría ser registrar más de una tool.

### 🔧 Qué pinta tiene una tool

Una tool es simplemente una función que recibe el servidor como parámetro y usa el método `registerTool` para registrar una herramienta concreta. Por ejemplo, la tool `search_videos` está implementada en `src/tools/youtube/searchVideos.ts` y se registra en `src/tools/youtube/index.ts`.

### 📦 Cómo preparo el código para que este pueda ser ejecutado por un cliente

Para hacertelo un poquito fácil he dejado un script como parte del `package.json` que compila el código TypeScript a JavaScript y lo deja en la carpeta `dist`, que es desde donde se ejecuta el MCP Server. Así que para compilar el código solo tienes que ejecutar:

```bash
npm run build
```

### 🧪 Probar un MCP Server

Vale, ahora ¿Qué hago con esto? Pues ahora que ya tienes un MCP Server lo que necesitas es un cliente que sepa comunicarse con él, es decir un MCP Client. La forma más sencilla es usando la herramienta oficial `@modelcontextprotocol/inspector`, que es un cliente MCP que se comunica por stdio y te permite probar tu servidor de forma interactiva.

```bash
npx @modelcontextprotocol/inspector
```

> [!IMPORTANT]
> Para poder ejecutar este ejemplo necesitas copiar el archivo `.env-sample` a `.env` y colocar tu clave de API de YouTube en la variable `YOUTUBE_API_KEY`. Dentro del propio archivo te explico dónde tienes que ir para obtener la clave.

Sin embargo, esta solo es capaz de lanzar las peticiones oportunas para listar las tools registradas y probarlas de forma manual. Pero la gracia de todo esto es que un modelo de lenguaje pueda usar estas tools de forma automática. Para ello, puedes usar cualquier cliente MCP que soporte el transporte por stdio, como por ejemplo GitHub Copilot, que es capaz de utilizar el chat como cliente de los MCP Servers.

### ⚙️ Cómo configurar Visual Studio Code para que use tu MCP Server

La forma de poder configurar este MCP Server en Visual Studio Code es usando Control/Comand + P y buscar por `MCP: Add Server`. Esto te llevará por un asistente que, dependiendo del tipo de MCP Server que quieras añadir te pedirá una información u otra. Para este caso, estos son los datos que tienes que introducir:

- type: `Command (stdio)`
- Command to run: `node ./dist/index.js`
- Name: `mcp-youtube`
- Choose where to install: `Workspace`, `Remote` (dentro del Dev Container) (o `Global` si quieres que esté disponible en todos los proyectos): en este caso, `Workspace` está bien.

Esto se convierte en el archivo `.vscode/mcp.json`. Por lo cual, cuando ya seas un pro en la materia puedes editarlo directamente 🥷🏻.

Una vez que ya lo tengas, lo único que tienes que hacer es ir al Chat de Github Copilot, del cual, solo por tener una cuenta de GitHub ya puedes usarlo gratis, verás que en el modo `Agent` te aparece un simbolo de herramientas 🔨 si haces clic en el mismo verás todas las que tienes configuradas:

[![Tools configuradas para GitHub Copilot Chat](images/Tools%20disponibles%20para%20GH%20Copilot%20Chat.png)](images/Tools%20disponibles%20para%20GH%20Copilot%20Chat.png)

¿Y cómo hago que GitHub Copilot use estas tools? Pues muy sencillo, solo tienes qe pedirle cosas relacionadas con las mismas en el chat:

- "Busca videos en YouTube sobre MCP Servers" 🔍

y el resultado será algo como esto:

[![GH Copilot ve que tiene una tool disponible y la quiere usar](images/GH%20Copilot%20ve%20que%20tiene%20una%20tool%20disponible%20y%20la%20quiere%20usar.png)

Y si ahora le pido por una playlist:

- "Busca playlists en YouTube sobre IA Generativa para devs en español" 🎵

Pues verás que él solito es capaz de determinar cuál es la mejor tool para usar y te devuelve el resultado:

[![GH Copilot usando la tool de buscar playlists](images/GH%20Copilot%20busca%20playlists%20gracias%20a%20la%20tool%20search_playlists.png)](images/GH%20Copilot%20busca%20playlists%20gracias%20a%20la%20tool%20search_playlists.png)

¿A qué mola? 😎 Además como ves la lanzará todas las veces con los parámetros que considere.

### 💬 Prompts como parte de un MCP Server

Pero esto no es todo, aunque los MCP Server se hicieron famosos por permitir a los modelos de lenguaje usar herramientas externas, lo cierto es que también pueden incluir prompts predefinidos que el modelo puede usar para generar texto. En el archivo `src/prompts/youtube/youtubePrompts.ts` tienes un ejemplo de cómo definir prompts que el modelo puede usar.

De esta forma, puedo usar la contrabarra o slash `/` en el chat de GitHub Copilot para ver los prompts disponibles:

[![Prompts disponibles en GH Copilot Chat](images/Prompts%20como%20parte%20de%20un%20MCP%20Server.png)](images/Prompts%20como%20parte%20de%20un%20MCP%20Server.png)

Al seleccionar cualquiera de ellos lo primero que va a ocurrir es que si tiene placeholders me va a pedir los datos y finalmente va a dejar en el cuadro de texto del chat el prompt ya rellenado:

[![Prompt rellenado en GH Copilot Chat](images/Prompt%20ya%20rellenado%20gracias%20al%20prompt%20preconstruido%20del%20MCP%20Server.png)](images/Prompt%20rellenado%20en%20GH%20Copilot%20Chat.png)

¡Listo para lanzar! 🚀

## 🤔 Y si la tool necesita más información de la que el cliente le ha pasado...

Penultima funcionalidad que puedes añadir como parte de tus MCPS server, elicitations, que así en español.... suena un poco raro pero básicamente es una forma de que si una tool necesita más información de la que el cliente le ha pasado, el MCP Server puede pedirle al cliente que le proporcione esa información adicional.

Por ejemplo, la tool que busca canales necesita saber el idioma del canal que se quiere buscar. Si el cliente no le ha pasado ese parámetro, el MCP Server puede pedirle al cliente que le proporcione esa información adicional. Para este ejemplo lo he forzado un poco simplemente diciendo:

- "Busca el canal de midudev" 🔍

> [!NOTE]
> Está comentado en el código para que no salgan estas opciones hasta que lo descomentes.
> Tienes que volver a hacer el `npm run build` para que se compile de nuevo y reiniciarlo desde el `mcp.json` de VS Code.

Y el resultado es este:

Siempre te va a pedir permiso para hacer elicitations, ✋

[![Elicitation en GH Copilot Chat](images/Aviso%20de%20elicitations%20que%20se%20te%20va%20a%20pedir%20cosas.png)](images/Aviso%20de%20elicitations%20que%20se%20te%20va%20a%20pedir%20cosas.png)

y si le dices que sí, te pedirá la información adicional que necesita: 💬

[![Elicitation en GH Copilot Chat](images/Elicitations%20-%20pidiendo%20el%20idioma%20del%20canal.png)](images/Elicitations%20-%20pidiendo%20el%20idioma%20del%20canal.png)

### 🎬 Generar títulos para vídeos de YouTube por ti

Y ya por último, y no por ello menos molón, otra de las funcionalidades que puedes añadir como parte de tus MCP Server es lo que se llama **Sampling**, que, otra vez, posiblemente en español no te diga mucho, pero **lo que nos va a permitir es ques si nuestras tools necesitan tirar de un modelo de IA para hacer sus cosas no tengan que implementarlo ellas mismas**, sino que puedan pedirle al cliente que les preste alguno de sus modelos a los que ya tiene acceso, tienen la API Key, ha pagado por ellos, etc. Para ello, en el directorio `sampling`tienes un ejemplo de cómo sería el código y para verlo en acción solo tienes que escribir algo como:

- "Genera un título para un vídeo de YouTube utilizando el stack que uso en este repo" 🎯

Vuelve a usar elicitations para pedirte en qué idioma quieres el título:

[![Sampling en GH Copilot Chat](images/Pidiendo%20datos%20para%20generar%20el%20titulo%20del%20vídeo%20de%20Youtube.png)](images/Pidiendo%20datos%20para%20generar%20el%20titulo%20del%20vídeo%20de%20Youtube.png)

Y por último te pedirá permiso para ver si le dejas usar alguno de los modelos, en este caso, de los que GitHub Copilot tiene acceso:

[![Sampling en GH Copilot Chat](images/El%20MCP%20Server%20pide%20permiso%20para%20usar%20uno%20de%20los%20modelos%20de%20IA%20del%20cliente.png)](images/El%20MCP%20Server%20pide%20permiso%20para%20usar%20uno%20de%20los%20modelos%20de%20IA%20del%20cliente.png)

Si te gustó mi charla puedes echarle un vistazo a mi contenido sobre MCP Servers en mi canal de YouTube: 📺

[![Playlist MCP Servers - ReturnGIS](https://img.youtube.com/vi/khz4nWR9l20/maxresdefault.jpg)](https://www.youtube.com/playlist?list=PLO9JpmNAsqM4rqHBOgiSfIYmGNGK1x56X)

🎬 **[Ver Playlist completa sobre MCP Servers](https://www.youtube.com/playlist?list=PLO9JpmNAsqM4rqHBOgiSfIYmGNGK1x56X)**

¡Y seguirme para estar al tanto de todo lo que voy publicando!

<div align="center">

[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC140iBrEZbOtvxWsJ-Tb0lQ?style=for-the-badge&logo=youtube&logoColor=white&color=red)](https://www.youtube.com/c/GiselaTorres?sub_confirmation=1)
[![GitHub followers](https://img.shields.io/github/followers/0GiS0?style=for-the-badge&logo=github&logoColor=white)](https://github.com/0GiS0)
[![LinkedIn Follow](https://img.shields.io/badge/LinkedIn-Sígueme-blue?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/giselatorresbuitrago/)
[![X Follow](https://img.shields.io/badge/X-Sígueme-black?style=for-the-badge&logo=x&logoColor=white)](https://twitter.com/0GiS0)

</div>

¡Nos vemos 👋🏻!

---
title: "¿Qué es Open Graph Protocol y cómo crear Twitter Cards?"
date: 2022-08-07
draft: false
description: "¿Haz visto que algunos Twitter links tienen una vista previa al contenido? Vamos a mostrarte cómo hacerlo"
tags: ["HTML"]
---

Has estado alguna vez en Twitter y has visto que algunos links tienen una vista previa al contenido? Esos links se crean usando el Open Graph Protocol. Este es uno de los protocolos más comunes y pero no es usado mucho por los nuevos desarrolladores web asi que puedes hacer que tu contenido destaque si lo ocupas.

## ¿Qué es Open Graph Protocol?

Open Graph es un protocolo de internet que fue creado por Facebook para estandarizar el uso de metadatos dentro de una página web para representar el contenido de una página.

En el, puedes proporcionar detalles como el título de una página o como la duración de un video. Estos piezas se unen para formar una representación de cada página individual de la internet.

### ¿Por qué usarlo?

Como dije antes, es una buena idea que tu contenido destaque, que es evidente que es lo que queremos en la web. No usar un contenido rico link puede hacer que perdamos potencial de tráfico que podríamos haber tenido.

{{< tweet 1556006131079716864 >}}

## Open Graph basics

Hay 5 tags Open Graph que son requeridas para que funcione correctamente, que son `og:title`,`og:type`, `og:image`, y `og:url`, `og:description`. Twitter los usa como un fallback en caso de que no uses `twitter:*` con el correspondiente tag

Para colocar los tags en tu sitio web, simplemente hazlo con normal `<meta>` tags en el `<head>` espacio

```html
<meta property="“og:[replace" with tag]” content="“[VALUE]”" />
```

`og:title`: Título de tu sitio web\
`og:description`: Descripción de tu sitio web\
`og:type`: Tipo de contenido de tu sitio web\
`og:image`: Imagen de tu sitio web\
`og:url`: URL de tu sitio web\

En mi caso tendria que añadir estos tags a mi sitio web:

```html
<head>
    <meta
        property="og:title"
        content="What is Open Graph Protocol and how to create Twitter Cards?"
    />
    <meta
        property="og:description"
        content="Have you ever seen Twitter links that have a preview to the content? I'll show you how to do them"
    />
    <meta
        property="og:image"
        content="http://gabriellazcano.com/images/image.png"
    />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://gabriellazcano.com" />
    <!-- more stuff -->
</head>
```

Si estas interesado en saber más sobre el protocolo, puedes visitar [Open Graph Protocol](https://ogp.me/)

## ¿Cómo Twitter usa Open Graph Protocol?

TWitter tiene su propio protocolo de Open Graph Protocol que se usa para crear Twitter Cards.

Los añades de forma similar a los de Open Graph Protocol, pero con una diferencia, tienes que usar `name` y `twitter:*`

> tip: Asegurate de usar`name=""` en vez de `property=""`

```html
<meta
    name="twitter:card"
    content="[substitute with summary, summary_large_image, app, etc)]"
/>
<meta name="twitter:title" content="[title]" />
<meta name="twitter:description" content="[description]" />
<meta name="twitter:image" content="[link to image]" />
<!-- more stuff -->
```

Puedes ver una lista completa de los tags de Twitter Cards [aquí](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)

Puedes **probar y visualizar** el resultado de tu sitio web [aquí](https://cards-dev.twitter.com/validator)

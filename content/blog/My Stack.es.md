---
title: "¿Cómo hice mi blog con Hugo y Github Pages?"
date: 2021-02-28
draft: false
tags: ["hugo"]
description: "En este post voy a explicar como hice mi blog con Hugo y Github Pages."
---

## Introducción

Decidi hacer un blog, trate de usar los sitios de blog usuales. No me gustó mucho, me sentia un poco desalentado por la falta de herramientas.

En este post voy a explicar el stack que uso para hacer mi blog y las cosas que me han notado en el proceso. Voy a actualizar esta página cada vez que extiendo mi stack.

## El stack

En este proyecto use uno de los mejores frameworks para Static Site Generation, `Hugo`. Es extremadamente rápido y muy personalizable. Hugo no es el más famoso pero es muy confiable. Por el momento, no he visto mucha atención al framework y quiero comenzar a contribuir a hacerlo más popular.

## Configuración

Hay 2 formas de hacer un blog con Hugo: usando [un tema](https://themes.gohugo.io/) o creando el tuyo manualmente. Yo trate de usar un tema pero no me ha funcionado, es muy personalizable pero sentia que no satisfacia completamente mis necesidades. Me parece que la configuración del tema es muy difícil de modificar. Los temas no tienen mucha documentación y hay que adivinar cómo funciona cada uno. Son convenientes para comenzar un sitio web y para personas que no quieren pasar por todo eso.

En otra ocasión, puedo explicar como hacer un blog con Hugo manualmente, ya que como dije antes es una herramienta muuy buena.

Puedes ir por los siguientes enlaces para ver como hacer un blog con Hugo:

https://gohugo.io/getting-started/quick-start/

## Alojamiento

Para el alojamiento, uso un servidor de GitHub Pages. Es un servidor de hosting que permite alojar un sitio web en una sola página. Es muy fácil de configurar y muy rápido. Uso una Github Action para hacer el deploy automático cada que hago un push.

## Dominio personalizado

En primer lugar no sabía nada de como configurar un dominio personalizado, pensé que era muy sencillo y que era bastante fácil. Puedes ver como lo hice en [este otro post](/blog/how-to-add-a-custom-domain-to-your-github-pages/)

Espero que este blog post te sea de utilidad y que te ayude a hacer un blog más fácil. Si quieres aprender más sobre Hugo, web development, tips & tricks, por favor considera leer mis otros posts 😁

## Articulos relacionados

-   [How to add a custom domain to your Github Pages](/blog/how-to-add-a-custom-domain-to-your-github-pages/)

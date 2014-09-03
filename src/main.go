package main

import (
	"github.com/go-martini/martini"
	"github.com/hoisie/mustache"
)

func main () {
	m := martini.Classic()

	m.Get("/", func () string { return mustache.RenderFileInLayout("views/home/index.mustache", "views/layout/layout.mustache") })

	m.Run()
}


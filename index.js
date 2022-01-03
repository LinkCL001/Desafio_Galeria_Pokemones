const http = require("http");
const axios = require("axios");
const fs = require("fs");

//Hacer uso de Async/Await para las funciones que consulten los endpoints de la pokeapi.
http.createServer((req, res) => {
    if(req.url == '/'){
        res.writeHead(200, {'Content-Type':'text:html'})
        fs.readFile('index.html', 'utf8', (err, data) => {
            res.end(data)
        })
    }
// Disponibilizar la ruta http://localhost:3000/pokemones que devuelva unJSONconel nombre y la url de una imagen de 150 pokemones, así como verás en la siguienteimagen. (4 Puntos)                                                                                                                      3

    if (req.url.startsWith('/pokemones')) {
        res.writeHead(200, { 'Content-Type': 'application/json' })

        let pokemonesPromesas = []

        async function pokemonesGet() {
            const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=150')
            return data.results
        }
        async function getFullData(name) {
            const { data } = await
                axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            return data
        }
        pokemonesGet().then((results) => {
            results.forEach((p) => {
                let pokemonName = p.name
                pokemonesPromesas.push(getFullData(pokemonName))
            })
// Usar el Promise.all() para ejecutar y obtener la data de las funciones asíncronas generando un nuevo arreglo con la data a entregar en el siguiente requerimiento.(3 Puntos)
            Promise.all(pokemonesPromesas).then((data) => {
                let resultado = []
                data.forEach((p) => {

                    let allpokemon = {
                        img: p.sprites.front_default,
                        nombre: p.name
                    }
                    resultado.push(allpokemon) 
                })
                    res.write(JSON.stringify(resultado, null, 1));
                    res.end();
            })

        })
    }

}).listen(3000, () => console.log("Escuchando al puerto 3000"))



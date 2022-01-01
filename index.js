const http = require("http");
const axios = require("axios");
const url = require("url");

const pokemonesPorNombre = []

http.createServer((req, res) => {
    if(url.parse(req.url, true).path == '/'){
        getPokemones()
        res.end(console.log(pokemonesPorNombre));
    }
}).listen(3000, () => console.log("Escuchando al puerto 3000"))

const getPokemones = async () => {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150')
    const pokemones = data.pokemones;
    const pokemonesPorNombre = result.map((x) => {
        return getPokemones(x.name)
    }) 
};

const getPokemon = async (nombre) => {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/${nombre}`)
    const urlImage = data.sprites.front_default
    return {img: urlImage, nombre: nombre}
}

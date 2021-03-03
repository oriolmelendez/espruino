// Array temperatures emmagatzemandes manualment
let temperatures = [];
var t;

//Classe Data
class Data {
    constructor(value) {
        this.value = value;
    }
}
//Metode prototipat que hereta de la classe Data
Data.prototype.showData = function() {
    g.drawString(this.value + "Cº", 60, 10);
};

// Classe Temp que hereta de Data i té 3 mètodes
class Temp extends Data {
    //Metode que retorna la temperatura en Farenheits
    toFar() {
        return this.value * 1.8 + 32;
    }
    //Metode que retorna la temperatura en Kelvins
    toKel() {
        return this.value + 273.15;
    }
    //Metode que invoca al metode protopitat
    showData() {
        super.showData();
    }
}

//Funció que pobla l'array i crida a la funcio que mostra els gràfics
function setArray() {
    temperatures.push(1, 3, 8, 10, 12, 10, 8, 3);
    mostraInfo();
}

//Gràfica les dades de l'array temperatures
function mostraInfo() {
    g.clear();
    require("graph").drawLine(g, temperatures, {
        miny: 0,
        axes: true,
        gridx: 1,
        gridy: 5
    });
    g.flip();
}

//Estableix l'interval per cridar a la funcio getTemperature
function setIntTemp() {
    setInterval(getTemperature, 1000);
}

//Pobla l'array temperatura, mostra les temperatures en Graus, Farenheits i Kelvins
function getTemperature() {
    temperatures.push(1, 3, 8, 10, 12, 10, 8, 3);
    g.clear();

    t = new Temp(E.getTemperature());
    const sumatori = (accumulator, value) => accumulator + value;
    g.setFontBitmap();
    g.drawString("Temperatura", 0, 0);
    t.showData();
    g.drawString(t.toFar(t.value) + "Fº", 60, 20);
    g.drawString(t.toKel(t.value) + "K", 60, 30);
    let mida = temperatures.length;
    g.drawString("Temperatura mitjana: " + temperatures.reduce(sumatori) / mida, 0, 45);
    g.flip();
}

//Fa el càlcul en Farenheits dels valors de l'array temperatures
function toFar(value) {
    let far = value.map(x => x * 1.8 + 32);
    return far;
}

//Pobla l'array, crida a la funció toFar() i pinta els valors gràficament
function convertFar() {
    temperatures.push(1, 3, 8, 10, 12, 10, 8, 3);
    let tempF = toFar(temperatures);
    g.clear();
    require("graph").drawLine(g, tempF, {
        miny: 0,
        axes: false,
        gridx: 1,
        gridy: 5
    });
    g.flip();
}

//Pobla els valors de l'array TemperaturesReg amb la informació del sesor i els mostra per pantalla
function MostraArray() {
    g.clear();
    // Array temperatures registrades per la Pixl
    let temperaturesReg = [];
    let i = 15;
    while (temperaturesReg.length < 5) {
        let tPixl = new Temp(E.getTemperature());
        temperaturesReg.push(tPixl);
    }
    for (var temp of temperaturesReg) {
        for (var value in temp) {
            g.setFontBitmap();
            g.drawString("Temperatures registrades", 0, 0);
            g.drawString(temp[value], 0, i);
            g.flip();
            i += 10;
            break;
        }
    }
}

//Funcio principal
function init() {
    g.clear();
    g.drawString("OPCIONS:", 0, 0);
    g.drawString("BOTO 1: Mostra temp temps real", 0, 20);
    g.drawString("BOTO 2: Mostra temp registrades", 0, 30);
    g.drawString("BOTO 3: Grafic temp", 0, 40);
    g.drawString("BOTO 4: Grafic temp Farenheit", 0, 50);
    g.flip();

    //Grafica normal
    setWatch(x => setArray(), BTN3, { repeat: false });
    //Grafic amb les temperatures en Fareinheits
    setWatch(x => convertFar(), BTN4, { repeat: false });
    // Mostra temperatura en temps real
    setWatch(x => setIntTemp(), BTN1, { repeat: false });
    //Mostra temperatures registrades
    setWatch(x => MostraArray(), BTN2, { repeat: false });
    //Boto 2 : Mostrar totes les temperatures registrades. (Utilitzar for in i for of)
}

//Estableix l'interval de crida a la funció principal
setInterval(init, 60000);
init();
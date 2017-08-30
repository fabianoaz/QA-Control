/// <reference path="ScriptJSQA.js" />
myApp
.filter("status", function () {
    return function (param1) {
        switch (param1) {
            case 0: return "Aprovado";
            case 1: return "Reprovado";
            case 2: return "Indefinido";
        }
    }
    })
.filter("cor", function () {
    return function (param1) {
        switch (param1) {
            //case 0: return "skyblue"; //cor para aprovado
			case 0: return "RGB(91,192,222);"; //cor para aprovado
			//case 0: return "#E0FFFF";
            case 1: return "#CD5C5C"; // cor para reprovado
            case 2: return "yellow";
        }
    }
    })
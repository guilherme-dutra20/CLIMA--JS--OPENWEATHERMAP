 document.querySelector('.busca').addEventListener('submit', async (event) => {
    // mantendo os dados do form na tela
    // preventDefault previne o comportamento padrão do codigo
    event.preventDefault();

    // pegando o valor digitado no form (.busca)
    let input = document.querySelector('#searchInput').value;
    
    // verificando se o buscar não está vazio
    if(input !== '') {
        clearInfo();
        showWarning('Carregando...');

        // qualquer duvida quanto a busca no site, consultar o video aula
        // enviando o nome da cidade por template string para buscar no site
        // encodeURI manda para a url exatamente como precisa ser digitado
        /* pode usar fetch para fazer uma chamada para uma API externa sem parar
         a execução de outras instruções.*/
        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=1a34e47a783d37bbe48c7221883a45da`);
        let json = await results.json();

        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});

function showInfo(obj) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`;
    
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', 
    `http://openweathermap.org/img/wn/${obj.tempIcon}@2x.png`);
    
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
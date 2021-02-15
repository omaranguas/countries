const d = document,
    $content = d.querySelector('.countries'),
    $fragment = d.createDocumentFragment(),
    $template = d.getElementById('template').content;

const getCountry = async () => {
    try {
        const res = await fetch(`https://restcountries.eu/rest/v2/all`);
        const countries = await res.json();

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        countries.forEach((country) => {
            $template.querySelector('img').setAttribute('src', country.flag);
            $template.querySelector('.country').textContent = country.name;
            $template.querySelector('.capital').textContent = country.capital;
            $template.querySelector('.region').textContent = country.region;
            $template.querySelector('.subregion').textContent = country.subregion;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone);
        });

        $content.appendChild($fragment);
    } catch (err) {
        let message = err.statusText || 'Ocurrió un error al solicitar datos';
        $content.insertAdjacentHTML('afterend', `<p><b>Error ${err.status}: ${message}</b></p`);
    }
}

d.addEventListener('DOMContentLoaded', (e) => {
    getCountry();
});

const $cardFilter = d.querySelector('.card-filter');

d.addEventListener('keyup', (e) => {
    if (e.target.matches('.card-filter')) {
        const value = e.target.value;
        const data = value.toLowerCase();

        d.querySelectorAll('.card').forEach((card) => {
            (card.textContent.toLowerCase().includes(e.target.value) || card.textContent.includes(e.target.value))
                ? card.classList.remove('filter')
                : card.classList.add('filter')
        });
    }
});
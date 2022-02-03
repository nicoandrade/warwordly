export default async function handler(req, res) {
    switch (req.method) {
        case "POST":
            return res.status(200).end(`Nothing to do`);

            let { words } = await import(`constants/test_words.js`);

            words = words.filter((word) => word.length == 5);

            // remove Diacríticos
            // https://es.stackoverflow.com/questions/62031/eliminar-signos-diacr%C3%ADticos-en-javascript-eliminar-tildes-acentos-ortogr%C3%A1ficos
            words = words.map((word) =>
                word
                    .normalize("NFD")
                    .replace(
                        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
                        "$1"
                    )
                    .normalize()
            );

            return res.status(200).json(words);
            break;

        default:
            res.setHeader("Allow", ["POST"]);

            return res.status(405).end(`Method "${req.method}" not supported`);
            break;
    }
}

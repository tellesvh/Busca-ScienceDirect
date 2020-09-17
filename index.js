require('dotenv').config()
const axios = require('axios').default;
const fs = require('fs');

const queries = [
  "Adenomatoid odontogenic tumour AND Ameloblastic fibro-odontoma",
  "Adenomatoid odontogenic tumour AND Ameloblastoma",
  "Adenomatoid odontogenic tumour AND Ameloblastic carcinoma",
  "Adenomatoid odontogenic tumour AND Calcifying odontogenic cyst",
  "Adenomatoid odontogenic tumour AND Calcifying epithelial odontogenic tumour",
  "Adenomatoid odontogenic tumour AND Cement ossifying fibroma",
  "Adenomatoid odontogenic tumour AND Central giant cell granuloma",
  "Adenomatoid odontogenic tumour AND Central odontogenic fibroma",
  "Adenomatoid odontogenic tumour AND Dentigerous cyst",
  "Adenomatoid odontogenic tumour AND Ghost cell odontogenic carcinoma",
  "Adenomatoid odontogenic tumour AND Glandular odontogenic cyst",
  "Adenomatoid odontogenic tumour AND Myxoma",
  "Adenomatoid odontogenic tumour AND Odontogenic keratocyst",
  "Adenomatoid odontogenic tumour AND Odontoma",
  "Adenomatoid odontogenic tumour AND Ossifying fibroma",
  "Adenomatoid odontogenic tumour AND Orthokeratinizing odontogenic cyst",
  "Adenomatoid odontogenic tumour AND Plexiform granular cell odontogenic tumour",
  "Adenomatoid odontogenic tumour AND Peripheral odontogenic fibroma",
  "Adenomatoid odontogenic tumour AND Radicular cyst",
  "Adenomatoid odontogenic tumour AND Squamous odontogenic tumour",
  "Ameloblastic fibroma AND Ameloblastic fibro-odontoma",
  "Ameloblastic fibroma AND Ameloblastoma",
  "Ameloblastic fibroma AND Ameloblastic carcinoma",
  "Ameloblastic fibroma AND Calcifying odontogenic cyst",
  "Ameloblastic fibroma AND Calcifying epithelial odontogenic tumour",
  "Ameloblastic fibroma AND Cement ossifying fibroma",
  "Ameloblastic fibroma AND Central giant cell granuloma",
  "Ameloblastic fibroma AND Central odontogenic fibroma",
  "Ameloblastic fibroma AND Dentigerous cyst",
  "Ameloblastic fibroma AND Ghost cell odontogenic carcinoma",
  "Ameloblastic fibroma AND Glandular odontogenic cyst",
  "Ameloblastic fibroma AND Myxoma",
  "Ameloblastic fibroma AND Odontogenic keratocyst",
  "Ameloblastic fibroma AND Odontoma",
  "Ameloblastic fibroma AND Ossifying fibroma",
  "Ameloblastic fibroma AND Orthokeratinizing odontogenic cyst",
  "Ameloblastic fibroma AND Plexiform granular cell odontogenic tumour",
  "Ameloblastic fibroma AND Peripheral odontogenic fibroma",
  "Ameloblastic fibroma AND Radicular cyst",
  "Ameloblastic fibroma AND Squamous odontogenic tumour",
  "Ameloblastic fibro-odontoma AND Ameloblastoma",
  "Ameloblastic fibro-odontoma AND Ameloblastic carcinoma",
  "Ameloblastic fibro-odontoma AND Calcifying odontogenic cyst",
  "Ameloblastic fibro-odontoma AND Calcifying epithelial odontogenic tumour",
  "Ameloblastic fibro-odontoma AND Cement ossifying fibroma",
  "Ameloblastic fibro-odontoma AND Central giant cell granuloma",
  "Ameloblastic fibro-odontoma AND Central odontogenic fibroma",
  "Ameloblastic fibro-odontoma AND Dentigerous cyst",
  "Ameloblastic fibro-odontoma AND Ghost cell odontogenic carcinoma",
  "Ameloblastic fibro-odontoma AND Glandular odontogenic cyst",
  "Ameloblastic fibro-odontoma AND Myxoma",
  "Ameloblastic fibro-odontoma AND Odontogenic keratocyst",
  "Ameloblastic fibro-odontoma AND Odontoma",
  "Ameloblastic fibro-odontoma AND Ossifying fibroma",
  "Ameloblastic fibro-odontoma AND Orthokeratinizing odontogenic cyst",
  "Ameloblastic fibro-odontoma AND Plexiform granular cell odontogenic tumour",
  "Ameloblastic fibro-odontoma AND Peripheral odontogenic fibroma",
  "Ameloblastic fibro-odontoma AND Radicular cyst",
  "Ameloblastic fibro-odontoma AND Squamous odontogenic tumour",
  "Ameloblastoma AND Ameloblastic carcinoma",
  "Ameloblastoma AND Calcifying odontogenic cyst",
  "Ameloblastoma AND Calcifying epithelial odontogenic tumour",
  "Ameloblastoma AND Cement ossifying fibroma",
  "Ameloblastoma AND Central giant cell granuloma",
  "Ameloblastoma AND Central odontogenic fibroma",
  "Ameloblastoma AND Dentigerous cyst",
  "Ameloblastoma AND Ghost cell odontogenic carcinoma",
  "Ameloblastoma AND Glandular odontogenic cyst",
  "Ameloblastoma AND Myxoma",
  "Ameloblastoma AND Odontogenic keratocyst",
  "Ameloblastoma AND Odontoma",
  "Ameloblastoma AND Ossifying fibroma",
  "Ameloblastoma AND Orthokeratinizing odontogenic cyst",
  "Ameloblastoma AND Plexiform granular cell odontogenic tumour",
  "Ameloblastoma AND Peripheral odontogenic fibroma",
  "Ameloblastoma AND Radicular cyst",
  "Ameloblastoma AND Squamous odontogenic tumour",
  "Ameloblastic carcinoma AND Calcifying odontogenic cyst",
  "Ameloblastic carcinoma AND Calcifying epithelial odontogenic tumour",
  "Ameloblastic carcinoma AND Cement ossifying fibroma",
  "Ameloblastic carcinoma AND Central giant cell granuloma",
  "Ameloblastic carcinoma AND Central odontogenic fibroma",
  "Ameloblastic carcinoma AND Dentigerous cyst",
  "Ameloblastic carcinoma AND Ghost cell odontogenic carcinoma",
  "Ameloblastic carcinoma AND Glandular odontogenic cyst",
  "Ameloblastic carcinoma AND Myxoma",
  "Ameloblastic carcinoma AND Odontogenic keratocyst",
  "Ameloblastic carcinoma AND Odontoma",
  "Ameloblastic carcinoma AND Ossifying fibroma",
  "Ameloblastic carcinoma AND Orthokeratinizing odontogenic cyst",
  "Ameloblastic carcinoma AND Plexiform granular cell odontogenic tumour",
  "Ameloblastic carcinoma AND Peripheral odontogenic fibroma",
  "Ameloblastic carcinoma AND Radicular cyst",
  "Ameloblastic carcinoma AND Squamous odontogenic tumour",
  "Calcifying odontogenic cyst AND Calcifying epithelial odontogenic tumour",
  "Calcifying odontogenic cyst AND Cement ossifying fibroma",
  "Calcifying odontogenic cyst AND Central giant cell granuloma",
  "Calcifying odontogenic cyst AND Central odontogenic fibroma",
  "Calcifying odontogenic cyst AND Dentigerous cyst",
  "Calcifying odontogenic cyst AND Ghost cell odontogenic carcinoma",
  "Calcifying odontogenic cyst AND Glandular odontogenic cyst",
  "Calcifying odontogenic cyst AND Myxoma",
  "Calcifying odontogenic cyst AND Odontogenic keratocyst",
  "Calcifying odontogenic cyst AND Odontoma",
  "Calcifying odontogenic cyst AND Ossifying fibroma",
  "Calcifying odontogenic cyst AND Orthokeratinizing odontogenic cyst",
  "Calcifying odontogenic cyst AND Plexiform granular cell odontogenic tumour",
  "Calcifying odontogenic cyst AND Peripheral odontogenic fibroma",
  "Calcifying odontogenic cyst AND Radicular cyst",
  "Calcifying odontogenic cyst AND Squamous odontogenic tumour",
  "Calcifying epithelial odontogenic tumour AND Cement ossifying fibroma",
  "Calcifying epithelial odontogenic tumour AND Central giant cell granuloma",
  "Calcifying epithelial odontogenic tumour AND Central odontogenic fibroma",
  "Calcifying epithelial odontogenic tumour AND Dentigerous cyst",
  "Calcifying epithelial odontogenic tumour AND Ghost cell odontogenic carcinoma",
  "Calcifying epithelial odontogenic tumour AND Glandular odontogenic cyst",
  "Calcifying epithelial odontogenic tumour AND Myxoma",
  "Calcifying epithelial odontogenic tumour AND Odontogenic keratocyst",
  "Calcifying epithelial odontogenic tumour AND Odontoma",
  "Calcifying epithelial odontogenic tumour AND Ossifying fibroma",
  "Calcifying epithelial odontogenic tumour AND Orthokeratinizing odontogenic cyst",
  "Calcifying epithelial odontogenic tumour AND Plexiform granular cell odontogenic tumour",
  "Calcifying epithelial odontogenic tumour AND Peripheral odontogenic fibroma",
  "Calcifying epithelial odontogenic tumour AND Radicular cyst",
  "Calcifying epithelial odontogenic tumour AND Squamous odontogenic tumour",
  "Cement ossifying fibroma AND Central giant cell granuloma",
  "Cement ossifying fibroma AND Central odontogenic fibroma",
  "Cement ossifying fibroma AND Dentigerous cyst",
  "Cement ossifying fibroma AND Ghost cell odontogenic carcinoma",
  "Cement ossifying fibroma AND Glandular odontogenic cyst",
  "Cement ossifying fibroma AND Myxoma",
  "Cement ossifying fibroma AND Odontogenic keratocyst",
  "Cement ossifying fibroma AND Odontoma",
  "Cement ossifying fibroma AND Ossifying fibroma",
  "Cement ossifying fibroma AND Orthokeratinizing odontogenic cyst",
  "Cement ossifying fibroma AND Plexiform granular cell odontogenic tumour",
  "Cement ossifying fibroma AND Peripheral odontogenic fibroma",
  "Cement ossifying fibroma AND Radicular cyst",
  "Cement ossifying fibroma AND Squamous odontogenic tumour",
  "Central giant cell granuloma AND Central odontogenic fibroma",
  "Central giant cell granuloma AND Dentigerous cyst",
  "Central giant cell granuloma AND Ghost cell odontogenic carcinoma",
  "Central giant cell granuloma AND Glandular odontogenic cyst",
  "Central giant cell granuloma AND Myxoma",
  "Central giant cell granuloma AND Odontogenic keratocyst",
  "Central giant cell granuloma AND Odontoma",
  "Central giant cell granuloma AND Ossifying fibroma",
  "Central giant cell granuloma AND Orthokeratinizing odontogenic cyst",
  "Central giant cell granuloma AND Plexiform granular cell odontogenic tumour",
  "Central giant cell granuloma AND Peripheral odontogenic fibroma",
  "Central giant cell granuloma AND Radicular cyst",
  "Central giant cell granuloma AND Squamous odontogenic tumour",
  "Central odontogenic fibroma AND Dentigerous cyst",
  "Central odontogenic fibroma AND Ghost cell odontogenic carcinoma",
  "Central odontogenic fibroma AND Glandular odontogenic cyst",
  "Central odontogenic fibroma AND Myxoma",
  "Central odontogenic fibroma AND Odontogenic keratocyst",
  "Central odontogenic fibroma AND Odontoma",
  "Central odontogenic fibroma AND Ossifying fibroma",
  "Central odontogenic fibroma AND Orthokeratinizing odontogenic cyst",
  "Central odontogenic fibroma AND Plexiform granular cell odontogenic tumour",
  "Central odontogenic fibroma AND Peripheral odontogenic fibroma",
  "Central odontogenic fibroma AND Radicular cyst",
  "Central odontogenic fibroma AND Squamous odontogenic tumour",
  "Dentigerous cyst AND Ghost cell odontogenic carcinoma",
  "Dentigerous cyst AND Glandular odontogenic cyst",
  "Dentigerous cyst AND Myxoma",
  "Dentigerous cyst AND Odontogenic keratocyst",
  "Dentigerous cyst AND Odontoma",
  "Dentigerous cyst AND Ossifying fibroma",
  "Dentigerous cyst AND Orthokeratinizing odontogenic cyst",
  "Dentigerous cyst AND Plexiform granular cell odontogenic tumour",
  "Dentigerous cyst AND Peripheral odontogenic fibroma",
  "Dentigerous cyst AND Radicular cyst",
  "Dentigerous cyst AND Squamous odontogenic tumour",
  "Ghost cell odontogenic carcinoma AND Glandular odontogenic cyst",
  "Ghost cell odontogenic carcinoma AND Myxoma",
  "Ghost cell odontogenic carcinoma AND Odontogenic keratocyst",
  "Ghost cell odontogenic carcinoma AND Odontoma",
  "Ghost cell odontogenic carcinoma AND Ossifying fibroma",
  "Ghost cell odontogenic carcinoma AND Orthokeratinizing odontogenic cyst",
  "Ghost cell odontogenic carcinoma AND Plexiform granular cell odontogenic tumour",
  "Ghost cell odontogenic carcinoma AND Peripheral odontogenic fibroma",
  "Ghost cell odontogenic carcinoma AND Radicular cyst",
  "Ghost cell odontogenic carcinoma AND Squamous odontogenic tumour",
  "Glandular odontogenic cyst AND Myxoma",
  "Glandular odontogenic cyst AND Odontogenic keratocyst",
  "Glandular odontogenic cyst AND Odontoma",
  "Glandular odontogenic cyst AND Ossifying fibroma",
  "Glandular odontogenic cyst AND Orthokeratinizing odontogenic cyst",
  "Glandular odontogenic cyst AND Plexiform granular cell odontogenic tumour",
  "Glandular odontogenic cyst AND Peripheral odontogenic fibroma",
  "Glandular odontogenic cyst AND Radicular cyst",
  "Glandular odontogenic cyst AND Squamous odontogenic tumour",
  "Myxoma AND Odontogenic keratocyst",
  "Myxoma AND Odontoma",
  "Myxoma AND Ossifying fibroma",
  "Myxoma AND Orthokeratinizing odontogenic cyst",
  "Myxoma AND Plexiform granular cell odontogenic tumour",
  "Myxoma AND Peripheral odontogenic fibroma",
  "Myxoma AND Radicular cyst",
  "Myxoma AND Squamous odontogenic tumour",
  "Odontogenic keratocyst AND Odontoma",
  "Odontogenic keratocyst AND Ossifying fibroma",
  "Odontogenic keratocyst AND Orthokeratinizing odontogenic cyst",
  "Odontogenic keratocyst AND Plexiform granular cell odontogenic tumour",
  "Odontogenic keratocyst AND Peripheral odontogenic fibroma",
  "Odontogenic keratocyst AND Radicular cyst",
  "Odontogenic keratocyst AND Squamous odontogenic tumour",
  "Odontoma AND Ossifying fibroma",
  "Odontoma AND Orthokeratinizing odontogenic cyst",
  "Odontoma AND Plexiform granular cell odontogenic tumour",
  "Odontoma AND Peripheral odontogenic fibroma",
  "Odontoma AND Radicular cyst",
  "Odontoma AND Squamous odontogenic tumour",
  "Ossifying fibroma AND Orthokeratinizing odontogenic cyst",
  "Ossifying fibroma AND Plexiform granular cell odontogenic tumour",
  "Ossifying fibroma AND Peripheral odontogenic fibroma",
  "Ossifying fibroma AND Radicular cyst",
  "Ossifying fibroma AND Squamous odontogenic tumour",
  "Orthokeratinizing odontogenic cyst AND Plexiform granular cell odontogenic tumour",
  "Orthokeratinizing odontogenic cyst AND Peripheral odontogenic fibroma",
  "Orthokeratinizing odontogenic cyst AND Radicular cyst",
  "Orthokeratinizing odontogenic cyst AND Squamous odontogenic tumour",
  "Plexiform granular cell odontogenic tumour AND Peripheral odontogenic fibroma",
  "Plexiform granular cell odontogenic tumour AND Radicular cyst",
  "Plexiform granular cell odontogenic tumour AND Squamous odontogenic tumour",
  "Peripheral odontogenic fibroma AND Radicular cyst",
  "Radicular cyst AND Squamous odontogenic tumour"
]

let finalResults = []
let txtLog = "";

for (let index = 0; index < queries.length; index++) {
  setTimeout(async () => {
    console.log(`=== ${(((index + 1) / queries.length) * 100).toFixed(2)}% Concluído ===`)
    addToLog(`Pesquisando ${queries[index]}...`)
    try {
      let result = await axios.put('https://api.elsevier.com/content/search/sciencedirect',
        { "title": queries[index], "qs": queries[index] },
        { headers: { 'X-ELS-APIKey': process.env.SCIENCEDIRECT_APIKEY } }
      )
      if (result.data.results) {
        addToLog(`${result.data.results.length} resultados encontrados para ${queries[index]}.`)
        let added = 0;
        let duplicates = 0;
        result.data.results.forEach((result) => {
          if (!finalResults.some(finalResult => (finalResult.title === result.title || finalResult.doi === result.doi || finalResult.pii === result.pii))) {
            finalResults.push(result)
            added++
          }
          else
            duplicates++
        })
        addToLog(`Houve ${added} resultados novos. ${duplicates} resultados já existentes foram ignorados.`)
      } else {
        addToLog(`Nenhum resultado encontrado para ${queries[index]}.`)
      }

      addToLog("\n")

      if (index === queries.length - 1) {
        saveFinalResults();
      }
    } catch (ex) {
      console.log(ex.response.data)
    }
  }, index * 2000)
}

function saveFinalResults() {
  let txtString = "";

  finalResults.forEach((result) => {
    let authors = []
    if (result.authors)
      authors = result.authors.map((author) => author.name)

    let loadDate = new Date(result.loadDate);
    let publicationDate = new Date(result.publicationDate);

    txtString = txtString + `==================================================
Título: ${result.title}
Revista: ${result.sourceTitle}
Volume: ${result.volumeIssue}${authors.length > 0 ? `\nAutores: ${authors.join(', ')}` : ""}
URL: ${result.uri}
DOI: ${result.doi}
PII: ${result.pii}
Data de Carregamento: ${("0" + loadDate.getDate()).slice(-2)}/${("0" + (loadDate.getMonth() + 1)).slice(-2)}/${loadDate.getFullYear()}
Data de Publicação: ${("0" + publicationDate.getDate()).slice(-2)}/${("0" + (publicationDate.getMonth() + 1)).slice(-2)}/${publicationDate.getFullYear()}
==================================================

`
  })

  fs.writeFile('Resultados.txt', txtString, function (err) {
    if (err) return console.log(err);
    console.log('Arquivo salvo com sucesso!');
  });
  fs.writeFile('Resultados_log.txt', txtLog, function (err) {
    if (err) return console.log(err);
    console.log('Arquivo de log salvo com sucesso!');
  });
}

function addToLog(message) {
  console.log(message)
  txtLog = txtLog + message + "\n"
}
# Busca Múltipla de Artigos na Base do ScienceDirect
Pequena aplicação que permite efetuar, em um único passo, buscas simultâneas de palavras-chave diferentes na base de dados de artigos científicos do ScienceDirect através da [ScienceDirect Search API V2](https://dev.elsevier.com/documentation/ScienceDirectSearchAPI.wadl).

Esta aplicação possibilita a busca rápida de artigos científicos, necessária na confecção de Revisões da Literatura e Revisões Sistemáticas / PRISMA.

Para cada artigo encontrado, são apresentados os seguintes dados:

* Título (*title*)
* Revista (*sourceTitle*)
* Volume (*volumeIssue*)
* Autores (*authors*) (quando disponíveis)
* URL (*uri*)
* DOI (*doi*)
* PII (*pii*)
* Data de Carregamento (*loadDate*)
* Data de Publicação (*publicationDate*)

Artigos duplicados entre as palavras-chave são ignorados.

<br />

## Instruções
1. Crie uma conta e obtenha a Chave da API da Elsevier através do [Elsevier Developer Portal](https://dev.elsevier.com/apikey/manage).
2. Clone ou baixe o projeto e execute `yarn` para efetuar o download das dependências necessárias.
3. No diretório raiz do projeto, crie um arquivo `.env` e insira a Chave da API obtida do primeiro passo através da chave `SCIENCEDIRECT_APIKEY`.	
	- Exemplo: `SCIENCEDIRECT_APIKEY=SUA-CHAVE-DE-API-AQUI`
4. Insira os termos da busca no *array* `queries`.
5. No diretório raiz do projeto, execute `yarn start` ou `node index.js` para rodar a aplicação e efetuar as buscas.
6. Ao finalizar, serão gerados dois arquivos:
	- **Resultados.txt**, que conterá todos os artigos encontrados nas buscas.
   - **Resultados_log.txt**, que conterá o passo-a-passo das buscas (*log*).
   
<br />
   
## Exemplos de *Output*
### `Resultados.txt`
```
==================================================
Título: A case report of a hybrid odontogenic tumour: Ameloblastoma and adenomatoid odontogenic tumour in calcifying cystic odontogenic tumour
Revista: Oral Oncology Extra
Volume: Volume 42, Issue 9
Autores: Weiping Zhang, Yu Chen, Ning Geng, Dongmei Bao, Mingzhong Yang
URL: https://www.sciencedirect.com/science/article/pii/S1741940906000161?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/j.ooe.2006.07.003
PII: S1741940906000161
Data de Carregamento: 06/09/2006
Data de Publicação: 30/10/2006
==================================================

==================================================
Título: Hybrid ameloblastoma and adenomatoid odontogenic tumor: report of a case and review of hybrid variations in the literature
Revista: Oral Surgery, Oral Medicine, Oral Pathology and Oral Radiology
Volume: Volume 118, Issue 1
Autores: Manabu Yamazaki, Satoshi Maruyama, Tatsuya Abé, Hamzah Babkair, Takashi Saku
URL: https://www.sciencedirect.com/science/article/pii/S2212440313004732?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/j.oooo.2013.08.032
PII: S2212440313004732
Data de Carregamento: 22/11/2013
Data de Publicação: 30/07/2014
==================================================

==================================================
Título: Immunohistochemical expression of matrilysins (MMP-7 and MMP-26) in ameloblastomas and adenomatoid odontogenic tumors
Revista: Oral Surgery, Oral Medicine, Oral Pathology, Oral Radiology, and Endodontology
Volume: Volume 108, Issue 3
Autores: Valéria Souza Freitas, Cristina Ruan Ferreira de Araújo, Pollianna Muniz Alves, Lélia Batista de Souza, Roseana de Almeida Freitas
URL: https://www.sciencedirect.com/science/article/pii/S1079210409002182?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/j.tripleo.2009.03.035
PII: S1079210409002182
Data de Carregamento: 30/06/2009
Data de Publicação: 29/09/2009
==================================================

[...]
```

<br />

### `Resultados_log.txt`
```
Pesquisando Adenomatoid odontogenic tumour AND Ameloblastic fibro-odontoma...
1 resultados encontrados para Adenomatoid odontogenic tumour AND Ameloblastic fibro-odontoma.
Houve 1 resultados novos. 0 resultados já existentes foram ignorados.


Pesquisando Adenomatoid odontogenic tumour AND Ameloblastoma...
7 resultados encontrados para Adenomatoid odontogenic tumour AND Ameloblastoma.
Houve 7 resultados novos. 0 resultados já existentes foram ignorados.


Pesquisando Adenomatoid odontogenic tumour AND Ameloblastic carcinoma...
Nenhum resultado encontrado para Adenomatoid odontogenic tumour AND Ameloblastic carcinoma.


Pesquisando Adenomatoid odontogenic tumour AND Calcifying odontogenic cyst...
6 resultados encontrados para Adenomatoid odontogenic tumour AND Calcifying odontogenic cyst.
Houve 4 resultados novos. 2 resultados já existentes foram ignorados.


Pesquisando Adenomatoid odontogenic tumour AND Calcifying epithelial odontogenic tumour...
10 resultados encontrados para Adenomatoid odontogenic tumour AND Calcifying epithelial odontogenic tumour.
Houve 10 resultados novos. 0 resultados já existentes foram ignorados.

[...]
```

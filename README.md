# Busca Múltipla de Artigos na Base do ScienceDirect
Pequena aplicação que permite efetuar, em um único passo, buscas simultâneas de palavras-chave diferentes na base de dados de artigos científicos do ScienceDirect através da [ScienceDirect Search API V2](https://dev.elsevier.com/documentation/ScienceDirectSearchAPI.wadl).

Esta aplicação possibilita a busca rápida de artigos científicos, necessária na confecção de Revisões da Literatura e Revisões Sistemáticas / PRISMA.

Para cada artigo encontrado, são apresentados os seguintes dados:

* Título (*title*)
* Revista (*sourceTitle*)
* Volume (*volumeIssue*) (quando disponível)
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
5. Escolha se deseja utilizar a busca legada, utilizando o método **GET** da *api*, ou nova, utilizando o método **PUT** da *api*, [recomendada pela Elsevier](https://dev.elsevier.com/documentation/ScienceDirectSearchAPI.wadl). A aplicação está pronta para executar as buscas no método novo (**PUT**), mas, caso queira executar a busca no método legado, comente a linha 529 e descomente a linha 528 de `index.js`.


> *The PUT interface is the native layer and recommended choice for this API. The GET interface offers support for legacy requests, field and parameter names, etc. but is emulated and thus less robust.*
> > A interface PUT é a camada nativa e a escolha recomendada para esta API. A interface GET oferece suporte para solicitações legadas, nomes de campos e parâmetros, etc., mas é emulada e, portanto, menos robusta.

6. No diretório raiz do projeto, execute `yarn start` ou `node index.js` para rodar a aplicação e efetuar as buscas.
7. Ao finalizar, serão gerados três arquivos:
	- **Resultados Distintos.txt**, que conterá todos os artigos encontrados nas buscas.
	- **Resultados Duplicados Distintos.txt**, que conterá os artigos duplicados recolhidos das buscas.
   - **Resultados_log.txt**, que conterá o passo-a-passo das buscas (*log*).
   
<br />
   
## Exemplos de *Output*
### `Resultados Distintos.txt`
```
==================================================
897 RESULTADOS PESQUISADOS
438 RESULTADOS DISTINTOS
==================================================

==================================================
Título: Primordial odontogenic tumour: A systematic review of the common but also unusual features of this novel entity
Revista: Journal of Stomatology, Oral and Maxillofacial Surgery
Volume: 121
Autores: L. Azzi, L. Tettamanti, A. Di Francesco, M. P. Cerati, V. Maurino
URL: https://www.sciencedirect.com/science/article/pii/S2468785520300422?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/j.jormas.2020.02.008
PII: S2468785520300422
Data de Carregamento: 03/03/2020
Data de Publicação: 29/09/2020
==================================================

==================================================
Título: An international collaborative study of 105 new cases of adenomatoid odontogenic tumors
Revista: Oral Surgery, Oral Medicine, Oral Pathology and Oral Radiology
Volume: undefined
Autores: Ana Luiza Oliveira Corrêa Roza, Román Carlos, Willie F. P. van Heerden, Bruno Augusto Benevenuto de Andrade, Pablo Agustin Vargas
URL: https://www.sciencedirect.com/science/article/pii/S2212440320310336?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/j.oooo.2020.06.001
PII: S2212440320310336
Data de Carregamento: 08/06/2020
Data de Publicação: 08/06/2020
==================================================

==================================================
Título: 10: Odontogenic Cysts and Tumors
Revista: Gnepp's Diagnostic Surgical Pathology of the Head and Neck
Volume: undefined
Autores: Victoria l. Woo, Angela C. Chi, Brad W. Neville
URL: https://www.sciencedirect.com/science/article/pii/B9780323531146000109?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/B978-0-323-53114-6.00010-9
PII: B9780323531146000109
Data de Carregamento: 28/05/2020
Data de Publicação: 30/12/2021
==================================================

[...]
```

<br />

### `Resultados Duplicados Distintos.txt`
```
==================================================
459 RESULTADOS DUPLICADOS
343 RESULTADOS DUPLICADOS DISTINTOS
==================================================

==================================================
Título: Index
Revista: Biomaterials for 3D Tumor Modeling
Volume: undefined
URL: https://www.sciencedirect.com/science/article/pii/B9780128181287000356?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/B978-0-12-818128-7.00035-6
PII: B9780128181287000356
Data de Carregamento: 03/09/2020
Data de Publicação: 30/12/2020
==================================================

==================================================
Título: Subject Index
Revista: Journal of Oral and Maxillofacial Surgery
Volume: 68
URL: https://www.sciencedirect.com/science/article/pii/S0278239110015892?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/S0278-2391(10)01589-2
PII: S0278239110015892
Data de Carregamento: 20/11/2010
Data de Publicação: 30/12/2010
==================================================

==================================================
Título: Table of Contents
Revista: Journal of Endodontics
Volume: 37
URL: https://www.sciencedirect.com/science/article/pii/S0099239911003438?dgcid=api_sd_search-api-endpoint
DOI: 10.1016/S0099-2399(11)00343-8
PII: S0099239911003438
Data de Carregamento: 11/04/2011
Data de Publicação: 30/05/2011
==================================================

[...]
```

<br />

### `Resultados_log.txt`
```
Pesquisando odontogenic tumors and hybrid...
Efetuando busca na página 1...
Efetuando busca na página 2...
Efetuando busca na página 3...
Efetuando busca na página 4...
453 resultados encontrados para odontogenic tumors and hybrid.
Houve 393 resultados novos. 60 resultados já existentes foram ignorados. 14 novas duplicatas foram registradas.


Pesquisando hybrid odontogenic lesions...
Efetuando busca na página 1...
Efetuando busca na página 2...
Efetuando busca na página 3...
Efetuando busca na página 4...
444 resultados encontrados para hybrid odontogenic lesions.
Houve 45 resultados novos. 399 resultados já existentes foram ignorados. 329 novas duplicatas foram registradas.
```

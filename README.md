# Analytical Hierarchy Process Decision Tool

## Overview

This project implements a web application for the selection of mining methods for conceptual mining projects. The tool uses the Analytical Hierarchy Process (AHP) based on Saaty's methodology to assist professionals in evaluating and comparing different mining options. The application facilitates decision-making in the early stages of mining projects by allowing users to input criteria and options, perform pairwise comparisons using intuitive slider controls, and generate a priority vector that reflects the best choices economically and technically. The tool is part of the Mafmine software suite for economic analyses of mining projects.

## Features

- **AHP-Based Evaluation:** Employs the Analytical Hierarchy Process to systematically compare and prioritize alternatives based on user-defined criteria, supporting robust decision-making across diverse applications.
- **Intuitive Interface:** User-friendly design with slider buttons for manipulating matrices and performing pairwise comparisons.
- **Flexible Project Management:** Enables users to name criteria and options, assign display symbols, and export projects as JSON. Projects can be resumed from local storage or imported from a JSON file.
- **Decision Support:** Provides a clear presentation of results through a priority vector to support early-stage project decision-making.

## Technologies Used

- **Frontend:**
  - Vue.js (utilizing Vue CLI for project setup)
  - JavaScript (ES6+)
  - HTML5
  - CSS3
- **Libraries and Tools:**
  - vue-router
  - vuex
  - vue-meta
  - lodash
  - ESLint with eslint-plugin-vue for code quality

## How to Use

1. **Access the application interface.**
2. **Input your criteria and options:** Name each criterion and option, and assign a representative symbol.
3. **Perform pairwise comparisons:**  
   - **Stage 1:** Compare each option against the defined criteria using slider controls.  
   - **Stage 2:** Define the importance of each criterion.
4. **Review the results:** The application calculates and presents a priority vector based on the AHP method.
5. **Manage your projects:** Export your current project to JSON, resume saved projects from local storage, or import a previously exported project.

## Architecture

The application is designed as a modular and scalable single-page application (SPA) built using Vue.js. Its architecture allows for easy expansion and maintenance, with a clear separation between the user interface, state management, and data handling. The use of JSON for project export/import and local storage for persistence ensures seamless project management.

## Contributions

This project is continuously evolving, and contributions to its improvement are welcome.

### Institutional Support
This work was developed with the support of:  
- **Conselho Nacional de Desenvolvimento Científico e Tecnológico (CNPq):** For funding and fostering scientific research in Brazil.  
  [![CNPq](https://img.shields.io/badge/Supported%20by-CNPq-blue)](https://www.gov.br/cnpq/)  
- **Universidade Federal do Rio Grande do Sul (UFRGS):** For providing academic infrastructure and resources.  
  [![UFRGS](https://img.shields.io/badge/Affiliated%20with-UFRGS-red)](https://www.ufrgs.br/)  

---

### How to Contribute

We welcome contributions from the community! Here’s how you can help:  
1. **Report Bugs:** Open an issue on GitHub to document problems or suggestions.  
2. **Improve Code:** Fork the repository, make changes, and submit a pull request.  
3. **Enhance Documentation:** Help improve user guides or translate content.

## License

This project is licensed under the MIT License - see the LICENSE file for more details.



## Referências

1. **CARDOZO, F. A. C. et al.** _Choice of access for underground mining for feasibility studies_. REM-International Engineering Journal, v. 76, p. 187-193, 2023.
2. **CARDOZO, F. A. C.** _Modelagem de Escavações Subterrâneas: Contribuições para Escolha de Acessos de Mina_. Doutorado — Porto Alegre: Universidade Federal do Rio Grande do Sul, 3 mar. 2023.
3. **ATAEI, M. et al.** _Mining Method Selection By AHP Approach_. Journal of the Southern African Institute of Mining and Metallurgy, v. 108, n. 12, p. 741–749, 2008.
4. **SHAHRIAR, K. et al.** _A New Numerical Method And AHP For Mining Method Selection_. Proc. 4th Int. Symp. on ‘High performance mine production, p. 289–306, 2007.
5. **BANDA, W.** _An integrated framework comprising of AHP, expert questionnaire survey and sensitivity analysis for risk assessment in mining projects_. International Journal of Management Science and Engineering Management, v. 14, n. 3, p. 180-192, 2019.
6. **SAATY, T. L.** _How to make a decision: the analytic hierarchy process_. European Journal of Operational Research, 48(1), 9-26, 1996.
7. **RIBEIRO, M. C. D. C. R., & da Silva Alves, A.** _Aplicação do método Analytic Hierarchy Process (AHP) com a mensuração absoluta num problema de seleção qualitativa_. Sistemas & Gestão, 11(3), 270-281, 2016.

## Related Works

1. **Campos, H., Cardoso, F., Petter, C., & Petter, R.** (2025). _Mafmine: Mining Method Selection (Version 1.0.0)_ [Computer software]. Zenodo. DOI: [10.5281/zenodo.14816455](https://doi.org/10.5281/zenodo.14816455). GitHub repository: [Mafmine MMS](https://github.com/higorjsc/mafmine_mms).

2. **Campos, H., Cardoso, F., Petter, C., & Petter, R.** (2025). _Mafmine: Selection of Mine Acess for Underground Mining (Version 2.0.0)_ [Computer software]. Zenodo. DOI: [10.5281/zenodo.14825336](https://doi.org/10.5281/zenodo.14825336). GitHub repository: [Mafmine MAS](https://github.com/higorjsc/mafmine_mas).

3. **Campos, H. J. S., Cardozo, F. A. C., Otávio, P. C., & Lenz, V. M.** (2024, September). _Development of an Application for the Selection of Mining Methods for Conceptual Mining Projects_. Paper presented at the 23rd Mining Seminar. DOI: [10.5151/2594-357X-40715](https://doi.org/10.5151/2594-357X-40715). 

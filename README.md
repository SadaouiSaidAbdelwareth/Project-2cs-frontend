# React + TypeScript + Vite
# Demonstration for the sonatrac forage web application

![SignIn](https://github.com/user-attachments/assets/9ac47f3a-bf1f-4ad1-b34e-d7ae9fbf2476)
![generalDashboard](https://github.com/user-attachments/assets/e16a88f3-73f0-4164-97eb-103392053501)
![phasesDash](https://github.com/user-attachments/assets/efc768c3-aff8-4201-b9b3-5a332eaabd31)
![phasesDshOperation](https://github.com/user-attachments/assets/ae309557-741d-4fd8-8ef0-bd7cbe43e12a)
![oprationsDsh](https://github.com/user-attachments/assets/e41f1481-2e1d-4e44-b61d-88d10364a796)
![daysDashCout](https://github.com/user-attachments/assets/01659d84-f1b6-4af3-b320-ce269336eda9)
![daysDashRemarque](https://github.com/user-attachments/assets/61501d56-1245-4e47-989b-841ee16ec054)
![daysDashProblem](https://github.com/user-attachments/assets/aa6b0fa7-1efc-4625-a364-47c22f6d5420)
![daysDashExcel](https://github.com/user-attachments/assets/0c6a46ff-3e29-499e-a955-bba24d8bdf46)
![settings](https://github.com/user-attachments/assets/3f9486e7-50ba-43bc-ae6a-264299c9c314)
![listSondages](https://github.com/user-attachments/assets/07ec9365-6d19-4251-8268-d9bc3b51bae1)
![formeSondage1](https://github.com/user-attachments/assets/2fbdbacf-9cbe-498e-aaeb-643d8415ffab)
![formeSondage2](https://github.com/user-attachments/assets/fc7a9aaf-588c-4f44-bc28-e86e1bc38189)
![formeSondage3](https://github.com/user-attachments/assets/0dd4b6b4-18d5-4044-b465-6fd3a640bf55)
![ListExcelDays](https://github.com/user-attachments/assets/6cd949b4-73c0-42b1-a1ea-f569ec188f92)
![addProblemDay](https://github.com/user-attachments/assets/92700f68-6237-44e6-8c1c-4268383547dd)
![listeProblemDay](https://github.com/user-attachments/assets/3b0ff291-6717-4f60-9dfb-12466f77f64b)



This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```



// some point a verifier 
 1. chaque sondage doit avoir une list des operation returne sondage
 2. creation sondage avec list  operation // pas operations
 3.GET /sondages/{id}/ 
  

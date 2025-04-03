# Conversor de Moedas 💱

Aplicação mobile desenvolvida em **React Native com Expo** que permite converter valores entre diferentes moedas com base em dados da API pública [Frankfurter](https://www.frankfurter.app/). A app inclui:

- Conversão de moedas em tempo real
- Modo escuro/claro com armazenamento persistente
- Histórico de conversões local (com opção para limpar)
- Interface organizada com menu hambúrguer (Drawer)
- Navegação entre ecrãs com React Navigation

---

## 📸 Video Sobre o Funcionamento

> _([CLique para ver o Video](https://youtube.com/shorts/uDKZ9ruxXww?feature=share))_

---

## 🚀 Funcionalidades

- 🌐 Conversor de moedas com valores atualizados da internet
- 📜 Histórico local guardado com `AsyncStorage`
- 🌓 Suporte a tema escuro e claro, guardado entre sessões
- 🍔 Menu hambúrguer com navegação dinâmica:
  - Mostra/oculta itens consoante o ecrã atual
- 📱 Suporte a Android, iOS e Web com Expo

---

## ⚙️ Instalação

1. Clona este repositório:

```bash
git clone https://github.com/seu-usuario/conversor-moedas.git
cd conversor-moedas
```

2. Instala as dependências:

```bash
npm install
# ou
yarn install
```

3. Inicia o servidor:

```bash
npx expo start
```

---

## 📦 Dependências principais

```json
"@react-navigation/native": "^7.0.19",
"@react-navigation/drawer": "^7.3.7",
"@react-navigation/native-stack": "^7.3.3",
"@react-native-async-storage/async-storage": "1.23.1",
"@react-native-picker/picker": "2.9.0",
"react-native-gesture-handler": "~2.20.2",
"react-native-reanimated": "~3.16.1",
"axios": "^1.8.4"
```

Instalação extra que pode ser necessária:

```bash
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated
npx expo install @react-navigation/native @react-navigation/drawer @react-navigation/native-stack
npx expo install @react-native-picker/picker @react-native-async-storage/async-storage
```

---

## 🌐 API de Conversão

Utiliza a [Frankfurter API](https://www.frankfurter.app/docs/) para conversão de moedas sem necessidade de autenticação.

---

## 🧠 Estrutura do projeto

```
conversor-moedas/
├── App.tsx
├── src/
│   ├── components/
│   │   ├── CurrencyConverter.tsx
│   │   └── CustomDrawerContent.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── ConverterScreen.tsx
│   │   ├── AboutScreen.tsx
│   │   └── HistoryScreen.tsx
```

---

## 👤 Autor

- Gonçalo Landeiro e João Natalli

---

## 📄 Licença

Este projeto é open-source e está licenciado sob a licença MIT.

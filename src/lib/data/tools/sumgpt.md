# SumGPT

Achieve detailed summarization of extensive documents through 🚀ultra-fast parallelized completion with APIs provided by [OpenAI](https://openai.com/).

### 🌟 Features

- 📄 Summarize document (.txt, .md).
- 🤖 Customizable parameters and bot persona for refined response generation.
- 🚀 Facilitates parallel processing of chunks.
- 💼 Export & import configs for easy sharing and reuse.
- 🌍 Encrypted browser cookies ensure configuration settings are preserved across sessions.
- 🧠 Supports multiple models:
  - `gpt-4o-mini`
  - `gpt-4o`
  - `gpt-4-turbo`
  - `gpt-3.5-turbo`

### 💡 What you need

- 🔑 OpenAI **[API keys](https://platform.openai.com/account/api-keys)**

### 💻 Running Locally

Make sure you have **[python 3.11](https://www.python.org/downloads)**

1. Clone the repository

```bash
git clone https://github.com/sean1832/SumGPT
cd SumGPT
```

1. Create a `secrets.toml` file under `.streamlit\` directory. Replace `your_secure_key` with your own password for browser cookie encryption.

```bash
mkdir .streamlit
echo "crypto_key = 'your_secure_key'" > .streamlit/secrets.toml
```

1. Execute `RUN.bat`

```bash
./RUN.bat
```

# AMUX Green Prompt

Optimize AI prompts before they reach your AI model.

AMUX Green Prompt is a lightweight JavaScript package that removes unnecessary words from prompts, helping developers reduce token usage, improve prompt efficiency, and estimate environmental impact.

---

## Features

- Prompt optimization
- Reduce unnecessary tokens
- Lightweight and fast
- Works with any AI provider
- Local prompt processing
- Environmental impact tracking
- Zero prompt storage

---

## Installation

```bash
npm install amux-green-prompt
```

---

## Quick Start

```javascript
import { optimizePrompt } from "amux-green-prompt";

const result = await optimizePrompt(
    "Hello, could you please explain Java because I need it urgently. Thank you."
);

console.log(result.optimized_prompt);
console.log(result.metrics);
```

Output

```javascript
{
    optimized_prompt: "Explain Java.",
    metrics: {
        water_saved_ml: "2.80 mL"
    }
}
```

---

## Example

### Input

```text
Hello,

Could you please explain Java because I need it urgently.

Thank you.
```

### Optimized Output

```text
Explain Java.
```

---

## API

### optimizePrompt(prompt)

Returns

```javascript
{
    optimized_prompt: String,
    metrics: {
        water_saved_ml: String
    }
}
```

---

## Supported AI Platforms

AMUX Green Prompt works with any AI model, including:

- OpenAI
- Google Gemini
- Anthropic Claude
- DeepSeek
- Ollama
- Grok
- Mistral
- Any LLM API

---

## Privacy

Your prompts are optimized locally.

Only anonymous environmental metrics (estimated water savings) may be sent to the AMUX telemetry service.

No prompt content is stored or transmitted.

---

## Why Green Prompt?

Large Language Models consume computational resources for every token processed.

Reducing unnecessary tokens can improve efficiency while contributing to lower infrastructure usage.

AMUX Green Prompt helps developers write cleaner prompts with minimal effort.

---

## Roadmap

- Better optimization rules
- Semantic prompt optimization
- Custom optimization profiles
- AI-assisted prompt refinement
- Multi-language support
- Analytics dashboard

---

## License

MIT License

---

## Links

Website

https://amux.in

npm

https://www.npmjs.com/package/amux-green-prompt

---

Built with ❤️ by AMUX

Innovating for a Smarter and Sustainable Future.

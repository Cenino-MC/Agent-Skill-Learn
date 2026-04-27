const OllamaSkill = {
    meta: {
        name: "ollama_skill",
        description: "调用本地 Ollama AI 模型回答问题"
    },

    async execute({ prompt, model = "qwen2.5:3b" }) {
        const response = await fetch("http://localhost:11434/api/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ model, prompt, stream: false })
        });

        if (!response.ok) {
            return { success: false, message: "无法连接 Ollama，请确认它正在运行" };
        }

        const data = await response.json();
        return { success: true, reply: data.response };
    }
};

module.exports = OllamaSkill;

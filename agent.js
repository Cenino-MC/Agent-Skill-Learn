const HelloSkill = require('./skills/hello-skills.js');
const OllamaSkill = require('./skills/ollama-skill.js');

class Agent {
    constructor() {
        this.skills = {
            [HelloSkill.meta.name]: HelloSkill,
            [OllamaSkill.meta.name]: OllamaSkill
        };
        console.log("🤖 Agent 启动成功！已加载 Skill:", Object.keys(this.skills));
    }

    async callSkill(skillName, params = {}) {
        const skill = this.skills[skillName];
        if (!skill) {
            return { success: false, message: `找不到技能: ${skillName}` };
        }

        console.log(`\n📢 调用技能: ${skillName}`);
        return await skill.execute(params);
    }
}

async function runAgent() {
    const myAgent = new Agent();

    // 调用 HelloSkill
    const hello = await myAgent.callSkill("hello_skill", { name: "用户" });
    console.log("\n✅ Agent 收到结果:", hello);

    // 调用 OllamaSkill
    const ai = await myAgent.callSkill("ollama_skill", { prompt: "用一句话介绍你自己" });
    console.log("\n🤖 Ollama 回复:", ai.reply);
}

runAgent();

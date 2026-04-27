/**
 * Agent 主程序：加载并调用 Skills 模块
 */

// 1. 导入我们刚刚写好的 Hello Skill
const HelloSkill = require('./skills/hello-skills.js');

// 2. 定义 Agent 核心逻辑
class Agent {
    constructor() {
        // 注册所有 Skill
        this.skills = {
            [HelloSkill.meta.name]: HelloSkill
        };
        console.log("🤖 Agent 启动成功！已加载 Skill:", Object.keys(this.skills));
    }

    // 调用指定 Skill 的方法
    async callSkill(skillName, params = {}) {
        const skill = this.skills[skillName];
        if (!skill) {
            return { success: false, message: `找不到技能: ${skillName}` };
        }

        console.log(`\n📢 调用技能: ${skillName}`);
        return await skill.execute(params);
    }
}

// --- 运行 Agent ---
async function runAgent() {
    const myAgent = new Agent();

    // 调用 HelloSkill
    const result = await myAgent.callSkill("hello_skill", { name: "用户" });
    console.log("\n✅ Agent 收到结果:", result);
}

// 启动 Agent
runAgent();
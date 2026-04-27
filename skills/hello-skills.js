// skills/hello-skills.js
const HelloSkill = {
    meta: {
        name: "hello_skill",
        description: "打招呼技能，带完整参数校验",
        version: "1.1.0"
    },

    execute: async (params = {}) => {
        // ======================================
        // 1. 基础校验：确保 params 是对象
        // ======================================
        if (typeof params !== "object" || params === null || Array.isArray(params)) {
            return {
                success: false,
                error: "参数错误",
                message: "必须传入一个对象作为参数"
            };
        }

        // ======================================
        // 2. 可选参数校验：name 格式限制
        // ======================================
        let userName = "用户";
        if ("name" in params) {
            // 类型校验：必须是字符串
            if (typeof params.name !== "string") {
                return {
                    success: false,
                    error: "类型错误",
                    message: "name 参数必须是字符串类型"
                };
            }
            // 非空校验：不能是空字符串
            const trimmedName = params.name.trim();
            if (trimmedName === "") {
                return {
                    success: false,
                    error: "内容错误",
                    message: "name 参数不能为空或全为空格"
                };
            }
            userName = trimmedName;
        }

        // ======================================
        // 3. 正常业务逻辑
        // ======================================
        const message = `👋 你好，${userName}！我是带参数校验的 Skill 模块~`;
        console.log("[HelloSkill] 执行成功");

        return {
            success: true,
            message: message,
            timestamp: new Date().toISOString()
        };
    }
};

module.exports = HelloSkill;

// 本地测试代码（直接运行文件时会执行）
if (require.main === module) {
    (async () => {
        console.log("=== 测试1：正常参数（传入名字） ===");
        console.log(await HelloSkill.execute({ name: "小明" }));

        console.log("\n=== 测试2：错误参数（数字类型） ===");
        console.log(await HelloSkill.execute({ name: 123 }));

        console.log("\n=== 测试3：错误参数（空字符串） ===");
        console.log(await HelloSkill.execute({ name: "   " }));

        console.log("\n=== 测试4：无参数（使用默认值） ===");
        console.log(await HelloSkill.execute({}));
    })();
}
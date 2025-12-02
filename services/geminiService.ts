import { GoogleGenAI, Type } from "@google/genai";
import { Molecule, Bond } from "../types";

// Safety check for API Key - handled in component via state if missing, but class expects it
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateExplanation = async (
  molecule: Molecule,
  item: string, // Bond description or Atom
  context: string = "general"
): Promise<string> => {
  if (!apiKey) return "请配置 API Key 以获取 AI 解释。";

  try {
    const prompt = `
      你是一位专业的有机化学教授。用户正在查看一个 ${molecule.name} (${molecule.formula}) 分子模型。
      用户点击了: "${item}"。
      
      请用简洁生动的中文解释这个部分的化学性质。
      
      如果选中的是化学键 (如 C=C, C-H):
      1. 解释键的类型 (Sigma, Pi).
      2. 解释杂化轨道理论 (sp, sp2, sp3).
      3. 提及键能或键长的大致比较.
      4. 如果是双键或三键，提及它的反应活性 (如亲电加成).
      
      保持回答在 150 字以内，使用 Markdown 格式。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "无法生成解释。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 服务暂时不可用，请稍后再试。";
  }
};

export const runVirtualExperiment = async (
  molecule: Molecule,
  action: string
): Promise<string> => {
  if (!apiKey) return "请配置 API Key 以运行实验。";

  try {
    const prompt = `
      你正在指导一个虚拟化学实验。
      当前分子: ${molecule.name} (${molecule.formula}).
      用户执行的操作: "${action}".
      
      请描述实验现象和化学原理：
      1. 宏观现象 (例如：颜色变化，气泡，沉淀).
      2. 微观原理 (化学反应方程式，断键成键过程).
      3. 结论 (是否发生反应，生成了什么).
      
      请用 Markdown 格式输出，语气专业且鼓励探索。
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "无法模拟实验。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "实验模拟失败。";
  }
};

export const generateQuiz = async (molecule: Molecule): Promise<string> => {
  if (!apiKey) return "{}";
   try {
    const prompt = `针对 ${molecule.name} 生成一个简单的单项选择题。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            answer: { type: Type.STRING, description: "Index of the correct option (0-3)" },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "answer", "explanation"]
        }
      }
    });

    return response.text || "{}";
  } catch (error) {
    console.error("Gemini API Quiz Error:", error);
    return "{}";
  }
}
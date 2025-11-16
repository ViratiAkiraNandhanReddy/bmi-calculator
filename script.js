// Helper
const qs = sel => document.querySelector(sel);

// Elements
const calcBtn = qs('#calcBtn');
const resultCard = qs('#resultCard');
const categoryText = qs('#categoryText');
const tipsText = qs('#tipsText');
const healthScoreEl = qs('#healthScore');

// BMI category
function computeBMI(bmi) {
    if (bmi < 18.5) return { cat: "Underweight", tip: "Increase nutritious food intake." };
    if (bmi < 25) return { cat: "Normal", tip: "Maintain active lifestyle & balance." };
    if (bmi < 30) return { cat: "Overweight", tip: "Increase daily activity & reduce sugars." };
    return { cat: "Obesity", tip: "Consult a healthcare provider for a structured plan." };
}

// Health score
function calcHealthScore(bmi, age, sleep) {
    const ideal = 22;

    const bmiPenalty = Math.min(100, Math.abs(bmi - ideal) * 3);
    const agePenalty = Math.max(0, (age - 30) * 0.4);
    const sleepPenalty = sleep < 6 ? 10 : sleep > 9 ? 5 : 0;

    return Math.max(0, 100 - Math.round(bmiPenalty + agePenalty + sleepPenalty));
}

// Main calculation
calcBtn.onclick = () => {
    const age = parseInt(qs('#age').value) || 30;
    const sleep = parseInt(qs('#sleep').value) || 7;
    const w = parseFloat(qs('#wKg').value);
    const h = parseFloat(qs('#hCm').value);

    if (!w || !h) return alert("Enter valid weight and height.");

    const bmi = w / ((h / 100) ** 2);
    const res = computeBMI(bmi);

    categoryText.textContent = res.cat;
    tipsText.textContent = res.tip;
    healthScoreEl.textContent = calcHealthScore(bmi, age, sleep) + "/100";

    resultCard.hidden = false;
};
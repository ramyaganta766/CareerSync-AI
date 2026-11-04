/**
 * CareerSync AI - Skill Gap Analysis Engine
 * Compares student skills with benchmark role requirements and computes readiness score.
 */
export const analyzeSkills = (studentSkills = [], jobSkills = []) => {
  const results = jobSkills.map((jobSkill) => {
    const studentSkill = studentSkills.find(
      (s) => s.name.toLowerCase() === jobSkill.name.toLowerCase()
    );
    const current = studentSkill?.level || 0;
    const required = jobSkill.requiredLevel;
    const weight = jobSkill.weight || 1;
    const gap = Math.max(0, required - current);

    let status = "Completed";
    if (gap > 1) {
      status = "High Priority";
    } else if (gap === 1) {
      status = "Needs Improvement";
    }

    return {
      name: jobSkill.name,
      current,
      required,
      gap,
      weight,
      status,
    };
  });

  let obtained = 0;
  let total = 0;

  results.forEach((skill) => {
    obtained += Math.min(skill.current, skill.required) * skill.weight;
    total += skill.required * skill.weight;
  });

  const score = total === 0 ? 0 : Math.round((obtained / total) * 100);

  return {
    readinessScore: score,
    skills: results,
  };
};

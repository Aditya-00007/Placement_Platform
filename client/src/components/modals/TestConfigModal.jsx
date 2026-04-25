import { useState } from "react";
import axios from "axios";

export default function TestConfigModal({ job, onClose }) {
  const [duration, setDuration] = useState("");
  const [passingScore, setPassingScore] = useState("");
  const [rules, setRules] = useState([
    { skill: "", difficulty: "", question_count: "" },
  ]);

  if (!job) return null;

  const handleRuleChange = (index, field, value) => {
    const updated = [...rules];
    updated[index][field] = value;
    setRules(updated);
  };

  const addRule = () => {
    setRules([...rules, { skill: "", difficulty: "", question_count: "" }]);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!duration || !passingScore) {
      return alert("Fill duration & passing score");
    }
    for (let rule of rules) {
      if (!rule.skill || !rule.difficulty || !rule.question_count) {
        return alert("Fill all rule fields");
      }
    }
    try {
      // 1. Create config
      const token = localStorage.getItem("token");
      const configRes = await axios.post(
        "/api/employer/test-config",
        {
          job_id: job.id,
          duration,
          passing_score: passingScore,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const test_config_id = configRes.data.id;

      // 2. Add rules
      await axios.post(
        "/api/employer/test-rules",
        {
          test_config_id,
          rules,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Test created ✅");
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[500px]">
        <h2 className="text-xl font-bold mb-4">Add Test for Job #{job.id}</h2>

        {/* Config */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <input
            type="number"
            placeholder="Duration (min)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            placeholder="Passing Score"
            value={passingScore}
            onChange={(e) => setPassingScore(e.target.value)}
            className="border p-2 rounded"
          />
        </div>

        {/* Rules */}
        <h3 className="font-semibold mb-2">Rules</h3>

        {rules.map((rule, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input
              placeholder="Skill"
              value={rule.skill}
              onChange={(e) => handleRuleChange(i, "skill", e.target.value)}
              className="border p-2 w-1/3 rounded"
            />

            <select
              value={rule.difficulty}
              onChange={(e) =>
                handleRuleChange(i, "difficulty", e.target.value)
              }
              className="border p-2 w-1/3 rounded"
            >
              <option value="">Difficulty</option>
              <option value="EASY">EASY</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HARD">HARD</option>
            </select>

            <input
              type="number"
              placeholder="Count"
              value={rule.question_count}
              onChange={(e) =>
                handleRuleChange(i, "question_count", e.target.value)
              }
              className="border p-2 w-1/4 rounded"
            />

            <button
              onClick={() => removeRule(i)}
              className="bg-red-500 text-white px-2 rounded"
            >
              ✕
            </button>
          </div>
        ))}

        <button
          onClick={addRule}
          className="text-sm bg-gray-200 px-3 py-1 rounded mb-3"
        >
          + Add Rule
        </button>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

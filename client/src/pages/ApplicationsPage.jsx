const empResult = await client.query(
  "SELECT id FROM employers WHERE user_id = $1",
  [req.user.id],
);

if (empResult.rows.length === 0) {
  return res.status(404).json({ error: "Employer not found" });
}
const employer_id = empResult.rows[0].employer_id;

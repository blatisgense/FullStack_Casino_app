export const get_data = async (req, res) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

import { News } from "../../models/News/News";

export const deleteNewsById = (req, res) => {
    const { id } = req.params;

    News
        .deleteOne({_id: id})
        .exec()
        .then(log => {
            const { deletedCount } = log;
            if (!deletedCount) {
                return res.status(404).json({
                    message: `No valid entry found by ID ${id}`,
                    log,
                });
            }

            res.status(200).json({
                message: `Deleted article with ID: ${id}`,
                log,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            })
        });
};

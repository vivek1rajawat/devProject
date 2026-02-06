const mongoose = require('mongoose')

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //reference to the user collection
        required: true,
    },
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
    },
    status: {
        type: String,
        require: true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},
{
    timestamps: true,
}
);

connectionRequestSchema.index({fromUserId: 1, toUserId: 1})
connectionRequestSchema.pre("save", async function () {
    const connectionRequest = this;

    // prevent sending request to self
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
        throw new Error("Cannot send connection request to yourself");
    }
});

const ConnectionRequestModel = new mongoose.model("ConnectionRequestModel", connectionRequestSchema);

module.exports = ConnectionRequestModel;
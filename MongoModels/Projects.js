const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const projectSchema = new mongoose.Schema(
  {
    projectProcessor: {
      type: Object,
      required: true,
    },
    projectTitle: {
      type: String,
      required: true,
    },
    projectBrief: {
      type: String,
      required: true,
    },
    projectImage: {
      type: String,
      required: true,
    },
    projectCircuitImage: {
      type: String,
      required: true,
    },
    projectDescription: {
      type: String,
      required: true,
    },
    components:{
      type: [Object],
      required:true,
    }
  },

  {
    timestamps: true,
  }
);

projectSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNum",
  start_seq: 500,
});

//there is something like the sequence number which we are supposed to know

module.exports = mongoose.model("Project", projectSchema);

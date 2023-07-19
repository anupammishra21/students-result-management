const mongoose = require('mongoose');
const Schemae = mongoose.Schema;

const crudSchema = Schemae({
    firstname: { type: String },
    lastname: { type: String },
    fullname: { type: String },
    gender: { type: String },
    maths: { type: Number},
    cs: { type: Number},
    physics: { type: Number},
    chemistry: { type: Number},
    total: { type: Number},
    percentage: { type: Number},
    grade: { type: String},
    image: { type: String },
    isDeleted:{type:Boolean, enum:[true,false], default:false}

    
    

 
    
},
 {
    timestamps: true,
    versionKey: false
}
)

module.exports = mongoose.model('crud', crudSchema);
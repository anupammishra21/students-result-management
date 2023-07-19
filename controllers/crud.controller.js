
const Crud = require('../models/crud.model');
const fs = require('fs');

const mailer=require('../helper/mailer')

class CrudController {
    // method list



    async list(req, res) {
        try {
            let all_data = await Crud.find({isDeleted:false})
            // console.log(all_data);   
            res.render('list', {
                title: "List",
                all_data
            })
        } catch (err) {
            throw err;
        } 
    }

//    method add

        async add(req, res) {
            try {
                res.render('add', {
                    title: "Add Form"
                })
            } catch (err) {
                throw err;
            }
        }


        // method insert


        async insert(req, res) {
            try {
                req.body.fullname = String(req.body.firstname)+ " " + String(req.body.lastname)
                req.body.total = Number(req.body.maths)+Number(req.body.physics)+Number(req.body.cs)+Number(req.body.chemistry)
                req.body.percentage=Number((req.body.total/400)*100)
                if (req.body.percentage>=80 && req.body.percentage<=100) {
                    req.body.grade='A'
                    
                }  else if (req.body.percentage>=60 && req.body.percentage<=79) {
                    req.body.grade='B'
                    
                }  else if (req.body.percentage>=40 && req.body.percentage<=59) {
                    req.body.grade='c'
                    
                } else{
                    req.body.grade = "F"
                }

              



                // console.log(req.body);
                // console.log(req.file);

             

                req.body.image = req.file.filename;

                console.log(req.body, "after");

                let save_data= await Crud.create(req.body)
                console.log("savedData", save_data);
           

            if (save_data) {

                // throw the  mail

                
                console.log("data saved sucessfully");
                res.redirect('/')
                
            }
            } catch (err) {
                throw err;
            }
        }

        // soft delete

        async delete(req,res){


            try{
                let update_obj={
                    isDeleted: true,
                }

                let delete_data=await Crud.findByIdAndUpdate(
                    req.params.id,
                    update_obj
                )
                if (delete_data) {
                    console.log("data deleted sucessfully");
                    res.redirect("/")
                    
                }



            } catch(err){
                throw err
            }
        }

}

module.exports = new CrudController()

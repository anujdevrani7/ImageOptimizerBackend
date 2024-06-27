import express from "express"
const app=express();
import cors from "cors"
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from "sharp";
// Helpers to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOption={
    origin:"http://localhost:3000"
}
app.use(cors(corsOption))
app.use('/public', express.static(path.join(__dirname, 'public'),{
    'cacheControl':'public',
    maxAge:'1d'
}));

app.get("/getimages/about", async (req, res) => { 
    let response=[];
    const imageArray=[
        "http://localhost:7000/public/images/5.jpg",
        "http://localhost:7000/public/images/6.jpg",
        "http://localhost:7000/public/images/7.jpg",
        "http://localhost:7000/public/images/8.jpg",
    ];
    for(let imageurl of imageArray){
        try{
            const blurUrl=await generateBlur(imageurl);
            response.push({
                image:imageurl,
                blurImage:blurUrl
            })
        }
        catch(err){
            console.log("error is : ",err)
        }
    }
    res.send({
        data:response,
        status:"ok report"
    })
});
app.get("/getimages/contact", async (req, res) => { 
    let response=[];
    const imageArray=[
        "http://localhost:7000/public/images/9.jpg",
        "http://localhost:7000/public/images/10.jpg",
        "http://localhost:7000/public/images/11.jpg",
        "http://localhost:7000/public/images/12.jpg",
    ];
    for(let imageurl of imageArray){
        try{
            const blurUrl=await generateBlur(imageurl);
            response.push({
                image:imageurl,
                blurImage:blurUrl
            })
        }
        catch(err){
            console.log("error is : ",err)
        }
    }
    res.send({
        data:response,
        status:"ok report"
    })
});
app.get("/getimages/services", async (req, res) => { 
    let response=[];
    const imageArray=[
        "http://localhost:7000/public/images/13.jpg",
        "http://localhost:7000/public/images/14.jpg",
        "http://localhost:7000/public/images/15.jpg",
        "http://localhost:7000/public/images/16.jpg",
    ];
    for(let imageurl of imageArray){
        try{
            const blurUrl=await generateBlur(imageurl);
            response.push({
                image:imageurl,
                blurImage:blurUrl
            })
        }
        catch(err){
            console.log("error is : ",err)
        }
    }
    res.send({
        data:response,
        status:"ok report"
    })
});


app.get("/getimages/home",async(req,res)=>{
    let response=[];
    const imageArray=[
        "http://localhost:7000/public/images/1.jpg",
        "http://localhost:7000/public/images/2.jpg",
        "http://localhost:7000/public/images/3.jpg",
        "http://localhost:7000/public/images/4.jpg",
    ];
    for(let imageurl of imageArray){
        try{
            const blurUrl=await generateBlur(imageurl);
            response.push({
                image:imageurl,
                blurImage:blurUrl
            })
        }
        catch(err){
            console.log("error is : ",err)
        }
    }
    res.send({
        data:response,
        status:"ok report"
    })
})






const generateBlur=async(imageUrl)=>{
    try {
        const imageResponse=await fetch(imageUrl)
        if(!imageResponse.ok){
            console.log("error in fetching the image")
            return
        }
        const imageBuffer=await imageResponse.arrayBuffer()
        const resizedImage=await sharp(Buffer.from(imageBuffer)).resize(10,10).toBuffer()
        const base64Image = resizedImage.toString('base64');
        return(`data:image/jpeg;base64,${base64Image}`)
    } catch (error) {
        console.log("error is  : ",error)
    }
}
app.listen(7000,()=>{
    console.log("app is running on port no 7000")
})
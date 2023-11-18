import { useState, useEffect } from "react";
// import { uploadFile } from '../utils/uploadFile'
import AWS from 'aws-sdk';
import { useQuery } from "@apollo/client";
import { GET_ME, GET_USER_COLLECTIONS } from "../utils/queries";
import UserProfile from "../components/UserProfile";
import Cards from "../components/Cards";

const dummy = 'test';

const S3_BUCKET='collectors-connect-collections-bucket'
const AWS_ACCESS_KEY_ID='AKIAX4RHXPPRJGIUV3RX'
const AWS_SECRET_ACCESS_KEY='SAcGXR9YQZE0ksXJ1GumKWaKmppX9L4ps5FIxRPK'
const AWS_REGION='us-east-1'

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
});
const s3 = new AWS.S3();



// const getImageData = async (req, res) => {
//   console.log("Hello")
//   const imageData = await s3.getObject(params, function(err,data) {
//     if (err) console.log(err, err.stack);
//     else {
//         console.log(data)
//         console.log(data.Body)
//         return data;
//     };
// }).promise();

//   console.log(imageData)
//   console.log('hmm')
//   res.contentType('image/jpeg');
//   res.setHeader('Content-Type', imageData.ContentType);
//   res.send(imageData.Body);
// };

async function urlResult (params) {
    const promise = s3.getSignedUrlPromise('getObject', params);
    return promise
        .then((url) => {
            return url
        }, function(err) { console.log(err) })}



console.log

console.log(urlResult())

const TestImage = () => {
    const { loading: userLoading, data: userData } = useQuery(GET_ME);
    
    const user = userData?.me || {};
    console.log(user)
    console.log(user.collections[0].image)

    

    const params = {
        Bucket: S3_BUCKET,
        Key: user.collections[0].image,
      }

    const [picture, setPicture] = useState('');

    useEffect(() => {
        urlResult(params)
        .then(picture => setPicture(picture))
        .catch(error => {
            console.log(error);
        })
    }, [])

  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  console.log(picture);

      return  (
          <div className="TestPage">
      <div>
        <img src={picture}></img>
      </div>
    </div>
  );
}

export default TestImage;
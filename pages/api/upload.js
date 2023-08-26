import multiparty from "multiparty";
export default async function handler(req, res) {
  const form = new multiparty.Form();
  const { fields, files } = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
  console.log("length:", files.file.length);
  console.log(fields);
  res.json("ok");
}

//stops nextjs from parsing the files to json
export const config = {
  api: { bodyParser: false },
};

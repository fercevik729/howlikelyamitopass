// Get the JSON objects from the file
const fs = require("fs").promises;
const fetch = require("node-fetch");

async function test() {
  const file = await fs.readFile(
    process.cwd() + "/src/app/sample.json",
    "utf8",
  );

  const json = JSON.parse(file);
  const keys = Object.keys(json);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = json[key];

    // title, description, units, offered
    const obj = {
      title: key,
      description: value.description,
      units: value.units,
      offered: value.offered,
    };
    console.log("OBJ:", obj);
    fetch("http://helpmepass.study/api/course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => {
        console.log("Response received");
        return res.json();
      })
      .then((json) => console.log("JSON:", json))
      .catch((err) => console.log(err));

    // sleeps for a few milliseconds
    await new Promise((resolve) => setTimeout(resolve, 7000));

    // const data = await res.json();
    // console.log("Response", data)
  }
}

test();

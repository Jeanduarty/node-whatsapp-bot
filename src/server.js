const venom = require("venom-bot");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let clientVenom;
venom.create().then((client) => (clientVenom = client));

function sendMessage(to, message) {
  clientVenom.sendText(`${to}@c.us`, `${message}`).then((result) => {
    console.log("Result: ", result); //retorna um objeto de successo
  });
}

app.get("/", (req, res) => {
  console.log("home");
  return res.send("Bem vindo ao meu servidor!");
});

app.post("/sms", async (req, res) => {
  const { phoneNumber, message } = req.body;
  console.log("ENTROU NA ROTA");
  //phoneNumber precisa estar no formato: 5533999999999

  try {
    if (!!clientVenom) sendMessage(phoneNumber, message);
    
  } catch (error) {
    console.log('CLIENTE NÃO ENCONTRADO!!', clientVenom);
    // console.log(error);
    return res.status(400).send();
  }

  return res.status(201).send();
});

const PORT = process.env.PORT || "3000";
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});

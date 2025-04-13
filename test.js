import ollama from "ollama";

const response = await ollama.chat({
  model: "llama3.2",
  messages: [
    {
      role: "user",
      content: `
<h1 class=dailypower>Stone Bear Rage</h1><p class=flavor><i>The spirit of the stone bear that hunts at the mountains' roots courses through you, and its fury blunts the pain of your wounds.</i></p><p class=powerstat><b>Daily</b>        <b>Primal</b>, <b>Rage</b>, <b>Weapon</b><br><b>Standard Action</b>      <b>Melee</b> weapon</p><p class=powerstat><b>Target</b>: One creature</p><p class=powerstat><b>Attack</b>: <button classname=\"attackButton\">+19 vs. AC</button></p><p class=flavor><b>Hit</b>: <button classname=\"damageButton\">3d12 + 6 </button>damage.</p><p class=powerstat><b>Miss</b>: Half damage.</p><p class=flavor><b>Effect</b>: You enter the rage of the stone bear. Until the rage ends, you gain resistance to all damage equal to 5.</p><br>`,
    },
  ],
});
console.log(response.message.content);

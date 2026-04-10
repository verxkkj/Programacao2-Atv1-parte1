import todo from './core.ts';

const command = process.argv[2];

if (command === "add") {
  const item = process.argv[3];

  if (!item) {
    console.error("Por favor, forneça um item.");
    process.exit(1);
  }

  await todo.addItem(item);
  console.log(`Item "${item}" adicionado!`);
  process.exit(0);
}

if (command === "list") {
  const items = await todo.getItems();

  if (items.length === 0) {
    console.log("Lista vazia.");
    process.exit(0);
  }

  items.forEach((item: any, index: number) => {
    const status = item.done ? "✔️" : "❌";
    console.log(`${index}: ${status} ${item.text}`);
  });

  process.exit(0);
}

if (command === "update") {
  const index = parseInt(process.argv[3]);
  const newItem = process.argv[4];

  if (isNaN(index) || !newItem) {
    console.error("Uso: update <index> <item>");
    process.exit(1);
  }

  try {
    await todo.updateItem(index, newItem);
    console.log("Item atualizado!");
  } catch (error: any) {
    console.error(error.message);
  }

  process.exit(0);
}

if (command === "remove") {
  const index = parseInt(process.argv[3]);

  if (isNaN(index)) {
    console.error("Uso: remove <index>");
    process.exit(1);
  }

  try {
    await todo.removeItem(index);
    console.log("Item removido!");
  } catch (error: any) {
    console.error(error.message);
  }

  process.exit(0);
}

if (command === "done") {
  const index = parseInt(process.argv[3]);

  if (isNaN(index)) {
    console.error("Uso: done <index>");
    process.exit(1);
  }

  try {
    await todo.markDone(index);
    console.log("Tarefa concluída!");
  } catch (error: any) {
    console.error(error.message);
  }

  process.exit(0);
}

if (command === "clear") {
  try {
    await todo.clear();
    console.log("Lista limpa!");
  } catch (error: any) {
    console.error(error.message);
  }

  process.exit(0);
}

console.error("Comando inválido.");
process.exit(1);
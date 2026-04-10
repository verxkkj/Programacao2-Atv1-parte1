type Task = {
  text: string;
  done: boolean;
};

const jsonFilePath = __dirname + '/data.todo.json';

let list: Task[] = await loadFromFile();

async function loadFromFile(): Promise<Task[]> {
  try {
    const file = Bun.file(jsonFilePath);
    const content = await file.text();
    return JSON.parse(content || "[]") as Task[];
  } catch (error: any) {
    if (error.code === 'ENOENT') return [];
    return [];
  }
}

async function saveToFile() {
  await Bun.write(jsonFilePath, JSON.stringify(list));
}

async function addItem(item: string) {
  list.push({ text: item, done: false });
  await saveToFile();
}

async function getItems() {
  return list;
}

async function updateItem(index: number, newItem: string) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");

  list[index] = {
    ...list[index],
    text: newItem
  };

  await saveToFile();
}

async function removeItem(index: number) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");

  list.splice(index, 1);
  await saveToFile();
}

async function markDone(index: number) {
  if (index < 0 || index >= list.length)
    throw new Error("Index fora dos limites");

  list[index] = {
    ...list[index],
    done: true
  };

  await saveToFile();
}

async function clear() {
  list = [];
  await saveToFile();
}

export default {
  addItem,
  getItems,
  updateItem,
  removeItem,
  markDone,
  clear
};
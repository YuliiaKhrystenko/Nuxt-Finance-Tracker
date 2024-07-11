import { createClient } from "@supabase/supabase-js";
import { faker } from "@faker-js/faker";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY; // Admin API Key

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false },
});

const categories = ["Food", "Housing", "Car", "Entertainment"];

console.log("Fetching users with admin key:", supabaseKey);

const { data: usersData, error: userError } =
  await supabase.auth.admin.listUsers();
if (userError) {
  console.error("Error fetching users:", userError);
  process.exit(1);
}

console.log("Users data:", usersData);

const userIds = usersData.users.map((user) => user.id);
console.log(`Found ${userIds.length} users`);

async function seedTransactions() {
  // Delete existing data
  const { error: deleteError } = await supabase
    .from("transactions")
    .delete()
    .gte("id", 0);

  if (deleteError) {
    console.error("Error deleting existing data:", deleteError);
    return;
  }

  let transactions = [];

  for (const user of userIds) {
    console.log(`Generating transactions for user: ${user}`);
    for (
      let year = new Date().getFullYear();
      year > new Date().getFullYear() - 2;
      year--
    ) {
      for (let i = 0; i < 15; i++) {
        const date = new Date(
          year,
          faker.number.int({ min: 0, max: 11 }),
          faker.number.int({ min: 1, max: 28 })
        );

        let type, category;
        const typeBias = Math.random();

        if (typeBias < 0.75) {
          type = "Expense";
          category = faker.helpers.arrayElement(categories); // Category only for 'Expense'
        } else if (typeBias < 0.85) {
          type = "Income";
        } else {
          type = faker.helpers.arrayElement(["Saving", "Investment"]);
        }

        let amount;
        switch (type) {
          case "Income":
            amount = faker.number.int({ min: 2000, max: 5000 });
            break;
          case "Expense":
            amount = faker.number.int({ min: 100, max: 1000 });
            break;
          case "Saving":
          case "Investment":
            amount = faker.number.int({ min: 5000, max: 10000 });
            break;
          default:
            amount = 0;
        }

        transactions.push({
          created_at: date,
          amount,
          type,
          description: faker.lorem.sentence(),
          category: type === "Expense" ? category : null, // Category only for 'Expense'
          user_id: user, // Используем UUID пользователя
        });
      }
    }
  }

  console.log(`Inserting ${transactions.length} transactions...`);

  const { error: insertError } = await supabase
    .from("transactions")
    .insert(transactions);

  if (insertError) {
    console.error("Error inserting data:", insertError);
  } else {
    console.log("Data inserted successfully.");
  }
}

seedTransactions().catch(console.error);

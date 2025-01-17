import { useLiveQuery, drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { Text } from "react-native";
import * as schema from "../db/schema";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import { useEffect, useState } from "react";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@/drizzle/migrations";
import { addDummyData } from "@/db/addDummyData";

const App = () => {
  const db = openDatabaseSync("db", { enableChangeListener: true });
  // db.execSync([{ sql: "PRAGMA foreign_keys = ON;", args: [] }]);
  const drizzleDb = drizzle(db);

  const [date, setData] = useState<schema.Task[]>([]);

  const migration = useMigrations(drizzleDb, migrations);

  useEffect(() => {
    addDummyData(drizzleDb);

    const asyncDAta = async () => {
      await db.execAsync("PRAGMA foreign_keys = ON");
    };
    asyncDAta();
    // const cargarDatos = async()=>{

    // }
  }, [migration.success]);

  useDrizzleStudio(db);

  // Re-renders automatically when data changes
  const { data } = useLiveQuery(drizzleDb.select().from(schema.tasks));
  return <Text>{JSON.stringify(data)}</Text>;
};

export default App;

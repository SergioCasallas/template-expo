import { SectionList, Text, View, StyleSheet } from "react-native";
import { eq, sql } from "drizzle-orm";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { lists, Task, tasks } from "../db/schema";
import { useEffect, useState } from "react";
import * as schema from "../db/schema";

export default function Index() {
  const [data, setData] = useState<Task[]>([]);

  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, { schema });

  useEffect(() => {
    const load = async () => {
      const data = await drizzleDb
        .select()
        .from(tasks)
        .innerJoin(lists, eq(tasks.list_id, lists.id));
      console.log(data);
      setData(data);
    };
    load();
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Aquí puedes agregar más lógica para renderizar los datos */}
    </View>
  );
}

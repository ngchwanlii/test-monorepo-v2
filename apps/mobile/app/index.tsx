import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { TodoApiClient } from "@todo-monorepo/api-client";
import type { Todo } from "@todo-monorepo/types";

// Use 10.0.2.2 for Android emulator, localhost for iOS simulator
const API_URL = Platform.OS === "android" ? "http://10.0.2.2:3001" : "http://localhost:3001";
const api = new TodoApiClient(API_URL);

export default function TodoScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setError(null);
      const data = await api.getAll();
      setTodos(data);
    } catch (err) {
      setError("Failed to load todos. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      setError(null);
      await api.create({ title: newTitle.trim() });
      setNewTitle("");
      await fetchTodos();
    } catch (err) {
      Alert.alert("Error", "Failed to create todo");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      setError(null);
      await api.toggle(id);
      await fetchTodos();
    } catch (err) {
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Todo", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            setError(null);
            await api.delete(id);
            await fetchTodos();
          } catch (err) {
            Alert.alert("Error", "Failed to delete todo");
          }
        },
      },
    ]);
  };

  const handleStartEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editTitle.trim()) return;
    try {
      setError(null);
      await api.update(editingId, { title: editTitle.trim() });
      setEditingId(null);
      setEditTitle("");
      await fetchTodos();
    } catch (err) {
      Alert.alert("Error", "Failed to update todo");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        onPress={() => handleToggle(item.id)}
        style={styles.checkbox}
      >
        <Text style={styles.checkboxText}>{item.completed ? "[x]" : "[ ]"}</Text>
      </TouchableOpacity>

      {editingId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.editInput}
            value={editTitle}
            onChangeText={setEditTitle}
            onSubmitEditing={handleSaveEdit}
            autoFocus
          />
          <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEdit} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.todoContent}>
          <TouchableOpacity
            onPress={() => handleStartEdit(item)}
            style={styles.titleContainer}
          >
            <Text
              style={[
                styles.todoTitle,
                item.completed && styles.completedTitle,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTitle}
          onChangeText={setNewTitle}
          placeholder="What needs to be done?"
          onSubmitEditing={handleCreate}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={handleCreate} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      ) : todos.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No todos yet. Add one above!</Text>
        </View>
      ) : (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {todos.filter((t) => !t.completed).length} item(s) remaining
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  errorContainer: {
    backgroundColor: "#fee",
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    gap: 12,
  },
  checkbox: {
    padding: 4,
  },
  checkboxText: {
    fontSize: 18,
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
  },
  todoContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titleContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    opacity: 0.5,
  },
  editContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#34C759",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelButtonText: {
    color: "#888",
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteButtonText: {
    color: "red",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    alignItems: "center",
  },
  footerText: {
    color: "#888",
    fontSize: 14,
  },
});

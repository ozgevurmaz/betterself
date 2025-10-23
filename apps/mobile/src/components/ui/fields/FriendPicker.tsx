import { Friend } from "apps/mobile/types.d";
import React, { useMemo, useState } from "react";
import { View, Text, Pressable, TextInput, FlatList } from "react-native";
import { Avatar } from "../Avatar";
import { Theme } from "../../theme/tokens";
import { HalfSheet } from "./HalfSheet";

type FriendPickerProps = {
  friends: Friend[];                    
  value: Friend[];                     
  onChange: (selected: Friend[]) => void;
  multiple?: boolean;                    
  placeholder?: string;               
  allowInvite?: boolean;                
  onInvite?: (text: string) => void;    
  theme:Theme
};

export const FriendPicker: React.FC<FriendPickerProps> = ({
  friends,
  value,
  onChange,
  multiple = true,
  placeholder = "friends →",
  allowInvite = true,
  onInvite,
  theme,
}) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const selectedIds = useMemo(() => new Set(value.map((f) => f.id)), [value]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    if (!qq) return friends;
    return friends.filter((f) => {
      const u = f.username?.toLowerCase() ?? "";
      return (
        f.name.toLowerCase().includes(qq) ||
        u.includes(qq)
      );
    });
  }, [friends, q]);

  const label = useMemo(() => {
    if (value.length === 0) return placeholder;
    if (value.length === 1) return `${value[0].name}`;
    return `${value.length} selected`;
  }, [value, placeholder]);

  const toggleFriend = (f: Friend) => {
    if (multiple) {
      if (selectedIds.has(f.id)) {
        onChange(value.filter((x) => x.id !== f.id));
      } else {
        onChange([...value, f]);
      }
    } else {
      onChange([f]);
      setOpen(false);
    }
  };

  const isEmailOrHandle = (s: string) => /\S+@\S+\.\S+/.test(s) || s.startsWith("@");

  return (
    <View style={{
            paddingHorizontal: 15, paddingVertical: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center"
        }}>
      <Text style={{ color: theme.fg, marginBottom: 6 }}>Friends</Text>

      <Pressable
        onPress={() => setOpen(true)}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 14,
        }}
      >
        <Text style={{ color: theme.fg }}>{label}</Text>

        {value.length > 0 && (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {value.map((f) => (
              <View
                key={f.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 999,
                  backgroundColor: theme.fg,
                }}
              >
                <Avatar name={f.name} uri={f.avatarUrl} size={18} bg={theme.bg} fg={theme.fg} />
                <Text style={{ color: theme.bg, fontWeight: "600" }}>
                  {f.name}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Pressable>

      <HalfSheet
        visible={open}
        onClose={() => setOpen(false)}
        backgroundColor={theme.card}
        scrimColor={"rgba(0,0,0,0.45)"}
      >
        <View style={{ gap: 10, flex: 1 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: theme.fg, fontSize: 18, fontWeight: "700" }}>
              {multiple ? "Add friends to habit" : "Add friend to habit"}
            </Text>
            <Pressable onPress={() => setOpen(false)}>
              <Text style={{ color: theme.muted }}>Done</Text>
            </Pressable>
          </View>
          <TextInput
            placeholder="Search name or @username"
            placeholderTextColor={theme.muted}
            value={q}
            onChangeText={setQ}
            style={{
              color: theme.fg,
              backgroundColor: theme.card,
              borderColor: theme.border,
              borderWidth: 1,
              borderRadius: 12,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          />

          {/* Liste */}
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: theme.border }} />
            )}
            renderItem={({ item }) => {
              const active = selectedIds.has(item.id);
              return (
                <Pressable
                  onPress={() => toggleFriend(item)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 6,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Avatar
                    name={item.name}
                    uri={item.avatarUrl}
                    size={32}
                    bg={theme.fg}
                    fg={theme.bg}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.fg, fontWeight: "600" }}>{item.name}</Text>
                    {!!item.username && (
                      <Text style={{ color: theme.muted }}>@{item.username}</Text>
                    )}
                  </View>
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 4,
                      borderWidth: 1.5,
                      borderColor: active ? theme.fg : theme.border,
                      backgroundColor: active ? theme.fg : "transparent",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* tik işareti */}
                    {active && <Text style={{ color: theme.bg, fontWeight: "900" }}>✓</Text>}
                  </View>
                </Pressable>
              );
            }}
          />

          {/* Davet satırı */}
          {allowInvite && q.length > 1 && isEmailOrHandle(q) && (
            <Pressable
              onPress={() => onInvite?.(q)}
              style={{
                marginTop: 6,
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderRadius: 12,
                backgroundColor: theme.fg,
                alignSelf: "flex-start",
              }}
            >
              <Text style={{ color: theme.bg, fontWeight: "700" }}>
                Invite “{q}”
              </Text>
            </Pressable>
          )}
        </View>
      </HalfSheet>
    </View>
  );
};
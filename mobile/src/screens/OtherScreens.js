import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius } from '../theme';
import TrackCard from '../components/TrackCard';

const BROWSE_CATEGORIES = [
  { id: '1', title: 'SDA Hymnal', icon: 'book', color: Colors.primary },
  { id: '2', title: 'Worship', icon: 'hand-right', color: '#4CAF7D' },
  { id: '3', title: 'Youth', icon: 'people', color: Colors.accent },
  { id: '4', title: 'Choir', icon: 'mic', color: '#E05C5C' },
  { id: '5', title: 'Luganda', icon: 'globe', color: '#E8884B' },
  { id: '6', title: 'Sabbath', icon: 'sunny', color: '#9B7FD4' },
];

const MOCK_RESULTS = [
  { id: '1', title: 'Amazing Grace', artist: 'Central SDA Choir', duration: 220, hymnNumber: '108' },
  { id: '2', title: 'All Hail the Power', artist: 'Youth Praise Team', duration: 198, hymnNumber: '229' },
  { id: '3', title: 'Rock of Ages', artist: 'Maranatha Singers', duration: 185, hymnNumber: '300' },
];

export function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 1) {
      setHasSearched(true);
      setResults(MOCK_RESULTS.filter(t =>
        t.title.toLowerCase().includes(text.toLowerCase()) ||
        t.artist.toLowerCase().includes(text.toLowerCase()) ||
        (t.hymnNumber && t.hymnNumber.includes(text))
      ));
    } else {
      setHasSearched(false);
      setResults([]);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color={Colors.textSecondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs, hymns, artists..."
          placeholderTextColor={Colors.textTertiary}
          value={query}
          onChangeText={handleSearch}
          returnKeyType="search"
        />
        {query.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>

      {!hasSearched ? (
        <>
          <Text style={styles.browseTitle}>Browse Categories</Text>
          <View style={styles.browseGrid}>
            {BROWSE_CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.id} style={[styles.browseCard, { backgroundColor: cat.color + '22' }]}>
                <Ionicons name={cat.icon} size={28} color={cat.color} />
                <Text style={[styles.browseCardTitle, { color: cat.color }]}>{cat.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TrackCard
              track={item}
              onPress={() => navigation.navigate('Player', { track: item })}
              onMorePress={() => {}}
            />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="search-outline" size={48} color={Colors.textTertiary} />
              <Text style={styles.emptyText}>No results for "{query}"</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

export function LibraryScreen({ navigation }) {
  const TABS = ['Downloads', 'Liked', 'History'];
  const [activeTab, setActiveTab] = useState('Downloads');

  const MOCK_DOWNLOADS = [
    { id: '1', title: 'How Great Thou Art', artist: 'Maranatha Singers', duration: 245, hymnNumber: '86', isDownloaded: true },
    { id: '4', title: 'Blessed Assurance', artist: 'Central SDA Choir', duration: 267, hymnNumber: '462', isDownloaded: true },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Text style={styles.screenTitle}>My Library</Text>
      <View style={styles.tabRow}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={activeTab === 'Downloads' ? MOCK_DOWNLOADS : []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TrackCard
            track={item}
            onPress={() => navigation.navigate('Player', { track: item })}
            onMorePress={() => {}}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={48} color={Colors.textTertiary} />
            <Text style={styles.emptyText}>Nothing here yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

export function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.onboarding}>
        <Ionicons name="musical-notes" size={64} color={Colors.primary} />
        <Text style={styles.onboardingTitle}>AdventiTune</Text>
        <Text style={styles.onboardingSubtitle}>
          SDA worship music for Uganda & East Africa
        </Text>
        <TouchableOpacity
          style={styles.onboardingBtn}
          onPress={() => navigation.replace('Main')}
        >
          <Text style={styles.onboardingBtnText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },

  // Search
  searchBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    margin: Spacing.md, borderRadius: Radius.md,
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm + 2,
    borderWidth: 1, borderColor: Colors.border,
  },
  searchIcon: { marginRight: Spacing.sm },
  searchInput: { flex: 1, ...Typography.bodyMedium, color: Colors.textPrimary },

  browseTitle: {
    ...Typography.bodyLarge, fontWeight: '700', color: Colors.textPrimary,
    paddingHorizontal: Spacing.md, marginBottom: Spacing.md,
  },
  browseGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: Spacing.md, gap: Spacing.sm,
  },
  browseCard: {
    width: '47%', padding: Spacing.md,
    borderRadius: Radius.md, alignItems: 'center', gap: Spacing.sm,
  },
  browseCardTitle: { ...Typography.labelLarge },

  // Library
  screenTitle: {
    ...Typography.displaySmall, color: Colors.textPrimary,
    paddingHorizontal: Spacing.md, paddingTop: Spacing.md, paddingBottom: Spacing.md,
  },
  tabRow: {
    flexDirection: 'row', paddingHorizontal: Spacing.md,
    gap: Spacing.sm, marginBottom: Spacing.md,
  },
  tab: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full, borderWidth: 1, borderColor: Colors.border,
  },
  tabActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  tabText: { ...Typography.labelMedium, color: Colors.textSecondary },
  tabTextActive: { color: Colors.textPrimary },

  // Empty state
  empty: { alignItems: 'center', paddingTop: 60, gap: Spacing.md },
  emptyText: { ...Typography.bodyMedium, color: Colors.textSecondary },

  // Onboarding
  onboarding: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Spacing.xl, gap: Spacing.md },
  onboardingTitle: { ...Typography.displayLarge, color: Colors.textPrimary },
  onboardingSubtitle: { ...Typography.bodyLarge, color: Colors.textSecondary, textAlign: 'center' },
  onboardingBtn: {
    marginTop: Spacing.xl, backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xl, paddingVertical: Spacing.md + 2,
    borderRadius: Radius.full,
  },
  onboardingBtnText: { ...Typography.labelLarge, color: 'white', fontSize: 16 },
});

import React, { useState } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity,
  Image, StyleSheet, StatusBar, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing, Radius } from '../theme';
import TrackCard from '../components/TrackCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Mock data (replace with API calls later) ────────────────────────────────
const FEATURED_PLAYLISTS = [
  { id: '1', title: 'Sabbath Morning', subtitle: '18 songs · Peaceful worship', color: ['#4A2080', '#7C5CBF'] },
  { id: '2', title: 'Praise & Worship', subtitle: '24 songs · High energy', color: ['#1A4A2E', '#4CAF7D'] },
  { id: '3', title: 'Hymnal Classics', subtitle: '50 hymns · SDA Hymnal', color: ['#4A2A0A', '#E8B84B'] },
];

const RECENT_TRACKS = [
  { id: '1', title: 'How Great Thou Art', artist: 'Maranatha Singers', duration: 245, hymnNumber: '86', isDownloaded: true },
  { id: '2', title: 'Great Is Thy Faithfulness', artist: 'Luganda Choir', duration: 198, hymnNumber: '100' },
  { id: '3', title: 'I Surrender All', artist: 'Youth Praise Team', duration: 312 },
  { id: '4', title: 'Blessed Assurance', artist: 'Central SDA Choir', duration: 267, hymnNumber: '462', isDownloaded: true },
];

const CATEGORIES = ['All', 'Hymns', 'Worship', 'Choir', 'Youth', 'Luganda'];
// ─────────────────────────────────────────────────────────────────────────────

export default function HomeScreen({ navigation }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.background} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>{greeting()}</Text>
            <Text style={styles.appName}>AdventiTune</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person-circle-outline" size={32} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* ── Category Pills ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categories}
          contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.sm }}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.pill, activeCategory === cat && styles.pillActive]}
              onPress={() => setActiveCategory(cat)}
            >
              <Text style={[styles.pillText, activeCategory === cat && styles.pillTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Featured Playlists ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Playlists</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: Spacing.md, gap: Spacing.md }}
          >
            {FEATURED_PLAYLISTS.map((playlist) => (
              <TouchableOpacity key={playlist.id} activeOpacity={0.8}>
                <LinearGradient
                  colors={playlist.color}
                  style={styles.featuredCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Ionicons name="musical-notes" size={32} color="rgba(255,255,255,0.3)" />
                  <View style={styles.featuredCardBottom}>
                    <Text style={styles.featuredCardTitle}>{playlist.title}</Text>
                    <Text style={styles.featuredCardSubtitle}>{playlist.subtitle}</Text>
                  </View>
                  <TouchableOpacity style={styles.featuredPlayBtn}>
                    <Ionicons name="play" size={18} color={Colors.background} />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ── Hymn of the Day ── */}
        <View style={styles.section}>
          <View style={styles.hymnOfDayCard}>
            <View style={styles.hymnOfDayLeft}>
              <Text style={styles.hymnOfDayLabel}>HYMN OF THE DAY</Text>
              <Text style={styles.hymnOfDayNumber}>#341</Text>
              <Text style={styles.hymnOfDayTitle}>To God Be the Glory</Text>
              <Text style={styles.hymnOfDayArtist}>Maranatha Singers</Text>
            </View>
            <TouchableOpacity style={styles.hymnPlayBtn}>
              <LinearGradient
                colors={[Colors.primary, Colors.primaryDark]}
                style={styles.hymnPlayBtnGradient}
              >
                <Ionicons name="play" size={26} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Recently Played ── */}
        <View style={[styles.section, styles.sectionLast]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recently Played</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {RECENT_TRACKS.map((track) => (
            <TrackCard
              key={track.id}
              track={track}
              isPlaying={playingTrackId === track.id}
              onPress={() => {
                setPlayingTrackId(track.id);
                navigation.navigate('Player', { track });
              }}
              onMorePress={() => {}}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  greeting: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  appName: {
    ...Typography.displaySmall,
    color: Colors.textPrimary,
  },
  profileBtn: {
    padding: 4,
  },

  // Categories
  categories: {
    marginBottom: Spacing.lg,
  },
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  pillText: {
    ...Typography.labelMedium,
    color: Colors.textSecondary,
  },
  pillTextActive: {
    color: Colors.textPrimary,
  },

  // Sections
  section: {
    marginBottom: Spacing.xl,
  },
  sectionLast: {
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.displaySmall,
    fontSize: 18,
    color: Colors.textPrimary,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  seeAll: {
    ...Typography.labelMedium,
    color: Colors.primary,
  },

  // Featured playlist cards
  featuredCard: {
    width: SCREEN_WIDTH * 0.55,
    height: 160,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  featuredCardBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: Spacing.xs,
  },
  featuredCardTitle: {
    ...Typography.bodyLarge,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  featuredCardSubtitle: {
    ...Typography.labelSmall,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.3,
  },
  featuredPlayBtn: {
    position: 'absolute',
    bottom: Spacing.md,
    right: Spacing.md,
    width: 36,
    height: 36,
    borderRadius: Radius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Hymn of the Day
  hymnOfDayCard: {
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  hymnOfDayLeft: {
    flex: 1,
  },
  hymnOfDayLabel: {
    ...Typography.labelSmall,
    color: Colors.accent,
    marginBottom: Spacing.xs,
  },
  hymnOfDayNumber: {
    ...Typography.hymnNumber,
    fontSize: 28,
    color: Colors.primary,
    marginBottom: Spacing.xs,
  },
  hymnOfDayTitle: {
    ...Typography.bodyLarge,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs / 2,
  },
  hymnOfDayArtist: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
  },
  hymnPlayBtn: {
    marginLeft: Spacing.md,
  },
  hymnPlayBtnGradient: {
    width: 56,
    height: 56,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

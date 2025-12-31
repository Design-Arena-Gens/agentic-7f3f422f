import { NextRequest, NextResponse } from 'next/server'

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

async function getVideoMetadata(videoId: string) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    )
    if (!response.ok) throw new Error('Video not found')
    return await response.json()
  } catch (error) {
    throw new Error('Unable to fetch video metadata')
  }
}

function generateEditingTutorial(videoType: 'long' | 'short', videoTitle: string) {
  if (videoType === 'short') {
    return {
      overview: `यह YouTube Short video "${videoTitle}" के editing style का विश्लेषण है। Shorts में quick cuts, fast-paced editing, और engaging visuals का उपयोग होता है।`,
      editingStyle: 'Fast-paced, vertical format (9:16), quick transitions, text overlays, trending music, attention-grabbing hooks in first 3 seconds',
      steps: [
        {
          title: 'Footage Selection और Preparation',
          description: 'Vertical format (1080x1920) में video shoot करें या crop करें। Best moments को 15-60 seconds में fit करें।',
          tools: 'Adobe Premiere Pro, CapCut, InShot',
          timestamp: '0:00-0:15'
        },
        {
          title: 'Hook Creation (पहले 3 सेकंड)',
          description: 'Viewer को immediately grab करने के लिए shocking statement, question, या visually interesting clip से शुरू करें।',
          tools: 'Text animations, zoom effects',
          timestamp: '0:00-0:03'
        },
        {
          title: 'Quick Cuts और Transitions',
          description: 'हर 1-2 सेकंड में cut करें। Boring parts को remove करें। Fast-paced feel maintain करें।',
          tools: 'Cutting tools, transition presets',
          timestamp: 'Throughout'
        },
        {
          title: 'Text Overlays और Captions',
          description: 'Key points को highlight करने के लिए animated text add करें। Auto-captions enable करें (85% लोग बिना sound देखते हैं)।',
          tools: 'Caption tools, text animation presets',
          timestamp: 'Throughout'
        },
        {
          title: 'Music और Sound Effects',
          description: 'Trending audio या high-energy background music add करें। Sound effects से engagement बढ़ाएं।',
          tools: 'YouTube Audio Library, Epidemic Sound',
          timestamp: 'Throughout'
        },
        {
          title: 'Visual Effects और Color Grading',
          description: 'Eye-catching effects, zoom punches, और vibrant colors use करें। Thumbnail-worthy moments create करें।',
          tools: 'Color grading tools, effect presets',
          timestamp: 'Throughout'
        },
        {
          title: 'Call-to-Action',
          description: 'End में subscribe/follow reminder add करें। Next video का teaser दें।',
          tools: 'Text overlays, animations',
          timestamp: 'Last 5 seconds'
        }
      ],
      techniques: [
        'Jump cuts हर 1-2 सेकंड',
        'Vertical 9:16 aspect ratio',
        'Auto-captions for accessibility',
        'Trending audio tracks',
        'Quick zoom effects',
        'Text overlays और animations',
        'Hook in first 3 seconds',
        'Fast-paced storytelling'
      ],
      software: [
        'CapCut',
        'Adobe Premiere Pro',
        'InShot',
        'VN Video Editor',
        'Final Cut Pro'
      ],
      tips: [
        'पहले 3 सेकंड सबसे important हैं - यहां hook ज़रूर डालें',
        'Mobile screen पर preview करें - 90% viewers mobile पर देखते हैं',
        'Trending sounds use करें - discover करने में मदद मिलती है',
        'Captions ज़रूर add करें - बिना sound 85% लोग देखते हैं',
        'Watch time 100% रखने की कोशिश करें - algorithm को पसंद आता है',
        'Vertical format में shoot करें - बाद में crop करना quality कम करता है'
      ]
    }
  } else {
    return {
      overview: `यह YouTube long-form video "${videoTitle}" के editing style का विश्लेषण है। Professional editing में storytelling, pacing, और viewer retention पर focus होता है।`,
      editingStyle: 'Story-driven editing, varied pacing, B-roll integration, music layering, professional color grading, strategic cuts for retention',
      steps: [
        {
          title: 'Project Setup और Organization',
          description: 'Footage को organize करें, bins/folders बनाएं, sequence settings configure करें (1920x1080, 24-60fps)।',
          tools: 'Premiere Pro, DaVinci Resolve, Final Cut Pro',
          timestamp: 'Pre-production'
        },
        {
          title: 'Story Structure और Script Editing',
          description: 'Video को acts में divide करें (intro, body, conclusion)। Story flow optimize करें, boring parts cut करें।',
          tools: 'Script analysis, rough cut',
          timestamp: '0:00-2:00 (Intro)'
        },
        {
          title: 'A-Roll Editing (Main Footage)',
          description: 'Main talking head या footage को edit करें। Jump cuts से "ums" और pauses remove करें। Natural flow maintain करें।',
          tools: 'J & L cuts, jump cut smoothing',
          timestamp: 'Throughout'
        },
        {
          title: 'B-Roll Integration',
          description: 'A-roll के साथ relevant B-roll overlay करें। Visual interest बढ़ाएं, concepts को illustrate करें।',
          tools: 'Stock footage, screen recordings, graphics',
          timestamp: 'Throughout'
        },
        {
          title: 'Music और Sound Design',
          description: 'Background music layers add करें। Sound effects से key moments emphasize करें। Audio levels balance करें।',
          tools: 'Audio mixer, EQ, compression',
          timestamp: 'Throughout'
        },
        {
          title: 'Graphics और Text Overlays',
          description: 'Lower thirds, titles, infographics add करें। Key points को visually reinforce करें।',
          tools: 'Motion graphics templates, After Effects',
          timestamp: 'Throughout'
        },
        {
          title: 'Color Grading और Correction',
          description: 'Consistent look create करें। Skin tones fix करें। Cinematic या brand-specific color grade apply करें।',
          tools: 'Lumetri Color, DaVinci Resolve',
          timestamp: 'Final pass'
        },
        {
          title: 'Transitions और Effects',
          description: 'Smooth transitions add करें (cuts, fades, whip pans)। Over-editing से बचें।',
          tools: 'Transition presets, custom animations',
          timestamp: 'Throughout'
        },
        {
          title: 'Retention Editing',
          description: 'Pattern interrupts add करें (zoom, graphic, sound effect) हर 15-30 seconds। Viewer engagement maintain करें।',
          tools: 'Zoom effects, sound effects, visual changes',
          timestamp: 'Throughout'
        },
        {
          title: 'Final Polish और Export',
          description: 'Audio mix finalize करें, color grading review करें, export settings optimize करें।',
          tools: 'Export presets for YouTube (H.264, high bitrate)',
          timestamp: 'Post-production'
        }
      ],
      techniques: [
        'J-cuts और L-cuts for smooth audio transitions',
        'Jump cuts for pacing',
        'B-roll overlay (70-80% coverage)',
        'Music layering और dynamic audio',
        'Color grading for consistency',
        'Pattern interrupts हर 15-30 seconds',
        'Graphics और lower thirds',
        'Strategic pacing changes',
        'Sound design और effects'
      ],
      software: [
        'Adobe Premiere Pro',
        'DaVinci Resolve',
        'Final Cut Pro',
        'After Effects (graphics)',
        'Audition (audio)'
      ],
      tips: [
        'पहले 30 seconds में hook दें - viewer retention के लिए critical',
        'B-roll से visual variety बनाए रखें - monotony तोड़ता है',
        'Music से emotional tone set करें - storytelling enhance करता है',
        'Pattern interrupts से viewer attention maintain करें',
        'Audio quality पर ध्यान दें - bad audio = viewers leave',
        'Color grade consistent रखें - professional look देता है',
        'Export से पहले different devices पर preview करें',
        'Analytics देखें - कहां viewers drop off करते हैं, वहां editing improve करें'
      ]
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { videoUrl, videoType } = await request.json()

    if (!videoUrl) {
      return NextResponse.json(
        { error: 'Video URL required है' },
        { status: 400 }
      )
    }

    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL' },
        { status: 400 }
      )
    }

    const metadata = await getVideoMetadata(videoId)

    const tutorial = generateEditingTutorial(videoType, metadata.title)

    return NextResponse.json(tutorial)
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: error.message || 'कुछ गलत हो गया' },
      { status: 500 }
    )
  }
}

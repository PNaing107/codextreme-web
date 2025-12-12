# Image Optimization Guide for Carousel

## Current Image Status

Your carousel images are located in `public/assets/slideshow/desktop/`:
- bodmin-junior.jpeg (304KB)
- falmouth-finish.jpeg (330KB)
- falmouth-half.jpeg (314KB)
- gylly-from-above.jpeg (85KB)
- scootathlon.jpeg (81KB)
- selsey-from-above.jpeg (249KB)

## Optimization Recommendations

### 1. File Size Optimization

**Target Sizes:**
- Desktop: 200-500KB per image (some are already within range)
- Mobile: 100-200KB per image (will be served via responsive images)

**Action Items:**
- Compress `falmouth-finish.jpeg` (330KB) - aim for ~250KB
- Compress `falmouth-half.jpeg` (314KB) - aim for ~250KB
- Compress `bodmin-junior.jpeg` (304KB) - aim for ~250KB
- Compress `selsey-from-above.jpeg` (249KB) - aim for ~200KB
- `gylly-from-above.jpeg` (85KB) and `scootathlon.jpeg` (81KB) are already well optimized

### 2. Tools for Compression

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - JPEG compression
- [Squoosh](https://squoosh.app/) - Advanced compression with preview
- [ImageOptim](https://imageoptim.com/) - Mac app for batch processing

**Command Line (if you have ImageMagick):**
```bash
# Compress JPEG to 85% quality
convert input.jpeg -quality 85 output.jpeg

# Batch process all images
for img in *.jpeg; do
  convert "$img" -quality 85 "optimized_$img"
done
```

### 3. Aspect Ratio Consistency

**Check your images:**
- Ensure all images have the same or very similar aspect ratios
- Recommended: 16:9 (1.78:1) for hero carousels
- If aspect ratios differ, crop images to match before adding to carousel

**How to check aspect ratio:**
```bash
# Using ImageMagick
identify -format "%wx%h %[fx:w/h]" *.jpeg
```

### 4. Image Dimensions

**Recommended:**
- Minimum width: 1920px (for desktop)
- For retina displays: 3840px wide (2x)
- Current images appear to be various sizes - consider standardizing

**Resize if needed:**
```bash
# Resize to 1920px width, maintain aspect ratio
convert input.jpeg -resize 1920x output.jpeg

# Resize to 1920x1080 (16:9), crop to fit
convert input.jpeg -resize 1920x1080^ -gravity center -extent 1920x1080 output.jpeg
```

### 5. Format Considerations

**Current:** JPEG (good for photos)
**Alternative:** WebP (better compression, ~30% smaller files)

**Convert to WebP:**
```bash
# Using cwebp (WebP encoder)
cwebp -q 85 input.jpeg -o output.webp

# Batch convert
for img in *.jpeg; do
  cwebp -q 85 "$img" -o "${img%.jpeg}.webp"
done
```

**Note:** If converting to WebP, update the carousel image paths in `src/pages/index.astro` to use `.webp` extensions, and provide JPEG fallbacks for older browsers.

### 6. Content Composition

**Safe Zones:**
- Keep important content in the center 60% of the image
- This ensures content remains visible when images are cropped on different screen sizes
- The carousel uses `object-fit: cover` which may crop edges

### 7. Pre-Deployment Checklist

Before deploying:
- [ ] All images compressed to target file sizes
- [ ] All images have consistent aspect ratios (within 5% variance)
- [ ] Images are at least 1920px wide
- [ ] Important content is centered in images
- [ ] Images are optimized for web (sRGB color space)
- [ ] Test carousel on mobile devices to ensure images look good

## Implementation Notes

The carousel component uses:
- **Single image approach**: Same image for mobile and desktop (browser selects appropriate size)
- **Responsive heights**: 400px (mobile), 500px (tablet), 600px (desktop)
- **Lazy loading**: Only the first image loads eagerly, others load lazily
- **object-fit: cover**: Images maintain aspect ratio and fill container

## Quick Optimization Workflow

1. **Check dimensions**: Ensure all images are at least 1920px wide
2. **Standardize aspect ratio**: Crop all images to 16:9 (or your chosen ratio)
3. **Compress**: Use TinyPNG or Squoosh to reduce file sizes
4. **Test**: Verify images look good on mobile and desktop
5. **Deploy**: Update carousel with optimized images


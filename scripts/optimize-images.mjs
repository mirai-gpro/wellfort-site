import sharp from 'sharp';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

const PUBLIC_DIR = 'public/images';
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 80;
const JPEG_QUALITY = 85;

async function optimizeImages() {
  console.log('🔍 画像を検索中...\n');

  const files = await glob(`${PUBLIC_DIR}/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}`);

  let totalOriginal = 0;
  let totalOptimized = 0;
  let count = 0;

  for (const file of files) {
    try {
      const stats = fs.statSync(file);
      const originalSize = stats.size;
      totalOriginal += originalSize;

      // 100KB以下はスキップ
      if (originalSize < 100 * 1024) {
        console.log(`⏭️  スキップ (小さい): ${path.basename(file)}`);
        continue;
      }

      const image = sharp(file);
      const metadata = await image.metadata();

      // リサイズが必要かチェック
      const needsResize = metadata.width && metadata.width > MAX_WIDTH;

      // 処理パイプライン
      let pipeline = image;

      if (needsResize) {
        pipeline = pipeline.resize(MAX_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        });
      }

      // 拡張子に応じた最適化
      const ext = path.extname(file).toLowerCase();
      let outputBuffer;

      if (ext === '.png') {
        outputBuffer = await pipeline.png({
          quality: 80,
          compressionLevel: 9,
          palette: true
        }).toBuffer();
      } else {
        outputBuffer = await pipeline.jpeg({
          quality: JPEG_QUALITY,
          mozjpeg: true
        }).toBuffer();
      }

      const newSize = outputBuffer.length;

      // サイズが小さくなった場合のみ上書き
      if (newSize < originalSize) {
        fs.writeFileSync(file, outputBuffer);
        totalOptimized += newSize;
        const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
        console.log(`✅ ${path.basename(file)}: ${formatSize(originalSize)} → ${formatSize(newSize)} (-${reduction}%)`);
        count++;
      } else {
        totalOptimized += originalSize;
        console.log(`⏭️  スキップ (最適化済み): ${path.basename(file)}`);
      }

    } catch (err) {
      console.error(`❌ エラー: ${file}`, err.message);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 結果サマリー`);
  console.log(`   最適化ファイル数: ${count}`);
  console.log(`   元の合計サイズ: ${formatSize(totalOriginal)}`);
  console.log(`   最適化後サイズ: ${formatSize(totalOptimized)}`);
  console.log(`   削減量: ${formatSize(totalOriginal - totalOptimized)} (-${((1 - totalOptimized / totalOriginal) * 100).toFixed(1)}%)`);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

optimizeImages().catch(console.error);

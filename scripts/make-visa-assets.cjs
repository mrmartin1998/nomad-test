// scripts/make-visa-assets.cjs
const sharp = require("sharp");

(async () => {
  const src = "public/assets/visa-folder/folder-white-blur.png";
  const out = "public/assets/visa-folder/folder-360x208.png";

  await sharp(src)
    .resize(360, 208, { fit: "cover", position: "center" })
    .toFile(out);

  const meta = await sharp(out).metadata();
  console.log(`✅ wrote ${out} (${meta.width}×${meta.height})`);
})().catch((err) => {
  console.error("❌ Sharp failed:", err);
  process.exit(1);
});

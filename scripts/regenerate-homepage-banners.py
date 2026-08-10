"""Regenerate sharper homepage banner assets from design sources."""

from pathlib import Path

from PIL import Image

Image.MAX_IMAGE_PIXELS = None

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"
DESIGN = ROOT / "design"
FIGMA = DESIGN / "assets"
HOMEPAGE = DESIGN / "HOMEPAGE.png"
ARTBOARD_W = 1729


def save_jpeg(img: Image.Image, target: Path, quality: int = 90, max_edge: int = 2400) -> None:
    rgb = img.convert("RGB")
    w, h = rgb.size
    scale = min(1.0, max_edge / max(w, h))
    if scale < 1.0:
        rgb = rgb.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    rgb.save(target, format="JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{target.name}: {rgb.size[0]}x{rgb.size[1]} ({target.stat().st_size // 1024}KB)")


def from_figma(src_name: str, target_name: str, quality: int = 92, max_edge: int = 2400) -> None:
    src = FIGMA / src_name
    if not src.exists():
        stem, suffix = Path(src_name).stem, Path(src_name).suffix
        alt = FIGMA / f"{stem}(1){suffix}"
        if not alt.exists():
            raise FileNotFoundError(src_name)
        src = alt
    with Image.open(src) as im:
        save_jpeg(im, ASSETS / target_name, quality=quality, max_edge=max_edge)


def crop_homepage(box_artboard, target_name: str, quality: int = 90, max_edge: int = 2400) -> None:
    with Image.open(HOMEPAGE) as full:
        scale = full.size[0] / ARTBOARD_W
        x, y, w, h = box_artboard
        crop = full.crop(
            (
                int(x * scale),
                int(y * scale),
                int((x + w) * scale),
                int((y + h) * scale),
            )
        )
        save_jpeg(crop, ASSETS / target_name, quality=quality, max_edge=max_edge)


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)

    # Hero from Figma export (no baked title — theme renders HTML title)
    from_figma(
        "c213b5a1cb75cd57ada1e824f79e4d24c5bddd2e.png",
        "jadeed-hero-bg.jpg",
        quality=92,
        max_edge=2400,
    )

    # Full designed category cards (labels baked in — theme hides HTML overlays)
    crop_homepage((180, 1060, 400, 540), "jadeed-category-rice.jpg", quality=90, max_edge=1400)
    crop_homepage((665, 1060, 400, 540), "jadeed-category-spices.jpg", quality=90, max_edge=1400)
    crop_homepage((1150, 1060, 400, 540), "jadeed-category-oil.jpg", quality=90, max_edge=1400)

    # Special deals cards
    crop_homepage((160, 1960, 420, 480), "jadeed-deal-pepper.jpg", quality=90, max_edge=1400)
    crop_homepage((655, 1930, 420, 510), "jadeed-deal-flax.jpg", quality=90, max_edge=1400)
    crop_homepage((1150, 1960, 420, 480), "jadeed-deal-pack.jpg", quality=90, max_edge=1400)

    # Best selling product cards
    crop_homepage((160, 3980, 420, 580), "jadeed-product-rice.jpg", quality=90, max_edge=1400)
    crop_homepage((655, 3980, 420, 580), "jadeed-product-spices.jpg", quality=90, max_edge=1400)
    crop_homepage((1150, 3980, 420, 580), "jadeed-product-oil.jpg", quality=90, max_edge=1400)

    from_figma("Group 8517.png", "jadeed-rich-aroma.jpg", quality=90, max_edge=2000)
    from_figma("Group 8516.png", "jadeed-lifestyle-group.jpg", quality=90, max_edge=2400)

    print("\nHomepage banners regenerated.")


if __name__ == "__main__":
    main()

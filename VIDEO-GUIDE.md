# Adding the homepage preview videos

I can't record video of your live sites myself (no browser/screen-recorder tool
on my side), so the site is fully wired up to play them the moment you drop
them in — it just needs the actual clip files. Until then, each project shows
its screenshot (or a clean placeholder tile for the three that had no image
yet: VShare, CrystalCool, Magical Smiles) and looks completely normal.

## What to record

A short screen recording of each site's homepage — 5 to 10 seconds, scrolling
slowly from the top down through the hero and first section. Any of these
work and are free:

- **Windows** — Xbox Game Bar (`Win + G`)
- **Mac** — QuickTime Player → File → New Screen Recording, or `Cmd + Shift + 5`
- **Any OS** — [Loom](https://loom.com) or [OBS Studio](https://obsproject.com)

## Export settings

- Format: **MP4** (H.264)
- No audio needed (the previews are muted)
- Keep each file under **3–4 MB** so the site stays fast — [Handbrake](https://handbrake.fr)
  or `ffmpeg -i in.mov -vf scale=1280:-2 -an -crf 28 out.mp4` will compress it

## File names — drop these exact names into `assets/videos/`

| Project                         | File name                        |
|----------------------------------|-----------------------------------|
| ADC Systems Integration Limited  | `assets/videos/adc-home.mp4`      |
| VSHARE T&T                       | `assets/videos/vshare-home.mp4`   |
| Grandeur Structures Limited      | `assets/videos/grandeur-home.mp4` |
| CrystalCool                      | `assets/videos/crystalcool-home.mp4` |
| Greys Inn Hotel & Suite          | `assets/videos/greysinn-home.mp4` |
| Magical Smiles Dental & Maxillofacial | `assets/videos/magicalsmile-home.mp4` |
| Royal Heritage International School | `assets/videos/rhis-home.mp4`  |

That's it — no code changes needed. Both `index.html` (the auto-scrolling
strip) and `projects.html` (the full grid) already point at these exact paths,
so each video appears automatically as soon as the file exists.

## Optional — replace the 3 placeholder posters

`assets/images/vshare-home.svg`, `crystalcool-home.svg` and
`magicalsmile-home.svg` are flat, gradient-free placeholder tiles standing in
for a real screenshot. If you'd rather use an actual screenshot, take one at
1200×750px and either:
- save it over the same filename with a `.jpg` extension and update the
  `poster="..."` attribute for that project in `index.html` and
  `projects.html`, or
- just leave the placeholder — it already matches the site's flat, no-gradient
  look.

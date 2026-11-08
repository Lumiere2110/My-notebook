# My notebook — 作業のルール

- 公開サイト: https://lumiere2110.github.io/My-notebook/ （GitHub Pages。`main` ブランチの中身がそのまま公開される。ビルドは不要）
- **更新するたびに公開する**: 変更をコミットして作業ブランチに push したら、続けて `main` にも反映して公開する。
  - `git fetch origin main` のあと、`main` が作業ブランチの祖先なら `git push origin HEAD:main`（早送り）。
  - `main` が先に進んでいたら、作業ブランチを `origin/main` に rebase してから push する。強制 push はしない。
- `sw.js` はネット優先なので、公開すれば次に開いたときに新しい版が読み込まれる。キャッシュするファイルを増やしたら `FILES` に足す。
- 画面の文言・コメント・コミットメッセージは日本語（やさしい言葉）で書く。

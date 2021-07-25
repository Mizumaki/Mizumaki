# components フォルダ構成

- templates: `pages` 配下のページコンポーネントと１対１の関係を持つコンポーネント
- templates/{TEMPLATE_NAME}/sections/{SECTION_NAME}/index.tsx:  そのテンプレート内をセクションで分けた時の、個別のコンポーネント
- templates/{TEMPLATE_NAME}/sections/{SECTION_NAME}/{NAME}.tsx:  セクション内でのみ使用されるコンポーネント
- templates/{TEMPLATE_NAME}/components:  同じテンプレート内でのみ使用されるコンポーネント（セクション間にまたがって使用される）
- atoms: 色や形などのデザインの定義のみを持つピュアな共通コンポーネント（デザインの定義は、必要な場合を除いて props 経由で操作できる必要はない。theme 経由で build time に変更できるようにするのは、良いかもしれない）
- molecules: 構成する atoms の位置に関するスタイルを持つ共通コンポーネント
- organisms (生体): サービス固有のデータの情報を持った共通コンポーネント。`templates/section/{SECTION_NAME}/{NAME}.tsx` などのコンポーネントがここに格上げされることがある。その場合、ページ間で共通のコンポーネントということになる。
- types: サービス固有で UI 用の型（ViewModel 的立ち位置）。
- utils: component を使うための汎用 util (主に hook)

参考
https://design.dena.com/design/atomic-design-を分かったつもりになる

components フォルダには、基本的に UI に関するロジックしか含めない。
`pages` component で、ルーティング依存の値や API などの外部に依存した値の取得を行い、それらを props として templates に渡す。

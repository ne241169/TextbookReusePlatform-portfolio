# 安全に加工したコード例

私が担当した機能から、設計上のポイントが伝わりやすい3例を掲載しています。

- [`oauth-domain-restriction.js`](oauth-domain-restriction.js)：OAuth後のドメイン検証と保護ルート
- [`camera-capture.js`](camera-capture.js)：外向きカメラの優先起動、撮影、画像圧縮
- [`receipt-image-save.js`](receipt-image-save.js)：控えの画像化、共有、ダウンロードへのフォールバック

## 加工内容

- 大学の実ドメインを `@university.example.jp` に置換
- OAuth情報は環境変数名だけを掲載し、値は非掲載
- GAS URL、ロッカー番号・暗証番号、利用者情報、実運用データを削除
- 元のアプリに依存しない短いサンプルへ再構成

これらはポートフォリオで実装方針を示すための抜粋であり、このファイルだけで本番環境を再現するものではありません。

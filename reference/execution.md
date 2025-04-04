# execution
* execution[meta header]
* cpp17[meta cpp]

`<execution>`ヘッダでは、アルゴリズムの並列実行を許可するための実行ポリシー、汎用的な非同期実行フレームワークとしての実行制御ライブラリを定義する。


## 実行ポリシー(C++17)

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution`](execution/execution.md)                     | 実行ポリシー用の名前空間 (namespace) | C++17 |
| [`is_execution_policy`](execution/is_execution_policy.md) | 型が実行ポリシーかを判定する (class template) | C++17 |


## 実行制御ライブラリ(C++26)

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`execution`](execution/execution.md) | 実行制御ライブラリの名前空間 (namespace) | C++26 |
| [`this_thread`](execution/execution.md) | 実行制御ライブラリ／Senderコンシューマの名前空間 (namespace) | C++26 |


## バージョン
### 言語
- C++17
- C++26 実行制御ライブラリ

## 参照
- [P0024R2 The Parallelism TS Should be Standardized](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0024r2.html)
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)

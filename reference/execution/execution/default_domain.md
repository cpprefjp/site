# default_domain
* execution[meta header]
* class[meta id-type]
* std::execution[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std::execution {
  class default_domain;
}
```

## 概要
実行制御ライブラリのデフォルト実行ドメイン。

### 実行ドメイン
実行ドメイン(domain)は、[Sender](sender.md)変換やSenderアルゴリズム適用動作をカスタマイズするためのタグ型である。

実行ドメインは下記関数に対するカスタマイゼーションポイントとして機能する。

- [`execution::transform_sender`](transform_sender.md) : Senderの変換
- [`execution::apply_sender`](apply_sender.md) : Senderアルゴリズム適用


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)`  | デストラクタ   | C++26 |
| [`transform_sender`](default_domain/transform_sender.md) | Sender変換のデフォルト動作 | C++26 |
| [`apply_sender`](default_domain/apply_sender.md) | Senderアルゴリズム適用のデフォルト動作 | C++26 |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`execution::transform_sender`](transform_sender.md)
- [`execution::apply_sender`](apply_sender.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)
- [P3826R5 Fix Sender Algorithm Customization](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3826r5.html)

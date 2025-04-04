# never_stop_token
* stop_token[meta header]
* class[meta id-type]
* std[meta namespace]
* cpp26[meta cpp]

```cpp
namespace std {
  class never_stop_token;
}
```

## 概要

停止不可能な停止トークン。[`unstoppable_token`](unstoppable_token.md)コンセプトのモデル。


## メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `(constructor)` | コンストラクタ | C++26 |
| `(destructor)`  | デストラクタ   | C++26 |
| `bool operator==(const never_stop_token&) const = default;` | 等値比較 | C++26 |
| `bool operator!=(const never_stop_token&) const;` | 非等値比較 (`==`により使用可能) | C++26 |

## 静的メンバ関数

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `stop_requested` | `false`を返す | C++26 |
| `stop_possible` | `false`を返す | C++26 |

## メンバ型

| 名前            | 説明           | 対応バージョン |
|-----------------|----------------|----------------|
| `callback_type` | 説明専用の`callback-type`型 | C++26 |

```cpp
struct callback-type {
  explicit callback-type(never_stop_token, auto&&) noexcept {}
};
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`unstoppable_token`](unstoppable_token.md)


## 参照
- [P2300R10 `std::execution`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2300r10.html)

# member_offset
* meta[meta header]
* std::meta[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  struct member_offset {
    ptrdiff_t bytes;
    ptrdiff_t bits;
    constexpr ptrdiff_t total_bits() const;
    auto operator<=>(const member_offset&) const = default;
  };
}
```

## 概要
`member_offset`は、非静的データメンバのオフセットを表すクラスである。[`offset_of()`](offset_of.md)の戻り値型として使用される。

## メンバ変数

| 名前 | 説明 |
|------|------|
| `bytes` | バイト単位のオフセット |
| `bits` | ビット単位の追加オフセット |

## メンバ関数

| 名前 | 説明 |
|------|------|
| `total_bits()` | `bytes * CHAR_BIT + bits`を返す |
| `operator<=>` | 三方比較（デフォルト） |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`offset_of`](offset_of.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)

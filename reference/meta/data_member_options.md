# data_member_options
* meta[meta header]
* std::meta[meta namespace]
* class[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  struct data_member_options {
    struct name-type;       // 説明専用
    optional<name-type> name;
    optional<int> alignment;
    optional<int> bit_width;
    bool no_unique_address = false;
  };
}
```

## 概要
`data_member_options`は、[`data_member_spec()`](data_member_spec.md)でデータメンバの仕様を作成する際に、メンバの名前やアライメント、ビット幅などのオプションを指定するためのクラスである。

consteval-only型であり、実行時には存在できない。

## メンバ変数

| 名前 | 説明 |
|------|------|
| `name` | メンバの名前。`string_view`または`u8string_view`を受け取る |
| `alignment` | アライメントの指定 |
| `bit_width` | ビットフィールドのビット幅 |
| `no_unique_address` | `[[no_unique_address]]`属性を付加するか |


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`data_member_spec`](data_member_spec.md)
- [`define_aggregate`](define_aggregate.md)


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)

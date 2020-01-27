# chars_format
* charconv[meta header]
* enum[meta id-type]
* std[meta namespace]
* cpp17[meta cpp]

```cpp
namespace std {
  enum class chars_format {
    scientific = /*unspecified*/,
    fixed = /*unspecified*/,
    hex = /*unspecified*/,
    general = fixed | scientific
  };
}
```

## 概要
[`to_chars`](../charconv/to_chars.md)の出力、[`from_chars`](../charconv/from_chars.md)の入力の文�列のフォーマット種別を指定するビットマスクの列挙体。

各メンバは`printf`のフォーマット指定�のいずれかに対応し、主に浮動小数点数の表記について指定する。ただし、桁数（精度）については該当関数の引数で別途指定する。

メンバの値は未規定（実装によって異なる可能性がある）。

| 列挙値 | 対応するフォーマット指定� | 説明           | 対応バージョン |
|-------|:--------------------------:|----------------|----------------|
| `scientific` | `%e` | 指数形式 | C++17 |
| `fixed` | `%f` | 固定小数形式 | C++17 |
| `hex` | `%a` | 16進浮動小数（先�に`0x`はつかない） | C++17 |
| `general` | `%g` | 指数形式と固定小数形式のどちらか最適な方を選択 |  C++17 |

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2017 update 8

## 関連項目
- [`to_chars`](../charconv/to_chars.md)
- [`from_chars`](../charconv/from_chars.md)


## 参照
- [P0067R5: Elementary string conversions, revision 5](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0067r5.html)

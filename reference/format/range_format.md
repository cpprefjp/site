# range_format
* format[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  enum class range_format {
    disabled,
    map,
    set,
    sequence,
    string,
    debug_string
  };
}
```

## 概要
Rangeの書式種別を表す列挙型。


| 列挙値         | 説明 |
|----------------|------|
| `disabled`     | 書式化ができないRangeであることを表す値 |
| `map`          | [`std::map`](/reference/map/map.md)や[`std::flat_map`](/reference/flat_map/flat_map.md)向けの書式。`{k1: v1, k2: v2}` |
| `set`          | [`std::set`](/reference/set/set.md)や[`std::flat_set`](/reference/flat_set/flat_set.md.nolink)向けの書式。`{v1, v2}` |
| `sequence`     | [`std::vector`](/reference/vector/vector.md)や[`std::array`](/reference/array/array.md)向けの書式。`[v1, v2]`|
| `string`       | 文字列向けの書式。`abc` |
| `debug_string` | デバッグ文字列向けの書式。`\nabc` |


## 備考
- `disabled`は値0であるため、`bool`型に変換して有効かどうかを判定するために使用できる


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`format_kind`](format_kind.md)
- [`formatter`](formatter.md)


## 参照
- [P2286R8 Formatting Ranges](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2286r8.html)
- [P2585R1 Improve default container formatting](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2585r1.html)

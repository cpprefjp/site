# hash
* variant[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <>
  struct hash<monostate>;
}
```
* hash[link /reference/functional/hash.md]
* monostate[link ../monostate.md]

## 概要
[`std::hash`](/reference/functional/hash.md)クラスの、[`std::monostate`](../monostate.md)に対する特殊化。

この特殊化は有効化されているため、[`std::monostate`](../monostate.md)を[`std::unordered_set`](/reference/unordered_set/unordered_set.md)や[`std::unordered_map`](/reference/unordered_map/unordered_map.md)のキーとして使用できる。


## 効果
[`std::monostate`](../monostate.md)オブジェクトは唯一の状態のみを持ち、常に等値であるため、ハッシュ値も常に同じ値となる。その値は未規定である。


## 備考
- この特殊化は、以下のヘッダが読み込まれている場合に使用できる：
    - [`<variant>`](/reference/variant.md)
    - [`<utility>`](/reference/utility.md) (C++26)


## 例
```cpp example
#include <cassert>
#include <functional>
#include <variant>

int main()
{
  std::monostate a{};
  std::monostate b{};

  // 常に同じハッシュ値となる
  assert(std::hash<std::monostate>{}(a) == std::hash<std::monostate>{}(b));
}
```
* std::monostate[link ../monostate.md]
* std::hash[color ff0000]

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 5.0.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2017 Update 7 [mark verified]


## 関連項目
- [`std::monostate`](../monostate.md)


## 参照
- [P0088R3 Variant: a type-safe union for C++17 (v8)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0088r3.html)
- [P0472R3 Put `std::monostate` in `<utility>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p0472r3.pdf)
    - C++26で、この特殊化が[`<utility>`](/reference/utility.md)ヘッダでも使用できるようになった

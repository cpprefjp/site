# hash
* filesystem[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp23[meta cpp]

```cpp
namespace std {
  template <>
  struct hash<std::filesystem::path>;
}
```
* hash[link /reference/functional/hash.md]

## 概要
[`std::hash`](/reference/functional/hash.md)クラスの、[`std::filesystem::path`](../path.md)に対する特殊化。パスの内容からハッシュ値を計算し、`path`を[`unordered_map`](/reference/unordered_map/unordered_map.md)や[`unordered_set`](/reference/unordered_set/unordered_set.md)のキーとして使用できるようにする。

この特殊化はC++23で追加された。それ以前は定義されておらず、`hash<path>`は使用できなかった。


## 効果
`p`を型[`path`](../path.md)のオブジェクトとするとき、`hash<path>()(p)`は[`hash_value`](hash_value.md)`(p)`と同じ値を返す。

したがって、2つのパス`p1`と`p2`について`p1 == p2`であれば、`hash<path>()(p1) == hash<path>()(p2)`となる。


## 例
```cpp example
#include <cassert>
#include <filesystem>
#include <functional>

namespace fs = std::filesystem;

int main()
{
  fs::path p = "a/b/c";

  // パスの内容からハッシュ値を計算する
  std::size_t h = std::hash<fs::path>{}(p);

  // hash_valueと同じ値になる
  assert(h == fs::hash_value(p));
}
```
* std::hash[color ff0000]
* fs::hash_value[link hash_value.md]

### 出力
```
```


## バージョン
### 言語
- C++23


## 関連項目
- [`std::hash`](/reference/functional/hash.md)
- [`std::filesystem::hash_value`](hash_value.md)


## 参照
- [LWG Issue 3657. `std::hash<std::filesystem::path>` is not enabled](https://cplusplus.github.io/LWG/issue3657)
    - C++23で、[`std::hash`](/reference/functional/hash.md)の`path`に対する特殊化が定義された

# hash
* memory[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class T, class Allocator>
  struct hash<indirect<T, Allocator>>;
}
```
* hash[link /reference/functional/hash.md]

## 概要
[`std::hash`](/reference/functional/hash.md)クラスの、`std::indirect`に対する特殊化。

この特殊化は、`hash<T>`が有効である場合にのみ有効となる。


## 効果
`indirect<T, Allocator>`型のオブジェクト`i`に対して、`hash<indirect<T, Allocator>>()(i)`は、`i`が無効値状態でなければ`hash<T>()(*i)`と同じ値を返し、無効値状態であれば処理系定義の値を返す。


## 備考
メンバ関数が`noexcept`である保証はない。


## 例
```cpp example
#include <cassert>
#include <functional>
#include <memory>

int main()
{
  std::indirect<int> a{42};
  // 所有する値のハッシュ値と一致する
  assert((std::hash<std::indirect<int>>{}(a) == std::hash<int>{}(42)));
}
```
* std::indirect[color ff0000]
* std::hash[link /reference/functional/hash.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22 [mark noimpl]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::indirect`](../indirect.md)


## 参照
- [P3019R14 `indirect` and `polymorphic`: Vocabulary Types for Composite Class Design](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3019r14.pdf)

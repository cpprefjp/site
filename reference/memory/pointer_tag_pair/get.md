# get
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp29[meta cpp]

```cpp
namespace std {
  template <size_t I, class Ptr, unsigned int BitsRequested, class TagT>
  constexpr tuple_element_t<I, pointer_tag_pair<Ptr, BitsRequested, TagT>>
    get(pointer_tag_pair<Ptr, BitsRequested, TagT> p) noexcept; // (1) C++29
}
```
* tuple_element_t[link /reference/tuple/tuple_element.md]
* pointer_tag_pair[link ../pointer_tag_pair.md]

## 概要
[`pointer_tag_pair`](../pointer_tag_pair.md)オブジェクトから、ポインタ値（`I == 0`）またはタグ値（`I == 1`）を取得する。

`tuple_size`・`tuple_element`の特殊化とあわせてタプルインターフェースを構成し、構造化束縛で分解できるようにする。


## 適格要件
- `I < 2`であること


## 戻り値
- `I`が0と等しい場合 : `p.`[`pointer()`](pointer.md)
- そうでない場合 : `p.`[`tag()`](tag.md)


## 例外
投げない。


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 42;
  std::pointer_tag_pair<int*, 2> p{&x, 3u};

  // 構造化束縛でポインタとタグへ分解する
  auto [ptr, tag] = p;
  std::cout << *ptr << ':' << tag << std::endl;
}
```
* std::pointer_tag_pair[link ../pointer_tag_pair.md]

### 出力
```
42:3
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)

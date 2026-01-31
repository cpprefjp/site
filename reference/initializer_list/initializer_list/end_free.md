# end (非メンバ関数)
* initializer_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp26removed[meta cpp]

```cpp
template <class E>
const E* end(initializer_list<E> il) noexcept;           // C++11、C++26で削除

template <class E>
constexpr const E* end(initializer_list<E> il) noexcept; // C++14、C++26で削除
```

この関数はC++26で削除された。代わりに[`<iterator>`](/reference/iterator.md)ヘッダで定義される[`std::end()`](/reference/iterator/end.md)関数を使用すること。[`<iterator>`](/reference/iterator.md)ヘッダの[`std::end()`](/reference/iterator/end.md)関数経由でメンバ関数の[`end()`](end.md)を呼び出せるため不要である。

## 概要
最後尾要素の次を指すポインタを取得する。


## 戻り値
```cpp
il.end()
```
* end[link end.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>
#include <algorithm>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  std::for_each(std::begin(init), std::end(init), [](int x) {
    std::cout << x << std::endl;
  });
}
```
* std::end[color ff0000]
* std::begin[link /reference/initializer_list/initializer_list/begin_free.md]

### 出力
```
1
2
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]


## 参照
- [N3257 Range-based for statements and ADL](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3257.pdf)
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)
- [P3016R6 Resolve inconsistencies in `begin`/`end` for `valarray` and `braced-initializer-list`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3016r6.html)

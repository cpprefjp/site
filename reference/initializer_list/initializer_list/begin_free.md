# begin (非メンバ関数)
* initializer_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]
* cpp26removed[meta cpp]

```cpp
template <class E>
const E* begin(initializer_list<E> il) noexcept;           // C++11、C++26で削除

template <class E>
constexpr const E* begin(initializer_list<E> il) noexcept; // C++14、C++26で削除
```

この関数はC++26で削除された。代わりに[`<iterator>`](/reference/iterator.md)ヘッダで定義される[`std::begin()`](/reference/iterator/begin.md)関数を使用すること。[`<iterator>`](/reference/iterator.md)ヘッダの[`std::begin()`](/reference/iterator/begin.md)関数経由でメンバ関数の[`begin()`](begin.md)を呼び出せるため不要である。

## 概要
先頭要素を指すポインタを取得する。


## 戻り値
```cpp
il.begin()
```
* begin[link begin.md]


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  decltype(init)::iterator it = std::begin(init);

  std::cout << *it << std::endl;
}
```
* std::begin[color ff0000]

### 出力
```
1
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

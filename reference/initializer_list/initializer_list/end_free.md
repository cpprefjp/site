# end (非メンバ関数)
* initializer_list[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
template <class E>
const E* end(initializer_list<E> il) noexcept;           // C++11

template <class E>
constexpr const E* end(initializer_list<E> il) noexcept; // C++14
```

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
* std::begin[link begin_free.md]

### 出力
```
1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.7.0


## 参照
- [N3257 Range-based for statements and ADL](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2011/n3257.pdf)
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)


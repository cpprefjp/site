#size (C++11)
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]

```cpp
size_t size() const noexcept;           // C++11
constexpr size_t size() const noexcept; // C++14
```

##概要
要素数を取得する。


##戻り値
`*this`に含まれる、配列の要素数を返す。


##例外
投げない


##例
```cpp
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  std::size_t n = init.size();
  std::cout << n << std::endl;
}
```


###出力
```
3
```


##バージョン
###言語
- C++11

###処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.1
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.0


##参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)


# size
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
std::size_t size() const noexcept;           // C++11
constexpr std::size_t size() const noexcept; // C++14
```

## 概要
要素数を取得する。


## 戻り値
`*this`に含まれる、配列の要素数を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  std::size_t n = init.size();
  std::cout << n << std::endl;
}
```
* size()[color ff0000]


### 出力
```
3
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.0 [mark verified]


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)

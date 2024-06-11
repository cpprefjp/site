# begin
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
const E* begin() const noexcept;           // C++11
constexpr const E* begin() const noexcept; // C++14
```

## 概要
先頭要素を指すポインタを取得する。


## 戻り値
配列の先頭要素を指すポインタを返す。

配列の要素数が空である場合、[`end()`](end.md)と同じ未規定のポインタ値を返す。


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init = {1, 2, 3};

  decltype(init)::iterator it = init.begin();

  std::cout << *it << std::endl;
}
```
* init.begin()[color ff0000]

### 出力
```
1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1 [mark verified]
- [GCC](/implementation.md#gcc): 4.4.0 [mark verified]


## 参照
- [N3471 Constexpr Library Additions: utilities, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3471.html)


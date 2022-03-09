# コンストラクタ
* initializer_list[meta header]
* std[meta namespace]
* initializer_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
initializer_list() noexcept;           // C++11
constexpr initializer_list() noexcept; // C++14
```

## 概要
空の`initializer_list`オブジェクトを構築する。


## 例
```cpp example
#include <cassert>
#include <initializer_list>

int main()
{
  std::initializer_list<int> init;
  assert(init.size() == 0);
}
```
* init.size()[link size.md]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.1
- [GCC](/implementation.md#gcc): 4.4.0


## 参照
- [N3469 Constexpr Library Additions: chrono, v3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2012/n3469.html)


# operator->
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
pointer operator->() const;           // C++11
constexpr pointer operator->() const; // C++17
```

## 概要
イテレータを通してオブジェクトにアクセスする


## 戻り値
[`base`](/reference/iterator/move_iterator/base.md)`()`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <memory>
#include <iterator>

int main()
{
  std::vector<std::unique_ptr<int>> v;
  for (int i = 0; i < 5; ++i)
    v.emplace_back(new int(i));

  std::move_iterator<decltype(v)::iterator> it(v.begin());

  int x = *it->get();
  std::cout << x << std::endl;
}
```
* it->get()[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]


### 出力
```
0
```

## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)

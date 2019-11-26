# operator=
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class U>
move_iterator& operator=(const move_iterator<U>& u);                // (1) C++11
template <class U>
constexpr move_iterator& operator=(const move_iterator<U>& u);      // (1) C++17

move_iterator& operator=(const move_iterator&) = default;           // (2) C++11
constexpr move_iterator& operator=(const move_iterator&) = default; // (2) C++17

move_iterator& operator=(move_iterator&&) = default;                // (3) C++11
constexpr move_iterator& operator=(move_iterator&&) = default;      // (3) C++17
```

## 概要
- (1) : `u.base()`をメンバ変数に保持する。


## 要件
- (1) : `U`が`Iterator`に変換可能であること


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

  std::move_iterator<decltype(v)::iterator> it1(v.begin());

  std::move_iterator<decltype(v)::const_iterator> it2;
  it2 = it1;

  std::cout << **it2.base() << std::endl;
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* it2.base()[link base.md]

### 出力
```
0
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)

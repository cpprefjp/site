# operator+ (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  move_iterator<Iterator> operator+(
    typename move_iterator<Iterator>::difference_type n,
    const move_iterator<Iterator>& x);                   // C++11

  template <class Iterator>
  constexpr move_iterator<Iterator> operator+(
    typename move_iterator<Iterator>::difference_type n,
    const move_iterator<Iterator>& x);                   // C++17

  template <class Iterator>
  constexpr move_iterator<Iterator> operator+(
    iter_difference_t<Iterator> n,
    const move_iterator<Iterator>& x);                   // C++20
}
```

## 概要
イテレータを`n`回進める。

## テンプレートパラメータ制約

`x + n`が有効であり、戻り値型が`Iterator`であること。

## 戻り値
`return x + n;`


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

  auto it = std::make_move_iterator(v.begin());
  auto it2 = 2 + it;
  std::unique_ptr<int> p = *it2;

  std::cout << *p << std::endl;
}
```
* 2 + it[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
2
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

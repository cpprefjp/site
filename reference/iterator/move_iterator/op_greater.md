# operator>
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator1, class Iterator2>
  bool operator>(const move_iterator<Iterator1>& x,
                 const move_iterator<Iterator2>& y);           // C++11

  template <class Iterator1, class Iterator2>
  constexpr bool operator>(const move_iterator<Iterator1>& x,
                           const move_iterator<Iterator2>& y); // C++17
}
```

## 概要
2つの`move_iterator`オブジェクトにおいて、左辺が右辺より大きいかを判定する。

## テンプレートパラメータ制約

`y.base() < x.base()`が有効であり、戻り値が`bool`に変換可能であること。

## 戻り値
`return y < x;`


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

  auto it1 = std::make_move_iterator(v.begin());
  auto it2 = std::make_move_iterator(v.begin() + 1);

  if (it2 > it1) {
    std::cout << "greater" << std::endl;
  }
  else {
    std::cout << "not greater" << std::endl;
  }
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
greater
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

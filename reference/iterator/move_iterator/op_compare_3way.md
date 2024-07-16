# operator<=>
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class Iterator1,
            three_way_comparable_with<Iterator1> Iterator2>
  constexpr compare_three_way_result_t<Iterator1, Iterator2>
    operator<=>(const move_iterator<Iterator1>& x,
                const move_iterator<Iterator2>& y);
}
```

## 概要
`move_iterator`オブジェクト同士の三方比較を行う。


## 戻り値

`return x.base() <=> y.base();`


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

  auto it1 = std::move_iterator{v.begin()};
  auto it2 = std::move_iterator{v.begin()};

  if ((it1 <=> it2) == 0) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]

### 出力
```
equal
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 10 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出

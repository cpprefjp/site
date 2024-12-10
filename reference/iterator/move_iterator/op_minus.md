# operator- (非メンバ関数)
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class move_iterator {

    template <sized_sentinel_for<Iterator> S>
    friend constexpr iter_difference_t<Iterator>
      operator-(const move_sentinel<S>& x, const move_iterator& y); // (1) C++20

    template <sized_sentinel_for<Iterator> S>
    friend constexpr iter_difference_t<Iterator>
      operator-(const move_iterator& x, const move_sentinel<S>& y); // (2) C++20
  };

  template <class Iterator1, class Iterator2>
  auto operator-(const move_iterator<Iterator1>& x,
                 const move_iterator<Iterator2>& y)
    -> decltype(x.base() - y.base());                               // (3) C++11

  template <class Iterator1, class Iterator2>
  constexpr auto operator-(const move_iterator<Iterator1>& x,
                           const move_iterator<Iterator2>& y)
    -> decltype(x.base() - y.base());                               // (3) C++17
}
```
* base[link /reference/iterator/move_iterator/base.md]
* sized_sentinel_for[link /reference/iterator/sized_sentinel_for.md]
* iter_difference_t[link /reference/iterator/iter_difference_t.md]
* move_sentinel[link /reference/iterator/move_sentinel.md]

## 概要
2つのイテレータの差を求める。


## 戻り値

`return x.base() - y.base();`

`x.base()`と`y.base()`はオーバーロードによって次のどちらか

- [`move_iterator::base()`](base.md)
- [`move_sentinel::base()`](/reference/iterator/move_sentinel/base.md)

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
  auto it2 = std::make_move_iterator(v.end());

  std::ptrdiff_t result = it2 - it1;
  std::cout << result << std::endl;
}
```
* it2 - it1[color ff0000]
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
5
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
- [LWG Issue 685. `reverse_iterator`/`move_iterator` difference has invalid signatures](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#685)
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)

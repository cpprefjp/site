# operator==
* iterator[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class Iterator>
  class move_iterator {
  public:
    template <sentinel_for<Iterator> S>
    friend constexpr bool operator==(const move_iterator& x,
                                     const move_sentinel<S>& y);  // (1) C++20

    // (1)のoperator==により、以下のオーバーロードが使用可能になる (C++20)
    template <sentinel_for<Iterator> S>
    friend constexpr bool operator==(const move_sentinel<S>& x,
                                     const move_iterator& y);     // (2) C++20
  };


  template <class Iterator1, class Iterator2>
  bool operator==(const move_iterator<Iterator1>& x,
                  const move_iterator<Iterator2>& y);             // (3) C++11

  template <class Iterator1, class Iterator2>
  constexpr bool operator==(const move_iterator<Iterator1>& x,
                            const move_iterator<Iterator2>& y);   // (3) C++17
}
```
* sentinel_for[link /reference/iterator/sentinel_for.md)
* move_sentinel[link /reference/iterator/move_sentinel.md]

## 概要
2つの`move_iterator`オブジェクトが同じ要素を指しているかを判定する。

## テンプレートパラメータ制約

`x.base() == y.base()`が有効であり、戻り値が`bool`に変換可能であること。

## 戻り値

`return x.base() == y.base();`

`x.base()`と`y.base()`はオーバーロードによって次のどちらか

- [`move_iterator::base()`](base.md)
- [`move_sentinel::base()`](/reference/iterator/move_sentinel/base.md)

## 備考

C++20以降、これらの演算子により以下の演算子が使用可能になる。

- [`operator!=(const move_iterator<Iterator1>& x, const move_iterator<Iterator2>& y)`](/reference/iterator/move_iterator/op_not_equal.md) 
- `operator!=(const move_iterator& x, const move_sentinel<S>& y)`
- `operator!=(const move_sentinel<S>& x, const move_iterator& y)`

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
  auto it2 = std::make_move_iterator(v.begin());

  if (it1 == it2) {
    std::cout << "equal" << std::endl;
  }
  else {
    std::cout << "not equal" << std::endl;
  }
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
equal
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
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)

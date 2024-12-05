# operator=
* iterator[meta header]
* std[meta namespace]
* reverse_iterator[meta class]
* function[meta id-type]

```cpp
reverse_iterator& operator=(const reverse_iterator& u) = default;           // (1) C++03
constexpr reverse_iterator& operator=(const reverse_iterator& u) = default; // (1) C++17

template <class U>
reverse_iterator& operator=(const reverse_iterator<U>& u);                  // (2) C++03
template <class U>
constexpr reverse_iterator& operator=(const reverse_iterator<U>& u);        // (2) C++17
```

## 概要
- (2) : `u.base()`をメンバ変数`current`に保持する。

## テンプレートパラメータ制約

- C++17まで
    - (2) : `U`が`Iterator`に変換可能であること
- C++20
    - (2) : 次の両方を満たす
        - `is_same_v<U, Iterator> == false`であること。
        - `const U&, Iterator`が[`convertible_to<Iterator>`](/reference/concepts/convertible_to.md)のモデルとなること。
        - `Iterator&, const U&`が[`assignable_from<Iterator&, const U&>`](/reference/concepts/assignable_from.md)のモデルとなること。


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <vector>
#include <iterator>

int main()
{
  std::vector<int> v = {1, 2, 3};

  std::reverse_iterator<decltype(v)::iterator> it1(v.end());

  // 同じ型のイテレータを代入
  std::reverse_iterator<decltype(v)::iterator> it2;
  it2 = it1;

  // 変換可能なイテレータを代入
  std::reverse_iterator<decltype(v)::const_iterator> it3;
  it3  = it2;

  std::reverse_iterator<decltype(v)::const_iterator> end(v.begin());

  for (; it3 != end; ++it3) {
    std::cout << *it3 << std::endl;
  }
}
```
* it2 = it1[color ff0000]
* it3  = it2[color ff0000]

### 出力
```
3
2
1
```

## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [LWG Issue 3435. `three_way_comparable_with<reverse_iterator<int*>, reverse_iterator<const int*>>`](https://cplusplus.github.io/LWG/issue3435)

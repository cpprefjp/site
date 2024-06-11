# コンストラクタ
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
move_iterator();                                             // (1) C++11
constexpr move_iterator();                                   // (1) C++17

explicit move_iterator(Iterator i);                          // (2) C++11
constexpr explicit move_iterator(Iterator i);                // (2) C++17

template <class U>
move_iterator(const move_iterator<U>& u);                    // (3) C++11
template <class U>
constexpr move_iterator(const move_iterator<U>& u);          // (3) C++17

move_iterator(move_iterator&&) noexcept = default;           // (4) C++11
constexpr move_iterator(move_iterator&&) noexcept = default; // (4) C++17
```

## 概要
`move_iterator`オブジェクトを構築する。

- (1) : デフォルトコンストラクタ。内包する元となるイテレータを値初期化する。
- (2) : 元となるイテレータ`i`をメンバ変数にムーブして保持する。
- (3) : `u.base()`をメンバ変数に保持する。

## テンプレートパラメータ制約

- C++17まで
  - (3) : `U`が`Iterator`に変換可能であること
- C++20
  - (3) : 次の全てを満たす
    - `is_same_v<U, Iterator> == false`であること。
    - `const U&, Iterator`が[`convertible_to<Iterator>`](/reference/concepts/convertible_to.md)のモデルとなること。

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

  // デフォルト構築
  std::move_iterator<decltype(v)::iterator> it1;

  // 元となるイテレータから構築
  std::move_iterator<decltype(v)::iterator> it2(v.begin());

  // 他のmove_iteratorオブジェクトからコピー構築
  std::move_iterator<decltype(v)::iterator> it3(it2);

  // 他のmove_iteratorオブジェクトからムーブ構築
  std::move_iterator<decltype(v)::iterator> it4 = std::move(it3);

  std::unique_ptr<int> p = *it4;
  std::cout << *p << std::endl;
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::move[link /reference/utility/move.md]

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
- [LWG Issue 3435. `three_way_comparable_with<reverse_iterator<int*>, reverse_iterator<const int*>>`](https://cplusplus.github.io/LWG/issue3435)

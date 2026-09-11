# operator--
* iterator[meta header]
* std[meta namespace]
* move_iterator[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
move_iterator& operator--();             // (1) C++11
constexpr move_iterator& operator--();   // (1) C++17

move_iterator operator--(int);           // (2) C++11
constexpr move_iterator operator--(int); // (2) C++17
move_iterator operator--(int) = default; // (2) C++29
```

## 概要
イテレータをデクリメントする。


## 効果

- 前置デクリメント `operator--()`：

```cpp
--base();
return *this;
```
* base[link base.md]

- 後置デクリメント `operator--(int)`：

```cpp
move_iterator tmp = *this;
--base();
return tmp;
```
* base[link base.md]


## 備考
- (2) : C++29で、[後置インクリメント・デクリメント演算のdefault定義](/lang/cpp29/defaulting_postfix_increment_and_decrement_operations.md)を使用した`= default`定義へ規定が変更された。動作は変わらない

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

  auto it = std::make_move_iterator(v.end());
  --it; // ひとつ逆に進める
  std::unique_ptr<int> p = *it;

  std::cout << *p << std::endl;
}
```
* v.emplace_back[link /reference/vector/vector/emplace_back.md]
* std::make_move_iterator[link /reference/iterator/make_move_iterator.md]

### 出力
```
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.6.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0031R0 A Proposal to Add Constexpr Modifiers to `reverse_iterator`, `move_iterator`, `array` and Range Access](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/p0031r0.html)
- [P3785R1 Library Wording Changes for Defaulted Postfix Increment and Decrement Operations](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3785r1.html)
    - C++29で、後置演算子の規定が`= default`定義へ書き換えられた

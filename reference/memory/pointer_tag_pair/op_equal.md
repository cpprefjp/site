# operator==
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
friend constexpr bool operator==(pointer_tag_pair lhs, pointer_tag_pair rhs)
  noexcept requires equality_comparable<tag_type>; // (1) C++29
```
* equality_comparable[link /reference/concepts/equality_comparable.md]

## 概要
`pointer_tag_pair`オブジェクトの等値比較を行う。ポインタ値とタグ値の両方が等値である場合に`true`となる。


## テンプレートパラメータ制約
- `tag_type`が[`equality_comparable`](/reference/concepts/equality_comparable.md)のモデルであること


## 効果
以下と等価である。

```cpp
return pair(lhs.pointer(), lhs.tag()) == pair(rhs.pointer(), rhs.tag());
```
* pair[link /reference/utility/pair.md]
* lhs.pointer()[link pointer.md]
* lhs.tag()[link tag.md]


## 例外
投げない。


## 備考
- タグの比較に組み込みの`==`が使われる場合、実装は内部のビット表現を直接比較することが推奨される
- `operator==`により、`operator!=`も使用可能になる


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int x = 42;
  std::pointer_tag_pair<int*, 1, bool> p{&x, true};
  std::pointer_tag_pair<int*, 1, bool> q{&x, false};

  // ポインタは同じだがタグが異なるため等値ではない
  std::cout << std::boolalpha << (p == q) << std::endl;
}
```
* std::pointer_tag_pair[link ../pointer_tag_pair.md]

### 出力
```
false
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P3125R6 constexpr pointer tagging](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3125r6.html)

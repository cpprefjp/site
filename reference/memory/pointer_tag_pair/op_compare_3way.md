# operator<=>
* memory[meta header]
* std[meta namespace]
* pointer_tag_pair[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
friend constexpr auto operator<=>(pointer_tag_pair lhs, pointer_tag_pair rhs)
  noexcept requires three_way_comparable<tag_type>; // (1) C++29
```
* three_way_comparable[link /reference/compare/three_way_comparable.md]

## 概要
`pointer_tag_pair`オブジェクトの三方比較を行う。ポインタ値を優先し、次にタグ値を比較する。


## テンプレートパラメータ制約
- `tag_type`が[`three_way_comparable`](/reference/compare/three_way_comparable.md)のモデルであること


## 効果
以下と等価である。

```cpp
return pair(lhs.pointer(), lhs.tag()) <=> pair(rhs.pointer(), rhs.tag());
```
* pair[link /reference/utility/pair.md]
* lhs.pointer()[link pointer.md]
* lhs.tag()[link tag.md]


## 例外
投げない。


## 備考
- 関係のないオブジェクトを指すポインタどうしの比較結果は未規定である
- タグの比較に組み込みの`<=>`が使われる場合、実装は内部のビット表現を直接比較することが推奨される


## 例
```cpp
#include <memory>
#include <iostream>

int main()
{
  int arr[2] = {1, 2};
  std::pointer_tag_pair<int*, 1> p{&arr[0], 0u};
  std::pointer_tag_pair<int*, 1> q{&arr[1], 0u};

  std::cout << std::boolalpha << (p < q) << std::endl;
}
```
* std::pointer_tag_pair[link ../pointer_tag_pair.md]

### 出力
```
true
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

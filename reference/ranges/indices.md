# indices
* ranges[meta header]
* std::ranges::views[meta namespace]
* cpo[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::ranges::views {
  inline constexpr /*unspecified*/ indices = /*unspecified*/;
}
```

## 概要
整数値`n`に対して、`0`から始まり`n`未満までの整数列をRangeとして生成するカスタマイゼーションポイントオブジェクト。

`views::indices(n)`は[`views::iota`](iota_view.md)`(decltype(n)(0), n)`と等価であり、Rangeの要素数を指定するだけで簡潔に添字列を生成できる。`for (auto i : std::views::indices(v.size()))`のように、コンテナのサイズに対する添字列を作る用途に便利である。


## 効果
式`E`を整数値、`T`を[`remove_cvref_t`](/reference/type_traits/remove_cvref.md)`<decltype((E))>`とする。式`views::indices(E)`の効果は以下の通り：

- `T`が[*is-integer-like*](/reference/iterator/is_integer_like.md)のモデルであれば、式は[`views::iota`](iota_view.md)`(T(0), E)`と等価
- そうでなければ、呼び出しは不適格


## 備考
- 整数型の型不一致 ([`views::iota`](iota_view.md)`(0, v.size())`が`int`と`size_t`の不一致でコンパイルエラーになる問題) を回避するために導入された
- 受け付ける整数型は[`integral`](/reference/concepts/integral.md)のモデルとなる型または規格上の`integer-class`型である。ただし、`bool`は除外される


## 例
### 基本的な使い方
```cpp example
#include <ranges>
#include <iostream>
#include <vector>

int main()
{
  std::vector v = {10, 20, 30, 40, 50};

  // コンテナのサイズに対するインデックス列を生成する
  for (auto i : std::views::indices(v.size())) {
    std::cout << i << ": " << v[i] << '\n';
  }
}
```
* std::views::indices[color ff0000]

#### 出力
```
0: 10
1: 20
2: 30
3: 40
4: 50
```


### Rangeアダプタと組み合わせる
`views::indices`の結果はRangeなので、パイプライン記法で[`views::filter`](filter_view.md)などのRangeアダプタに繋げられる。

```cpp example
#include <ranges>
#include <iostream>

int main()
{
  // 0以上10未満のインデックス列のうち、偶数の先頭3つを取り出す
  for (auto i : std::views::indices(10)
              | std::views::filter([](auto x) { return x % 2 == 0; })
              | std::views::take(3)) {
    std::cout << i << ' ';
  }
}
```
* std::views::indices[color ff0000]
* std::views::filter[link filter_view.md]
* std::views::take[link take_view.md]

#### 出力
```
0 2 4 
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 22.1 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::views::iota`](iota_view.md)


## 参照
- [P3060R3 Add `std::views::indices(n)`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3060r3.html)

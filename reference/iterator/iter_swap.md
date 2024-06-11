# iter_swap
* iterator[meta header]
* cpo[meta id-type]
* std::ranges[meta namespace]
* cpp20[meta cpp]

```cpp
namespace std {
  namespace ranges {
    inline namespace /*unspecified*/ {

      inline constexpr /*unspecified*/ iter_swap = /*unspecified*/;
    }
  }
}
```

## 概要

`iter_swap`はイテレータを2つ受け取り、そのイテレータの参照する要素の値を交換（`swap`）するカスタマイゼーションポイントオブジェクトである。

## 効果

まず説明専用の関数テンプレート`iter-exchange-move`を次のように定義しておく。

```cpp
template<class X, class Y>
constexpr iter_value_t<X> iter-exchange-move(X&& x, Y&& y)
  noexcept(noexcept(iter_value_t<X>(iter_move(x))) &&
           noexcept(*x = iter_move(y)))
{
  iter_value_t<X> old_value(iter_move(x));
  *x = iter_move(y);
  return old_value;
}
```
* iter_value_t[link /reference/iterator/iter_value_t.md]
* iter_move[link /reference/iterator/iter_move.md]


`iter_swap(a, b)`のように呼び出された時、以下のいずれかと等価

1. 引数`a, b`のどちらかの型がクラス型であるか列挙型であり、`std::ranges::iter_swap`（本CPO）の宣言を含まず下記の`iter_swap`関数宣言を含むコンテキストで、`iter_swap(a, b)`が呼び出し可能ならば`(void)iter_swap(a, b)`
   ```cpp
   template<class I1, class I2>
   void iter_swap(I1, I2) = delete;
   ```

2. `a, b`の型が共に[`indirectly_readable`](/reference/iterator/indirectly_readable.md)のモデルであり、`a, b`の参照先の型が[`swappable_with`](/reference/concepts/swappable.md)のモデルとなるとき、[`ranges::swap`](/reference/concepts/swap.md)`(*a, *b)`

3. `a, b`の型`T1, T2`が[`indirectly_movable_storable`](/reference/iterator/indirectly_movable_storable.md)`<T1, T2>`と[`indirectly_movable_storable`](/reference/iterator/indirectly_movable_storable.md)`<T2, T1>`のモデルとなるとき、`(void)(*a = iter-exchange-move(b, a))`

4. それ以外の場合、呼び出しは不適格。

1のケースの場合に、呼び出される`iter_swap(a, b)`が交換を行わない場合、プログラムは不適格（ただし、コンパイルエラーとならない可能性がある）。

## 戻り値

なし

## 例外

上記「効果」節のそれぞれのケース毎に

1. 呼び出される`iter_swap()`が例外を投げるかに従う
2. 引数`a, b`の`*`演算子および呼び出される`ranges::swap()`が例外を投げるかに従う
3. `iter-exchange-move`操作およびその結果の`*a`への代入が例外を投げるかに従う

## 定数式に評価される条件

1. 呼び出される`iter_swap()`が定数評価可能かに従う
2. 引数`a, b`の`*`演算子および呼び出される`ranges::swap()`が定数評価可能かに従う
3. `iter-exchange-move`操作およびその結果の`*a`への代入が定数評価可能かに従う

## カスタマイゼーションポイント

1のケースでは、ユーザー定義の`iter_swap()`を定義しておくことによって実行される交換操作をカスタマイズすることができる。

1. 引数`a, b`の型と同じ名前空間で、もしくは[*Hidden friends*](/article/lib/hidden_friends.md)として、非メンバ`iter_swap()`関数を定義しておく
2. `a, b`の参照先の型について[`ranges::swap`](/reference/concepts/swap.md)にアダプトしておく
3. --

## 例
```cpp example
#include <iterator>
#include <vector>
#include <iostream>

int main() {
  std::vector<int> vec = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

  std::counted_iterator ci1{std::ranges::begin(vec), 5};
  std::counted_iterator ci2{std::ranges::begin(vec) + 5, 5};

  // ケース1の呼び出し
  std::ranges::iter_swap(ci1, ci2);
  std::cout << *ci1 << ", " << *ci2 << std::endl;


  int* p1 = vec.data() + 1;
  int* p2 = p1 + 5;

  // ケース2の呼び出し
  std::ranges::iter_swap(p1, p2);
  std::cout << *p1 << ", " << *p2 << std::endl;
}
```
* ranges::iter_swap[color ff0000]

### 出力
```
6, 1
7, 2
```

## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2019 Update 4 [mark verified]

## 参照
- [P0896R4 The One Ranges Proposal (was Merging the Ranges TS)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0896r4.pdf)

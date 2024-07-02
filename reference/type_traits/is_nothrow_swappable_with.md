# is_nothrow_swappable_with
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_nothrow_swappable_with;

  template <class T, class U>
  inline constexpr bool is_nothrow_swappable_with_v
    = std::is_nothrow_swappable_with<T, U>::value;
}
```

## 概要
型`T`と`U`の値が、swap関数によって入れ替え可能であり、その際に例外を投げないかどうかを調べる。


## 要件
型`T`と`U`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`T`と`U`の間で[`std::swappable_with`](/reference/concepts/swappable.md)要件を満たしており、2つのswap関数が共に例外を投げない場合は[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

型`T`と`U`は参照でなければswapできないので`T`と`U`が参照でない場合、結果は`false`となる。


## 備考
このメタ関数は`T`と`U`についてのswap関数の直接のコンテキストの妥当性（そのシグネチャで有効なswapがあるかどうか）のみをチェックする。そのため、結果が`true`となったとしてもswap関数の呼び出しができることは保証されない（その他の要因によりコンパイルエラーが発生する可能性がある）。

また同様に、結果が`true`となっても見つかったswap関数がswap動作をするかどうかも保証しない。


## 例

```cpp example
#include <type_traits>
#include <iostream>

struct spurious_swappable {};

void swap(spurious_swappable&, int&) noexcept {}
void swap(int&, spurious_swappable&) {}

int main()
{
  std::cout << std::boolalpha;

  std::cout << std::is_nothrow_swappable_with<int&, int&>::value << std::endl;

  //参照でなければならない
  std::cout << std::is_nothrow_swappable_with<int, int>::value << std::endl;

  //spurious_swappableは見かけ上はintとswap可能だが、片方のswap関数にnoexceptが無いためnothrow_swappable_withはfalseとなる
  std::cout << std::is_swappable_with<spurious_swappable&, int&>::value << std::endl;
  std::cout << std::is_nothrow_swappable_with<spurious_swappable&, int&>::value << std::endl;
}
```
* std::is_nothrow_swappable_with[color ff0000]
* std::is_swappable_with[link is_swappable.md]

### 出力
```
true
false
true
false
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): 2015 update3 [mark verified], 2017 [mark verified]
	- 2015 update3では、インテリセンスで表示されないが変数テンプレート共々定義されており利用可能である

## 参照
- [C++1z swap可能かを判定する型特性クラス - Faith and Brave - C++で遊ぼう](https://faithandbrave.hateblo.jp/entry/2016/06/24/165526)
- [P0185R1 is_swappable、is_nothrow_swappable](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0185r1.html)

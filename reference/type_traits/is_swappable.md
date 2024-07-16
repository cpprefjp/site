# is_swappable
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T>
  struct is_swappable;

  template <class T>
  inline constexpr bool is_swappable_v = std::is_swappable<T>::value;
}
```

## 概要
型`T`の値同士が、swap関数によって入れ替え可能かどうかを調べる。


## 要件
型`T`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`T`が[`std::swappable`](/reference/concepts/swappable.md)要件を満たしていれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

参照可能な型に対して、[`is_swappable_with`](is_swappable_with.md)`<T&, T&>::value`と同じ結果となり、参照可能でない型に対しては`false`となる。

- 参照可能な型とは、以下のいずれかの条件に合致する型である：
    - [オブジェクト型](is_object.md)
    - CV修飾されていない、もしくは参照修飾されていない関数型
    - 参照修飾されている型


## 備考
このメタ関数は`T`についてのswap関数の直接のコンテキストの妥当性（そのシグネチャで有効なswapがあるかどうか）のみをチェックする。そのため、結果が`true`となったとしてもswap関数の呼び出しができることは保証されない（その他の要因によりコンパイルエラーが発生する可能性がある）。

また同様に、結果が`true`となっても見つかったswap関数がswap動作をするかどうかも保証しない。


## 例

```cpp example
#include <type_traits>
#include <iostream>

struct non_swappable {};

void swap(non_swappable&, non_swappable&) = delete;

int main()
{
  std::cout << std::boolalpha;

  std::cout << std::is_swappable<int>::value << std::endl;
  std::cout << std::is_swappable<non_swappable>::value << std::endl;
}
```
* std::is_swappable[color ff0000]

### 出力
```
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

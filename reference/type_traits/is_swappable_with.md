# is_swappable_with
* type_traits[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class T, class U>
  struct is_swappable_with;

  template <class T, class U>
  inline constexpr bool is_swappable_with_v = std::is_swappable_with<T, U>::value;
}
```

## 概要
型`T`と`U`の値が、swap関数によって入れ替え可能かどうかを調べる。


## 要件
型`T`と`U`が、完全型であること。もしくは`const`/`volatile`修飾された(あるいはされていない)`void`か、要素数不明の配列型であること。


## 効果
型`T`と`U`の間で[`std::swappable_with`](/reference/concepts/swappable.md)要件を満たしていれば[`true_type`](true_type.md)から派生し、そうでなければ[`false_type`](false_type.md)から派生する。

型`T`と`U`は参照でなければswapできないので`T`と`U`が参照でない場合、結果は`false`となる。

簡単に説明すると[`std::swappable_with`](/reference/concepts/swappable.md)要件を満たすとは、2引数を取りその引数の値を入れ替えるswap関数が以下のようなコードで見つかることである。

```cpp
#include <utility>

template<typename T, typename U>
swappable_with(T& t, U& u) {
  using std::swap;

  //非メンバ関数のswap(t, u)が見つかる必要がある
  swap(t, u);
  //tとuは入れ替わっている

  //引数を逆にしても同じく見つかる必要がある
  swap(u, t);
  //tとuは呼び出し時と同じに戻る
}
```


## 備考
このメタ関数は`T`と`U`についてのswap関数の直接のコンテキストの妥当性（そのシグネチャで有効なswapがあるかどうか）のみをチェックする。そのため、結果が`true`となったとしてもswap関数の呼び出しができることは保証されない（その他の要因によりコンパイルエラーが発生する可能性がある）。

また同様に、結果が`true`となっても見つかったswap関数がswap動作をするかどうかも保証しない。


## 例

```cpp example
#include <type_traits>
#include <iostream>

template<typename T>
struct non_swappable {};

template<typename T>
void swap(int&, non_swappable<T>&){}

template<typename T>
void swap(non_swappable<T>& lhs, int& rhs) {
  int a = rhs;
  //以下の代入は定義されていない
  rhs = lhs;
  lhs = a;
}

int main()
{
  std::cout << std::boolalpha;

  std::cout << std::is_swappable_with<int&, int&>::value << std::endl;

  //参照でなければならない
  std::cout << std::is_swappable_with<int, int>::value << std::endl;

  std::cout << std::is_swappable_with<int&, double&>::value << std::endl;

  //実際には呼び出し不可であり、swap動作もしないが、定義が見つかるためにtrueになる
  std::cout << std::is_swappable_with<non_swappable<int>&, int&>::value << std::endl;
  std::cout << std::is_swappable_with<int&, non_swappable<int>&>::value << std::endl;

  //ここのコメントを外すとコンパイルエラー
  /*non_swappable nonswap{};
  int n{};
  swap(nonswap, n);*/
}
```
* std::is_swappable_with[color ff0000]

### 出力
```
true
false
false
true
true
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

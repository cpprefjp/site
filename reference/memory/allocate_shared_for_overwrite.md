# allocate_shared_for_overwrite
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T, class A>
  shared_ptr<T>
    allocate_shared_for_overwrite(const A& a);           // (1) C++20
  template<class T, class A>
  constexpr shared_ptr<T>
    allocate_shared_for_overwrite(const A& a);           // (1) C++26

  template<class T, class A>
  shared_ptr<T>
    allocate_shared_for_overwrite(const A& a, size_t N); // (2) C++20
  template<class T, class A>
  constexpr shared_ptr<T>
    allocate_shared_for_overwrite(const A& a, size_t N); // (2) C++26
}
```
* shared_ptr[link shared_ptr.md]

## 概要
`T`型のオブジェクト、またはその配列への[`shared_ptr`](shared_ptr.md)を構築し、返却する。


## 要件
テンプレートパラメータ`A`は`Cpp17Allocator`の要件を満たす。


## 効果
型`T`のオブジェクトにメモリを割り当てる（`T`が`U[]`の場合は`U[N]`。`N`はそれぞれのオーバーロードで指定された引数から決定される）。メモリは、引数`a`のコピー(参照カウンタと型`T`の本体を連続メモリ領域に配置するためには`T`のサイズより大きい領域をアロケートする必要があるために`allocator_traits<Alloc>::rebind_alloc<value_type>`を用いて再束縛されたもの)を使用して割り当てられる。

すべてのオーバーロードにおいて、確保された領域のオブジェクトはデフォルト構築される。

例外が送出された場合、関数は効果がない。

非配列型`U`の（サブ）オブジェクトがこの関数によって初期化されるときは、式`::new(pv) U`によって初期化される。ここで、`pv`は型 `void *`を持ち、型`U`のオブジェクトを保持するための適切なストレージを指す。

配列要素は、アドレスの昇順で初期化される。

戻り値によって管理されるオブジェクトの`lifetime`が終了するか、配列要素の初期化が例外を送出すると、初期化された要素は元の構造の逆の順序で破棄される。

- (1) : このオーバーロードが選択されるとき、`T`は、不明な境界の配列ではない。`T`型のオブジェクトへの`shared_ptr`を返す。
- (2) : このオーバーロードが選択されるとき、`T`は、不明な境界の配列である。型`U[N]`のオブジェクトへの`shared_ptr`を返す。ここで、`U`は[`remove_extent_t<T>`](/reference/type_traits/remove_extent.md)である。

## 戻り値
新しく構築されたオブジェクトのアドレスを格納および所有する[`shared_ptr`](shared_ptr.md)インスタンス。


## 事後条件
`r.get() != 0 && r.use_count() == 1`, ここで、`r` は戻り値である。


## 例外
`bad_alloc`、または`allocate`またはオブジェクトの初期化から送出された例外。


## 備考
同様の効果を持つ関数に、[`make_shared_for_overwrite()`](make_shared_for_overwrite.md)があるが、
この関数はメモリの確保にユーザー定義のアロケータを使用したい場合などに用いることができる。

デフォルト構築においては、[トリビアルにデフォルト構築可能](/reference/type_traits/is_trivially_default_constructible.md)な型のオブジェクトは未初期化状態となるため、値を読みだす前に明示的に初期化（*overwrite*）する必要がある。初期化後の状態が不定になってほしくない場合はこの関数ではなく[`allocate_shared()`](allocate_shared.md)を使用すべき。

## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::allocator<int> alloc;
  std::shared_ptr<int> sp = std::allocate_shared_for_overwrite<int>(alloc);
  if (sp) {
    *sp = 0;  // 必ず初期化する
    std::cout << *sp << std::endl;
  }
}
```
* std::allocate_shared_for_overwrite[color ff0000]

### 出力
```
0
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0.0 現在未対応 [mark verified]
- [GCC](/implementation.md#gcc): 10.0.0 現在未対応 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::make_shared()`](make_shared.md)
- [`std::make_shared_for_overwrite()`](make_shared_for_overwrite.md)
- [`std::allocate_shared()`](allocate_shared.md)


## 参照
- [P1020R1 Smart pointer creation with default initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1020r1.html)
- [P1973R1 Rename "_default_init" Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1973r1.pdf)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
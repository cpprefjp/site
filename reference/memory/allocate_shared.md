# allocate_shared
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class T, class Alloc, class... Args>
  shared_ptr<T> allocate_shared(const Alloc& a, Args&&... args); // (1)

  template<class T, class A>
  shared_ptr<T> allocate_shared(const A& a, size_t N);           // (2) C++20 から

  template<class T, class A>
  shared_ptr<T> allocate_shared(const A& a);                     // (3) C++20 から

  template<class T, class A>
  shared_ptr<T> allocate_shared(const A& a, size_t N,
                                const remove_extent_t<T>& u);    // (4) C++20 から

  template<class T, class A>
  shared_ptr<T> allocate_shared(const A& a,
                                const remove_extent_t<T>& u);    // (5) C++20 から  
}
```
* shared_ptr[link shared_ptr.md]

## 概要
`class T` に対する [`shared_ptr`](shared_ptr.md)`<T>`オブジェクト を作成し返却する。

このとき、`args...` で受け取った引数リストを型 `T` の作成時コンストラクタへ渡して作成する。

また、[`shared_ptr`](shared_ptr.md) 構築に必要なメモリのアロケートおよびデアロケートを第一引数のアロケータで行う。

一般的にアロケータは型 `T` のサイズより大きいサイズのアロケートを要求される。

これは、[`make_shared`](/reference/memory/make_shared.md) と同様に型 `T` と [`shared_ptr`](shared_ptr.md) の管理領域を1つの大きなブロックとしてアロケートすることが実装に推奨されているためである。

また、コピー不可能なクラスもムーブによって引数リストへ渡すことが可能である。


## 要件
テンプレートパラメータ`A`は`Cpp17Allocator`の要件を満たす。


## 効果
型`T`のオブジェクトにメモリを割り当てる（`T`が`U[]`の場合は`U[N]`。`N`はそれぞれのオーバーロードで指定された引数から決定される）。メモリは、引数`a`のコピー(value_type のためのリバウンド。value_type は、参照カウンタと型`T`の本体を連続メモリ領域に配置するための`T`のサイズより大きい領域をアロケートできるような型だと考えられる)を使用して割り当てられる。

オブジェクトは、それぞれのオーバーロードで指定された引数から初期化される。

例外がスローされた場合、関数は効果がない。

配列型`U`のオブジェクトが（同じ型の）`u`の初期値を持つように指定されている場合、これは、オブジェクトの各配列要素が初期値として`u`からの対応する要素を持つことを意味すると解釈される。

配列タイプのオブジェクトがデフォルトの初期値を持つように指定されている場合、これはオブジェクトの各配列要素がデフォルトの初期値を持つ（値初期化される）ことを意味すると解釈される。

非配列型Uの（サブ）オブジェクトが初期値`v`または`U(l...)`を持つように指定されている場合（`l...`はコンストラクタ引数のリスト）、この関数は次の式を介してこの（サブ）オブジェクトを初期化する。

- `allocator_traits<A2>::construct(a2, pv, v)` または

- `allocator_traits<A2>::construct(a2, pv, l...)`

それぞれ、`pv`は型`U`のオブジェクトを保持するのに適したストレージを指し、型`A2`の`a2`は、`value_type`が`remove_cv_t<U>`になるように`allocate_shared`に渡されるアロケーター`a`のリバウンドコピーである。ここで、リバウンドコピーとは、参照カウンタと型`T`の本体を連続メモリ領域に配置するためには`T`のサイズより大きい領域をアロケートする必要があるために`allocator_traits<Alloc>::rebind_alloc<value_type>`を用いて再束縛されたものである。

非配列型Uの（サブ）オブジェクトがデフォルトの初期値を持つように指定されている場合、この関数は、式 `allocator_traits<A2>::construct(a2, pv)`を介してこの（サブ）オブジェクトを初期化する。ここで、`pv`は、型`U`のオブジェクトを保持するのに適したストレージを指し、タイプ`A2`の`a2`は、`value_type`が`remove_cv_t<U>`になるように、`allocate_shared`に渡されるアロケーター`a`のリバウンドコピーである。

配列要素は、アドレスの昇順で初期化される。

戻り値によって管理されるオブジェクトの`lifetime`が終了するか、配列要素の初期化が例外をスローすると、初期化された要素は元の構造の逆の順序で破棄される。

この関数によって初期化された非配列型`U`の（サブ）オブジェクトが破棄される場合、式`allocator_traits<A2>::destroy(a2, pv)`によって破棄される。`pv`はその型のオブジェクトを指す。`remove_cv_t<U>`および型`A2`の`a2`は、`value_type`が`remove_cv_t<U>`になるように`allocate_shared`に渡されるアロケーター`a`の再束縛されたコピーである。

- (1) : 初期値`T(forward<Args>(args)...)`を持つ型`T`のオブジェクトへの`shared_ptr`を返す。Tが配列型でない場合にのみ、このオーバーロードはオーバーロード解決に関与する。この関数によって呼び出される`shared_ptr`コンストラクタは、型`T`の新しく構築されたオブジェクトのアドレスで`shared_from_this`を有効にする。
- (2) : デフォルトの初期値を持つ`U[N]`型のオブジェクトへの`shared_ptr`を返す。ここで、`U`は`remove_extent_t<T>`である。`T`の形式が`U[]`の場合にのみ、このオーバーロードはオーバーロード解決に関与する。
- (3) : デフォルトの初期値を持つ`T`型のオブジェクトへの`shared_ptr`を返す。このオーバーロードは、`T`が`U[N]`の形式の場合にのみオーバーロード解決に関与する。
- (4) : `U[N]`型のオブジェクトへの`shared_ptr`を返す。ここで、`U`は`remove_extent_t<T>`であり、各配列要素の初期値は`u`である。`T`の形式が`U[]`の場合にのみ、このオーバーロードはオーバーロード解決に関与する。
- (5) : 型`T`のオブジェクトへの`shared_ptr`を返す。ここで、型`remove_extent_t<T>`の各配列要素は初期値`u`を持つ。

## 戻り値
新しく構築されたオブジェクトのアドレスを格納および所有する[`shared_ptr`](shared_ptr.md)インスタンス。


## 事後条件
`r.get() != 0 && r.use_count() == 1`, ここで、`r` は戻り値である。


## 例外
`bad_alloc`、または`allocate`またはオブジェクトの初期化からスローされた例外。


## 備考
同様の効果を持つ関数に、[`make_shared()`](make_shared.md)があるが、
この関数はメモリの確保にユーザー定義のアロケータを使用したい場合などに用いることができる。

この関数では初期値が指定されない場合に確保した領域にオブジェクトが値初期化され構築される。値初期化においては、組み込み型は`0`相当の値で初期化され、クラス型はデフォルトコンストラクタによって初期化される。この関数でメモリを確保した後ですぐに別の値で上書きしている場合、代わりに[`allocate_shared_for_overwrite()`](allocate_shared_for_overwrite.md)を使用することで初期化のオーバーヘッドを削減できる可能性がある。

## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::allocator<int> alloc;
  std::shared_ptr<int> sp = std::allocate_shared<int>(alloc, 42);
  if (sp) {
    std::cout << *sp << std::endl;
  }
}
```
* std::allocate_shared[color ff0000]

### 出力
```
42
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.7.3 [mark verified], 4.8.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
    - 2012までは、可変引数テンプレートに対応していないため、不完全な実装である。


## 関連項目
- [`std::make_shared()`](make_shared.md)
- [`std::make_shared_for_overwrite()`](make_shared_for_overwrite.md)
- [`std::allocate_shared_for_overwrite()`](allocate_shared_for_overwrite.md)


## 参照
- [P0674R1 Extending `make_shared` to support arrays](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0674r1.html)

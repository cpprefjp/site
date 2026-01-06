# make_shared
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template <class T, class... Args>
  shared_ptr<T>
    make_shared(Args&&... args);              // (1) C++11
  template <class T, class... Args>
  constexpr shared_ptr<T>
    make_shared(Args&&... args);              // (1) C++26

  template <class T>
  shared_ptr<T>
    make_shared(size_t N);                    // (2) C++20
  template <class T>
  constexpr shared_ptr<T>
    make_shared(size_t N);                    // (2) C++26

  template <class T>
  shared_ptr<T>
    make_shared();                            // (3) C++20
  template <class T>
  constexpr shared_ptr<T>
    make_shared();                            // (3) C++26

  template <class T>
  shared_ptr<T>
    make_shared(size_t N,
                const remove_extent_t<T>& u); // (4) C++20
  template <class T>
  constexpr shared_ptr<T>
    make_shared(size_t N,
                const remove_extent_t<T>& u); // (4) C++26

  template <class T>
  shared_ptr<T>
    make_shared(const remove_extent_t<T>& u); // (5) C++20
  template <class T>
  constexpr shared_ptr<T>
    make_shared(const remove_extent_t<T>& u); // (5) C++26
}
```
* shared_ptr[link shared_ptr.md]
* remove_extent_t[link ../type_traits/remove_extent.md]

## 概要
[`shared_ptr`](shared_ptr.md) オブジェクトを構築する。


## 効果
型`T`のオブジェクトにメモリを割り当てる（`T`が`U[]`の場合は`U[N]`。`N`はそれぞれのオーバーロードで指定された引数から決定される）。

オブジェクトは、それぞれのオーバーロードで指定された引数から初期化される。

例外が送出された場合、関数は効果がない。

配列型`U`のオブジェクトが（同じ型の）`u`の初期値を持つように指定されている場合、これは、オブジェクトの各配列要素が初期値として`u`からの対応する要素を持つことを意味すると解釈される。

配列タイプのオブジェクトがデフォルトの初期値を持つように指定されている場合、これはオブジェクトの各配列要素がデフォルトの初期値を持つ（値初期化される）ことを意味すると解釈される。

非配列型`U`の（サブ）オブジェクトが、`v`または`U(l ...)`の初期値を持つように指定されている場合（`l...`はコンストラクタ引数のリスト）、`make_shared`は、式`::new (pv) U(v)`または`::new (pv) U(l...)`を使用して、この（サブ）オブジェクトを初期化する。ここで、`pv`の型は`void*`であり、型`U`のオブジェクトを保持するのに適したストレージを指す。

非配列型`U`の（サブ）オブジェクトがデフォルトの初期値を持つように指定されている場合、この関数は、式 `::new (pv) U()`を使用してこの（サブ）オブジェクトを初期化する。`void*`は型`U`のオブジェクトを保持するのに適したストレージを指す。

配列要素は、アドレスの昇順で初期化される。

戻り値によって管理されるオブジェクトの`lifetime`が終了するか、配列要素の初期化が例外を送出すると、初期化された要素は元の構造の逆の順序で破棄される。

この関数によって初期化された非配列型`U`の（サブ）オブジェクトを破棄する場合、式`pv->~U()`によって破棄される。pvは型`U`のオブジェクトを指す。

- (1) : 初期値`T(forward<Args>(args)...)`を持つ型`T`のオブジェクトへの`shared_ptr`を返す。Tが配列型でない場合にのみ、このオーバーロードはオーバーロード解決に関与する。この関数によって呼び出される`shared_ptr`コンストラクタは、型`T`の新しく構築されたオブジェクトのアドレスで`shared_from_this`を有効にする。
- (2) : デフォルトの初期値を持つ`U[N]`型のオブジェクトへの`shared_ptr`を返す。ここで、`U`は`remove_extent_t<T>`である。`T`の形式が`U[]`の場合にのみ、このオーバーロードはオーバーロード解決に関与する。
- (3) : デフォルトの初期値を持つ`T`型のオブジェクトへの`shared_ptr`を返す。このオーバーロードは、`T`が`U[N]`の形式の場合にのみオーバーロード解決に関与する。
- (4) : `U[N]`型のオブジェクトへの`shared_ptr`を返す。ここで、`U`は`remove_extent_t<T>`であり、各配列要素の初期値は`u`である。`T`の形式が`U[]`の場合にのみ、このオーバーロードはオーバーロード解決に関与する。
- (5) : 型`T`のオブジェクトへの`shared_ptr`を返す。ここで、型`remove_extent_t<T>`の各配列要素は初期値`u`を持つ。

## 戻り値
型`T`に対する `shared_ptr<T>`オブジェクトを生成し返却する。  
このとき、`args...` で受け取った引数リストを型 `T`のコンストラクタへ渡して`shared_ptr<T>`型のオブジェクトを生成する。  


## 事後条件
`r.get() != 0 && r.use_count() == 1`, ここで、`r` は戻り値である。


## 例外
`bad_alloc`、または`allocate`またはオブジェクトの初期化から送出された例外。


## 備考
`shared_ptr<T>(new T(args...));` というように、コンストラクタを呼び出す方法でも`shared_ptr`オブジェクトを構築できる。しかしこの方法では、以下の2つのメモリ確保が必要になり、効率がよくない：

- ユーザーによるオブジェクトの生成
- 内部的な参照カウンタの生成

`make_shared()` は内部的にオブジェクトを生成するため、オブジェクトの生成と参照カウンタの生成を、1つの大きなブロックとしてメモリを確保するため、より効率的になる。

メモリの確保にユーザー定義のアロケータを使用したい場合には、 [`allocate_shared()`](allocate_shared.md) を使用する。

この関数では初期値が指定されない場合に確保した領域にオブジェクトが値初期化され構築される。値初期化においては、組み込み型は`0`相当の値で初期化され、クラス型はデフォルトコンストラクタによって初期化される。この関数でメモリを確保した後ですぐに別の値で上書きしている場合、代わりに[`make_shared_for_overwrite()`](make_shared_for_overwrite.md)を使用することで初期化のオーバーヘッドを削減できる可能性がある。

## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::shared_ptr<int> sp = std::make_shared<int>(42);
  if(sp) {
    std::cout << *sp << std::endl;
  }
}
```
* std::make_shared[color ff0000]

### 出力
```
42
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2 [mark verified], 3.3 [mark verified]
- [GCC](/implementation.md#gcc): 4.4 [mark verified], 4.7.3 [mark verified], 4.8.2 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2010〜2012 でも使用可能だが、コンパイラが可変引数テンプレートに対応していないため、最大10個の引数を受け取れる形で実装されている。


## 関連項目
- [`std::allocate_shared()`](allocate_shared.md)
- [`std::make_shared_for_overwrite()`](make_shared_for_overwrite.md)
- [`std::allocate_shared_for_overwrite()`](allocate_shared_for_overwrite.md)


## 参照
- [N2351 Improving `shared_ptr` for C++0x, Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2351.htm)
- [std::make_shared から private コンストラクタを呼び出す - 野良C++erの雑記帳](http://d.hatena.ne.jp/gintenlabo/20131211/1386771626)
- [P0674R1 Extending `make_shared` to support arrays](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0674r1.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
# make_shared_for_overwrite
* memory[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T>
  shared_ptr<T> make_shared_for_overwrite();         // (1)

  template<class T>
  shared_ptr<T> make_shared_for_overwrite(size_t N); // (2)
}
```
* shared_ptr[link shared_ptr.md]

## 概要
デフォルトの初期値を持つ`T`型のオブジェクト、またはその配列への[`shared_ptr`](shared_ptr.md)を構築し、返却する。


## 効果
型`T`のオブジェクトにメモリを割り当てる（`T`が`U[]`の場合は`U[N]`。`N`はそれぞれのオーバーロードで指定された引数から決定される）。

オブジェクトは、デフォルト初期化される。

例外がスローされた場合、関数は効果がない。

配列型`U`のオブジェクトが（同じ型の）`u`の初期値を持つように指定されている場合、これは、オブジェクトの各配列要素が初期値として`u`からの対応する要素を持つことを意味すると解釈される。

配列タイプのオブジェクトがデフォルトの初期値を持つように指定されている場合、これはオブジェクトの各配列要素がデフォルトの初期値を持つことを意味すると解釈される。

配列要素は、アドレスの昇順で初期化される。

非配列型`U`の（サブ）オブジェクトがこの関数によって初期化されるときは、式`::new(pv) U`によって初期化される。ここで、`pv`は型 `void *`を持ち、型`U`のオブジェクトを保持するための適切なストレージを指す。

戻り値によって管理されるオブジェクトの`lifetime`が終了するか、配列要素の初期化が例外をスローすると、初期化された要素は元の構造の逆の順序で破棄される。

- (1) : このオーバーロードが選択されるとき、`T`は、不明な境界の配列ではない。`T`型のオブジェクトへの`shared_ptr`を返す。
- (2) : このオーバーロードが選択されるとき、`T`は、不明な境界の配列である。型`U[N]`のオブジェクトへの`shared_ptr`を返す。ここで、`U`は[`remove_extent_t<T>`](/reference/type_traits/remove_extent.md)である。

## 戻り値
新しく構築されたオブジェクトのアドレスを格納および所有する[`shared_ptr`](shared_ptr.md)インスタンス。


## 事後条件
`r.get() != 0 && r.use_count() == 1`, ここで、`r` は戻り値である。


## 例外
`bad_alloc`、または`allocate`またはオブジェクトの初期化からスローされた例外。


## 備考
メモリの確保にユーザー定義のアロケータを使用したい場合には、 [`allocate_shared_for_overwrite()`](allocate_shared_for_overwrite.md) を使用する。


## 例
```cpp example
#include <memory>
#include <iostream>

int main() {
  std::shared_ptr<int> sp = std::make_shared_for_overwrite<int>();
  if (sp) {
    std::cout << *sp << std::endl;
  }
}
```
* std::make_shared_for_overwrite[color ff0000]


### 出力
```
0
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 10.0.0 現在未対応
- [GCC](/implementation.md#gcc): 10.0.0 現在未対応
- [Visual C++](/implementation.md#visual_cpp): ??



## 関連項目
- [`std::make_shared()`](make_shared.md)
- [`std::allocate_shared()`](allocate_shared.md)
- [`std::allocate_shared_for_overwrite()`](allocate_shared_for_overwrite.md)


## 参照
- [P1020R1 Smart pointer creation with default initialization](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1020r1.html)
- [P1973R1 Rename "_default_init" Functions](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2020/p1973r1.pdf)

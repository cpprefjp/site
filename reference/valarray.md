# valarray
* valarray[meta header]

`<valarray>`ヘッダは、数値計算に特化した配列クラスである [`valarray`](valarray/valarray.md) と、基礎的な数学的処理を行うための関数オーバーロードを定義したライブラリである。

このヘッダで定義される任意の [`valarray`](valarray/valarray.md)`<T>` 型を返す関数は（メンバ関数、非メンバ関数とも）、式テンプレートでの実装を可能とするため [`valarray`](valarray/valarray.md)`<T>` 型以外の代理の型を返すことが規格で許可されている。
このような代理の型には、[`valarray`](valarray/valarray.md) の全ての `const` メンバ関数が提供される。
また、このような代理の型を提供する処理系では、以下のような関数も提供される。

- 本ヘッダで提供される、`const` [`valarray`](valarray/valarray.md)`<T>&` を 1 つだけ引数に持つ全ての関数は、提供される代理の型も引数として受け付ける。  
	（ただし、[`begin`](valarray/valarray/begin_free.md) と [`end`](valarray/valarray/end_free.md) を除く）
- 本ヘッダで提供される、`const` [`valarray`](valarray/valarray.md)`<T>&` を 2 つ引数に持つ全ての関数は、当該代理の型と [`valarray`](valarray/valarray.md)`<T>` の任意の組み合わせも引数として受け付ける。

これらを踏まえ、本リファレンスではこれらの代理の型が使用されうる箇所は *`ValOrProxy`* として表記している。戻り値型に *`ValOrProxy`* と表記している箇所は、[`valarray`](valarray/valarray.md)`<T>` か代理の型のいずれかであることを、引数型に *`ValOrProxy`* と表記している箇所は、[`valarray`](valarray/valarray.md)`<T>` と代理の型のいずれでも受け取ることが可能であることを表している。

このヘッダでは、以下の標準ヘッダをインクルードする：

- [`<initializer_list>`](initializer_list.md) (C++11)


## 配列クラス

| クラス                               | 説明                          | 対応バージョン |
|--------------------------------------|-------------------------------|----------------|
| [`valarray`](valarray/valarray.md) | 数値演算に特化した配列クラス  | |


## スライス指示

以下は、`valarray`クラスの配列から条件一致した要素を抽出するための、ヘルパークラスである。

| クラス                               | 説明                          | 対応バージョン |
|--------------------------------------|-------------------------------|----------------|
| [`slice`](valarray/slice.md)       | スライス指示用のヘルパークラス | |
| [`gslice`](valarray/gslice.md)     | [`slice`](valarray/slice.md)をより一般化したスライス指示用のヘルパークラス | |


## スライス結果の配列クラス

以下は、[`valarray`](valarray/valarray.md)クラスの[`operator[]`](/reference/valarray/valarray/op_at.md)メンバ関数によって返される、スライス結果の配列クラスである。これらのクラスは、配列のコピーは保持せず、元となる[`valarray`](valarray/valarray.md)オブジェクトの要素を参照する。

| クラス                               | 説明                          | 対応バージョン |
|--------------------------------------|-------------------------------|----------------|
| [`slice_array`](valarray/slice_array.md)   | [`valarray`](valarray/valarray.md)から[`slice`](valarray/slice.md)によって要素抽出した結果となる配列クラス | |
| [`gslice_array`](valarray/gslice_array.md) | [`valarray`](valarray/valarray.md)から[`gslice`](valarray/gslice.md)によって要素抽出した結果となる配列クラス | |
| [`mask_array`](valarray/mask_array.md)     | [`valarray`](valarray/valarray.md)から[`valarray<bool>`](valarray/valarray.md)を指定して要素抽出した結果となる配列クラス | |
| [`indirect_array`](valarray/indirect_array.md) | [`valarray`](valarray/valarray.md)から[`valarray<size_t>`](valarray/valarray.md)を指定して要素抽出した結果となる配列クラス | |


## 参照
- [N2930 Range-Based For Loop Wording (Without Concepts)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2009/n2930.html)  
	[`valarray`](valarray/valarray.md) に [`begin`](valarray/valarray/begin_free.md) と [`end`](valarray/valarray/end_free.md) が追加された提案
- [LWG Issue 2058. valarray and begin/end](https://wg21.cmeerw.net/lwg/issue2058)  
	[`valarray`](valarray/valarray.md) の代理の型に [`begin`](valarray/valarray/begin_free.md) と [`end`](valarray/valarray/end_free.md) は適用できないとした経緯

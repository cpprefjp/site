#operator=
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unordered_multimap& operator=(const unordered_multimap& v);     // (1)
unordered_multimap& operator=(unordered_multimap&& rv);         // (2)
unordered_multimap& operator=(initializer_list<value_type> il); // (3)
```
* initializer_list[link /reference/initializer_list.md]

##概要
`unordered_multimap` オブジェクトを代入する


##要件
- (1)、および、(3) の形式の場合、以下の条件を満たすこと。

	* `value_type` はこのコンテナに対してコピー挿入可能（CopyInsertable）であること。
	* `key_type`、および、`mapped_type` はコピー代入可能（CopyAssignable）であること。（`value_type` は `std::`[`pair`](/reference/utility/pair.md)`<const key_type, mapped_type>` であるため、コピー代入可能ではない）

- (2) の形式の場合、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `false` であれば、以下の条件を満たすこと。

	* `value_type` はこのコンテナに対してムーブ挿入可能（MoveInsertable）であること。（但し、備考参照）
	* `key_type`、および、`mapped_type` はムーブ代入可能（MoveAssignable）であること。（`value_type` は `std::`[`pair`](/reference/utility/pair.md)`<const key_type, mapped_type>` であるため、ムーブ代入可能ではない）


##効果
- (1)	`v` の全ての要素がコピー代入される。ハッシュ関数オブジェクト、キー比較用関数オブジェクト、[`max_load_factor`](./max_load_factor.md)`()` の値もコピーされる。
	アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_copy_assignment::value` が `true` の場合に限りコピーされる。

- (2)	ハッシュ関数オブジェクト、キー比較用関数オブジェクトの値はムーブされる。
	[`max_load_factor`](./max_load_factor.md)`()` の値はコピーされる。
	アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `true` の場合に限りムーブされる。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。

- (3)	範囲 `[il.begin(), il.end())` がコピー代入される。
	コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。


##事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) `u == v`。
- (2) `u == 代入前の rv`。
- (3) －


##戻り値
`*this`


##計算量
- (1)	平均的には O(n)、ここで、`n = v.`[`size`](./size.md)`()`。最悪のケースでは O(n<sup>2</sup>)
- (2)	線形時間。
- (3)	代入対象を `a`、`a` の型を `X` とすると、`a = X(il)` と同様。（備考参照）


##備考
- (3) の形式の場合、計算量は `a = X(il)` と同様となっているが、効果が `a = X(il)` と同様なわけではない。（ハッシュ関数オブジェクト、キー比較用関数オブジェクト、アロケータオブジェクト、[`max_load_factor`](./max_load_factor.md)`()` 等が異なる）

- (2) の形式の要件に、「`value_type` はこのコンテナに対してムーブ挿入可能であること」というものがあるが、`value_type` は `std::`[`pair`](/reference/utility/pair.md)`<const key_type, mapped_type>` であるため、通常のムーブ挿入可能の条件に合わせると `key_type` にコピーコンストラクタが必要となってしまう。
	従って、規格書に明確な記載はないものの、この場合のムーブ挿入可能とは、`m` をアロケータ型 `allocator_type` の左辺値、`p` を要素型 `value_type` へのポインタ、`krv` をキーの型 `key_type` の右辺値、`mrv` を値の型 `mapped_type` の右辺値とすると、以下の式が適格（well-formed）であるということであるものと思われる。

	`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`construct`](/reference/memory/allocator_traits/construct.md)`(m, p, krv, mrv)`


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++0x mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++0x mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


##関連項目

|                                            |                |
|--------------------------------------------|----------------|
| [`(constructor)`](./op_constructor.md) | コンストラクタ |
| [`(destructor)`](./op_destructor.md) | デストラクタ   |


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書


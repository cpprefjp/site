# operator=
* unordered_set[meta header]
* std[meta namespace]
* unordered_multiset[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unordered_multiset& operator=(const unordered_multiset& v);     // (1)
unordered_multiset& operator=(unordered_multiset&& rv);         // (2)
unordered_multiset& operator=(initializer_list<value_type> il); // (3)
```
* initializer_list[link /reference/initializer_list.md]

## 概要
`unordered_multiset` オブジェクトを代入する


## 要件
- (1)、および、(3) の形式の場合、以下の条件を満たすこと。

	* `value_type` はこのコンテナに対してコピー挿入可能（CopyInsertable）であること。
	* `value_type` はコピー代入可能（CopyAssignable）であること。

- (2) の形式の場合、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `false` であれば、以下の条件を満たすこと。

	* `value_type` はこのコンテナに対してムーブ挿入可能（MoveInsertable）であること。
	* `value_type` はムーブ代入可能（MoveAssignable）であること。


## 効果
- (1)	`v` の全ての要素がコピー代入される。ハッシュ関数オブジェクト、キー比較用関数オブジェクト、[`max_load_factor`](max_load_factor.md)`()` の値もコピーされる。
	アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_copy_assignment::value` が `true` の場合に限りコピーされる。

- (2)	ハッシュ関数オブジェクト、キー比較用関数オブジェクトの値はムーブされる。
	[`max_load_factor`](max_load_factor.md)`()` の値はコピーされる。
	アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `true` の場合に限りムーブされる。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。

- (3)	範囲 `[il.begin(), il.end())` がコピー代入される。
	コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。


## 事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) `u == v`。
- (2) `u == 代入前の rv`。
- (3) －


## 戻り値
`*this`


## 計算量
- (1)	平均的には O(n)、ここで、`n = v.`[`size`](size.md)`()`。最悪のケースでは O(n<sup>2</sup>)
- (2)	線形時間。
- (3)	代入対象を `a`、`a` の型を `X` とすると、`a = X(il)` と同様。（備考参照）


## 備考
- (3) の形式の場合、計算量は `a = X(il)` と同様となっているが、効果が `a = X(il)` と同様なわけではない。（ハッシュ関数オブジェクト、キー比較用関数オブジェクト、アロケータオブジェクト、[`max_load_factor`](max_load_factor.md)`()` 等が異なる）


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?


## 関連項目

|                                            |                |
|--------------------------------------------|----------------|
| [`(constructor)`](op_constructor.md)     | コンストラクタ |
| [`(destructor)`](op_destructor.md)       | デストラクタ   |


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (3)の経緯となる提案文書


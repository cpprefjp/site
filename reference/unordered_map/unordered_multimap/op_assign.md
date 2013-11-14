#代入演算子(C++11)
```cpp
unordered_multimap& operator=(const unordered_multimap& v);     // (1)
unordered_multimap& operator=(unordered_multimap&& rv);         // (2)
unordered_multimap& operator=(initializer_list<value_type> il); // (3)
```
* initializer_list[link /reference/initializer_list.md]

##概要
`unordered_multimap` オブジェクトを代入する


##要件
- (1)、および、(3) の形式の場合、`value_type` はこの `unordered_multimap` に対して CopyInsertable かつ CopyAssignable であること。（但し、備考参照）

- (2) の形式の場合、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `false` であれば、`value_type` はこのコンテナに対して MoveInsertable かつ MoveAssignable であること。（但し、備考参照）


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
- 要件に、`value_type` はこの `unordered_multimap` に対して CopyAssignable、あるいは、MoveAssignable であること、というものがあるが、`value_type` は `std::`[`pair`](/reference/utility/pair.md) の `first` 部分が `const` であるため、当該要件を満たすことができない。
	これはおそらく規格書の記述上の問題で、`key_type`、および、`mapped_type` がコピー代入可能、あるいは、ムーブ代入可能であれば良いものと思われる。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): -
- [Clang, C++0x mode](/implementation#clang.md): 3.0, 3.1
- [GCC](/implementation#gcc.md): -
- [GCC, C++0x mode](/implementation#gcc.md): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation#icc.md): ?
- [Visual C++](/implementation#visual_cpp.md): ?


##参照

|                                            |                |
|--------------------------------------------|----------------|
| [`(constructor)`](./unordered_multimap.md) | コンストラクタ |
| [`(destructor)`](./-unordered_multimap.md) | デストラクタ   |


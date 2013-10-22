#代入演算子(C++11)
```cpp
unordered_set& operator=(const unordered_set& v);          // (1)
unordered_set& operator=(unordered_set&& rv);              // (2)
unordered_set& operator=(initializer_list<value_type> il); // (3)
```
* initializer_list[link /reference/initializer_list.md]

##概要
`unordered_set` オブジェクトを代入する


##要件
- (1)、および、(3) の形式の場合、`value_type` はこの `unordered_set` に対して CopyInsertable かつ CopyAssignable であること。

- (2) の形式の場合、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `false` であれば、`value_type` はこのコンテナに対して MoveInsertable かつ MoveAssignable であること。


##効果
- (1)	`v` の全ての要素がコピー代入される。ハッシュ関数オブジェクト、キー比較用関数オブジェクト、[`max_load_factor`](./max_load_factor.md)`()` の値もコピーされる。アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_copy_assignment::value` が `true` の場合に限りコピーされる。

- (2)	ハッシュ関数オブジェクト、キー比較用関数オブジェクトの値はムーブされる。[`max_load_factor`](./max_load_factor.md)`()` の値はコピーされる。アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value` が `true` の場合に限りムーブされる。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。

- (3)	範囲 `[il.begin(), il.end())` がコピー代入される。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。


##事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) `u == v`。
- (2) `u == 代入前の rv`。
- (3) －


##戻り値
`*this`


##計算量
- (1)	平均的には O(n)、ここで、`n = v.`[`size`](./size.md)`()`。最悪のケースでは O(n<sup>2</sup>)
- (2)	線形時間。（但し、備考参照）
- (3)	代入対象を `a`、`a` の型を `X` とすると、`a = X(il)` と同様。（備考参照）


##備考
- (2) の形式の場合、標準では上記の通り計算量が線形時間となっているが、[`get_allocator`](./get_allocator.md)`() != rv.`[`get_allocator`](./get_allocator.md)`()` の場合、最悪のケースでは O(n<sup>2</sup>) であるものと思われる。ここで、`n = rv.`[`size`](./size.md)`()`。

- (3) の形式の場合、計算量は `a = X(il)` と同様となっているが、効果が `a = X(il)` と同様なわけではない。（ハッシュ関数オブジェクト、キー比較用関数オブジェクト、アロケータオブジェクト、[`max_load_factor`](./max_load_factor.md)`()` 等が異なる）


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

|                                       |                |
|---------------------------------------|----------------|
| [`(constructor)`](./unordered_set.md) | コンストラクタ |
| [`(destructor)`](./-unordered_set.md) | デストラクタ   |


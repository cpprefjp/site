#コンストラクタ
```cpp
explicit unordered_multiset(size_type n = 実装依存の既定値,
                            const hasher& hf = hasher(),
                            const key_equal& eql = key_equal(),
                            const allocator_type& a = allocator_type());  // (1)
template <class InputIterator>
unordered_multiset(InputIterator first, InputIterator last,
                   size_type n = 実装依存の既定値,
                   const hasher& hf = hasher(),
                   const key_equal& eql = key_equal(),
                   const allocator_type& a = allocator_type());           // (2)

unordered_multiset(const unordered_multiset& v);                          // (3)

unordered_multiset(unordered_multiset&& rv);                              // (4)

explicit unordered_multiset(const allocator_type& a);                     // (5)

unordered_multiset(const unordered_multiset& v, const allocator_type& a); // (6)

unordered_multiset(unordered_multiset&& rv, const allocator_type& a);     // (7)

unordered_multiset(initializer_list<value_type> il,
                   size_type n = 実装依存の既定値,
                   const hasher& hf = hasher(),
                   const key_equal& eql = key_equal(),
                   const allocator_type& a = allocator_type());           // (8)
```
* initializer_list[link /reference/initializer_list.md]

##概要
`unordered_multiset` オブジェクトを構築する


##要件
- ハッシュ関数オブジェクト `hasher` が引数として与えられなかった場合、`hasher` は DefaultConstructible であること。
- キー比較用関数オブジェクト `key_equal` が引数として与えられなかった場合、`key_equal` は DefaultConstructible であること。
- アロケータオブジェクト `allocator_type` が引数として与えられなかった場合、`allocator_type` は DefaultConstructible であること。
- (2) の形式の場合、`value_type` は `*first` からこの `unordered_multiset` に EmplaceConstructible であること。
- (3)、(6)、および (8) の形式の場合、`value_type` はこの `unordered_multiset` に CopyInsertable であること。
- (4) の形式の場合、`allocator_type` のムーブ構築は例外終了しないこと。
- (7) の形式の場合、`value_type` はこの `unordered_multiset` に MoveInsertable であること。（但し、備考参照）


##効果

- (1)	バケット数最低 `n`、ハッシュ関数オブジェクト `hf`、キー比較用関数オブジェクト `eql`、アロケータオブジェクト `a` で、要素を持たない空の `unordered_multiset` を構築する。引数 `n` のデフォルト値は実装依存である。
- (2)	(1)と同様に `unordered_multiset` が構築された後、`[first, last)` の範囲の要素が挿入される。
- (3)	コピーコンストラクタ。`v` の全ての要素をコピーした、`unordered_multiset` を構築する。ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、[`max_load_factor()`](./max_load_factor.md) の値も `v` からコピーされる。アロケータオブジェクトは、`std::allocator_traits::`[`get_allocator()`](./get_allocator.md) の戻り値が使用される。
- (4)	ムーブコンストラクタ。`rv` の全ての要素をムーブした、`unordered_multiset` を構築する。ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、アロケータオブジェクトも `v` からムーブされる。[`max_load_factor()`](./max_load_factor.md) の値は `rv` からコピーされる。なお、要素のムーブは個々に行われるのではなく、`unordered_multiset` 内部の構造ごと一括でムーブされる。
- (5)	ハッシュ関数オブジェクト `hasher`、キー比較用関数オブジェクト `key_equal`、アロケータオブジェクト `a` で、要素を持たない空の `unordered_multiset` を構築する。構築された `unordered_multiset` のバケット数、および、[`max_load_factor()`](./max_load_factor.md) は実装依存である。
- (6)	`v` の全ての要素をコピーした、`unordered_multiset` を構築する。ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、[`max_load_factor()`](./max_load_factor.md) の値も `v` からコピーされるが、アロケータオブジェクトは引数 `a` が使用される。
- (7)	`rv` のすべての要素をムーブした、`unordered_multiset` を構築する。ハッシュ関数オブジェクトとキー比較関数オブジェクトの値も `rv` からムーブされるが、アロケータオブジェクトは引数 `a` が使用される。[`max_load_factor()`](./max_load_factor.md) の値は `rv` からコピーされる。なお、`a == rv.`[`get_allocator()`](./get_allocator.md) の場合、要素のムーブは個々に行われるのではなく、`unordered_multiset` 内部の構造ごと一括でムーブされるが、そうでない場合は要素ごとにムーブされる。
- (8)	(2) の形式を `unordered_multiset(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と同等である。


##事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) `u.`[`empty`](./empty.md)`() == true`。`u.`[`get_allocator`](./get_allocator.md)`() == a`。`u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。`u.`[`bucket_count`](./bucket_count.md)`() >= n`。
- (2) `u.`[`get_allocator`](./get_allocator.md)`() == a`。`u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。`u.`[`bucket_count`](./bucket_count.md)`() >= n`。
- (3) `u.`[`max_load_factor`](./max_load_factor.md)`() == v.`[`max_load_factor`](./max_load_factor.md)`()`。`u == v`。
- (4) `u.`[`get_allocator`](./get_allocator.md)`() ==` 構築前の `rv.`[`get_allocator`](./get_allocator.md)`()`。`u.`[`max_load_factor`](./max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](./max_load_factor.md)`()`。`u == `構築前の `rv`。
- (5) `u.`[`empty`](./empty.md)`() == true`。`u.`[`get_allocator`](./get_allocator.md)`() == a`。
- (6) `u.`[`max_load_factor`](./max_load_factor.md)`() == v.`[`max_load_factor`](./max_load_factor.md)`()`。`u == v`。`u.`[`get_allocator{](./get_allocator.md)`() == a`。
- (7) `u.`[`max_load_factor`](./max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](./max_load_factor.md)`()`。`u == `構築前の `rv`。`u.`[`get_allocator`](./get_allocator.md)`() == a`。
- (8) `u.`[`get_allocator`](./get_allocator.md)`() == a`。`u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。`u.`[`bucket_count`](./bucket_count.md)`() >= n`。


##計算量
- (1)	定数
- (2)	平均的には O(n)、ここで、n は [`std::distance(first, last)`](/reference/iterator/distance.md)。最悪のケースでは O(n^2)
- (3)	平均的には O(n)、ここで、n は `v.`[`size()`](./size.md)。最悪のケースでは O(n2)
- (4)	定数
- (5)	定数
- (6)	O(`v.`[`size()`](./size.md))
- (7)	`a == rv.`[`get_allocator()`](./get_allocator.md) の場合、定数。そうでない場合、O(`rv.`[`size()`](./size.md))。
- (8)	(2)の形式を `unordered_multiset(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と同等。


##備考
- (7) の形式の場合、MoveInsertable が要件となっているが、`v.`[`get_allocator`](./get_allocator.md)`() == a` の場合にはムーブコンストラクタと同様の挙動となるため、MoveInsertable ではなくても良いと思われる。


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

####備考
libstdc++ には 4.7.2 現在、(5)、(6)、(7)の形式はない。


##参照

| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------|
| [`(destructor)`](./-unordered_multiset.md) | デストラクタ |
| [`operator=`](./op_assign.md) | 代入演算子 |


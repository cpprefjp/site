#コンストラクタ
* unordered_set[meta header]
* std[meta namespace]
* unordered_set[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unordered_set();                                                    // (1) C++14

explicit unordered_set(size_type n,
                       const hasher& hf = hasher(),
                       const key_equal& eql = key_equal(),
                       const allocator_type& a = allocator_type()); // (2) C++14


explicit unordered_set(size_type n = 実装依存の既定値,
                       const hasher& hf = hasher(),
                       const key_equal& eql = key_equal(),
                       const allocator_type& a = allocator_type()); // (1) + (2) C++11

template <class InputIterator>
unordered_set(InputIterator first, InputIterator last,
              size_type n = 実装依存の既定値,
              const hasher& hf = hasher(),
              const key_equal& eql = key_equal(),
              const allocator_type& a = allocator_type());          // (3)

unordered_set(const unordered_set& v);                              // (4)

unordered_set(unordered_set&& rv);                                  // (5)

explicit unordered_set(const allocator_type& a);                    // (6)

unordered_set(const unordered_set& v, const allocator_type& a);     // (7)

unordered_set(unordered_set&& rv, const allocator_type& a);         // (8)

unordered_set(initializer_list<value_type> il,
              size_type n = 実装依存の既定値,
              const hasher& hf = hasher(),
              const key_equal& eql = key_equal(),
              const allocator_type& a = allocator_type());          // (9)

unordered_set(size_type n, const allocator_type& a);                // (10) C++14

unordered_set(size_type n,
              const hasher& hf,
              const allocator_type& a);                             // (11) C++14

template <class InputIterator>
unordered_set(InputIterator f,
              InputIterator l,
              size_type n,
              const allocator_type& a);                             // (12) C++14

template <class InputIterator>
unordered_set(InputIterator f,
              InputIterator l,
              size_type n,
              const hasher& hf, 
              const allocator_type& a);                             // (13) C++14

unordered_set(initializer_list<value_type> il,
              size_type n,
              const allocator_type& a);                             // (14) C++14

unordered_set(initializer_list<value_type> il,
              size_type n,
              const hasher& hf, 
              const allocator_type& a);                             // (15) C++14
```
* initializer_list[link /reference/initializer_list.md]

##概要
`unordered_set` オブジェクトを構築する


##要件
- ハッシュ関数オブジェクト `hasher` が引数として与えられなかった場合、`hasher` は DefaultConstructible であること。

- キー比較用関数オブジェクト `key_equal` が引数として与えられなかった場合、`key_equal` は DefaultConstructible であること。

- アロケータオブジェクト `allocator_type` が引数として与えられなかった場合、`allocator_type` は DefaultConstructible であること。

- (3) の形式の場合、`value_type` は `*first` からこの `unordered_set` に EmplaceConstructible であること。

- (4)、(7)、および (9) の形式の場合、`value_type` はこの `unordered_set` に CopyInsertable であること。

- (5) の形式の場合、`allocator_type` のムーブ構築は例外終了しないこと。

- (8) の形式の場合、`value_type` はこの `unordered_set` に MoveInsertable であること。（但し、備考参照）


##効果

- (1)   バケット数の最低が実装依存の、要素を持たない空の `unordered_set` を構築する。

- (2)   バケット数最低 `n`、ハッシュ関数オブジェクト `hf`、キー比較用関数オブジェクト `eql`、アロケータオブジェクト `a` で、要素を持たない空の `unordered_set` を構築する。

- (1) + (2) バケット数最低 `n`、ハッシュ関数オブジェクト `hf`、キー比較用関数オブジェクト `eql`、アロケータオブジェクト `a` で、要素を持たない空の `unordered_set` を構築する。
    引数 `n` のデフォルト値は実装依存である。

- (3)   (1)と同様に `unordered_set` が構築された後、`[first, last)` の範囲の要素が挿入される。

- (4)   コピーコンストラクタ。`v` の全ての要素をコピーした、`unordered_set` を構築する。
    ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、[`max_load_factor`](./max_load_factor.md)`()` の値も `v` からコピーされる。
    アロケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](/reference/memory/allocator_traits/select_on_container_copy_construction.md)`(`[`get_allocator`](./get_allocator.md)`())` の戻り値が使用される。

- (5)   ムーブコンストラクタ。`rv` の全ての要素をムーブした、`unordered_set` を構築する。
    ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、アロケータオブジェクトも `v` からムーブされる。
    [`max_load_factor`](./max_load_factor.md)`()` の値は `rv` からコピーされる。
    なお、要素のムーブは個々に行われるのではなく、`unordered_set` 内部の構造ごと一括でムーブされる。

- (6)   ハッシュ関数オブジェクト `hasher()`、キー比較用関数オブジェクト `key_equal()`、アロケータオブジェクト `a` で、要素を持たない空の `unordered_set` を構築する。
    構築された `unordered_set` のバケット数、および、[`max_load_factor`](./max_load_factor.md)`()` は実装依存である。

- (7)   `v` の全ての要素をコピーした、`unordered_set` を構築する。
    ハッシュ関数オブジェクトとキー比較関数オブジェクト、および、[`max_load_factor`](./max_load_factor.md)`()` の値も `v` からコピーされるが、アロケータオブジェクトは引数 `a` が使用される。

- (8)   `rv` のすべての要素をムーブした、`unordered_set` を構築する。
    ハッシュ関数オブジェクトとキー比較関数オブジェクトの値も `rv` からムーブされるが、アロケータオブジェクトは引数 `a` が使用される。
    [`max_load_factor`](./max_load_factor.md)`()` の値は `rv` からコピーされる。
    なお、`a == rv.`[`get_allocator`](./get_allocator.md)`()` の場合、要素のムーブは個々に行われるのではなく、`unordered_set` 内部の構造ごと一括でムーブされるが、そうでない場合は要素ごとにムーブされる。

- (9)   (3) の形式を `unordered_set(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と同等である。

- (10)  (2) の形式を `unordered_set(n, hasher(), key_equal(), a)` として呼び出した場合と同等である。

- (11)  (2) の形式を `unordered_set(n, hf, key_equal(), a)` として呼び出した場合と同等である。

- (12)  (3) の形式を `unordered_set(f, l, n, hasher(), key_equal(), a)` として呼び出した場合と同等である。

- (13)  (3) の形式を `unordered_set(f, l, n, hf, key_equal(), a)` として呼び出した場合と同等である。

- (14)  (5) の形式を `unordered_set(il, n, hasher(), key_equal(), a)` として呼び出した場合と同等である。

- (15)  (5) の形式を `unordered_set(il, n, hf, key_equal(), a)` として呼び出した場合と同等である。


##事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) `u.`[`empty`](./empty.md)`() == true`。
    `u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。

- (2) `u.`[`empty`](./empty.md)`() == true`。
    `u.`[`get_allocator`](./get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](./bucket_count.md)`() >= n`。

- (3) `u.`[`get_allocator`](./get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](./bucket_count.md)`() >= n`。

- (4) `u.`[`max_load_factor`](./max_load_factor.md)`() == v.`[`max_load_factor`](./max_load_factor.md)`()`。
    `u == v`。

- (5) `u.`[`get_allocator`](./get_allocator.md)`() == `構築前の `rv.`[`get_allocator`](./get_allocator.md)`()`。
    `u.`[`max_load_factor`](./max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](./max_load_factor.md)`()`。
    `u == `構築前の `rv`。

- (6) `u.`[`empty`](./empty.md)`() == true`。
    `u.`[`get_allocator`](./get_allocator.md)`() == a`。

- (7) `u.`[`max_load_factor`](./max_load_factor.md)`() == v.`[`max_load_factor`](./max_load_factor.md)`()`。
    `u == v`。
    `u.`[`get_allocator`](./get_allocator.md)`() == a`。

- (8) `u.`[`max_load_factor`](./max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](./max_load_factor.md)`()`。
    `u == `構築前の `rv`。
    `u.`[`get_allocator`](./get_allocator.md)`() == a`。

- (9) `u.`[`get_allocator`](./get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](./max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](./bucket_count.md)`() >= n`。


##計算量
- (1)   定数
- (2)   定数
- (3)   平均的には O(n)、ここで、n は `std::`[`distance`](/reference/iterator/distance.md)`(first, last)`。
    最悪のケースでは O(n<sup>2</sup>)
- (4)   平均的には O(n)、ここで、n は `v.`[`size`](./size.md)`()`。
    最悪のケースでは O(n<sup>2</sup>)
- (5)   定数
- (6)   定数
- (7)   O(`v.`[`size`](./size.md)`()`)
- (8)   `a == rv.`[`get_allocator`](./get_allocator.md)`()` の場合、定数。
    そうでない場合、O(`rv.`[`size`](./size.md)`()`)。
- (9)   (2) の形式を `unordered_set(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と同等。
- (10)  (2) の形式を `unordered_set(n, hasher(), key_equal(), a)` として呼び出した場合と同等。
- (11)  (2) の形式を `unordered_set(n, hf, key_equal(), a)` として呼び出した場合と同等。
- (12)  (3) の形式を `unordered_set(f, l, n, hasher(), key_equal(), a)` として呼び出した場合と同等。
- (13)  (3) の形式を `unordered_set(f, l, n, hf, key_equal(), a)` として呼び出した場合と同等。
- (14)  (5) の形式を `unordered_set(il, n, hasher(), key_equal(), a)` として呼び出した場合と同等。
- (15)  (5) の形式を `unordered_set(il, n, hf, key_equal(), a)` として呼び出した場合と同等。


##備考
- (8) の形式の場合、MoveInsertable が要件となっているが、`rv.`[`get_allocator`](./get_allocator.md)`() == a` の場合にはムーブコンストラクタと同様の挙動となるため、MoveInsertable ではなくても良いと思われる。

- C++14 では、デフォルトコンストラクタを (1) + (2) の形式から (1) の形式に分離して残りを (2) の形式（`n` のデフォルト引数を削除）にした。
    これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
std::unordered_set<int> m = {};
```

    のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。


##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): -
- [Clang, C++11 mode](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): -
- [GCC, C++11 mode](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

####備考
libstdc++ には 4.8.2 現在、(6)、(7)、(8)の形式はない。


##関連項目

|                                       |              |
|---------------------------------------|--------------|
| [`(destructor)`](./op_destructor.md)  | デストラクタ |
| [`operator=`](./op_assign.md)         | 代入演算子   |


##参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (9)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
    (1) + (2) を 2 つのオーバーロードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
    (10)、(11)、(12)、(13)、(14)、(15) を追加するきっかけとなったレポート  
    なお、Discussion の例はアロケータの型が誤っているので注意


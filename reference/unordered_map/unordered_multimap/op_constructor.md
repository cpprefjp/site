# コンストラクタ
* unordered_map[meta header]
* std[meta namespace]
* unordered_multimap[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
unordered_multimap();                                                    // (1) C++14

explicit unordered_multimap(size_type n,
                            const hasher& hf = hasher(),
                            const key_equal& eql = key_equal(),
                            const allocator_type& a = allocator_type()); // (2) C++14

explicit unordered_multimap(size_type n = 実装依�の既定値,
                            const hasher& hf = hasher(),
                            const key_equal& eql = key_equal(),
                            const allocator_type& a = allocator_type());  // (1) + (2) C++11

template <class InputIterator>
unordered_multimap(InputIterator first, InputIterator last,
                   size_type n = 実装依�の既定値,
                   const hasher& hf = hasher(),
                   const key_equal& eql = key_equal(),
                   const allocator_type& a = allocator_type());           // (3)

unordered_multimap(const unordered_multimap& v);                          // (4)

unordered_multimap(unordered_multimap&& rv);                              // (5)

explicit unordered_multimap(const allocator_type& a);                     // (6)

unordered_multimap(const unordered_multimap& v, const allocator_type& a); // (7)

unordered_multimap(unordered_multimap&& rv, const allocator_type& a);     // (8)

unordered_multimap(initializer_list<value_type> il,
                   size_type n = 実装依�の既定値,
                   const hasher& hf = hasher(),
                   const key_equal& eql = key_equal(),
                   const allocator_type& a = allocator_type());           // (9)

unordered_multimap(size_type n, const allocator_type& a);                 // (10) C++14

unordered_multimap(size_type n,
                   const hasher& hf,
                   const allocator_type& a);                              // (11) C++14

template <class InputIterator>
unordered_multimap(InputIterator f,
                   InputIterator l,
                   size_type n,
                   const allocator_type& a);                              // (12) C++14

template <class InputIterator>
unordered_multimap(InputIterator f,
                   InputIterator l,
                   size_type n,
                   const hasher& hf, 
                   const allocator_type& a);                              // (13) C++14

unordered_multimap(initializer_list<value_type> il,
                   size_type n,
                   const allocator_type& a);                              // (14) C++14

unordered_multimap(initializer_list<value_type> il,
                   size_type n,
                   const hasher& hf, 
                   const allocator_type& a);                              // (15) C++14
```
* initializer_list[link /reference/initializer_list/initializer_list.md]

## 概要
`unordered_multimap` オブジェクトを構築する


## 要件
- ハッシュ関数オブジェクト `hasher` が引数として与えられなかった場合、`hasher` は DefaultConstructible であること。

- �ー比較用関数オブジェクト `key_equal` が引数として与えられなかった場合、`key_equal` は DefaultConstructible であること。

- ア�ケータオブジェクト `allocator_type` が引数として与えられなかった場合、`allocator_type` は DefaultConstructible であること。

- (3) の形式の場合、`value_type` は `*first` からこの `unordered_multimap` に EmplaceConstructible であること。

- (4)、(7)、および (9) の形式の場合、`value_type` はこの `unordered_multimap` に CopyInsertable であること。

- (5) の形式の場合、`allocator_type` のムーブ構築は例外終了しないこと。

- (8) の形式の場合、`value_type` はこの `unordered_multimap` に MoveInsertable であること。（但し、備考参照）


## 効果

- (1) : バケット数の最低が実装依�の、要素を持たない空の `unordered_multimap` を構築する。

- (2) : バケット数最低 `n`、ハッシュ関数オブジェクト `hf`、�ー比較用関数オブジェクト `eql`、ア�ケータオブジェクト `a` で、要素を持たない空の `unordered_multimap` を構築する。

- (1) + (2) バケット数最低 `n`、ハッシュ関数オブジェクト `hf`、�ー比較用関数オブジェクト `eql`、ア�ケータオブジェクト `a` で、要素を持たない空の `unordered_multimap` を構築する。
    引数 `n` のデフォルト値は実装依�である。

- (3) : (1)と同様に `unordered_multimap` が構築された後、`[first, last)` の範囲の要素が挿入される。

- (4) : コピーコンストラクタ。`v` の全ての要素をコピーした、`unordered_multimap` を構築する。
    ハッシュ関数オブジェクトと�ー比較関数オブジェクト、および、[`max_load_factor`](max_load_factor.md)`()` の値も `v` からコピーされる。
    ア�ケータオブジェクトは、`std::`[`allocator_traits`](/reference/memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](/reference/memory/allocator_traits/select_on_container_copy_construction.md)`(`[`get_allocator`](get_allocator.md)`())` の戻り値が使用される。

- (5) : ムーブコンストラクタ。`rv` の全ての要素をムーブした、`unordered_multimap` を構築する。
    ハッシュ関数オブジェクトと�ー比較関数オブジェクト、および、ア�ケータオブジェクトも `v` からムーブされる。
    [`max_load_factor`](max_load_factor.md)`()` の値は `rv` からコピーされる。
    なお、要素のムーブは個々に行われるのではなく、`unordered_multimap` 内部の構造ごと一括でムーブされる。

- (6) : ハッシュ関数オブジェクト `hasher()`、�ー比較用関数オブジェクト `key_equal()`、ア�ケータオブジェクト `a` で、要素を持たない空の `unordered_multimap` を構築する。
    構築された `unordered_multimap` のバケット数、および、[`max_load_factor`](max_load_factor.md)`()` は実装依�である。

- (7) : `v` の全ての要素をコピーした、`unordered_multimap` を構築する。
    ハッシュ関数オブジェクトと�ー比較関数オブジェクト、および、[`max_load_factor`](max_load_factor.md)`()` の値も `v` からコピーされるが、ア�ケータオブジェクトは引数 `a` が使用される。

- (8) : `rv` のすべての要素をムーブした、`unordered_multimap` を構築する。
    ハッシュ関数オブジェクトと�ー比較関数オブジェクトの値も `rv` からムーブされるが、ア�ケータオブジェクトは引数 `a` が使用される。
    [`max_load_factor`](max_load_factor.md)`()` の値は `rv` からコピーされる。
    なお、`a == rv.`[`get_allocator`](get_allocator.md)`()` の場合、要素のムーブは個々に行われるのではなく、`unordered_multimap` 内部の構造ごと一括でムーブされるが、そうでない場合は要素ごとにムーブされる。

- (9) : (3) の形式を `unordered_multimap(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と�価である。

- (10) : (2) の形式を `unordered_multimap(n, hasher(), key_equal(), a)` として呼び出した場合と�価である。

- (11) : (2) の形式を `unordered_multimap(n, hf, key_equal(), a)` として呼び出した場合と�価である。

- (12) : (3) の形式を `unordered_multimap(f, l, n, hasher(), key_equal(), a)` として呼び出した場合と�価である。

- (13) : (3) の形式を `unordered_multimap(f, l, n, hf, key_equal(), a)` として呼び出した場合と�価である。

- (14) : (5) の形式を `unordered_multimap(il, n, hasher(), key_equal(), a)` として呼び出した場合と�価である。

- (15) : (5) の形式を `unordered_multimap(il, n, hf, key_equal(), a)` として呼び出した場合と�価である。


## 事後条件
以下では構築されたオブジェクトを `u` とする。

- (1) : `u.`[`empty`](empty.md)`() == true`。
    `u.`[`max_load_factor`](max_load_factor.md)`() == 1.0`。

- (2) : `u.`[`empty`](empty.md)`() == true`。
    `u.`[`get_allocator`](get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](bucket_count.md)`() >= n`。

- (3) : `u.`[`get_allocator`](get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](bucket_count.md)`() >= n`。

- (4) : `u.`[`max_load_factor`](max_load_factor.md)`() == v.`[`max_load_factor`](max_load_factor.md)`()`。
    `u == v`。

- (5) : `u.`[`get_allocator`](get_allocator.md)`() == `構築前の `rv.`[`get_allocator`](get_allocator.md)`()`。
    `u.`[`max_load_factor`](max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](max_load_factor.md)`()`。
    `u == `構築前の `rv`。

- (6) : `u.`[`empty`](empty.md)`() == true`。
    `u.`[`get_allocator`](get_allocator.md)`() == a`。

- (7) : `u.`[`max_load_factor`](max_load_factor.md)`() == v.`[`max_load_factor`](max_load_factor.md)`()`。
    `u == v`。
    `u.`[`get_allocator`](get_allocator.md)`() == a`。

- (8) : `u.`[`max_load_factor`](max_load_factor.md)`() == `構築前の `rv.`[`max_load_factor`](max_load_factor.md)`()`。
    `u == `構築前の `rv`。
    `u.`[`get_allocator`](get_allocator.md)`() == a`。

- (9) : `u.`[`get_allocator`](get_allocator.md)`() == a`。
    `u.`[`max_load_factor`](max_load_factor.md)`() == 1.0`。
    `u.`[`bucket_count`](bucket_count.md)`() >= n`。


## 計算量
- (1) : 定数
- (2) : 定数
- (3) : 平均的には O(n)、ここで、n は `std::`[`distance`](/reference/iterator/distance.md)`(first, last)`。
    最悪のケースでは O(n<sup>2</sup>)
- (4) : 平均的には O(n)、ここで、n は `v.`[`size`](size.md)`()`。
    最悪のケースでは O(n<sup>2</sup>)
- (5) : 定数
- (6) : 定数
- (7) : O(`v.`[`size`](size.md)`()`)
- (8) : `a == rv.`[`get_allocator`](get_allocator.md)`()` の場合、定数。
    そうでない場合、O(`rv.`[`size`](size.md)`()`)。
- (9) : (3)の形式を `unordered_multimap(il.begin(), il.end(), n, hf, eql, a)` として呼び出した場合と�価。
- (10) : (2) の形式を `unordered_multimap(n, hasher(), key_equal(), a)` として呼び出した場合と�価。
- (11) : (2) の形式を `unordered_multimap(n, hf, key_equal(), a)` として呼び出した場合と�価。
- (12) : (3) の形式を `unordered_multimap(f, l, n, hasher(), key_equal(), a)` として呼び出した場合と�価。
- (13) : (3) の形式を `unordered_multimap(f, l, n, hf, key_equal(), a)` として呼び出した場合と�価。
- (14) : (5) の形式を `unordered_multimap(il, n, hasher(), key_equal(), a)` として呼び出した場合と�価。
- (15) : (5) の形式を `unordered_multimap(il, n, hf, key_equal(), a)` として呼び出した場合と�価。


## 備考
- (8) の形式の場合、MoveInsertable が要件となっているが、`rv.`[`get_allocator`](get_allocator.md)`() == a` の場合にはムーブコンストラクタと同様の挙動となるため、MoveInsertable ではなくても良いと思われる。

- C++14 では、デフォルトコンストラクタを (1) + (2) の形式から (1) の形式に分離して残りを (2) の形式（`n` のデフォルト引数を削除）にした。
    これは、デフォルトコンストラクタに `explicit` が付いていると、

    ```cpp
    std::unordered_multimap<int, char> m = {};
    ```

    のようなコード（C++11 から導入された、コピーリスト初期化によるデフォルトコンストラクタ呼び出し）がエラーになってしまうためである。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1
- [GCC](/implementation.md#gcc): 4.4.7, 4.5.3, 4.6.3, 4.7.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): ?

#### 備考
libstdc++ には 4.8.2 現在、(6)、(7)、(8)の形式はない。


## 関連項目

| 名前                                       | 説明         |
|--------------------------------------------|--------------|
| [`(destructor)`](op_destructor.md) | デストラクタ |
| [`operator=`](op_assign.md)              | 代入演算�   |


## 参照
- [N2679 Initializer Lists for Standard Containers(Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2679.pdf)
    - (9)の経緯となる提案文書
- [LWG 2193. Default constructors for standard library containers are explicit](http://cplusplus.github.io/LWG/lwg-defects.html#2193)  
    (1) + (2) を 2 つのオーバー�ードに分割するきっかけとなったレポート
- [LWG 2210. Missing allocator-extended constructor for allocator-aware containers](http://cplusplus.github.io/LWG/lwg-defects.html#2210)  
    (10)、(11)、(12)、(13)、(14)、(15) を追加するきっかけとなったレポート  
    なお、Discussion の例はア�ケータの型が誤っているので注意


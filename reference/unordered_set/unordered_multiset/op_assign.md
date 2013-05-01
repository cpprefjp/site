#代入演算子
```cpp
unordered_multiset& operator=(const unordered_multiset& v);     // (1)
unordered_multiset& operator=(unordered_multiset&& rv);         // (2)
unordered_multiset& operator=(initializer_list<value_type> il); // (3)
```
* initializer_list[link /reference/initializer_list.md]

##概要

<code style='color:black'>unordered_multiset</code> オブジェクトを代入する


##要件


- (1)、および、(3) の形式の場合、<code style='color:black'>value_type</code> はこの <code style='color:black'>unordered_multiset</code> に対して CopyInsertable かつ CopyAssignable であること。

- (2) の形式の場合、<code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)<allocator_type>::propagate_on_container_move_assignment::value</code> が <code style='color:black'>false</code> であれば、<code style='color:black'>value_type</code> はこのコンテナに対して MoveInsertable かつ MoveAssignable であること。


##効果

- (1)	`v` の全ての要素がコピー代入される。ハッシュ関数オブジェクト、キー比較用関数オブジェクト、[`max_load_factor()`](/reference/unordered_set/unordered_set/max_load_factor.md) の値もコピーされる。アロケータオブジェクトは、`std::allocator_traits<allocator_type>::propagate_on_container_copy_assignment::value` が `true` の場合に限りコピーされる。
- (2)	ハッシュ関数オブジェクト、キー比較用関数オブジェクトの値はムーブされる。[`max_load_factor()`](/reference/unordered_set/unordered_set/max_load_factor.md) の値はコピーされる。アロケータオブジェクトは、`std::allocator_traits<allocator_type>::propagate_on_container_move_assignment::value` が `true` の場合に限りムーブされる。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。
- (3)	範囲 `[il.begin(), il.end())` がコピー代入される。コンテナ内に元々存在していた要素は、代入されるか、破棄される（デストラクタが呼び出される）。


##事後条件

以下では構築されたオブジェクトを <code style='color:black'>u</code> とする。

(1) <code style='color:black'>u == v</code>。

(2) <code style='color:black'>u == 代入前の rv</code>。

(3) －


##戻り値

<code style='color:black'>*this</code>


##計算量

(1)	平均的には O(n)、ここで、`n = v.[size()](/reference/unordered_set/unordered_set/size.md)`。最悪のケースでは O(n^2)
(2)	線形時間（但し、備考参照）
(3)	代入対象を `a`、`a` の型を X とすると、`a = X(il)` と同様。（備考参照）


##備考


- (2) の形式の場合、標準では上記の通り計算量が線形時間となっているが、<code style='color:black'>std::[allocator_traits](/site/cpprefjp/reference/memory/allocator_traits)[get_allocator](/reference/unordered_set/unordered_multiset/get_allocator.md)() != rv.[get_allocator](/reference/unordered_set/unordered_multiset/get_allocator.md)()</code> の場合、最悪のケースでは O(<code style='color:black'>n<sup>2</sup></code>) であるものと思われる。ここで、<code style='color:black'>n = rv.[size](/reference/unordered_set/unordered_multiset/size.md)()</code>。

- (3) の形式の場合、計算量は <code style='color:black'>a = X(il)</code> と同様となっているが、効果が <code style='color:black'>a = X(il)</code> と同様なわけではない。（ハッシュ関数オブジェクト、キー比較用関数オブジェクト、アロケータオブジェクト、<code style='color:black'>[max_load_factor](/reference/unordered_set/unordered_multiset/max_load_factor.md)()</code> 等が異なる）


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


| | |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
|<code style='color:black'>[(constructor)](/reference/unordered_set/unordered_multiset/unordered_multiset.md)</code> |コンストラクタ |
|<code style='color:black'>[(destructor)](/reference/unordered_set/unordered_multiset/-unordered_multiset.md)</code> |デストラクタ |

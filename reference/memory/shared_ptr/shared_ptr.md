#コンストラクタ(C++11)
```cpp
constexpr shared_ptr() noexcept;                   // (1)

template <class Y>
explicit shared_ptr(Y* p);                         // (2)

template <class Y, class Deleter>
shared_ptr(Y* p, Deleter d);                       // (3)

template <class Y, class Deleter, class Alloc>
shared_ptr(Y* p, Deleter d, Alloc a);              // (4)

template <class Deleter>
shared_ptr(nullptr_t p, Deleter d);                // (5)

template <class Deleter, class Alloc>
shared_ptr(nullptr_t p, Deleter d, Alloc a);       // (6)

template<class Y>
shared_ptr(const shared_ptr<Y>& r, T* p) noexcept; // (7)

shared_ptr(const shared_ptr& r) noexcept;          // (8)

template <class Y>
shared_ptr(const shared_ptr<Y>& r) noexcept;       // (9)

shared_ptr(shared_ptr&& r) noexcept;               // (10)

template <class Y>
shared_ptr(shared_ptr<Y>&& r) noexcept;            // (11)

template <class Y>
explicit shared_ptr(const weak_ptr<Y>& r);         // (12)

template <class Y>
shared_ptr(auto_ptr<Y>&& r);                       // (13)

template <class Y, class Deleter>
shared_ptr(unique_ptr<Y, Deleter>&& r);            // (14)

constexpr shared_ptr(nullptr_t);                   // (15)
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]
* weak_ptr[link /reference/memory/weak_ptr.md]
* unique_ptr[link /reference/memory/unique_ptr.md]

##`shared_ptr`オブジェクトの構築
- (1) : 所有権を持たない、空の`shared_ptr`オブジェクトを構築する。
- (2) : 生ポインタの所有権を受け取る。
- (3) : 生ポインタの所有権と、リソースを破棄する際に使用する関数オブジェクトを受け取る。
- (4) : 生ポインタの所有権、リソースを破棄する際に使用する関数オブジェクト、アロケータを受け取る。
- (5) : リソースを破棄する際に使用する関数オブジェクトを受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (6) : リソースを破棄する際に使用する関数オブジェクトと、アロケータを受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (7) : `Y`のメンバへのポインタを共有する。
- (8), (9) : 他の`shared_ptr`オブジェクトと、リソースを共有する。
- (10), (11) : 他の`shared_ptr`オブジェクトから、リソースの所有権を移動する。
- (12) : [`weak_ptr`](/reference/memory/weak_ptr.md)オブジェクトが参照するリソースから、所有権を共有する`shared_ptr`オブジェクトを構築する。
- (13) : `auto_ptr`オブジェクトから、リソースの所有権を移動する。
- (14) : [`unique_ptr`](/reference/memory/unique_ptr.md)オブジェクトから、リソースの所有権を移動する。
- (15) : (1)と同じく、所有権を持たない、空の`shared_ptr`オブジェクトを構築する。


##要件
- (2) : `p`が`T*`に変換可能であること。`Y`が完全型であり、式`delete p`が妥当であること。
- (3), (4), (5), (6) : `p`が`T*`に変換可能であること。`Deleter`がコピー構築可能な型であり、そのコピーコンストラクタとデストラクタが例外を投げないこと。`d(p)`という式が妥当であること。
- (9) : `Y*`が`T*`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される。
- (11) : `Y*`が`T*`に暗黙変換可能でない場合、この関数はオーバーロード解決から除外される。
- (12) : `Y*`が`T*`に変換可能であること。
- (13) : `r.release()`によって返されるポインタ値が、`T*`に変換可能であること。`Y`が完全型であり、式`delete r.release()`が妥当であること。


##効果
- (1) : 空の`shared_ptr`オブジェクトを構築する。
- (2) : ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。
- (3) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。
- (4) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。アロケータオブジェクト`a`のコピーを、内部のメモリ確保に使用する。
- (5) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (6) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。アロケータオブジェクト`a`のコピーを、内部のメモリ確保に使用する。
- (7) : `r`の所有権を持ち、ポインタとしては`p`を保持する`shared_ptr`オブジェクトを構築する。
- (8), (9) : `r`が空の場合、空の`shared_ptr`オブジェクトを構築する。そうでなければ、`r`とリソースを共有する`shared_ptr`オブジェクトを構築する。
- (10), (11) : `r`が持つ所有権を、`*this`に移動する。
- (12) : `r`が持つポインタのコピーを共有する`shared_ptr`オブジェクトを構築する。
- (13) : `r`が持つ所有権を、`*this`に移動する。
- (14) : 以下のように、(3)のコンストラクタに移譲する。`Deleter`が参照型でなければ`shared_ptr(r.`[`release()`](/reference/memory/unique_ptr/release.md)`, r.`[`get_deleter()`](/reference/memory/unique_ptr/get_deleter.md)`)`を呼び出し、そうでなければ`shared_ptr(r.`[`release()`](/reference/memory/unique_ptr/release.md)`,` [`ref`](/reference/functional/reference_wrapper/ref.md)`(r.`[`get_deleter()`](/reference/memory/unique_ptr/get_deleter.md)`))`
- (15) : 空の`shared_ptr`オブジェクトを構築する。


##事後条件
- (1) : [`use_count()`](./use_count.md) `== 0 &&` [`get()`](./get.md) ` == nullptr`
- (2), (3), (4) : [`use_count()`](./use_count.md) `== 1 &&` [`get()`](./get.md) ` == p`
- (5), (6) : [`use_count()`](./use_count.md) `== 1 &&` [`get()`](./get.md) ` == nullptr`
- (7) : [`get()`](./get.md) `== p &&` [`use_count()`](./use_count.md) `== r.`[`use_count()`](./use_count.md)
- (8), (9) : [`get()`](./get.md) `==` [`get()`](./get.md) `&&` [`use_count()`](./use_count.md) `== r.`[`use_count()`](./use_count.md)
- (10) : `*this`は`r`がこれまで持っていた値を持ち、`r`は空の状態になる。
- (12) : [`use_count()`](./use_count.md) `== r.`[`use_count()`](./use_count.md)
- (13) : [`use_count()`](./use_count.md) `== 1 &&` `r.`[`get()`](./get.md) `== nullptr`


##例外
- (3), (4), (5), (6) : メモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。例外送出時には`d(p)`を呼び出すことが保証される。
- (12) : `r.`[`expired()`](/reference/memory/weak_ptr/expired.md) `== true`の場合、[`bad_weak_ptr`](/reference/memory/bad_weak_ptr.md)例外を送出する。
- (13) : メモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)もしくはその他実装定義の例外を送出する。


##備考
アロケータは、参照カウンタのメモリ確保に使用される。


##例
```cpp
```

###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): ??
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??


##参照
- (4), (5) : [nullptrを所有するshared_ptr - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120623/p1)
- (7) : [今更ながらに Boost.SmartPointers を考える - 野良C++erの雑記帳](http://d.hatena.ne.jp/gintenlabo/20091214/1260804379)


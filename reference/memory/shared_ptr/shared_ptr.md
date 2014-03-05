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

template <class Y, class D>
shared_ptr(unique_ptr<Y, D>&& r);                  // (14)

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


##効果
TBD


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


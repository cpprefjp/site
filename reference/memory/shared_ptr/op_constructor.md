# コンストラクタ
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr shared_ptr() noexcept;                         // (1)

template <class Y>
explicit shared_ptr(Y* p);                               // (2)

template <class Y, class Deleter>
shared_ptr(Y* p, Deleter d);                             // (3)

template <class Y, class Deleter, class Alloc>
shared_ptr(Y* p, Deleter d, Alloc a);                    // (4)

template <class Deleter>
shared_ptr(nullptr_t p, Deleter d);                      // (5)

template <class Deleter, class Alloc>
shared_ptr(nullptr_t p, Deleter d, Alloc a);             // (6)

template<class Y>
shared_ptr(const shared_ptr<Y>& r, T* p) noexcept;            // (7) C++11

template<class Y>
shared_ptr(const shared_ptr<Y>& r, element_type* p) noexcept; // (7) C++17

shared_ptr(const shared_ptr& r) noexcept;                // (8)

template <class Y>
shared_ptr(const shared_ptr<Y>& r) noexcept;             // (9)

shared_ptr(shared_ptr&& r) noexcept;                     // (10)

template <class Y>
shared_ptr(shared_ptr<Y>&& r) noexcept;                  // (11)

template <class Y>
explicit shared_ptr(const weak_ptr<Y>& r);               // (12)

template <class Y>
shared_ptr(auto_ptr<Y>&& r);                             // (13)
                                                         // C++11から非推奨
                                                         // C++17で削除

template <class Y, class Deleter>
shared_ptr(unique_ptr<Y, Deleter>&& r);                  // (14)

constexpr shared_ptr(nullptr_t);                         // (15)

template <class Y>
shared_ptr(shared_ptr<Y>&& r, element_type* p) noexcept; // (16) C++20
```
* nullptr_t[link /reference/cstddef/nullptr_t.md]
* weak_ptr[link /reference/memory/weak_ptr.md]
* unique_ptr[link /reference/memory/unique_ptr.md]

## `shared_ptr`オブジェクトの構築
- (1) : 所有権を持たない、空の`shared_ptr`オブジェクトを構築する。
- (2) : 生ポインタの所有権を受け取る。
- (3) : 生ポインタの所有権と、リソースを破棄する際に使用する関数オブジェクトを受け取る。
- (4) : 生ポインタの所有権、リソースを破棄する際に使用する関数オブジェクト、ア�ケータを受け取る。
- (5) : リソースを破棄する際に使用する関数オブジェクトを受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (6) : リソースを破棄する際に使用する関数オブジェクトと、ア�ケータを受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (7) : `Y`のメンバへのポインタを共有する。
- (8), (9) : 他の`shared_ptr`オブジェクトと、リソースを共有する。
- (10), (11) : 他の`shared_ptr`オブジェクトから、リソースの所有権を移動する。
- (12) : [`weak_ptr`](/reference/memory/weak_ptr.md)オブジェクトが参照するリソースから、所有権を共有する`shared_ptr`オブジェクトを構築する。
- (13) : `auto_ptr`オブジェクトから、リソースの所有権を移動する。
- (14) : [`unique_ptr`](/reference/memory/unique_ptr.md)オブジェクトから、リソースの所有権を移動する。
- (15) : (1)と同じく、所有権を持たない、空の`shared_ptr`オブジェクトを構築する。
- (16) :  (7)の右辺値版。`Y`を`*this`にムーブしつつ、それのメンバへのポインタを共有する。


## 要件
- (2) C++11 :
    - `p`が`T*`に変換可能であること。
    - `Y`が完全型であること。
    - 式`delete p`が妥当であること。
- (2) C++17 :
    - `p`が`T*`と互換があること。
    - `Y`が完全型であること。
    - 型`T`が非配列である場合、式`delete p`が妥当であること。
    - 型`T`が配列である場合、式`delete[] p`が妥当であること。
    - 型`T`が`U[N]`形式である場合、関数ポインタ配列`Y(*)[N]`は`T*`に変換可能である。
    - 型`T`が`U[]`形式である場合、関数ポインタ配列`Y(*)[]`は`T*`に変換可能である。
- (3), (4), (5), (6) : `p`が`T*`に変換可能であること。`Deleter`がコピー構築可能な型であり、そのコピーコンストラクタとデストラクタが例外を投げないこと。`d(p)`という式が妥当であること。
    - C++17 : 型`T`が配列である場合、式`delete[] p`が妥当であること。型`T`が`U[N]`形式である場合、関数ポインタ配列`Y(*)[N]`は`T*`に変換可能である。
- (9) C++11 : `Y*`が`T*`に暗黙変換可能でない場合、この関数はオーバー�ード解決から除外される。
- (9) C++17 : `Y*`が`T*`と互換でない場合、この関数はオーバー�ード解決から除外される。
- (11) : `Y*`が`T*`に暗黙変換可能でない場合、この関数はオーバー�ード解決から除外される。
- (12) C++11 : `Y*`が`T*`に変換可能であること。
- (12) C++17 : `Y*`が`T*`と互換であること。
- (13) : `r.release()`によって返されるポインタ値が、`T*`に変換可能であること。`Y`が完全型であり、式`delete r.release()`が妥当であること。
- (14) C++11 : `unique_ptr<Y, Deleter>::pointer`が`T*`に変換可能でない場合、この関数はオーバー�ード解決から除外される。
- (14) C++17 : `Y*`が`T*`と互換でなく、`unique_ptr<Y, Deleter>::pointer`が`element_type*`に変換可能でない場合、この関数はオーバー�ード解決から除外される。


## 効果
- (1) : 空の`shared_ptr`オブジェクトを構築する。
- (2) C++11 : ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。
- (2) C++17 : 型`T`が配列ではない場合、ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。そうではない場合、ポインタ`p`と、`delete[] p`を実行するデリータを所有する`shared_ptr`オブジェクトを構築する。
- (3) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。
- (4) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ポインタ`p`を所有する`shared_ptr`オブジェクトを構築する。ア�ケータオブジェクト`a`のコピーを、内部のメモリ確保に使用する。
- (5) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。
- (6) : リソースを破棄する際に使用する関数オブジェクト`d`を受け取り、ヌルポインタを所有する`shared_ptr`オブジェクトを構築する。ア�ケータオブジェクト`a`のコピーを、内部のメモリ確保に使用する。
- (7) : `r`の所有権を持ち、ポインタとしては`p`を保持する`shared_ptr`オブジェクトを構築する。
- (8), (9) : `r`が空の場合、空の`shared_ptr`オブジェクトを構築する。そうでなければ、`r`とリソースを共有する`shared_ptr`オブジェクトを構築する。
- (10), (11) : `r`が持つ所有権を、`*this`に移動する。
- (12) : `r`が持つポインタのコピーを共有する`shared_ptr`オブジェクトを構築する。
- (13) : `r`が持つ所有権を、`*this`に移動する。
- (14) : 以下のように、(3)のコンストラクタに移�する。`Deleter`が参照型でなければ`shared_ptr(r.`[`release()`](/reference/memory/unique_ptr/release.md)`, r.`[`get_deleter()`](/reference/memory/unique_ptr/get_deleter.md)`)`を呼び出し、そうでなければ`shared_ptr(r.`[`release()`](/reference/memory/unique_ptr/release.md)`,` [`ref`](/reference/functional/ref.md)`(r.`[`get_deleter()`](/reference/memory/unique_ptr/get_deleter.md)`))`
- (15) : 空の`shared_ptr`オブジェクトを構築する。


## 事後条件
- (1) : [`use_count()`](use_count.md) `== 0 &&` [`get()`](get.md) ` == nullptr`
- (2), (3), (4) : [`use_count()`](use_count.md) `== 1 &&` [`get()`](get.md) ` == p`
- (5), (6) : [`use_count()`](use_count.md) `== 1 &&` [`get()`](get.md) ` == nullptr`
- (7) : [`get()`](get.md) `== p`
- (8), (9) : [`get()`](get.md) `==` [`get()`](get.md) `&&` [`use_count()`](use_count.md) `== r.`[`use_count()`](use_count.md)
- (10) : `*this`は`r`がこれまで持っていた値を持ち、`r`は空の状態になる。
- (12) : [`use_count()`](use_count.md) `== r.`[`use_count()`](use_count.md)
- (13) : [`use_count()`](use_count.md) `== 1 &&` `r.`[`get()`](get.md) `== nullptr`
- (16) :
    - [`get()`](get.md) `== p`
    - `r`が空になり、`r.`[`get()`](get.md) `== nullptr`


## 例外
- (3), (4), (5), (6) : メモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)例外を送出する。例外送出時には`d(p)`を呼び出すことが保証される。
- (12) : `r.`[`expired()`](/reference/memory/weak_ptr/expired.md) `== true`の場合、[`bad_weak_ptr`](/reference/memory/bad_weak_ptr.md)例外を送出する。
- (13) : メモリ確保に失敗した場合、[`bad_alloc`](/reference/new/bad_alloc.md)もしくはその他実装定義の例外を送出する。


## 備考
ア�ケータは、参照カウンタのメモリ確保に使用される。


## 例
```cpp example
#include <cassert>
#include <memory>

struct X {
  int i;

  X(int i = 0)
    : i(i) {}
};

int main()
{
  // (1)
  // デフォルト構築。
  // 空のshared_ptrオブジェクトを構築する
  std::shared_ptr<int> p1;
  assert(p1.get() == nullptr);
  assert(p1.use_count() == 0);

  // (2)
  // ポインタの所有権を受け取る。
  std::shared_ptr<int> p2(new int(3));
  assert(*p2.get() == 3);
  assert(p2.use_count() == 1);

  // (3)
  // ポインタの所有権と、デリータを受け取る。
  // リソース解放時に、delete pの代わりにデリータが呼ばれる。
  std::shared_ptr<int> p3(new int(3), std::default_delete<int>());
  assert(*p3.get() == 3);
  assert(p3.use_count() == 1);

  // (4)
  // ポインタの所有権、デリータ、ア�ケータを受け取る。
  // ア�ケータは内部的にrebindされるので、要素型はなんでもいい。
  std::shared_ptr<int> p4(new int(3),
                          std::default_delete<int>(),
                          std::allocator<void>());
  assert(*p4.get() == 3);
  assert(p4.use_count() == 1);

  // (5)
  // デリータを受け取り、
  // ヌルポインタを所有するshared_ptrオブジェクトを構築する。
  std::shared_ptr<int> p5(nullptr, std::default_delete<int>());
  assert(p5.get() == nullptr);
  assert(p5.use_count() == 1);

  // (6)
  // デリータとア�ケータを受け取り、
  // ヌルポインタを所有するshared_ptrオブジェクトを構築する。
  std::shared_ptr<int> p6(nullptr,
                          std::default_delete<int>(),
                          std::allocator<void>());
  assert(p6.get() == nullptr);
  assert(p6.use_count() == 1);

  // (7)
  // 要素型のメンバへのポインタを共有する。
  std::shared_ptr<X> p7_org(new X(3));
  std::shared_ptr<int> p7(p7_org, &(p7_org->i));
  assert(*p7.get() == 3); // p7はiへのポインタを所有する
  assert(p7.use_count() == p7_org.use_count()); // 所有権はコピー元のshared_ptrと共有する

  // (8)
  // 他のshared_ptrとリソースを共有する
  std::shared_ptr<int> p8_org(new int(3));
  std::shared_ptr<int> p8 = p8_org;
  assert(p8.get() == p8_org.get()); // p8_orgとo8はリソースを共有する
  assert(p8.use_count() == 2); // 所有者は2人

  // (10)
  // 他のshared_ptrからリソースを移動する
  std::shared_ptr<int> p10_org(new int(3));
  std::shared_ptr<int> p10 = std::move(p10_org);
  assert(*p10.get() == 3);
  assert(p10.use_count() == 1);
  assert(p10_org.use_count() == 0);

  // (12)
  // weak_ptrから構築
  std::shared_ptr<int> p12_org(new int(3));
  std::weak_ptr<int> w12(p12_org);
  if (std::shared_ptr<int> p12 = w12.lock()) {
    assert(*p12.get() == 3);
    assert(p12.use_count() == 2);
  }
  else {
    assert(false);
  }

  // (14)
  // unique_ptrからリソースを移動する
  std::unique_ptr<int> p14_org(new int(3));
  std::shared_ptr<int> p14 = std::move(p14_org);
  assert(*p14.get() == 3);
  assert(p14.use_count() == 1);
  assert(p14_org.get() == nullptr);

  // (15)
  // 空のshared_ptrを構築する
  std::shared_ptr<int> p15 = nullptr;
  assert(p15.get() == nullptr);
  assert(p15.use_count() == 0);
}
```
* get()[link get.md]
* use_count()[link use_count.md]
* std::default_delete[link /reference/memory/default_delete.md]
* std::allocator[link /reference/memory/allocator.md]
* std::move[link /reference/utility/move.md]
* std::weak_ptr[link /reference/memory/weak_ptr.md]
* lock()[link /reference/memory/weak_ptr/lock.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6 (unique_ptr, nullptr以外), 4.4.7 (nullptr以外), 4.6.4
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2008 (TR1), 2010, 2012, 2013
    - 2008は(1), (2), (3), (4), (8), (9), (12), (13)のみ
    - 2008, 2010の(13)は、仮引数の型が`auto_ptr<Y>&&`ではなく`auto_ptr<Y>&`になっている。

## 参照
- (4), (5) : [nullptrを所有するshared_ptr - yohhoyの日記](http://d.hatena.ne.jp/yohhoy/20120623/p1)
- (7) : [今更ながらに Boost.SmartPointers を考える - 野良C++erの雑記帳](http://d.hatena.ne.jp/gintenlabo/20091214/1260804379)
- [N2351 Improving shared_ptr for C++0x, Revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2351.htm)
    - (7)の経緯となる提案文書
- [N2435 Explicit bool for Smart Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2435.htm)
    - (15)の経緯となる提案文書
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
- [P0414R1 Merging `shared_ptr` changes from Library Fundamentals to C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0414r1.html)
- [P0497R0 Fixes to `shared_ptr` support for arrays](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0497r0.html)
- [LWG Issue 2996. Missing rvalue overloads for `shared_ptr` operations](https://wg21.cmeerw.net/lwg/issue2996)

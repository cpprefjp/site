# コンストラクタ
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
constexpr unique_ptr() noexcept;             // (1) 単一オブジェクト、配列

explicit unique_ptr(pointer p) noexcept;           // (2) 単一オブジェクト、配列（C++14まで）
constexpr explicit unique_ptr(pointer p) noexcept; // (2) 単一オブジェクト C++23
template<class U>
explicit unique_ptr(U p) noexcept;                 // (2) 配列 C++17
template<class U>
constexpr explicit unique_ptr(U p) noexcept;       // (2) 配列 C++23

unique_ptr(pointer p, const D& d1) noexcept;           // (3) 単一オブジェクト、配列（C++14まで）
constexpr unique_ptr(pointer p, const D& d1) noexcept; // (3) 単一オブジェクト C++23
template<class U>
unique_ptr(U p, const D& d1) noexcept;                 // (3) 配列 C++17
template<class U>
constexpr unique_ptr(U p, const D& d1) noexcept;       // (3) 配列 C++23

unique_ptr(pointer p, D&& d2) noexcept;           // (4) 単一オブジェクト、配列（C++14まで）
constexpr unique_ptr(pointer p, D&& d2) noexcept; // (4) 単一オブジェクト C++23
template<class U>
unique_ptr(U p, D&& d2) noexcept;                 // (4) 配列 C++17
template<class U>
constexpr unique_ptr(U p, D&& d2) noexcept;       // (4) 配列 C++23

unique_ptr(unique_ptr&& u) noexcept;           // (5) 単一オブジェクト、配列
constexpr unique_ptr(unique_ptr&& u) noexcept; // (5) 単一オブジェクト、配列 C++23

constexpr unique_ptr(nullptr_t) noexcept;    // (6) 単一オブジェクト、配列

template <class U, class E>
unique_ptr(unique_ptr<U, E>&& u) noexcept;   // (7) 単一オブジェクト、配列（C++17）
template <class U, class E>
constexpr unique_ptr(unique_ptr<U, E>&& u) noexcept; // (7) 単一オブジェクト、配列 C++23

template <class U>
unique_ptr(auto_ptr<U>&& u) noexcept;        // (8) 単一オブジェクト
                                             // C++11から非推奨
                                             // C++17で削除

unique_ptr(const unique_ptr&) = delete;      // (9) 単一オブジェクト、配列
```

## unique_ptrオブジェクトの構築

- (1) : デフォルトコンストラクタ。所有権を持たない、空の`unique_ptr`オブジェクトを構築する。
- (2) : 生ポインタの所有権を受け取る。
- (3), (4) : 生ポインタの所有権、およびデリータオブジェクトを受け取る。デリータオブジェクトは[`forward`](/reference/utility/forward.md)される。
- (5) : ムーブコンストラクタ。`u`から`*this`に、所有権を譲渡する。
- (6) : デフォルトコンストラクタと同じく、所有権を持たない、空の`unique_ptr`オブジェクトを構築する。
- (7) : 変換可能なポインタ型を持つ`unique_ptr`オブジェクトからの変換。
- (8) : 変換可能なポインタ型を持つ`auto_ptr`オブジェクトからの変換。
- (9) : コピー構築禁止。


## 要件
- (1), (2) : デリータの型`D`が、例外を投げずにデフォルト構築可能であること。
- (3) : デリータの型`D`が、例外を投げずにコピー構築可能であること。
- (4), (5) : デリータの型`D`が、例外を投げずにムーブ構築可能であること。
- (6) : デリータの型`D`が、例外を投げずにデフォルト構築可能であること。
- (7) : 以下の条件を満たさない場合、この関数はオーバーロード解決の候補から外れる：
    - `unique_ptr<U, E>::pointer`が、`pointer`に暗黙変換可能な型であること。
    - `U`が配列型ではないこと。
    - `D`と`E`が同じ型であること。もしくは参照型ではない`D`において、`E`が`D`に暗黙的に変換可能な型であること。

### C++17 共通

- (1), (2), (6) : 以下のいずれかの条件を満たす場合、オーバーロード解決に参加しない。
    - [`is_pointer_v<deleter_type>`](/reference/type_traits/is_pointer.md) `== true`である（デリータがポインタである）
    - [`is_default_constructible_v<deleter_type>`](/reference/type_traits/is_default_constructible.md) `== false`である（デリータがデフォルト構築できない）
- (3), (4) : [`is_constructible_v<D, decltype(d)>`](/reference/type_traits/is_constructible.md) `== true`の（`d`からコピー/ムーブ構築可能な）場合にのみオーバーロード解決に参加する。
- (3), (4), (6) : [クラステンプレートの実引数推定](/lang/cpp17/type_deduction_for_class_templates.md)によってこれらのコンストラクタが選択される場合、コンパイルエラーとなる。

### C++17 配列版
- (2), (3), (4) : 以下のいずれかの場合にのみオーバーロード解決に参加する：
    - `U`はメンバ型`pointer`と同じ型
    - `pointer`は`element_type*`と同じ型かつ`U`は何らかのポインタ型`V*`であり、`V(*)[]`は`element_type(*)[]`に変換可能である
    - `U`は`nullptr_t`である（(3), (4)のみ）
- (7) : 以下の全ての条件を満たさない場合、この関数はオーバーロード解決の候補から外れる：
    - `U`は配列型ではないこと
    - `pointer`は`element_type*`と同じ型
    - `unique_ptr<U, E>::pointer`は`unique_ptr<U, E>::element_type*`と同じ型
    - `unique_ptr<U, E>::element_type(*)[]`は`element_type(*)[]`に変換可能である
    - `D`と`E`は同じ型で共に参照型である、もしくは`D`は参照型ではなく`E`は`D`に暗黙変換可能である

## 効果
- (1) : 値初期化したポインタとデリータオブジェクトを、メンバ変数に保持する。
- (2) : ポインタ`p`と値初期化したデリータオブジェクトを、メンバ変数に保持する。
- (3) : ポインタ`p`とデリータオブジェクト`d1`を、メンバ変数に保持する。
- (4) : ポインタ`p`と、`d2`からムーブしたデリータオブジェクト`d2`を、メンバ変数に保持する。
- (5) : `u`が持つポインタの所有権を、`*this`に譲渡する。デリータオブジェクトは、可能であればムーブし、そうでなければコピーする。
- (6) : (1)と同じく、値初期化したポインタとデリータオブジェクトを、メンバ変数に保持する。
- (7) : (5)と同じく、`u`が持つポインタの所有権を、`*this`に譲渡する。デリータオブジェクトは、可能であればムーブし、そうでなければコピーする。
- (8) : `u.release()`の戻り値である所有権が放棄されたポインタと、値初期化したデリータオブジェクトを、メンバ変数に保持する。


## 例外
投げない


## 備考
- (3) : デリータの型`D`が`D&`のように左辺値参照の形式の場合、このコンストラクタのデリータパラメータは`D&`型となる。

```cpp
D deleter;
unique_ptr<T, D&> p(new T(), deleter); // pはdeleterへの参照を保持する
```

## 例
```cpp example
#include <cassert>
#include <memory>

using AllocTraits = std::allocator_traits<std::allocator<int>>;

class Deleter {
 public:
  explicit Deleter(const std::allocator<int>& alloc) : alloc_(alloc) {}

  void operator()(int* p) {
    AllocTraits::destroy(alloc_, p);
    AllocTraits::deallocate(alloc_, p, 1);
  }
 private:
  std::allocator<int> alloc_;
};

int main()
{
  // (1) デフォルト構築
  // 所有権を持たない、空のunique_ptrオブジェクトを構築する
  std::unique_ptr<int> p1;
  assert(!p1);

  // (2) 生ポインタから所有権を譲渡して構築
  std::unique_ptr<int> p2(new int(3));
  assert(p2);

  // (3), (4) 生ポインタから所有権を譲渡し、デリータオブジェクトとともに構築
  std::unique_ptr<int> p3(new int(3), std::default_delete<int>());
  assert(p3);

  // 自作デリータを使った例
  {
    std::allocator<int> alloc;
    int* p = AllocTraits::allocate(alloc, 1);
    AllocTraits::construct(alloc, p, 4);
    std::unique_ptr<int, Deleter> p4(p, Deleter(alloc));
    assert(p4);
    assert(*p4 == 4);
  }

  // (5) 他のunique_ptrから所有権を譲渡する
  std::unique_ptr<int> p5 = std::move(p3);
  assert(*p5 == 3);

  // (6) nullptrで構築
  // デフォルトコンストラクタ(1)と同じ
  std::unique_ptr<int> p6 = nullptr;
  assert(!p6);

  // (7) 変換可能な他のunique_ptrから所有権を譲渡する
  std::unique_ptr<const int> p7 = std::move(p5);
  assert(*static_cast<const int*>(p7.get()) == 3);
}
```
* std::allocator_traits[link /reference/memory/allocator_traits.md]
* destroy[link /reference/memory/allocator_traits/destroy.md]
* deallocate[link /reference/memory/allocator_traits/deallocate.md]
* allocate[link /reference/memory/allocator_traits/allocate.md]
* construct[link /reference/memory/allocator_traits/construct.md]
* std::default_delete[link /reference/memory/default_delete.md]
* std::move[link /reference/utility/move.md]
* get()[link get.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7 (nullptr_tのオーバーロード以外) [mark verified], 4.6.4 [mark verified]
- [Clang](/implementation.md#clang): 3.0 [mark verified]
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified]
	- 2012までは、delete宣言に対応していないため、代わりにprivateで宣言のみ行う手法で代用されている。


## 関連項目
- [C++20 コンパイル時初期化を強制する`constinit`キーワードを追加](/lang/cpp20/constinit.md)


## 参照
- [N2435 Explicit bool for Smart Pointers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2435.htm)
    - (6)の経緯となる提案文書
- [N4190 Removing `auto_ptr`, `random_shuffle()`, And Old `<functional>` Stuff](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4190.htm)
- [N4089 Safe conversions in `unique_ptr<T[]>`, revision 2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4089.pdf)
- [LWG Issue 2520 : N4089 broke initializing `unique_ptr<T[]>` from a nullptr](https://wg21.cmeerw.net/lwg/issue2520)
- [LWG Issue 2801. Default-constructibility of `unique_ptr`](https://wg21.cmeerw.net/lwg/issue2948)
- [LWG Issue 2905. `is_constructible_v<unique_ptr<P, D>, P, D const &>` should be false when D is not copy constructible](https://wg21.cmeerw.net/lwg/issue2905)
- [P2273R3 Making `std::unique_ptr` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p2273r3.pdf)

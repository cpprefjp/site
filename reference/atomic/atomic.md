# atomic
* atomic[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  template<class T> struct atomic;

  template<> struct atomic<integral>;
  template<class T> struct atomic<T*>;
}
```
* integral[italic]

## 概要
`atomic`クラステンプレートは、型`T`をアトミック操作するためのクラステンプレートである。整数型およびポインタに対する特殊化が提供されており、それぞれに特化した演算が用意されている。その他の型に`atomic`クラステンプレートを使用する場合、型`T`は[trivially copyable](/reference/type_traits/is_trivially_copyable.md)である必要がある。特殊化された整数型および`bool`型には、それぞれ`atomic_T`という型の別名が提供される。

| 名前付きアトミック型 | テンプレート引数となる整数型 | 対応バージョン |
|-----|-----|-----|
| `atomic_char`     | `char`           | C++11 |
| `atomic_schar`    | `signed char`    | C++11 |
| `atomic_uchar`    | `unsigned char`  | C++11 |
| `atomic_short`    | `short`          | C++11 |
| `atomic_ushort`   | `unsigned short` | C++11 |
| `atomic_int`      | `int`            | C++11 |
| `atomic_long`     | `long`           | C++11 |
| `atomic_ulong`    | `unsigned long`  | C++11 |
| `atomic_llong`    | [`long long`](/lang/cpp11/long_long_type.md) | C++11 |
| `atomic_ullong`   | [`unsigned long long`](/lang/cpp11/long_long_type.md) | C++11 |
| `atomic_char16_t` | [`char16_t`](/lang/cpp11/char16_32.md) | C++11 |
| `atomic_char32_t` | [`char32_t`](/lang/cpp11/char16_32.md) | C++11 |
| `atomic_wchar_t`  | `wchar_t` | C++11 |
| `atomic_bool`     | `bool`    | C++11 |

また、[`<cstdint>`](/reference/cstdint.md)で定義される整数型に対する以下の別名も提供される。

| 名前付きアトミック型 | テンプレート引数となる整数型 | 対応バージョン |
|-----|-----|-----|
| `atomic_int_least8_t`   | [`int_least8_t`](/reference/cstdint/int_least8_t.md)     | C++11 |
| `atomic_uint_least8_t`  | [`uint_least8_t`](/reference/cstdint/uint_least8_t.md)   | C++11 |
| `atomic_int_least16_t`  | [`int_least16_t`](/reference/cstdint/int_least16_t.md)   | C++11 |
| `atomic_uint_least16_t` | [`uint_least16_t`](/reference/cstdint/uint_least16_t.md) | C++11 |
| `atomic_int_least32_t`  | [`int_least32_t`](/reference/cstdint/int_least32_t.md)   | C++11 |
| `atomic_uint_least32_t` | [`uint_least32_t`](/reference/cstdint/uint_least32_t.md) | C++11 |
| `atomic_int_least64_t`  | [`int_least64_t`](/reference/cstdint/int_least64_t.md)   | C++11 |
| `atomic_uint_least64_t` | [`uint_least64_t`](/reference/cstdint/uint_least64_t.md) | C++11 |
| `atomic_int_fast8_t`    | [`int_fast8_t`](/reference/cstdint/int_fast8_t.md)       | C++11 |
| `atomic_uint_fast8_t`   | [`uint_fast8_t`](/reference/cstdint/uint_fast8_t.md)     | C++11 |
| `atomic_int_fast16_t`   | [`int_fast16_t`](/reference/cstdint/int_fast16_t.md)     | C++11 |
| `atomic_uint_fast16_t`  | [`uint_fast16_t`](/reference/cstdint/uint_fast16_t.md)   | C++11 |
| `atomic_int_fast32_t`   | [`int_fast32_t`](/reference/cstdint/int_fast32_t.md)     | C++11 |
| `atomic_uint_fast32_t`  | [`uint_fast32_t`](/reference/cstdint/uint_fast32_t.md)   | C++11 |
| `atomic_int_fast64_t`   | [`int_fast64_t`](/reference/cstdint/int_fast64_t.md)     | C++11 |
| `atomic_uint_fast64_t`  | [`uint_fast64_t`](/reference/cstdint/uint_fast64_t.md)   | C++11 |
| `atomic_size_t`         | [`size_t`](/reference/cstddef/size_t.md)                 | C++11 |
| `atomic_ptrdiff_t`      | [`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md)           | C++11 |
| `atomic_intmax_t`       | [`intmax_t`](/reference/cstdint/intmax_t.md)             | C++11 |
| `atomic_uintmax_t`      | [`uintmax_t`](/reference/cstdint/uintmax_t.md)           | C++11 |

[`<cstdint>`](/reference/cstdint.md)で定義される整数型に対する以下の別名は、元の整数型が定義される場合のみ定義される。

| 名前付きアトミック型 | テンプレート引数となる整数型 | 対応バージョン |
|-----|-----|-----|
| `atomic_int8_t`    | [`int8_t`](/reference/cstdint/int8_t.md)       | C++17 |
| `atomic_uint8_t`   | [`uint8_t`](/reference/cstdint/uint8_t.md)     | C++17 |
| `atomic_int16_t`   | [`int16_t`](/reference/cstdint/int16_t.md)     | C++17 |
| `atomic_uint16_t`  | [`uint16_t`](/reference/cstdint/uint16_t.md)   | C++17 |
| `atomic_int32_t`   | [`int32_t`](/reference/cstdint/int32_t.md)     | C++17 |
| `atomic_uint32_t`  | [`uint32_t`](/reference/cstdint/uint32_t.md)   | C++17 |
| `atomic_int64_t`   | [`int64_t`](/reference/cstdint/int64_t.md)     | C++17 |
| `atomic_uint64_t`  | [`uint64_t`](/reference/cstdint/uint64_t.md)   | C++17 |
| `atomic_intptr_t`  | [`intptr_t`](/reference/cstdint/intptr_t.md)   | C++11 |
| `atomic_uintptr_t` | [`uintptr_t`](/reference/cstdint/uintptr_t.md) | C++11 |


### 共通メンバ関数
| 名前 | 説明 | 対応バージョン |
|------|------|-----|
| [`(constructor)`](atomic/op_constructor.md) | コンストラクタ | C++11 |
| `~atomic() = default`                       | デストラクタ | C++11 |
| [`operator=`](atomic/op_assign.md)          | 代入演算子 | C++11 |
| [`is_lock_free`](atomic/is_lock_free.md)    | オブジェクトがロックフリーに振る舞えるかを判定する | C++11 |
| [`store`](atomic/store.md)                  | 値を書き込む | C++11 |
| [`load`](atomic/load.md)                    | 値を読み込む | C++11 |
| [`operator T`](atomic/op_t.md)              | 型Tへの変換演算子 | C++11 |
| [`exchange`](atomic/exchange.md)            | 値を入れ替える | C++11 |
| [`compare_exchange_weak`](atomic/compare_exchange_weak.md) | 弱い比較で値を入れ替える | C++11 |
| [`compare_exchange_strong`](atomic/compare_exchange_strong.md) | 強い比較で値を入れ替える | C++11 |


### 共通メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型となるテンプレートパラメータの型`T` | C++17 |


### 共通メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr bool is_always_lock_free` | 型`T`に対するアトミック操作が常にロックフリー (非ミューテックス) で動作する場合は`true`、そうでなければ`false` | C++17 |


### atomic<integral>専用メンバ関数
整数型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic/fetch_add.md)        | 加算           | C++11 |
| [`fetch_sub`](atomic/fetch_sub.md)        | 減算           | C++11 |
| [`fetch_and`](atomic/fetch_and.md)        | AND演算        | C++11 |
| [`fetch_or`](atomic/fetch_or.md)          | OR演算         | C++11 |
| [`fetch_xor`](atomic/fetch_xor.md)        | XOR演算        | C++11 |
| [`operator++`](atomic/op_increment.md)    | インクリメント | C++11 |
| [`operator--`](atomic/op_decrement.md)    | デクリメント   | C++11 |
| [`operator+=`](atomic/op_plus_assign.md)  | 加算           | C++11 |
| [`operator-=`](atomic/op_minus_assign.md) | 減算           | C++11 |
| [`operator&=`](atomic/op_and_assign.md)   | AND演算        | C++11 |
| <code>[operator&#x7C;=](atomic/op_or_assign.md)</code> | OR演算 | C++11 |
| [`operator^=`](atomic/op_xor_assign.md)   | XOR演算 | C++11 |


### atomic<integral>専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型`value_type` | C++17 |


### atomic<T*>専用メンバ関数
ポインタ型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic/fetch_add.md)        | 加算 | C++11 |
| [`fetch_sub`](atomic/fetch_sub.md)        | 減算 | C++11 |
| [`operator++`](atomic/op_increment.md)    | インクリメント | C++11 |
| [`operator--`](atomic/op_decrement.md)    | デクリメント | C++11 |
| [`operator+=`](atomic/op_plus_assign.md)  | 加算 | C++11 |
| [`operator-=`](atomic/op_minus_assign.md) | 減算 | C++11 |


### atomic<T*>専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++17 |


### 例
```cpp
// スピンロックの実装
// Boost Atomic Library - Usage Example
// http://www.boost.org/doc/libs/1_53_0/doc/html/atomic/usage_examples.html#boost_atomic.usage_examples.example_spinlock

#include <iostream>
#include <atomic>
#include <thread>
#include <mutex>

class spinlock {
private:
  enum LockState {Locked, Unlocked};
  std::atomic<LockState> state_;

public:
  spinlock() : state_(Unlocked) {}

  void lock()
  {
    // 現在の状態をLockedと入れ替える
    while (state_.exchange(Locked, std::memory_order_acquire) == Locked) {
      // busy-wait...アンロックされるまで待機
    }
  }

  void unlock()
  {
    // 値をUnlockedに更新
    state_.store(Unlocked, std::memory_order_release);
  }
};

namespace {
  spinlock lock;
}

template <class T>
void print(const T& x)
{
  std::lock_guard<spinlock> lk(lock);
  std::cout << x << std::endl;
}

void f()
{
  print(1);
}

void g()
{
  print(2);
}

int main()
{
  std::thread t1(f);
  std::thread t2(g);

  t1.join();
  t2.join();
}
```
* http://www.boost.org/doc/libs/1_53_0/doc/html/atomic/usage_examples.html#boost_atomic.usage_examples.example_spinlock[link http://www.boost.org/doc/libs/1_53_0/doc/html/atomic/usage_examples.html#boost_atomic.usage_examples.example_spinlock]
* std::atomic[color ff0000]
* exchange[color ff0000]
* store[color ff0000]

### 出力例
```
2
1
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [Visual C++](/implementation.md#visual_cpp): 11.0, 12.0

### 備考
- GCC 4.9.2まで、アライメントがおかしくなってセグメンテーションフォルトになるバグがあった。GCC 5.1で修正された。([Bug 65147](https://gcc.gnu.org/bugzilla/show_bug.cgi?id=65147))


### 参照
- [N2145 C++ Atomic Types and Operations](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2145.html)
- [N2547 Allow atomics use in signal handlers](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2008/n2547.htm)
- [アトミックオブジェクトを含むクラスのコピーとムーブ - Faith and Brave - C++で遊ぼう](http://d.hatena.ne.jp/faith_and_brave/20130110/1357808183)
- [LWG Issue 2441. Exact-width atomic `typedef`s should be provided](https://wg21.cmeerw.net/lwg/issue2441)
- [P0558R1 Resolving `atomic<T>` named base class inconsistencies](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0558r1.pdf)
- [P0152R1 `constexpr atomic<T>::is_always_lock_free`](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0152r1.html)

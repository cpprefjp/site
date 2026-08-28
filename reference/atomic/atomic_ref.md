# atomic_ref
* atomic[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T> struct atomic_ref;          // (1) C++20

  template<> struct atomic_ref<integral>;       // (2) C++20
  template<> struct atomic_ref<floating-point>; // (3) C++20
  template<class T> struct atomic_ref<T*>;      // (4) C++20
}
```
* integral[italic]
* floating-point[italic]

## 概要
`atomic_ref`クラステンプレートは、コンストラクタで受け取った`T`型変数への参照に対してアトミック操作を適用する型である。非アトミックなオブジェクトに対して、値コピーによる[`std::atomic`](atomic.md)型変換の必要なく、アトミック操作を適用する。

オブジェクトが、多くの場面で非アトミックに使用され、競合回避のためにアトミックに振る舞う必要があるのが一部の場面である場合、オブジェクトを強制的にアトミックオブジェクトに変換してしまうことは、パフォーマンス低下につながる。`atomic_ref`クラスを使用することで、そのような状況に対応し、一部の状況でのみオブジェクトをアトミックに振る舞わせることができる。

同じオブジェクトを参照する異なる`atomic_ref`オブジェクトを介して行われるアトミック操作は、共通の参照するオブジェクトに対してアトミックに行われる。つまり、局所的に`atomic_ref`オブジェクトに変換してアトミック操作を適用してもよい。

オブジェクトを参照してアトミック操作をするための制約として、アーキテクチャ固有のアライメント制約を満たすことが要求される。コンストラクタと代入演算子でオブジェクトを参照する際、メンバ定数としてのアライメント値`required_alignment`の位置にオブジェクトが配置されていること。

`atomic_ref`クラステンプレートは型`T`の値をコピーではなく参照で保持するため、`atomic_ref`オブジェクトより先に参照先の変数の寿命が尽きてはならない。

- (1) : プライマリテンプレート。宣言のみ
- (2) : 整数型に対する特殊化 (`bool`以外)
- (3) : 浮動小数点数型に対する特殊化
    - (C++23) : 拡張浮動小数点数型を含む
- (4) : 任意の型のポインタに対する特殊化

C++26から、これらの特殊化はCV修飾された型に対しても行われるようになった。

`atomic_ref<T>`は、CV修飾のみが異なる`atomic_ref<U>`から構築できる。たとえば`atomic_ref<int>`から`atomic_ref<const int>`へ変換することで、読み取り専用の`atomic_ref`として扱える。

`T`が`const`修飾されている場合、参照先の値を変更するメンバ関数（[`store`](atomic_ref/store.md)、[`operator=`](atomic_ref/op_assign.md)、`fetch_*`／`store_*`系、複合代入演算子、[`operator++`](atomic_ref/op_increment.md)／[`operator--`](atomic_ref/op_decrement.md)など）は制約により無効化され、読み取り・待機系の操作（[`load`](atomic_ref/load.md)、[`wait`](atomic_ref/wait.md)など）のみが利用できる。


## テンプレートパラメータ制約
- 型`T`は[`is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<T> == true`であること
- C++26: `is_always_lock_free`が`false`かつ[`is_volatile_v`](/reference/type_traits/is_volatile.md)が`true`である場合、プログラムは不適格となる


## メンバ関数
### 共通メンバ関数
| 名前 | 説明 | 対応バージョン |
|------|------|-----|
| [`(constructor)`](atomic_ref/op_constructor.md) | コンストラクタ | C++20 |
| `~atomic_ref() = default`                       | デストラクタ | C++20 |
| [`operator=`](atomic_ref/op_assign.md)          | 代入 | C++20 |
| [`is_lock_free`](atomic_ref/is_lock_free.md)    | オブジェクトがロックフリーに振る舞えるかを判定する | C++20 |
| [`store`](atomic_ref/store.md)                  | 値を書き込む | C++20 |
| [`load`](atomic_ref/load.md)                    | 値を読み込む | C++20 |
| [`operator T`](atomic_ref/op_t.md)              | 型`T`への変換演算子 | C++20 (C++26で`value_type`に変更) |
| [`operator value_type`](atomic_ref/op_value_type.md) | 型`value_type`への変換演算子 | C++26 |
| [`exchange`](atomic_ref/exchange.md)            | 値を入れ替える | C++20 |
| [`compare_exchange_weak`](atomic_ref/compare_exchange_weak.md) | 弱い比較で値を入れ替える | C++20 |
| [`compare_exchange_strong`](atomic_ref/compare_exchange_strong.md) | 強い比較で値を入れ替える | C++20 |
| [`wait`](atomic_ref/wait.md) | 起床されるまで待機する | C++20 |
| [`notify_one`](atomic_ref/notify_one.md) | 待機しているスレッドをひとつ起床させる | C++20 |
| [`notify_all`](atomic_ref/notify_all.md) | 待機している全てのスレッドを起床させる | C++20 |
| [`address`](atomic_ref/address.md) | 参照しているオブジェクトのアドレスを取得する | C++26 |


### 共通メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型となるテンプレートパラメータの型。<br/> C++20: `T`<br/> C++26: [`remove_cv_t`](/reference/type_traits/remove_cv.md)`<T>` | C++20 |


### 共通メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr bool is_always_lock_free` | 型`T`に対するアトミック操作が常にロックフリー (非ミューテックス) で動作する場合は`true`、そうでなければ`false` | C++20 |
| `static constexpr` [`size_t`](/reference/cstddef/size_t.md) `required_alignment` | 参照するオブジェクトに要求されるアライメント。少なくとも`alignof(T)` | C++20 |

`is_always_lock_free == true`の場合、このクラスのオブジェクトをシグナルハンドラー内で使用できる。

実装は、`atomic_ref<T>`の全てのオブジェクトに対する操作がロックフリーとなることを保証するために、`required_alignment`を`alignof(T)`より大きな値として定義することを選択できる。

C++26では、`T`にCV修飾を加えた任意の型`U`について、`required_alignment`と`is_always_lock_free`の値は`atomic_ref<`[`remove_cv_t`](/reference/type_traits/remove_cv.md)`<U>>`のものと同じである。これにより、CV修飾の違いによってアライメント要求やロックフリー保証が変わらないことが保証される。


### atomic_ref&lt;integral&gt;専用メンバ関数
整数型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md)        | 加算           | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md)        | 減算           | C++20 |
| [`fetch_and`](atomic_ref/fetch_and.md)        | AND演算        | C++20 |
| [`fetch_or`](atomic_ref/fetch_or.md)          | OR演算         | C++20 |
| [`fetch_xor`](atomic_ref/fetch_xor.md)        | XOR演算        | C++20 |
| [`fetch_max`](atomic_ref/fetch_max.md)        | 最大値を設定・取得     | C++26 |
| [`fetch_min`](atomic_ref/fetch_min.md)        | 最小値を設定・取得     | C++26 |
| [`store_add`](atomic_ref/store_add.md)        | 値を読み込まずに加算   | C++26 |
| [`store_sub`](atomic_ref/store_sub.md)        | 値を読み込まずに減算   | C++26 |
| [`store_and`](atomic_ref/store_and.md)        | 値を読み込まずにAND演算  | C++26 |
| [`store_or`](atomic_ref/store_or.md)          | 値を読み込まずにOR演算   | C++26 |
| [`store_xor`](atomic_ref/store_xor.md)        | 値を読み込まずにXOR演算  | C++26 |
| [`store_max`](atomic_ref/store_max.md)        | 値を読み込まずに最大値を設定 | C++26 |
| [`store_min`](atomic_ref/store_min.md)        | 値を読み込まずに最小値を設定 | C++26 |
| [`operator++`](atomic_ref/op_increment.md)    | インクリメント | C++20 |
| [`operator--`](atomic_ref/op_decrement.md)    | デクリメント   | C++20 |
| [`operator+=`](atomic_ref/op_plus_assign.md)  | 加算           | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md) | 減算           | C++20 |
| [`operator&=`](atomic_ref/op_and_assign.md)   | AND演算        | C++20 |
| <code>[operator&#x7C;=](atomic_ref/op_or_assign.md)</code> | OR演算 | C++20 |
| [`operator^=`](atomic_ref/op_xor_assign.md)   | XOR演算 | C++20 |


### atomic_ref&lt;integral&gt;専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型`value_type` | C++20 |


### atomic_ref&lt;floating-point&gt;専用メンバ関数
浮動小数点数型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md)                   | 加算 | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md)                   | 減算 | C++20 |
| [`fetch_max`](atomic_ref/fetch_max.md)                   | 最大値を設定・取得     | C++26 |
| [`fetch_min`](atomic_ref/fetch_min.md)                   | 最小値を設定・取得     | C++26 |
| [`fetch_fmaximum`](atomic_ref/fetch_fmaximum.md)         | 最大値を設定・取得  (`-0.0`と`+0.0`では`+0.0`、NaNと値ではNaNを返す) | C++26 |
| [`fetch_fminimum`](atomic_ref/fetch_fminimum.md)         | 最小値を設定・取得  (`-0.0`と`+0.0`では`-0.0`、NaNと値ではNaNを返す) | C++26 |
| [`fetch_fmaximum_num`](atomic_ref/fetch_fmaximum_num.md) | 最大値を設定・取得  (`-0.0`と`+0.0`では`+0.0`、NaNと値では数値を返す) | C++26 |
| [`fetch_fminimum_num`](atomic_ref/fetch_fminimum_num.md) | 最小値を設定・取得  (`-0.0`と`+0.0`では`-0.0`、NaNと値では数値を返す) | C++26 |
| [`store_add`](atomic_ref/store_add.md)                   | 値を読み込まずに加算   | C++26 |
| [`store_sub`](atomic_ref/store_sub.md)                   | 値を読み込まずに減算   | C++26 |
| [`store_and`](atomic_ref/store_and.md)                   | 値を読み込まずにAND演算  | C++26 |
| [`store_or`](atomic_ref/store_or.md)                     | 値を読み込まずにOR演算   | C++26 |
| [`store_xor`](atomic_ref/store_xor.md)                   | 値を読み込まずにXOR演算  | C++26 |
| [`store_max`](atomic_ref/store_max.md)                   | 値を読み込まずに最大値を設定 | C++26 |
| [`store_min`](atomic_ref/store_min.md)                   | 値を読み込まずに最小値を設定 | C++26 |
| [`store_fmaximum`](atomic_ref/store_fmaximum.md)         | 値を読み込まずに最大値を設定  (`-0.0`と`+0.0`では`+0.0`、NaNと値ではNaNを返す) | C++26 |
| [`store_fminimum`](atomic_ref/store_fminimum.md)         | 値を読み込まずに最小値を設定  (`-0.0`と`+0.0`では`-0.0`、NaNと値ではNaNを返す) | C++26 |
| [`store_fmaximum_num`](atomic_ref/store_fmaximum_num.md) | 値を読み込まずに最大値を設定  (`-0.0`と`+0.0`では`+0.0`、NaNと値では数値を返す) | C++26 |
| [`store_fminimum_num`](atomic_ref/store_fminimum_num.md) | 値を読み込まずに最小値を設定  (`-0.0`と`+0.0`では`-0.0`、NaNと値では数値を返す) | C++26 |
| [`operator+=`](atomic_ref/op_plus_assign.md)             | 加算 | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md)            | 減算 | C++20 |


### atomic_ref&lt;floating-point&gt;専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型`value_type` | C++20 |


### atomic_ref&lt;T*&gt;専用メンバ関数
ポインタ型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md)        | 加算 | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md)        | 減算 | C++20 |
| [`fetch_max`](atomic_ref/fetch_max.md)        | 最大値を設定・取得     | C++26 |
| [`fetch_min`](atomic_ref/fetch_min.md)        | 最小値を設定・取得     | C++26 |
| [`store_add`](atomic_ref/store_add.md)        | 値を読み込まずに加算   | C++26 |
| [`store_sub`](atomic_ref/store_sub.md)        | 値を読み込まずに減算   | C++26 |
| [`store_max`](atomic_ref/store_max.md)        | 値を読み込まずに最大値を設定 | C++26 |
| [`store_min`](atomic_ref/store_min.md)        | 値を読み込まずに最小値を設定 | C++26 |
| [`operator++`](atomic_ref/op_increment.md)    | インクリメント | C++20 |
| [`operator--`](atomic_ref/op_decrement.md)    | デクリメント | C++20 |
| [`operator+=`](atomic_ref/op_plus_assign.md)  | 加算 | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md) | 減算 | C++20 |


### atomic_ref&lt;T*&gt;専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++20 |


### 例
```cpp example
#include <iostream>
#include <atomic>
#include <thread>

struct Info {
  int value = 0;
};

int main()
{
  Info info;

  std::thread consumer_thread {[&info] {
    std::atomic_ref<int> x{info.value};
    while (true) {
       if (int value = x.exchange(0); value != 0) {
         std::cout << value << std::endl;
         break;
       }
    }
  }};

  std::atomic_ref{info.value}.store(3); // クラステンプレートのテンプレート引数推論も使用できる (<int>省略)
  consumer_thread.join();
}
```
* std::atomic_ref[color ff0000]
* x.exchange[link atomic_ref/exchange.md]
* store[link atomic_ref/store.md]
* consumer_thread.join()[link /reference/thread/thread/join.md]

### 出力
```
3
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 9.0 [mark noimpl]
- [GCC](/implementation.md#gcc): 10.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`std::atomic`](atomic.md)


### 参照
- [P0019R8 Atomic Ref](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0019r8.html)
- [P1467R9 Extended floating-point types and standard names](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p1467r9.html)
    - C++23で拡張浮動小数点数型もテンプレート引数として指定することが許可された
- [P3323R1 cv-qualified types in `atomic` and `atomic_ref`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p3323r1.html)
    - C++26でCV修飾されたテンプレート引数を受け取れるようになった
- [LWG Issue 4453. `atomic_ref<cv T>::required_alignment` should be the same as for `T`](https://cplusplus.github.io/LWG/issue4453)
    - C++26で、CV修飾の違いによって`required_alignment`と`is_always_lock_free`の値が変わらないことが保証された
- [LWG Issue 4377. Misleading note about lock-free property of `std::atomic_ref`](https://cplusplus.github.io/LWG/issue4377)
    - C++26で、`required_alignment`に関する誤解を招く注記（`complex<double>`の例など）が、「実装はすべての操作がロックフリーとなるよう`required_alignment`を`alignof(T)`より大きく定義できる」という趣旨の注記へ修正された
- [LWG Issue 4450. `std::atomic_ref<T>::store` should be disabled for const `T`](https://cplusplus.github.io/LWG/issue4450)
    - C++26で、`T`が`const`修飾されている場合に`store`をはじめとする値を変更するメンバ関数が制約により無効化されることが規定された
- [P3860R1 Proposed Resolution for NB Comment GB13-309 `atomic_ref<T>` is not convertible to `atomic_ref<const T>`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3860r1.html)
    - C++26で、CV修飾のみが異なる`atomic_ref`から構築する[変換コンストラクタ](atomic_ref/op_constructor.md)が追加された

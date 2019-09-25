# atomic_ref
* atomic[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp20[meta cpp]

```cpp
namespace std {
  template<class T> struct atomic_ref;

  template<> struct atomic_ref<integral>;
  template<> struct atomic_ref<floating-point>;
  template<class T> struct atomic_ref<T*>;
}
```
* integral[italic]
* floating-point[italic]

## 概要
`atomic_ref`クラステンプレートは、コンストラクタで受け取った`T`型変数への参照に対してアトミック操作を適用する型である。非アトミックなオブジェクトに対して、値コピーによる[`std::atomic`](atomic.md)型変換の必要なく、アトミック操作を適用する。

`atomic_ref`クラステンプレートは型`T`の値をコピーではなく参照で保持するため、`atomic_ref`オブジェクトより先に参照先の変数の寿命が尽きてはならない。


## テンプレートパラメータ制約
- 型`T`は[`is_trivially_copyable_v`](/reference/type_traits/is_trivially_copyable.md)`<T> == true`であること


### 共通メンバ関数
| 名前 | 説明 | 対応バージョン |
|------|------|-----|
| [`(constructor)`](atomic_ref/op_constructor.md.nolink) | コンストラクタ | C++20 |
| `~atomic_ref() = default`                       | デストラクタ | C++20 |
| [`operator=`](atomic_ref/op_assign.md.nolink) | 代入 | C++20
| [`is_lock_free`](atomic_ref/is_lock_free.md.nolink)    | オブジェクトがロックフリーに振る舞えるかを判定する | C++20 |
| [`store`](atomic_ref/store.md.nolink)                  | 値を書き込む | C++20 |
| [`load`](atomic_ref/load.md.nolink)                    | 値を読み込む | C++20 |
| [`operator T`](atomic_ref/op_t.md.nolink)              | 型Tへの変換演算子 | C++20 |
| [`exchange`](atomic_ref/exchange.md.nolink)            | 値を入れ替える | C++20 |
| [`compare_exchange_weak`](atomic_ref/compare_exchange_weak.md.nolink) | 弱い比較で値を入れ替える | C++20 |
| [`compare_exchange_strong`](atomic_ref/compare_exchange_strong.md.nolink) | 強い比較で値を入れ替える | C++20 |
| [`wait`](atomic_ref/wait.md.nolink) | | C++20 |
| [`notify_one`](atomic_ref/notify_one.md.nolink) | | C++20 |
| [`notify_all`](atomic_ref/notify_all.md.nolink) | | C++20 |


### 共通メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `value_type` | 要素型となるテンプレートパラメータの型`T` | C++20 |


### 共通メンバ定数

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `static constexpr bool is_always_lock_free` | 型`T`に対するアトミック操作が常にロックフリー (非ミューテックス) で動作する場合は`true`、そうでなければ`false` | C++20 |
| `static constexpr` [`size_t`](/reference/cstddef/size_t.md) `required_alignment` | 参照するオブジェクトに要求されるアライメント。少なくとも`alignof(T)` | C++20 |

`is_always_lock_free == true`の場合、このクラスのオブジェクトをシグナルハンドラー内で使用できる。

`required_alignment`について、ハードウェアは参照するオブジェクトに対して、型`T`のほかのオブジェクトよりも厳密なアライメントを持つことを要求できる。また、`atomic_ref`がロックフリーかどうかは、参照するオブジェクトのアライメントに依存する。たとえば[`std::complex`](/reference/complex/complex.md)`<double>`のロックフリー操作は`2 * alignof(double)`にアライメントされる場合にのみサポートされる。


### atomic_ref<integral>専用メンバ関数
整数型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md.nolink)        | 加算           | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md.nolink)        | 減算           | C++20 |
| [`fetch_and`](atomic_ref/fetch_and.md.nolink)        | AND演算        | C++20 |
| [`fetch_or`](atomic_ref/fetch_or.md.nolink)          | OR演算         | C++20 |
| [`fetch_xor`](atomic_ref/fetch_xor.md.nolink)        | XOR演算        | C++20 |
| [`operator++`](atomic_ref/op_increment.md.nolink)    | インクリメント | C++20 |
| [`operator--`](atomic_ref/op_decrement.md.nolink)    | デクリメント   | C++20 |
| [`operator+=`](atomic_ref/op_plus_assign.md.nolink)  | 加算           | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md.nolink) | 減算           | C++20 |
| [`operator&=`](atomic_ref/op_and_assign.md.nolink)   | AND演算        | C++20 |
| <code>[operator&#x7C;=](atomic_ref/op_or_assign.md.nolink)</code> | OR演算 | C++20 |
| [`operator^=`](atomic_ref/op_xor_assign.md.nolink)   | XOR演算 | C++20 |


### atomic_ref<integral>専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型`value_type` | C++20 |


### atomic_ref<floating-point>専用メンバ関数
浮動小数点数型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md.nolink)        | 加算 | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md.nolink)        | 減算 | C++20 |
| [`operator+=`](atomic_ref/op_plus_assign.md.nolink)  | 加算 | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md.nolink) | 減算 | C++20 |


### atomic_ref<floating-point>専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型`value_type` | C++20 |


### atomic_ref<T*>専用メンバ関数
ポインタ型に対する特殊化。

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| [`fetch_add`](atomic_ref/fetch_add.md.nolink)        | 加算 | C++20 |
| [`fetch_sub`](atomic_ref/fetch_sub.md.nolink)        | 減算 | C++20 |
| [`operator++`](atomic_ref/op_increment.md.nolink)    | インクリメント | C++20 |
| [`operator--`](atomic_ref/op_decrement.md.nolink)    | デクリメント | C++20 |
| [`operator+=`](atomic_ref/op_plus_assign.md.nolink)  | 加算 | C++20 |
| [`operator-=`](atomic_ref/op_minus_assign.md.nolink) | 減算 | C++20 |


### atomic_ref<T*>専用メンバ型
| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `difference_type` | 2つの値の差を表す整数型[`ptrdiff_t`](/reference/cstddef/ptrdiff_t.md) | C++20 |


### 例
```cpp example
```

### 出力例
```
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc):
- [Visual C++](/implementation.md#visual_cpp):


## 関連項目
- [`std::atomic`](atomic.md)


### 参照
- [P0019R8 Atomic Ref](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0019r8.html)

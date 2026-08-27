# allocator_arg_t
* memory[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct allocator_arg_t {};                                        // (1) C++11
  struct allocator_arg_t { explicit allocator_arg_t() = default; }; // (1) C++17

  constexpr allocator_arg_t allocator_arg = allocator_arg_t();      // (2) C++11
  inline constexpr allocator_arg_t allocator_arg{};                 // (2) C++17
}
```

## 概要
`allocator_arg_t`は、実装を持たない空のクラスである。

このクラスは、コンストラクタや関数のオーバーロードを行う際に一意な型として使用される。[`tuple`](/reference/tuple/tuple.md)や[`promise`](/reference/future/promise.md)、[`function`](/reference/functional/function.md)などのコンストラクタではこのクラスを第一引数として第二引数以降にアロケータを設定している。

`allocator_arg_t`型の変数`allocator_arg`が定義されている。


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ?
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2012 [mark verified], 2013 [mark verified]

## 関連項目
- [`std::tuple`](/reference/tuple/tuple.md)クラス
- [`std::promise`](/reference/future/promise.md)クラス
- [`std::function`](/reference/functional/function.md)クラス


## 参照
- [LWG Issue 1073. Declaration of `allocator_arg` should be `constexpr`](https://cplusplus.github.io/LWG/issue1073)
    - C++11で、`allocator_arg`の宣言が`const`から`constexpr`へ改められた
- [LWG Issue 1403. Inconsistent definitions for `allocator_arg`](https://cplusplus.github.io/LWG/issue1403)
    - C++11で、ヘッダの概要とクラスの規定とで`allocator_arg`の宣言が食い違っていた問題が解消され、どちらも`constexpr`に統一された
- [LWG Issue 2510. Tag types should not be `DefaultConstructible`](https://cplusplus.github.io/LWG/issue2510)
    - C++17で、`{}`による暗黙構築を防ぐため、明示的なデフォルトコンストラクタ（`explicit allocator_arg_t() = default;`）が追加された

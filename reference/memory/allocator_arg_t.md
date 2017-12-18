# allocator_arg_t
* memory[meta header]
* std[meta namespace]
* class[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  struct allocator_arg_t {};
  constexpr allocator_arg_t allocator_arg = allocator_arg_t();
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
- Clang: ?
- GCC (c++11 or c++11 mode): 4.7.0
- ICC: ?
- [Visual C++](/implementation.md#visual_cpp): 2012, 2013

## 関連項目
- [`std::tuple`](/reference/tuple/tuple.md)クラス
- [`std::promise`](/reference/future/promise.md)クラス
- [`std::function`](/reference/functional/function.md)クラス


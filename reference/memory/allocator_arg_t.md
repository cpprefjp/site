#allocator_arg_t (C++11)
```cpp
namespace std {
  struct allocator_arg_t {};
  constexpr allocator_arg_t allocator_arg = allocator_arg_t();
}
```

##概要
`allocator_arg_t`クラスは、実装を持たない空のクラスである。このクラスは、コンストラクタや関数のオーバーロードを行う際に一意な型として使用される。[`tuple`](/reference/tuple/tuple.md)や[`promise`](/reference/future/promise.md)、[`function`](/reference/functional/function.md)などのコンストラクタではこのクラスを第一引数として第二引数以降にアロケータを設定している。`allocator_arg_t`型の変数`allocator_arg`が定義されている。


##バージョン
###言語
- C++11

###処理系
- Clang: ?
- GCC (c++11 or c++0x mode): 4.7.0
- ICC: ?
- [Visual C++](/implementation#visual_cpp.md): 11.0, 12.0

##参照
- [`std::tuple`](/reference/tuple/tuple.md)クラス
- [`std::promise`](/reference/future/promise.md)クラス
- [`std::function`](/reference/functional/function.md)クラス

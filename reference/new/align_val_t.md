# align_val_t
* new[meta header]
* std[meta namespace]
* enum[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std {
  enum class align_val_t : std::size_t {};
}
```

## 概要
C++17において、動的メモリ確保時のアライメント指定がサポートされた。これは、デフォルトよりも大きなアライメントを要求するとき、`new` に渡されるアライメント値の型である。
[スコープを持つ列挙型](/lang/cpp11/scoped_enum.md)として定義されているが、意図しない型変換を防ぐためのものなので、列挙値は定義されていない。

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??

## 関連項目
- [C++17 アライメント指定されたデータの動的メモリ確保](/lang/cpp17/dynamic_memory_allocation_for_over-aligned_data.md)

## 参照
- [P0035R4 Dynamic memory allocation for over-aligned data](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0035r4.html)

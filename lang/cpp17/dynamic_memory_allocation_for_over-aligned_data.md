# アライメント指定されたデータの動的メモリ確保 [P0035R4]
* cpp17[meta cpp]

<-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative_page)を参照してください。

<-- last lang caution -->

## 概要

クラスのアライメント要求がデフォルトで満たされるものより大きい場合でも、動的に確保されたメモリ領域が指定したアライメントを満たしていることが保証される。

特殊な命令を使う、メモリアクセスを最適化するなどの理由により、変数のアライメントが必要になることがある。そのような目的のため、C++11において[`alignas`](/lang/cpp11/alignas.md)を用いてクラスのアライメントを指定できるようになった。しかし、デフォルトで満たされるアライメントよりも大きな値を設定した場合には、動的確保したメモリ領域がその指定に沿ってアライメントされる保証はなかった。

```cpp
// 16バイト境界にアライメントされるべきクラス
class alignas(16) float4 {
  float f[4];
};

float4  v; // C++11でも適切にアライメントされる
float4* p = new float4[1000]; // C++17以降では適切にアライメントされる
float*  q = new (std::align_val_t{16}) float[4]; // new演算子に直接アライメント指定することもできる
```
* std::align_val_t[link /reference/new/align_val_t.md]

C++17以前で適切にアライメントされたメモリ領域を動的に確保するためには、C++11で追加された[`std::align`](/reference/memory/align.md)を用いて大きく確保した領域から指定を満たす部分を取り出すか、`posix_memalign`や`_aligned_malloc`などの処理系固有の関数を使用する必要があった。

## 仕様

[`operator new`](/reference/new/op_new.md)に、[`align_val_t`](/reference/new/align_val_t.md)を取るオーバーロードが追加された。[`align_val_t`](/reference/new/align_val_t.md)は意図しない型変換を防止するための`enum class`であり、列挙値は定義されない。

```cpp
namespace std {
  enum class align_val_t : std::size_t {};
}
void* operator new(std::size_t size, std::align_val_t alignment);
```
* std::align_val_t[link /reference/new/align_val_t.md]

動的確保時になされるアライメントのデフォルト値は[`__STDCPP_DEFAULT_NEW_ALIGNMENT__`](predefined_macros.md)で定義されている。これを超えるアライメント要求を持つクラスに対する[`new`](/reference/new/op_new.md)呼び出しは、[`align_val_t`](/reference/new/align_val_t.md)が渡された場合のもので解決される。また、対応するユーザー定義[`new`](/reference/new/op_new.md)が存在する場合、互換性のため呼び出しはそちらで解決される。もしユーザー定義`new`に`align_val_t`を取るものと取らないものがある場合、取るものが優先される。`delete`も同様である。

`new T`の呼び出しが[`align_val_t`](/reference/new/align_val_t.md)を取る[`new`](/reference/new/op_new.md)で解決される場合、`align_val_t`の値は`alignof(T)`の結果になる。

## <a id="relative-page" href="#relative-page">関連項目</a>
- [`<new>`](/reference/new.md)
- [`std::align`](/reference/memory/align.md)
- [C++11 `alignas`](/lang/cpp11/alignas.md)
- [C++11 `alignof`](/lang/cpp11/alignof.md)

## 参照
- [P0035R4 Dynamic memory allocation for over-aligned data](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0035r4.html)
- [New `new()` - The C++17's Alignment Parameter for Operator `new()`](https://www.bfilipek.com/2019/08/newnew-align.html)
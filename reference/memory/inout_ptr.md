# inout_ptr
* memory[meta header]
* function template[meta id-type]
* std[meta namespace]
* cpp23[meta cpp]

```cpp
namespace std {
  template<class Pointer = void, class Smart, class... Args>
  auto
    inout_ptr(Smart& s, Args&&... args); // (1) C++23
  template<class Pointer = void, class Smart, class... Args>
  constexpr auto
    inout_ptr(Smart& s, Args&&... args); // (1) C++26
}
```

## 概要
2重ポインタ`T**`引数経由で既存リソースを解放してから新規確保リソースへのポインタを返すレガシーC関数に対して、出力されたポインタ値をスマートポインタ`s`に格納するアダプタ[`inout_ptr_t`](inout_ptr_t.md)を返すヘルパ関数。

リソース占有管理セマンティクスを提供するC++標準スマートポインタ[`std::unique_ptr`](unique_ptr.md)を始め、互換インタフェースをもつ任意のスマートポインタ型`Smart`を取り扱える。

説明用の`P`型を次のように定義する :

- [`is_void_v`](/reference/type_traits/is_void.md)`<Pointer>`が`false`ならば`Pointer`
- そうでなければ、`Smart::pointer`が有効な型名であれば`Smart::pointer`
- そうでなければ、`Smart::element_type*`が有効な型名であれば`Smart::element_type*`
- そうでなければ、[`pointer_traits`](pointer_traits.md)`<Smart>::element_type*`


## 戻り値
[`inout_ptr_t`](inout_ptr_t.md)`<Smart, P, Args&&...>(s,` [`std::forward<Args>`](/reference/utility/forward.md)`(args)...)`


## 備考
スマートポインタアダプタ`inout_ptr`は、リソース共有管理セマンティクスを提供する[`std::shared_ptr`](shared_ptr.md)をサポートしない。
これは、共有管理されている既存リソースの所有権を放棄させるインタフェース(`release`)を提供しないためである。


## 例
### P1132R8引用
```cpp example
// Legacy C APIs
error_num c_api_re_create_handle(int seed_value, int** p_handle);
void c_api_delete_handle(int* handle);

// C++ program
#include <memory>

struct resource_deleter {
  void operator()(int* handle) {
    c_api_delete_handle(handle);
  }
};

int main() {
  std::unique_ptr<int, resource_deleter> resource(nullptr);
  error_num err = c_api_re_create_handle(
    24, std::inout_ptr(resource)
  );
  if (err == C_API_ERROR_CONDITION) {
    // handle errors
  }
  // resource.get() the out-value from the C API function
}
```
* std::inout_ptr[color ff0000]


## バージョン
### 言語
- C++23

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`inout_ptr_t`](inout_ptr_t.md)
- [`unique_ptr`](unique_ptr.md)


## 参照
- [P1132R8 out_ptr - a scalable output pointer abstraction](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2021/p1132r8.html)
- [P3037R6 `constexpr std::shared_ptr` and friends](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3037r6.pdf)
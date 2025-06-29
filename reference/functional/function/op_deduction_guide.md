# 推論補助
* functional[meta header]
* std[meta namespace]
* function[meta class]
* cpp17[meta cpp]

```cpp
namespace std {
  template <class R, class... ArgTypes>
  function(R(*)(ArgTypes...)) -> function<R(ArgTypes...)>; // (1) C++17

  template <class F>
  function(F) -> function<Signature>;                      // (2) C++17
}
```

## 概要
`std::function`クラステンプレートの型推論補助。

- (1) : 関数ポインタからの推論
- (2) : 関数オブジェクトからシグニチャの推論。このオーバーロードは、関数呼び出し演算子がひとつだけオーバーロードされている場合に有効


## テンプレートパラメータ制約
- (2) :
    - `&F::operator()`は評価されないオペランドとして扱われ、以下のいずれかの場合に適格である：
        - C++17 :
            - `decltype(&F::operator())`は、型`G`があるとして、`R(G::*)(A...) cv &(opt) noexcept(opt)`形式もしくは`R(*)(G cv ref(opt), A...) noexcept(opt)`形式であること
        - C++26 :
            - `F::operator()`が非静的メンバ関数であり、`decltype(&F::operator())`は、型`G`があるとして、`R(G::*)(A...) cv &(opt) noexcept(opt)`形式もしくは`R(*)(G cv ref(opt), A...) noexcept(opt)`形式であること
            - `F::operator()`静的メンバ関数であり、`decltype(&F::operator())`は`R(*)(A...) noexcept(opt)`形式であること


## 例
```cpp example
#include <functional>
#include <type_traits>

int foo(int, char) { return 0; }

struct Functor {
  void operator()(double) {}
};

int main()
{
  // (1)
  // 関数ポインタからの型推論
  std::function f = foo;
  static_assert(std::is_same_v<
    decltype(f),
    std::function<int(int, char)>
  >);

  // (2)
  // ラムダ式からの型推論。
  std::function g = [](int) { return 1; };
  static_assert(std::is_same_v<
    decltype(g),
    std::function<int(int)>
  >);

  // (2)
  // 関数オブジェクトからの型推論。
  // 関数呼び出し演算子がひとつだけオーバーロードされていること
  std::function h = Functor();
  static_assert(std::is_same_v<
    decltype(h),
    std::function<void(double)>
  >);
}
```

### 出力
```
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)
- [C++23 `this`ポインタをもつ必要のない演算子を`static`として宣言できるようにする](/lang/cpp23/static_operator.md)
- [C++23 自身のオブジェクトを明示的にパラメータとして指定する](/lang/cpp23/deducing_this.md.nolink)


## 参照
- [LWG issue 3117. Missing `packaged_task` deduction guides](https://wg21.cmeerw.net/lwg/issue3117)

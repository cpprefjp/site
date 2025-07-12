# 推論補助
* future[meta header]
* std[meta namespace]
* packaged_task[meta class]
* cpp20[meta cpp]

```cpp
namespace std {
  template <class R, class... ArgTypes>
  packaged_task(R(*)(ArgTypes...))
    -> packaged_task<R(ArgTypes...)>; // (1) C++20

  template <class F>
  packaged_task(F)
    -> packaged_task<Signature>;      // (2) C++20
}
```

## 概要
`std::packaged_task`クラステンプレートの型推論補助。

- (1) : 関数ポインタからの推論
- (2) : 関数オブジェクトからシグニチャの推論。このオーバーロードは、関数呼び出し演算子がひとつだけオーバーロードされている場合に有効


## テンプレートパラメータ制約
- (2) :
    - `&F::operator()`は評価されないオペランドとして扱われ、以下のいずれかの場合に適格である：
        - C++17 :
            - `decltype(&F::operator())`は、型`G`があるとして、`R(G::*)(A...) cv &(opt) noexcept(opt)`形式であること
        - C++26 :
            - `F::operator()`が非静的メンバ関数であり、`decltype(&F::operator())`は、型`G`があるとして、`R(G::*)(A...) cv &(opt) noexcept(opt)`形式もしくは`R(*)(G cv ref(opt), A...) noexcept(opt)`形式であること
            - `F::operator()`静的メンバ関数であり、`decltype(&F::operator())`は`R(*)(A...) noexcept(opt)`形式であること


## 例
```cpp example
#include <iostream>
#include <future>

int foo(int, char) { return 0; }

struct Functor {
  int operator()(double) { return 1; }
};

int main()
{
  // (1)
  // 関数ポインタからの型推論
  std::packaged_task f{foo};
  f(1, '3');
  std::cout << f.get_future().get() << std::endl;

  // (2)
  // 関数オブジェクトからの型推論。
  // 関数呼び出し演算子がひとつだけオーバーロードされていること
  std::packaged_task g{Functor{}};
  g(1.23);
  std::cout << g.get_future().get() << std::endl;

  // (3)
  // ラムダ式からの型推論
  std::packaged_task h{[](int) { return 2; }};
  h(3);
  std::cout << h.get_future().get() << std::endl;
}
```

### 出力
```
0
1
2
```


## バージョン
### 言語
- C++20

### 処理系
- [Clang](/implementation.md#clang): 18 [mark verified]
- [GCC](/implementation.md#gcc): 11 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [C++17 クラステンプレートのテンプレート引数推論](/lang/cpp17/type_deduction_for_class_templates.md)
- [C++23 `this`ポインタをもつ必要のない演算子を`static`として宣言できるようにする](/lang/cpp23/static_operator.md)
- [C++23 自身のオブジェクトを明示的にパラメータとして指定する](/lang/cpp23/deducing_this.md.nolink)


## 参照
- [P0433R2 Toward a resolution of US7 and US14: Integrating template deduction for class templates into the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0433r2.html)

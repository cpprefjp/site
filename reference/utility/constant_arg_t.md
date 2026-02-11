# constant_arg_t
* utility[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <auto V>
  struct constant_arg_t {
    explicit constant_arg_t() = default;
  };

  template <auto V> constexpr constant_arg_t<V> constant_arg{};
}
```

## 概要
`constant_arg_t`クラスは、オーバーロードのための空クラスである。

標準ライブラリの特定機能において、定数引数をテンプレートパラメータとして受け取って構築するための関数オーバーロードを定義するためにある。


## 備考
デフォルトコンストラクタに`explicit`が付いているのは、`constant_arg_t<F> x = {};`のように`=`付きの波カッコ初期化を禁止するためである。ユーザーは通常、`constant_arg_t`型の変数テンプレートとして事前定義されている`constant_arg`を使用すればよいので、問題にはならない。


## 例
```cpp example
#include <functional>
#include <print>
#include <utility>

void call(std::function_ref<void()> fn)
{
  fn();
}

struct Dog {
  void cry() { std::println("Bow-wow"); }
};

int main()
{
  Dog dog;
  call({std::constant_arg<&Dog::cry>, dog});
}
```
* std::constant_arg[color ff0000]
* std::function_ref[link /reference/functional/function_ref.md]

### 出力
```
Bow-wow
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`function_ref`](/reference/functional/function_ref.md)


## 参照
- [P0792R14 `function_ref`: a type-erased callable reference](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2023/p0792r14.html)
- [P3774R1 Rename `std::nontype`, and make it broadly useful](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3774r1.html)

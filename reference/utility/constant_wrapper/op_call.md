# operator()
* utility[meta header]
* std[meta namespace]
* constant_wrapper[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std {
  template <class... Args>
  static constexpr decltype(auto) operator()(Args&&... args) noexcept(/*see below*/);
}
```

## 概要
`constant_wrapper`が保持する値を、関数として呼び出す。

## 戻り値
`call-expr`を以下のように定めたとき、`call-expr`を返す:

- すべての`remove_cvref_t<Args>...`が`constexpr-param`のモデルであり、かつ`constant_wrapper<INVOKE(value, remove_cvref_t<Args>::value...)>`が妥当な型である場合は、`constant_wrapper<INVOKE(value, remove_cvref_t<Args>::value...)>{}`
- そうでない場合は、`INVOKE(value, std::forward<Args>(args)...)`

## 備考
- 静的メンバ関数である。
- 引数がすべて`constant_wrapper`であり、その結果をふたたび`constant_wrapper`で包める場合は、結果を包んで「型の世界」にとどめる。そうでない場合は、保持する値をアンラップして呼び出した結果をそのまま返す。
- 例外指定は`noexcept(call-expr)`と等価である。

## 例
```cpp example
#include <utility>

constexpr int triple(int x) { return x * 3; }

int main()
{
  // cw<triple>を呼び出すと、保持する関数を呼び出す
  // 引数もconstant_wrapperなら、結果をconstant_wrapperで包む
  auto r = std::cw<triple>(std::cw<7>);
  static_assert(r == 21);
}
```

### 出力
```

```

## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): 23 [mark verified]
- [GCC](/implementation.md#gcc): 16.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): 2026 Update 2 [mark noimpl]


## 関連項目
- [`std::constant_wrapper`](../constant_wrapper.md)


## 参照
- [P2781R9 `std::constant_wrapper`](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2781r9.html)
- [P3978R3 `constant_wrapper` should unwrap on call and subscript](https://open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3978r3.pdf)

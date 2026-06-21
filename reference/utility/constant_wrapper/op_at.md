# operator[]
* utility[meta header]
* std[meta namespace]
* constant_wrapper[meta class]
* function template[meta id-type]
* cpp26[meta cpp]

```cpp
template <class... Args>
static constexpr decltype(auto) operator[](Args&&... args) noexcept(/*see below*/);
```

## 概要
`constant_wrapper`が保持する値に対して、添字アクセスをおこなう。

## 戻り値
`subscr-expr`を以下のように定めたとき、`subscr-expr`を返す:

- すべての`remove_cvref_t<Args>...`が`constexpr-param`のモデルであり、かつ`constant_wrapper<value[remove_cvref_t<Args>::value...]>`が妥当な型である場合は、`constant_wrapper<value[remove_cvref_t<Args>::value...]>{}`
- そうでない場合は、`value[std::forward<Args>(args)...]`

## 備考
- 静的メンバ関数である。
- 添字がすべて`constant_wrapper`であり、その結果をふたたび`constant_wrapper`で包める場合は、結果を包んで「型の世界」にとどめる。そうでない場合は、保持する値をアンラップして添字アクセスした結果をそのまま返す。
- 例外指定は`noexcept(subscr-expr)`と等価である。

## 例
```cpp example
#include <utility>

constexpr int data[] = {0, 10, 20, 30};

int main()
{
  // 配列を保持して添字アクセスする
  auto e = std::cw<data>[std::cw<2>];
  static_assert(e == 20);
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
